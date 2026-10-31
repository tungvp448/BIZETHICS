// welcome-subscriber: sends a thank-you email from the team's Gmail when someone subscribes.
// Called by a database trigger whenever a new row is added to public.subscribers (see supabase/setup.sql).
//
// Secrets to set in Supabase (Edge Functions → Secrets), never in this file:
//   GMAIL_USER          the Gmail address that sends the email
//   GMAIL_APP_PASSWORD  a Google "app password" for that account (not the normal password)
//   SITE_URL            optional: the website's public address, if it ever moves from careforcarers.vercel.app
//
// It only emails an address that is already in public.subscribers and has not been welcomed yet,
// so calling this function directly cannot be used to send mail to anyone else, or twice.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import nodemailer from "npm:nodemailer@6.9.14";

const SUBJECT = "Welcome to Care for the Carers ♥ Our Journal is waiting for you";

// The website's public address; the optional secret SITE_URL overrides it if the site moves
const SITE_URL = (Deno.env.get("SITE_URL") || "https://careforcarers.vercel.app/Bizethics").replace(/\/+$/, "");
const JOURNAL = SITE_URL + "/blog.html";

const READS = [
  ["Executive Summary", "what we did and why, in one page"],
  ["The work no one sees", "our research on the care work mothers do every day"],
  ["Real reporting at Bệnh Viện K Tân Triều", "what we saw and heard at the hospital"],
  ["Thank you, from the five of us", "a note from the team"],
];

function text() {
  return `Hi there,

Congratulations, you are now part of Care for the Carers! Thank you for subscribing.

Our Journal is where we share everything we have learned. A good place to start:
${READS.map(([t, d]) => `  - ${t}: ${d}`).join("\n")}
${JOURNAL ? `\nRead the Journal: ${JOURNAL}\n` : ""}
Once a month, we will keep sending you our most meaningful stories, so there is always a new one waiting for you.

Until the next one, here is one small thing you can do today: thank your mom for something ordinary she did this week.

With love,
The Care for the Carers team
Instagram, TikTok and Threads: @dearm0m___

---

Chào bạn,

Chúc mừng bạn đã trở thành một phần của Care for the Carers! Cảm ơn bạn đã đăng ký.

Journal là nơi chúng mình chia sẻ mọi điều đã học được, từ tìm hiểu về công việc chăm sóc thầm lặng của mẹ đến những câu chuyện tại Bệnh viện K Tân Triều.${JOURNAL ? ` Đọc tại: ${JOURNAL}` : ""}

Mỗi tháng, chúng mình sẽ tiếp tục gửi đến bạn những nội dung ý nghĩa nhất.

Thương,
Nhóm Care for the Carers

If you would rather not receive our emails, just reply to this one and we will remove you.
Nếu bạn không muốn nhận thư nữa, chỉ cần trả lời thư này, chúng mình sẽ xoá bạn khỏi danh sách.`;
}

function html() {
  const p = 'style="font-size:16px;line-height:1.7"', vi = 'style="font-size:15px;line-height:1.7"';
  const button = JOURNAL
    ? `<p style="margin:22px 0;text-align:center"><a href="${JOURNAL}" style="display:inline-block;background:#e8457c;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 28px;border-radius:999px">Read our Journal</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#fff0f5;font-family:Arial,Helvetica,sans-serif;color:#5a1832">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
  <div style="background:#ffffff;border-radius:24px;padding:28px 26px">
    <p style="margin:0 0 6px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#e8457c">Care for the Carers</p>
    <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3;color:#e8457c">Congratulations, you are one of us ♥</h1>
    <p ${p}>Hi there,</p>
    <p ${p}>Thank you for subscribing to <b>Care for the Carers</b>. Our Journal is where we share everything we have learned. A good place to start:</p>
    <ul style="font-size:16px;line-height:1.7;padding-left:20px;margin:0 0 8px">
      ${READS.map(([t, d]) => `<li><b>${t}</b>: ${d}</li>`).join("\n      ")}
    </ul>
    ${button}
    <p ${p}>Once a month, we will keep sending you our most meaningful stories, so there is always a new one waiting for you.</p>
    <p style="font-size:16px;line-height:1.7;background:#ffd6e5;border-left:5px solid #e8457c;border-radius:0 16px 16px 0;padding:12px 16px">Until the next one, here is one small thing you can do today: <b>thank your mom for something ordinary she did this week.</b></p>
    <p ${p}>With love,<br>The Care for the Carers team<br><span style="font-size:14px">Instagram, TikTok and Threads: @dearm0m___</span></p>
    <hr style="border:0;border-top:2px solid #ffd6e5;margin:24px 0">
    <p ${vi}>Chào bạn,</p>
    <p ${vi}>Chúc mừng bạn đã trở thành một phần của <b>Care for the Carers</b>! Journal là nơi chúng mình chia sẻ mọi điều đã học được, từ tìm hiểu về công việc chăm sóc thầm lặng của mẹ đến những câu chuyện tại Bệnh viện K Tân Triều.</p>
    <p ${vi}>Mỗi tháng, chúng mình sẽ tiếp tục gửi đến bạn những nội dung ý nghĩa nhất.</p>
    <p ${vi}>Thương,<br>Nhóm Care for the Carers</p>
  </div>
  <p style="font-size:12px;line-height:1.6;color:#8a5a6c;text-align:center;margin:16px 8px 0">If you would rather not receive our emails, just reply to this one and we will remove you.<br>Nếu bạn không muốn nhận thư nữa, chỉ cần trả lời thư này, chúng mình sẽ xoá bạn khỏi danh sách.</p>
</div></body></html>`;
}

function reply(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return reply({ ok: false, error: "Use POST" }, 405);

  let email = "";
  try { email = String((await req.json()).email || "").trim().toLowerCase(); } catch { /* handled below */ }
  if (!email) return reply({ ok: false, error: "Missing email" }, 400);

  // Google shows app passwords in groups of four ("abcd efgh ..."); the spaces are not part of it
  const user = (Deno.env.get("GMAIL_USER") || "").trim(), pass = (Deno.env.get("GMAIL_APP_PASSWORD") || "").replace(/\s+/g, "");
  if (!user || !pass) return reply({ ok: false, error: "Gmail is not set up yet: add GMAIL_USER and GMAIL_APP_PASSWORD" }, 503);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Claim this subscriber: only one that exists and has not been welcomed yet
  const { data, error } = await db.from("subscribers")
    .update({ welcomed_at: new Date().toISOString() })
    .eq("email", email).is("welcomed_at", null)
    .select("email");
  if (error) return reply({ ok: false, error: "Database error" }, 500);
  if (!data || !data.length) return reply({ ok: true, skipped: "Not a new subscriber" });

  try {
    const mailer = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await mailer.sendMail({ from: `"Care for the Carers" <${user}>`, to: email, subject: SUBJECT, text: text(), html: html() });
  } catch (err) {
    // Let a later attempt try again
    await db.from("subscribers").update({ welcomed_at: null }).eq("email", email);
    console.error("Sending failed:", err instanceof Error ? err.message : err);
    return reply({ ok: false, error: "Sending failed" }, 502);
  }
  return reply({ ok: true, sent: true });
});
