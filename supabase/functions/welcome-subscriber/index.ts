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

const SUBJECT = "Congratulations, you're part of Care for the Carers ♥";

// The website's public address; the optional secret SITE_URL overrides it if the site moves
const SITE_URL = (Deno.env.get("SITE_URL") || "https://careforcarers.vercel.app/Bizethics").replace(/\/+$/, "");
const JOURNAL = SITE_URL + "/blog.html";
const HOME = SITE_URL + "/web.html";

const SOCIALS = [
  ["Instagram", "https://www.instagram.com/dearm0m___/"],
  ["TikTok", "https://www.tiktok.com/@dearm0m___"],
  ["Threads", "https://www.threads.com/@dearm0m___"],
];

function text() {
  return `Hi there,

Congratulations, you've officially joined Care for the Carers!

Signing up says a lot about you. It shows you care about the women who quietly hold everything together, and about the people in your own family too.

Here, we share what we have been doing: our research on the care work that so often goes unseen, our visits to K Hospital Tan Trieu, and honest reports on everything we did along the way.

Read our Journal: ${JOURNAL}
Visit our page: ${HOME}

This month, we'll send you some of the wonderful stories we have collected. And we would love to hear yours too. Just hit reply and tell us about someone who cares for you.

In the meantime, think about one small thing you can do today. For example, say thank you to your mom for everything she does. The things she does every day may look ordinary, but they are truly extraordinary.

Thank you for caring,
The Care for the Carers team

Follow us on Instagram, TikTok and Threads: @dearm0m___
${SOCIALS.map(([n, u]) => `${n}: ${u}`).join("\n")}

---

Chào bạn,

Chúc mừng bạn đã chính thức tham gia Care for the Carers!

Việc bạn đăng ký đã nói lên rất nhiều điều: bạn là người thật sự quan tâm đến việc chăm sóc cho những người phụ nữ, và cho cả những người thân trong gia đình mình.

Ở đây, chúng mình chia sẻ những gì đã làm: tìm hiểu về công việc chăm sóc thầm lặng, những lần đến Bệnh viện K Tân Triều, và những bài report ghi lại mọi điều trên hành trình ấy.

Đọc Journal của chúng mình: ${JOURNAL}
Ghé trang của chúng mình: ${HOME}

Tháng này, chúng mình sẽ gửi đến bạn những câu chuyện tuyệt vời mà chúng mình đã thu thập được. Bạn cũng có thể gửi cho chúng mình câu chuyện của bạn, chỉ cần trả lời thư này thôi.

Trong lúc chờ, hãy nghĩ xem hôm nay bạn có thể làm điều gì nhỏ. Ví dụ như nói lời cảm ơn mẹ vì tất cả những gì mẹ đã làm. Những việc mẹ làm mỗi ngày tưởng như bình thường, nhưng thật ra rất phi thường.

Cảm ơn bạn đã quan tâm,
Nhóm Care for the Carers

Theo dõi chúng mình trên Instagram, TikTok và Threads: @dearm0m___

If you'd rather not get our emails, reply with "unsubscribe" and we will remove you.
Nếu bạn không muốn nhận thư nữa, hãy trả lời "unsubscribe", chúng mình sẽ xoá bạn khỏi danh sách.`;
}

function html() {
  const p = 'style="font-size:16px;line-height:1.7"', vi = 'style="font-size:15px;line-height:1.7"';
  const pink = "#e8457c", soft = "#ffd6e5";
  const buttons = `<p style="margin:22px 0;text-align:center">
      <a href="${JOURNAL}" style="display:inline-block;background:${pink};color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 26px;border-radius:999px;margin:4px">Read our Journal</a>
      <a href="${HOME}" style="display:inline-block;background:#ffffff;color:${pink};text-decoration:none;font-weight:bold;font-size:16px;padding:12px 24px;border:2px solid ${pink};border-radius:999px;margin:4px">Visit our page</a>
    </p>`;
  const socials = SOCIALS.map(([n, u]) => `<a href="${u}" style="color:${pink};font-weight:bold;text-decoration:none">${n}</a>`).join(" · ");
  return `<!doctype html><html><body style="margin:0;background:#fff0f5;font-family:Arial,Helvetica,sans-serif;color:#5a1832">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
  <div style="background:#ffffff;border-radius:24px;padding:28px 26px">
    <p style="margin:0 0 6px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${pink}">Care for the Carers</p>
    <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3;color:${pink}">Congratulations, you're in! ♥</h1>
    <p ${p}>Hi there,</p>
    <p ${p}>Congratulations, you've officially joined <b>Care for the Carers</b>!</p>
    <p ${p}>Signing up says a lot about you. It shows you care about the women who quietly hold everything together, and about the people in your own family too.</p>
    <p ${p}>Here, we share what we have been doing: our research on the care work that so often goes unseen, our visits to K Hospital Tan Trieu, and honest reports on everything we did along the way.</p>
    ${buttons}
    <p ${p}>This month, we'll send you some of the wonderful stories we have collected. And we would love to hear yours too. <b>Just hit reply and tell us about someone who cares for you.</b></p>
    <p style="font-size:16px;line-height:1.7;background:${soft};border-left:5px solid ${pink};border-radius:0 16px 16px 0;padding:12px 16px">In the meantime, think about one small thing you can do today. For example, <b>say thank you to your mom for everything she does.</b> The things she does every day may look ordinary, but they are truly extraordinary.</p>
    <p ${p}>Thank you for caring,<br>The Care for the Carers team</p>
    <p style="font-size:14px;line-height:1.7">Follow us on ${socials}: @dearm0m___</p>
    <hr style="border:0;border-top:2px solid ${soft};margin:24px 0">
    <p ${vi}>Chào bạn,</p>
    <p ${vi}>Chúc mừng bạn đã chính thức tham gia <b>Care for the Carers</b>!</p>
    <p ${vi}>Việc bạn đăng ký đã nói lên rất nhiều điều: bạn là người thật sự quan tâm đến việc chăm sóc cho những người phụ nữ, và cho cả những người thân trong gia đình mình.</p>
    <p ${vi}>Ở đây, chúng mình chia sẻ những gì đã làm: tìm hiểu về công việc chăm sóc thầm lặng, những lần đến Bệnh viện K Tân Triều, và những bài report ghi lại mọi điều trên hành trình ấy. <a href="${JOURNAL}" style="color:${pink};font-weight:bold">Đọc Journal</a> hoặc <a href="${HOME}" style="color:${pink};font-weight:bold">ghé trang của chúng mình</a>.</p>
    <p ${vi}>Tháng này, chúng mình sẽ gửi đến bạn những câu chuyện tuyệt vời mà chúng mình đã thu thập được. Bạn cũng có thể gửi cho chúng mình câu chuyện của bạn, chỉ cần trả lời thư này thôi.</p>
    <p ${vi}>Trong lúc chờ, hãy nghĩ xem hôm nay bạn có thể làm điều gì nhỏ. Ví dụ như <b>nói lời cảm ơn mẹ vì tất cả những gì mẹ đã làm.</b> Những việc mẹ làm mỗi ngày tưởng như bình thường, nhưng thật ra rất phi thường.</p>
    <p ${vi}>Cảm ơn bạn đã quan tâm,<br>Nhóm Care for the Carers</p>
    <p style="font-size:14px;line-height:1.7">Theo dõi chúng mình trên ${socials}: @dearm0m___</p>
  </div>
  <p style="font-size:12px;line-height:1.6;color:#8a5a6c;text-align:center;margin:16px 8px 0">If you'd rather not get our emails, reply with "unsubscribe" and we will remove you.<br>Nếu bạn không muốn nhận thư nữa, hãy trả lời "unsubscribe", chúng mình sẽ xoá bạn khỏi danh sách.</p>
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

  // Google shows app passwords as 16 letters in groups of four ("abcd efgh ..."); spaces, quotes or
  // dashes pasted around them are not part of it
  const user = (Deno.env.get("GMAIL_USER") || "").trim().replace(/^["']|["']$/g, "");
  const raw = (Deno.env.get("GMAIL_APP_PASSWORD") || "").replace(/\s+/g, "");
  const letters = raw.replace(/[^A-Za-z]/g, "");
  const pass = letters.length === 16 ? letters : raw;
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
    // Shapes of the secrets (never their values) help spot a wrong one: an app password is 16 letters
    const shape = `GMAIL_USER is ${/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user) ? "an email address at " + user.split("@")[1] : "NOT an email address"}, app password length ${pass.length} (${letters.length} letters as saved)`;
    console.error(`Sending failed (${shape}):`, err instanceof Error ? err.message : err);
    return reply({ ok: false, error: "Sending failed" }, 502);
  }
  return reply({ ok: true, sent: true });
});
