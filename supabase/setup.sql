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
