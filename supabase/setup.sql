-- ============================================================
-- Care for the Carers: database for the thank-you wall
-- Chạy file này MỘT LẦN trong Supabase: SQL Editor → New query → dán toàn bộ → Run.
--
-- Hai bảng:
--   letters          công khai: tên, lá thư, gương mặt. Ai cũng đọc được.
--   letter_contacts  riêng tư: email người viết và email của mẹ. Website KHÔNG đọc được;
--                    chỉ nhóm xem được trong Supabase (Table Editor).
-- Website chỉ ghi thư qua hàm submit_letter, hàm này kiểm tra dữ liệu trước khi lưu.
-- Muốn ẩn một lá thư không phù hợp: mở bảng letters, đặt cột hidden = true.
-- ============================================================

create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 24),
  message text not null check (char_length(btrim(message)) between 1 and 600),
  face jsonb not null default '{}'::jsonb,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.letter_contacts (
  letter_id uuid primary key references public.letters (id) on delete cascade,
  email text check (email is null or char_length(email) <= 120),
  mom_email text check (mom_email is null or char_length(mom_email) <= 120),
  send_to_mom boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.letters enable row level security;
alter table public.letter_contacts enable row level security;

-- The public may read letters that are not hidden, and nothing else
drop policy if exists "Public can read visible letters" on public.letters;
create policy "Public can read visible letters" on public.letters
  for select to anon, authenticated using (not hidden);

-- No direct writes from the website; emails are never readable by the public
grant select on public.letters to anon, authenticated;
revoke insert, update, delete, truncate on public.letters from anon, authenticated;
revoke all on public.letter_contacts from anon, authenticated;

-- The only way the website adds a letter
create or replace function public.submit_letter(
  p_name text,
  p_message text,
  p_face jsonb,
  p_email text default null,
  p_mom_email text default null,
  p_send_to_mom boolean default false
)
returns table (id uuid, name text, message text, face jsonb, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  new_id uuid;
  email_pattern constant text := '^[^@\s]+@[^@\s]+\.[^@\s]+$';
  clean_email text := nullif(btrim(coalesce(p_email, '')), '');
  clean_mom text := nullif(btrim(coalesce(p_mom_email, '')), '');
begin
  if clean_email is not null and clean_email !~ email_pattern then
    raise exception 'Invalid email';
  end if;
  if coalesce(p_send_to_mom, false) and (clean_mom is null or clean_mom !~ email_pattern) then
    raise exception 'A valid mom email is required';
  end if;
  if p_face is null or jsonb_typeof(p_face) <> 'object' or pg_column_size(p_face) > 400 then
    raise exception 'Invalid face';
  end if;

  insert into public.letters (name, message, face)
  values (btrim(p_name), btrim(p_message), p_face)
  returning letters.id into new_id;

  if clean_email is not null or coalesce(p_send_to_mom, false) then
    insert into public.letter_contacts (letter_id, email, mom_email, send_to_mom)
    values (new_id, clean_email, case when p_send_to_mom then clean_mom end, coalesce(p_send_to_mom, false));
  end if;

  return query
    select l.id, l.name, l.message, l.face, l.created_at from public.letters l where l.id = new_id;
end;
$$;

revoke all on function public.submit_letter(text, text, jsonb, text, text, boolean) from public;
grant execute on function public.submit_letter(text, text, jsonb, text, text, boolean) to anon, authenticated;

-- ============================================================
-- Subscribers ("Read our stories, once a month") and help requests ("Need help? Reach out to us")
-- Cả hai bảng đều RIÊNG TƯ: website chỉ ghi vào được, không đọc được. Nhóm xem trong Table Editor.
-- Chạy lại toàn bộ file này cũng an toàn (không mất dữ liệu cũ).
-- ============================================================

create table if not exists public.subscribers (
  email text primary key check (char_length(email) <= 120),
  created_at timestamptz not null default now()
);

create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  name text check (name is null or char_length(name) <= 60),
  contact text not null check (char_length(btrim(contact)) between 1 and 120),
  story text not null check (char_length(btrim(story)) between 1 and 3000),
  may_share boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.help_requests enable row level security;
revoke all on public.subscribers from anon, authenticated;
revoke all on public.help_requests from anon, authenticated;

create or replace function public.subscribe(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  clean text := lower(btrim(coalesce(p_email, '')));
begin
  if clean !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Invalid email';
  end if;
  insert into public.subscribers (email) values (clean) on conflict (email) do nothing;
end;
$$;

create or replace function public.submit_help_request(p_name text, p_contact text, p_story text, p_share boolean default false)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.help_requests (name, contact, story, may_share)
  values (nullif(btrim(coalesce(p_name, '')), ''), btrim(p_contact), btrim(p_story), coalesce(p_share, false));
end;
$$;

revoke all on function public.subscribe(text) from public;
revoke all on function public.submit_help_request(text, text, text, boolean) from public;
grant execute on function public.subscribe(text) to anon, authenticated;
grant execute on function public.submit_help_request(text, text, text, boolean) to anon, authenticated;

-- ============================================================
-- Welcome email: khi có người đăng ký, gửi thư cảm ơn từ Gmail của nhóm.
-- Thư được gửi bởi Edge Function "welcome-subscriber" (supabase/functions/welcome-subscriber).
-- Cần đặt 2 secret trong Supabase → Edge Functions → Secrets: GMAIL_USER và GMAIL_APP_PASSWORD.
-- ============================================================

create extension if not exists pg_net with schema extensions;

alter table public.subscribers add column if not exists welcomed_at timestamptz;

create or replace function public.send_welcome_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://dlzsvmfkawbsvmaioohj.supabase.co/functions/v1/welcome-subscriber',
    body := jsonb_build_object('email', new.email),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  return new;
end;
$$;

revoke all on function public.send_welcome_email() from public, anon, authenticated;

drop trigger if exists subscribers_send_welcome on public.subscribers;
create trigger subscribers_send_welcome
  after insert on public.subscribers
  for each row execute function public.send_welcome_email();

-- ============================================================
-- Personal settings (account.html): tài khoản dùng Supabase Auth (email + mật khẩu).
--   profiles   tên và ảnh đại diện của mỗi người; ai cũng chỉ đọc/sửa được của chính mình.
--   my_subscription / set_subscription   xem và bật/tắt nhận thư cho email của người đang đăng nhập.
-- Sau mỗi lần đổi tên, ảnh hoặc mật khẩu, trang gọi Edge Function "account-notice" để gửi thư xác nhận.
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text check (name is null or char_length(btrim(name)) <= 40),
  avatar text check (avatar is null or (avatar like 'data:image/%' and char_length(avatar) <= 60000)),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
drop policy if exists "Create own profile" on public.profiles;
create policy "Create own profile" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create or replace function public.my_subscription()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.subscribers where email = lower(auth.jwt() ->> 'email'));
$$;

create or replace function public.set_subscription(p_on boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  me text := lower(auth.jwt() ->> 'email');
begin
  if auth.uid() is null or me is null then
    raise exception 'Not signed in';
  end if;
  if p_on then
    insert into public.subscribers (email) values (me) on conflict (email) do nothing;
  else
    delete from public.subscribers where email = me;
  end if;
  return p_on;
end;
$$;

revoke all on function public.my_subscription() from public, anon;
revoke all on function public.set_subscription(boolean) from public, anon;
grant execute on function public.my_subscription() to authenticated;
grant execute on function public.set_subscription(boolean) to authenticated;
