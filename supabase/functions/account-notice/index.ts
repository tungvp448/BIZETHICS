// account-notice: emails someone right after they change their personal settings (account.html):
// a new name, photo or password, or turning the monthly email off or on.
// Only a signed-in person can call it, and it only ever writes to that person's own email address.
// Uses the same Gmail secrets as welcome-subscriber: GMAIL_USER and GMAIL_APP_PASSWORD (and optional SITE_URL).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import nodemailer from "npm:nodemailer@6.9.14";

const SITE_URL = (Deno.env.get("SITE_URL") || "https://careforcarers.vercel.app/Bizethics").replace(/\/+$/, "");
const SETTINGS = SITE_URL + "/account.html";

// What each change says, in English and Vietnamese
const CHANGES: Record<string, [string, string]> = {
  name: ["Your name was updated.", "Tên của bạn đã được cập nhật."],
  avatar: ["Your profile photo was updated.", "Ảnh đại diện của bạn đã được cập nhật."],
  password: ["Your password was changed.", "Mật khẩu của bạn đã được đổi."],
  unsubscribed: ["You have unsubscribed. We won't send you our monthly stories any more.", "Bạn đã huỷ đăng ký. Chúng mình sẽ không gửi thư hằng tháng cho bạn nữa."],
  subscribed: ["You are subscribed to our monthly stories again. Welcome back!", "Bạn đã đăng ký nhận thư hằng tháng trở lại. Chào mừng bạn quay lại!"],
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function reply(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

function html(name: string, lines: [string, string][]) {
  const pink = "#e8457c", soft = "#ffd6e5";
  const hi = name ? `Hi ${name},` : "Hi there,", chao = name ? `Chào ${name},` : "Chào bạn,";
  const en = lines.map(([e]) => `<li>${e}</li>`).join(""), vi = lines.map(([, v]) => `<li>${v}</li>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#fff0f5;font-family:Arial,Helvetica,sans-serif;color:#5a1832">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
  <div style="background:#ffffff;border-radius:24px;padding:28px 26px">
    <p style="margin:0 0 6px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${pink}">Care for the Carers</p>
    <h1 style="margin:0 0 18px;font-size:22px;line-height:1.3;color:${pink}">Your settings were updated</h1>
    <p style="font-size:16px;line-height:1.7">${hi}</p>
    <ul style="font-size:16px;line-height:1.7;background:${soft};border-radius:16px;padding:12px 16px 12px 34px">${en}</ul>
    <p style="font-size:16px;line-height:1.7">If this was you, there is nothing else to do. If it wasn't, please <a href="${SETTINGS}" style="color:${pink};font-weight:bold">sign in and change your password</a>, or just reply to this email.</p>
    <p style="font-size:16px;line-height:1.7">With care,<br>The Care for the Carers team</p>
    <hr style="border:0;border-top:2px solid ${soft};margin:24px 0">
    <p style="font-size:15px;line-height:1.7">${chao}</p>
    <ul style="font-size:15px;line-height:1.7">${vi}</ul>
    <p style="font-size:15px;line-height:1.7">Nếu đây là bạn thì không cần làm gì thêm. Nếu không phải, hãy <a href="${SETTINGS}" style="color:${pink};font-weight:bold">đăng nhập và đổi mật khẩu</a>, hoặc trả lời thư này.</p>
    <p style="font-size:15px;line-height:1.7">Thương,<br>Nhóm Care for the Carers</p>
  </div>
</div></body></html>`;
}

function text(name: string, lines: [string, string][]) {
  return `${name ? `Hi ${name},` : "Hi there,"}

${lines.map(([e]) => `- ${e}`).join("\n")}

If this was you, there is nothing else to do. If it wasn't, please sign in and change your password (${SETTINGS}), or just reply to this email.

With care,
The Care for the Carers team

---

${name ? `Chào ${name},` : "Chào bạn,"}

${lines.map(([, v]) => `- ${v}`).join("\n")}

Nếu đây là bạn thì không cần làm gì thêm. Nếu không phải, hãy đăng nhập và đổi mật khẩu (${SETTINGS}), hoặc trả lời thư này.

Thương,
Nhóm Care for the Carers`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return reply({ ok: false, error: "Use POST" }, 405);

  // Who is asking: the signed-in person's own token
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: who, error: authError } = await db.auth.getUser(token);
  if (authError || !who.user?.email) return reply({ ok: false, error: "Please sign in" }, 401);

  let changes: string[] = [];
  try { changes = (await req.json()).changes || []; } catch { /* handled below */ }
  const lines = [...new Set(changes)].filter((c) => c in CHANGES).map((c) => CHANGES[c]);
  if (!lines.length) return reply({ ok: false, error: "Nothing changed" }, 400);

  const { data: profile } = await db.from("profiles").select("name").eq("id", who.user.id).maybeSingle();
  const name = (profile?.name || "").replace(/[<>&"]/g, "");

  // Same Gmail set-up as welcome-subscriber: app passwords are 16 letters, pasted spaces or quotes are not part of it
  const user = (Deno.env.get("GMAIL_USER") || "").trim().replace(/^["']|["']$/g, "");
  const raw = (Deno.env.get("GMAIL_APP_PASSWORD") || "").replace(/\s+/g, "");
  const letters = raw.replace(/[^A-Za-z]/g, "");
  const pass = letters.length === 16 ? letters : raw;
  if (!user || !pass) return reply({ ok: false, error: "Gmail is not set up yet" }, 503);

  try {
    const mailer = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await mailer.sendMail({
      from: `"Care for the Carers" <${user}>`, to: who.user.email,
      subject: "Your Care for the Carers settings were updated", text: text(name, lines), html: html(name, lines),
    });
  } catch (err) {
    console.error("Sending failed:", err instanceof Error ? err.message : err);
    return reply({ ok: false, error: "Sending failed" }, 502);
  }
  return reply({ ok: true, sent: true });
});
