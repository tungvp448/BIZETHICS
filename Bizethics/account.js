// Personal settings: sign in with email and password (Supabase Auth), then change name, photo, password
// and the monthly email. After each change the "account-notice" function emails the person a confirmation.
(function () {
  function $(id) { return document.getElementById(id); }
  var cfg = SITE.supabase || {};
  if (!cfg.url || !cfg.anonKey || !window.supabase) { $("offline").hidden = false; return; }

  var base = cfg.url.replace(/\/+$/, "");
  var sb = window.supabase.createClient(base, cfg.anonKey);
  var here = location.href.split("#")[0].split("?")[0];
  var me = null, saved = { name: "", avatar: "" }, avatar = "", subscribed = false;

  function say(el, text, ok) { el.className = "msg " + (ok ? "ok" : "err"); el.textContent = text; }

  // Supabase error messages, in plain words
  function friendly(err) {
    var m = (err && err.message) || "";
    if (/invalid login/i.test(m)) return "Wrong email or password.";
    if (/not confirmed/i.test(m)) return "Please confirm your email first: open the link we sent to your inbox.";
    if (/already registered/i.test(m)) return "This email already has an account. Please sign in, or use “Forgot your password?”.";
    if (/rate limit|too many/i.test(m)) return "Too many tries in a short time. Please wait a little and try again.";
    if (/sending .*email|confirmation email/i.test(m)) return "We couldn’t send the email just now. Please try again later.";
    if (/should be different/i.test(m)) return "Your new password must be different from the old one.";
    if (/password/i.test(m)) return "Please choose a password with at least 8 characters.";
    return "Sorry, something went wrong. Please try again.";
  }

  // Emails the signed-in person about what just changed
  function notify(changes) {
    return sb.auth.getSession().then(function (r) {
      var s = r.data.session;
      if (!s) return false;
      return fetch(base + "/functions/v1/account-notice", {
        method: "POST",
        headers: { Authorization: "Bearer " + s.access_token, apikey: cfg.anonKey, "Content-Type": "application/json" },
        body: JSON.stringify({ changes: changes })
      }).then(function (res) { return res.ok; }).catch(function () { return false; });
    });
  }

  // ===== Signed out =====
  var authMsg = $("authMsg");
  try { var subEmail = sessionStorage.getItem("subEmail"); if (subEmail) $("aEmail").value = subEmail; } catch (e) {}

  function credentials() {
    var email = $("aEmail").value.trim(), pass = $("aPass").value;
    if (!email || !$("aEmail").checkValidity()) { say(authMsg, "Please enter a valid email."); $("aEmail").focus(); return null; }
    if (pass.length < 8) { say(authMsg, "Your password needs at least 8 characters."); $("aPass").focus(); return null; }
    return { email: email, password: pass };
  }

  function busy(on) { ["signIn", "signUp", "forgot"].forEach(function (id) { $(id).disabled = on; }); }

  $("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = credentials(); if (!c) return;
    busy(true);
    sb.auth.signInWithPassword(c).then(function (r) {
      busy(false);
      if (r.error) say(authMsg, friendly(r.error));
    });
  });

  $("signUp").addEventListener("click", function () {
    var c = credentials(); if (!c) return;
    busy(true);
    sb.auth.signUp({ email: c.email, password: c.password, options: { emailRedirectTo: here } }).then(function (r) {
      busy(false);
      if (r.error) return say(authMsg, friendly(r.error));
      // Supabase answers without a session (and without an error) when the email is already registered
      if (r.data.user && r.data.user.identities && !r.data.user.identities.length) return say(authMsg, friendly({ message: "already registered" }));
      if (!r.data.session) say(authMsg, "Almost there! We’ve sent a link to " + c.email + ". Open it to confirm your account, then come back and sign in.", true);
    });
  });

  $("forgot").addEventListener("click", function () {
    var email = $("aEmail").value.trim();
    if (!email || !$("aEmail").checkValidity()) { say(authMsg, "Type your email above first, then press “Forgot your password?” again."); $("aEmail").focus(); return; }
    busy(true);
    sb.auth.resetPasswordForEmail(email, { redirectTo: here }).then(function (r) {
      busy(false);
      if (r.error) return say(authMsg, friendly(r.error));
      say(authMsg, "If " + email + " has an account, a link to choose a new password is on its way.", true);
    });
  });

  // ===== Signed in =====
  var profileMsg = $("profileMsg");

  function showAvatar() {
    var btn = $("avatarBtn"), name = $("pName").value.trim() || saved.name;
    btn.style.backgroundImage = avatar ? "url(" + avatar + ")" : "";
    btn.classList.toggle("has-photo", !!avatar);
    $("avatarInitial").textContent = avatar ? "" : (name ? name.charAt(0).toUpperCase() : "♥");
    $("avatarRemove").hidden = !avatar;
    $("whoName").textContent = name || "Your profile";
  }

  // Square-crops and shrinks a photo so it stays small (about 10–20 KB)
  function shrink(file) {
    return new Promise(function (resolve, reject) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var size = 192, side = Math.min(img.width, img.height), c = document.createElement("canvas");
        c.width = c.height = size;
        c.getContext("2d").drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("image")); };
      img.src = url;
    });
  }

  $("avatarBtn").addEventListener("click", function () { $("avatarFile").click(); });
  $("avatarPick").addEventListener("click", function () { $("avatarFile").click(); });
  $("avatarRemove").addEventListener("click", function () { avatar = ""; showAvatar(); say(profileMsg, "Press “Save changes” to remove your photo.", true); });
  $("avatarFile").addEventListener("change", function () {
    var f = this.files[0]; this.value = "";
    if (!f) return;
    if (!/^image\//.test(f.type)) return say(profileMsg, "Please choose an image file.");
    shrink(f).then(function (data) {
      avatar = data; showAvatar();
      say(profileMsg, "Looking good! Press “Save changes” to keep this photo.", true);
    }).catch(function () { say(profileMsg, "We couldn’t open that photo. Please try another one."); });
  });
  $("pName").addEventListener("input", showAvatar);

  $("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("pName").value.trim(), pass = $("pPass").value, changes = [];
    if (pass && pass.length < 8) { say(profileMsg, "Your new password needs at least 8 characters."); $("pPass").focus(); return; }
    if (name !== saved.name) changes.push("name");
    if (avatar !== saved.avatar) changes.push("avatar");
    if (!changes.length && !pass) { say(profileMsg, "Nothing to save yet: change your name, photo or password first."); return; }

    $("save").disabled = true;
    var steps = Promise.resolve();
    if (changes.length) steps = steps.then(function () {
      return sb.from("profiles").upsert({ id: me.id, name: name || null, avatar: avatar || null, updated_at: new Date().toISOString() }).then(function (r) {
        if (r.error) throw r.error;
        saved = { name: name, avatar: avatar };
      });
    });
    if (pass) steps = steps.then(function () {
      return sb.auth.updateUser({ password: pass }).then(function (r) {
        if (r.error) throw r.error;
        changes.push("password");
        $("pPass").value = "";
      });
    });
    steps.then(function () {
      return notify(changes).then(function (sent) {
        say(profileMsg, sent ? "Saved! We’ve emailed you a short confirmation." : "Saved!", true);
      });
    }).catch(function (err) {
      say(profileMsg, friendly(err));
    }).then(function () { $("save").disabled = false; });
  });

  // Monthly stories: subscribed or not, and a way to switch
  function showSub() {
    $("subText").textContent = subscribed
      ? "You’re subscribed. Once a month, we send you our most meaningful stories."
      : "You’re not receiving our monthly stories.";
    $("subToggle").textContent = subscribed ? "Unsubscribe" : "Subscribe again";
    $("subToggle").hidden = false;
  }

  $("subToggle").addEventListener("click", function () {
    var on = !subscribed, btn = this;
    if (!on && !confirm("Stop receiving our monthly stories?")) return;
    btn.disabled = true;
    sb.rpc("set_subscription", { p_on: on }).then(function (r) {
      btn.disabled = false;
      if (r.error) return say($("subMsg"), friendly(r.error));
      subscribed = on; showSub();
      // Subscribing again sends the welcome email by itself; unsubscribing gets a short goodbye
      if (on) return say($("subMsg"), "Welcome back! Check your inbox for a little hello.", true);
      notify(["unsubscribed"]).then(function () { say($("subMsg"), "You’ve unsubscribed. We’ve emailed you a confirmation.", true); });
    });
  });

  $("signOut").addEventListener("click", function () { sb.auth.signOut(); });

  function load(user) {
    me = user;
    $("whoEmail").textContent = user.email;
    sb.from("profiles").select("name, avatar").eq("id", user.id).maybeSingle().then(function (r) {
      saved = { name: (r.data && r.data.name) || "", avatar: (r.data && r.data.avatar) || "" };
      avatar = saved.avatar;
      $("pName").value = saved.name;
      showAvatar();
    });
    sb.rpc("my_subscription").then(function (r) { subscribed = !r.error && r.data === true; showSub(); });
  }

  // ===== Which view to show =====
  var recovering = false;
  sb.auth.onAuthStateChange(function (event, session) {
    if (event === "PASSWORD_RECOVERY") recovering = true;
    var user = session && session.user;
    $("signedOut").hidden = !!user;
    $("signedIn").hidden = !user;
    if (!user) { me = null; return; }
    // Supabase asks not to call it from inside this callback, so load right after
    if (!me || me.id !== user.id) { me = user; setTimeout(function () { load(user); }, 0); }
    if (recovering) {
      recovering = false;
      say(profileMsg, "Choose a new password below, then press “Save changes”.", true);
      $("pPass").focus();
    }
  });
})();
