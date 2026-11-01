// Language switch: the site is in English by default; the small EN/VI button in the menu switches every page to Vietnamese.
// The choice is kept in this browser. Vietnamese text lives in i18n-vi.js, which only loads when Vietnamese is on.
// i18n-vi.js nói tiếng Việt cho từng câu tiếng Anh trên trang: { "câu tiếng Anh": "câu tiếng Việt" }.
var I18N = (function () {
  var KEY = "cftc-lang", lang = "en", root = document.documentElement;
  try { lang = localStorage.getItem(KEY) === "vi" ? "vi" : "en"; } catch (e) {}
  var asked = /[?&]lang=(en|vi)\b/.exec(location.search);
  if (asked) lang = asked[1];

  var api = { lang: lang, dict: {}, rules: [], t: function (s) { var v = lookup(s); return v == null ? s : v; } };

  if (lang === "vi") {
    root.lang = "vi";
    root.classList.add("vi", "i18n-wait");
    // Fredoka and Caveat have no Vietnamese letters, so Vietnamese uses Baloo 2 and Dancing Script instead
    document.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Dancing+Script:wght@600;700&display=swap">' +
      '<script src="i18n-vi.js"><\/script>');
    setTimeout(function () { root.classList.remove("i18n-wait"); }, 1500);
  }

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function lookup(s) {
    var k = norm(s);
    if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(api.dict, k)) return api.dict[k];
    for (var i = 0; i < api.rules.length; i++) {
      var r = api.rules[i];
      if (r[0].test(k)) return k.replace(r[0], r[1]);
    }
    return null;
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, svg: 1, SVG: 1 };
  var INLINE = { A: 1, B: 1, STRONG: 1, I: 1, EM: 1, MARK: 1, SMALL: 1, BR: 1, SPAN: 1, CODE: 1, CITE: 1, SUP: 1 };
  var ATTRS = ["placeholder", "aria-label", "title", "alt", "data-tip"];

  // Translate one node and everything inside it. A paragraph that mixes text with <mark>, <b>, links… is translated as a whole.
  function walk(node) {
    if (node.nodeType === 3) {
      var v = lookup(node.nodeValue);
      if (v != null) {
        var m = /^(\s*)[\s\S]*?(\s*)$/.exec(node.nodeValue);
        node.nodeValue = m[1] + v + m[2];
      }
      return;
    }
    if (node.nodeType !== 1 || node.hasAttribute("data-no-i18n")) return;
    ATTRS.forEach(function (a) {
      var val = node.getAttribute(a), t = val && lookup(val);
      if (t != null && t !== val) node.setAttribute(a, t);
    });
    if (SKIP[node.tagName]) return;
    if (node.children.length && mixed(node)) {
      var t = lookup(node.innerHTML);
      if (t != null) { node.innerHTML = t; return; }
    }
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }
  function mixed(el) {
    var text = false;
    for (var c = el.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3 && c.nodeValue.trim()) text = true;
      else if (c.nodeType === 1 && !INLINE[c.tagName]) return false;
    }
    return text;
  }

  // The EN/VI button sits in the menu, next to the profile icon
  var BUTTON_ON = true; // false để tạm ẩn nút EN/VI
  function addButton() {
    var nav = document.querySelector("nav .wrap");
    if (!nav || (!BUTTON_ON && !asked)) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lang-btn";
    b.lang = lang === "vi" ? "en" : "vi";
    b.innerHTML = lang === "vi" ? "EN" : "VI";
    b.title = lang === "vi" ? "Switch to English" : "Đọc bằng tiếng Việt";
    b.setAttribute("aria-label", b.title);
    b.setAttribute("data-no-i18n", "");
    b.addEventListener("click", function () {
      try { localStorage.setItem(KEY, lang === "vi" ? "en" : "vi"); } catch (e) {}
      // Switching to Vietnamese shows the beta notice once, on the next page
      try { if (lang !== "vi") sessionStorage.setItem("cftc-vi-note", "1"); } catch (e) {}
      var url = location.href.replace(/([?&])lang=(en|vi)(&|(?=#)|$)/, function (_, a, b, c) { return c === "&" ? a : ""; });
      if (url === location.href) location.reload(); else location.href = url;
    });
    nav.insertBefore(b, nav.querySelector(".me") || nav.querySelector(".menu-btn"));
  }

  // "Vietnamese is still a beta" notice in the middle of the screen, kept in English on purpose
  function betaNotice() {
    var show = false;
    try { show = sessionStorage.getItem("cftc-vi-note") === "1"; sessionStorage.removeItem("cftc-vi-note"); } catch (e) {}
    if (!show) return;
    var box = document.createElement("div");
    box.className = "beta-note";
    box.setAttribute("data-no-i18n", "");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "betaTitle");
    box.innerHTML = '<div class="beta-card" lang="en">' +
      '<button type="button" class="beta-x" aria-label="Close">×</button>' +
      '<span class="beta-tag">Beta</span>' +
      '<h2 id="betaTitle">We recommend reading in English</h2>' +
      '<p>The Vietnamese version is still a beta, so some content could be misaligned.</p>' +
      '<div class="beta-actions"><button type="button" class="btn" data-keep>Continue in Vietnamese</button>' +
      '<button type="button" class="btn alt" data-en>Switch to English</button></div></div>';
    function close() { box.remove(); document.removeEventListener("keydown", esc); }
    function esc(e) { if (e.key === "Escape") close(); }
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".beta-x, [data-keep]")) close();
      else if (e.target.closest("[data-en]")) { try { localStorage.setItem(KEY, "en"); } catch (er) {} location.reload(); }
    });
    document.addEventListener("keydown", esc);
    document.body.appendChild(box);
    box.querySelector("[data-keep]").focus();
  }

  document.addEventListener("DOMContentLoaded", function () {
    addButton();
    if (lang !== "vi") return;
    betaNotice();
    walk(document.body);
    var t = lookup(document.title);
    if (t != null) document.title = t;
    root.classList.remove("i18n-wait");
    // Text added later (toasts, dialogs, loaded letters) is translated as it appears
    new MutationObserver(function (list) {
      list.forEach(function (m) {
        if (m.type === "characterData") walk(m.target);
        else m.addedNodes.forEach(walk);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  return api;
})();
