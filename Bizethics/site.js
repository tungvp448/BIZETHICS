// Shared behaviour for every page: menu, hugs, photo viewer, scroll reveal, money helpers.
var Site = (function () {
  function fmt(n) { return n.toLocaleString("en-US"); }

  function money() {
    var totalIn = 0, totalOut = 0;
    SITE.entries.forEach(function (e) { if (e.type === "in") totalIn += e.amount; else totalOut += e.amount; });
    return { totalIn: totalIn, totalOut: totalOut, pct: Math.min(100, totalIn / SITE.goal * 100) };
  }

  // Count a number up from 0 when it scrolls into view
  function countUp(el, to, suffix) {
    suffix = suffix || "";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { el.textContent = fmt(to) + suffix; return; }
    el.textContent = "0" + suffix;
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      var start = performance.now(), dur = 1200;
      (function tick(t) {
        var p = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(to * eased)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
    io.observe(el);
  }

  function hearts(x, y, n) {
    for (var i = 0; i < (n || 8); i++) {
      var h = document.createElement("span");
      h.className = "heart";
      h.textContent = "♥";
      h.style.left = (x + (Math.random() * 60 - 30)) + "px";
      h.style.top = y + "px";
      h.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
      h.style.animationDelay = (i * 60) + "ms";
      h.addEventListener("animationend", function () { this.remove(); });
      document.body.appendChild(h);
    }
  }

  function timeAgo(iso) {
    var days = Math.round((Date.now() - new Date(iso + "T12:00:00").getTime()) / 864e5);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return days + " days ago";
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function longDate(iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  function authors(p) {
    var a = p.authors || [];
    return a.length > 1 ? a.slice(0, -1).join(", ") + " & " + a[a.length - 1] : (a[0] || "The team");
  }
  function postUrl(p) { return "blog.html?post=" + encodeURIComponent(p.slug); }
  function sortedPosts() { return SITE.posts.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }); }

  // Sends a form to a Supabase function (see supabase/setup.sql). Rejects with "offline" until SITE.supabase is filled in.
  function send(fn, payload) {
    var cfg = SITE.supabase || {};
    if (!cfg.url || !cfg.anonKey) return Promise.reject(new Error("offline"));
    return fetch(cfg.url.replace(/\/+$/, "") + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: { apikey: cfg.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { if (!r.ok) throw new Error("Supabase " + r.status); });
  }

  // What to tell people when a form cannot be sent yet
  function reachUs() {
    var c = SITE.contact || {}, links = SITE.socials.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>';
    }).join(", ");
    return (c.email ? 'Please email us at <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a> or message us on ' : "Please message us on ") + links + ".";
  }

  // "Read our stories" box, placed wherever a page has <div data-subscribe></div>
  function subscribeBox(el) {
    el.className = "subscribe";
    el.innerHTML = '<div><span class="eyebrow">Subscribe</span><h3>Read our stories, once a month</h3>' +
      '<p>New reports from the ward, our research and the letters people write, in your inbox once a month.</p></div>' +
      '<form novalidate><label class="sr-only" for="sub-' + el.dataset.subscribe + '">Your email</label>' +
      '<input type="email" id="sub-' + el.dataset.subscribe + '" placeholder="you@example.com" autocomplete="email" required maxlength="120">' +
      '<button class="btn" type="submit">Subscribe</button>' +
      '<p class="fine">One email a month. We never share your email, and you can unsubscribe at any time in your <a href="account.html">settings</a>.</p>' +
      '<p class="msg" role="status"></p></form>';
    var form = el.querySelector("form"), input = el.querySelector("input"), msg = el.querySelector(".msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.value || !input.checkValidity()) { msg.className = "msg err"; msg.textContent = "Please enter a valid email."; input.focus(); return; }
      form.querySelector("button").disabled = true;
      var email = input.value.trim();
      send("subscribe", { p_email: email }).then(function () {
        // Remembered for this tab only, so Personal settings can fill in the email
        try { sessionStorage.setItem("subEmail", email); } catch (e) {}
        form.innerHTML = '<p class="msg ok">Thank you! A welcome email is on its way ♥</p>' +
          '<p>Want to add your name and photo, or choose a password? <a href="account.html">Open your personal settings →</a></p>';
      }).catch(function (err) {
        msg.className = "msg err";
        msg.innerHTML = err.message === "offline" ? "Subscriptions are not open yet. " + reachUs() : "Sorry, something went wrong. Please try again.";
        form.querySelector("button").disabled = false;
      });
    });
  }

  // A Journal card, used on the home page and the Journal page
  function journalCard(p, lead) {
    return '<a class="jcard' + (lead ? " lead" : "") + '" href="' + postUrl(p) + '">' +
      (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy" onerror="this.remove()">' : "") +
      '<div class="txt"><span class="kicker-pill">' + esc(p.kicker) + (p.draft ? ' <span class="draft-tag">Draft</span>' : "") + '</span>' +
      '<h3>' + esc(p.title) + '</h3><p>' + esc(p.standfirst) + '</p>' +
      '<span class="by">By ' + esc(authors(p)) + '</span></div></a>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Mark the current tab
    var page = location.pathname.split("/").pop() || "web.html";
    document.querySelectorAll("nav ul a, nav a.me").forEach(function (a) {
      if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
    });

    // Journal dropdown: one link per post, in the same order as the Journal page
    document.querySelectorAll("nav [data-journal]").forEach(function (ul) {
      ul.innerHTML = SITE.posts.map(function (p) {
        return '<li><a href="' + postUrl(p) + '"><small>' + esc(p.kicker) + '</small>' + esc(p.title) + '</a></li>';
      }).join("");
    });

    // Subscribe boxes
    document.querySelectorAll("[data-subscribe]").forEach(subscribeBox);

    // Mobile menu
    var nav = document.querySelector("nav"), menuBtn = document.querySelector(".menu-btn");
    if (menuBtn) menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });

    // Send a hug
    var hugBtn = document.getElementById("hug"), hugLabel = document.getElementById("hugCount");
    if (hugBtn) {
      var hugs = 0;
      try { hugs = parseInt(localStorage.getItem("hugs"), 10) || 0; } catch (e) {}
      var showHugs = function () { if (hugLabel) hugLabel.textContent = hugs ? "You’ve sent " + hugs + (hugs === 1 ? " hug" : " hugs") : ""; };
      showHugs();
      hugBtn.addEventListener("click", function () {
        hugs++;
        try { localStorage.setItem("hugs", hugs); } catch (e) {}
        showHugs();
        var r = this.getBoundingClientRect();
        hearts(r.left + r.width / 2, r.top + 10);
      });
    }

    // Photo viewer for gallery, moving strip and any [data-zoom] image
    var lb = document.getElementById("lb");
    if (lb) {
      document.addEventListener("click", function (e) {
        var img = e.target.closest(".gallery img, .marquee img, [data-zoom]");
        if (!img) return;
        if (img.tagName !== "IMG") img = img.querySelector("img");
        document.getElementById("lbImg").src = img.src;
        document.getElementById("lbImg").alt = img.alt;
        lb.classList.add("open");
      });
      lb.addEventListener("click", function () { lb.classList.remove("open"); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
    }

    // Fade sections in as they scroll into view
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: .12 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }
  });

  return { fmt: fmt, money: money, countUp: countUp, hearts: hearts, timeAgo: timeAgo, longDate: longDate, esc: esc, send: send, reachUs: reachUs, journalCard: journalCard, authors: authors, sortedPosts: sortedPosts };
})();
