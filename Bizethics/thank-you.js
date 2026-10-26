// Say thank you page: the wall of faces, reading letters, and the face + letter builder.
(function () {
  // Những câu nhắn nhỏ xen giữa các gương mặt trên tường (tiếng Anh)
  var NOTES = [
    "When did you last call home?",
    "Has anyone asked her how she is today?",
    "She says “I’m fine” so you won’t worry.",
    "She still saves the biggest piece for you.",
    "One message tonight could make her whole week.",
    "She remembers your favourite dish. Do you remember hers?",
    "Behind every brave child in the ward is a mother who hasn’t slept.",
    "She learned to be brave the day you were born.",
    "It’s not too late to say it out loud.",
    "Call her. Just to hear her voice."
  ];
  var BLANKS = ["#f2a65a", "#9fd8cb", "#f6d365", "#8ab4e8", "#e9897e", "#c8b6ff", "#a7c957", "#f1b48f", "#ffc5a8", "#ddd6ce"];

  var esc = Site.esc, wall = $("wall"), letters = [];
  function $(id) { return document.getElementById(id); }
  function wobble(i) { return ((i * 7919) % 11) - 5; } // fixed tilt per spot, between -5 and 5 degrees

  // ===== The wall =====
  function render(newId) {
    var items = [], li = 0, pos = 0, noteI = 0, total = Math.max(36, Math.ceil(letters.length * 1.4));
    while (li < letters.length || pos < total) {
      if (pos % 9 === 4) items.push({ type: "note", text: NOTES[noteI++ % NOTES.length] });
      else if (li < letters.length && pos % 4 !== 3) items.push({ type: "face", letter: letters[li++] });
      else items.push({ type: "blank" });
      pos++;
    }

    wall.innerHTML = "";
    items.forEach(function (it, i) {
      var node;
      if (it.type === "note") {
        node = document.createElement("div");
        node.className = "note-card";
        node.textContent = it.text;
      } else {
        node = document.createElement("button");
        node.type = "button";
        node.className = "tile" + (it.type === "blank" ? " blank" : "");
        if (it.type === "face") {
          var l = it.letter;
          node.innerHTML = Faces.svg(l.face).replace("<svg ", '<svg style="--blink:' + (Math.random() * 5).toFixed(2) + 's" ') +
            '<span class="who">' + esc(l.name) + '</span>';
          node.setAttribute("aria-label", "Read " + l.name + "’s letter");
          node.addEventListener("click", function () { squish(node, function () { openLetter(l); }); });
          if (l.id === newId) node.classList.add("new");
          node.dataset.id = l.id;
        } else {
          node.innerHTML = Faces.blank(BLANKS[i % BLANKS.length]) + '<span class="who">+ You?</span>';
          node.setAttribute("aria-label", "Add your own face and letter");
          node.addEventListener("click", function () { squish(node, openBuilder); });
        }
      }
      node.style.setProperty("--r", wobble(i) + "deg");
      node.style.setProperty("--d", Math.min(i * 30, 1200) + "ms");
      wall.appendChild(node);
    });

    $("countPill").textContent = letters.length + (letters.length === 1 ? " letter" : " letters") + " on the wall";
    renderStats();

    if (newId) {
      var mine = wall.querySelector('[data-id="' + newId + '"]');
      if (mine) {
        mine.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(function () { var r = mine.getBoundingClientRect(); Site.hearts(r.left + r.width / 2, r.top, 12); }, 700);
      }
    }
  }

  function squish(node, then) {
    node.classList.remove("squish");
    void node.offsetWidth;
    node.classList.add("squish");
    setTimeout(then, 220);
  }

  function renderStats() {
    var words = letters.reduce(function (n, l) { return n + l.text.trim().split(/\s+/).length; }, 0);
    var today = new Date().toISOString().slice(0, 10);
    var stats = [
      { label: "Letters on the wall", value: letters.length },
      { label: "Words written to moms", value: words },
      { label: "Average words per letter", value: letters.length ? Math.round(words / letters.length) : 0 },
      { label: "Letters written today", value: letters.filter(function (l) { return l.date === today; }).length }
    ];
    var box = $("wallStats");
    box.innerHTML = stats.map(function (s) { return '<div class="kpi"><span class="val">0</span><span class="lbl">' + esc(s.label) + '</span></div>'; }).join("");
    box.querySelectorAll(".val").forEach(function (v, i) { Site.countUp(v, stats[i].value); });
  }

  // ===== Reading a letter =====
  var letterDlg = $("letterDlg");
  function openLetter(l) {
    $("letterFace").innerHTML = Faces.svg(l.face);
    $("letterBody").textContent = l.text;
    $("letterFrom").textContent = "With love, " + l.name;
    letterDlg.showModal();
  }
  $("loveBtn").addEventListener("click", function () {
    var r = this.getBoundingClientRect();
    Site.hearts(r.left + r.width / 2, r.top, 10);
  });
  $("writeToo").addEventListener("click", function () { letterDlg.close(); openBuilder(); });

  // ===== Face builder =====
  var builderDlg = $("builderDlg"), face = Faces.random();
  var FEATURE_ZOOM = { eyes: "22 46 56 34", nose: "32 58 36 30", mouth: "28 74 44 34" };
  var groups = [
    { key: "skin", label: "Skin", list: Faces.skins, swatch: true },
    { key: "hair", label: "Hair", list: Faces.hair },
    { key: "hairColor", label: "Hair colour", list: Faces.hairColors, swatch: true },
    { key: "eyes", label: "Eyes", list: Faces.eyes },
    { key: "nose", label: "Nose", list: Faces.noses },
    { key: "mouth", label: "Mouth", list: Faces.mouths }
  ];

  var optionsBox = $("options");
  groups.forEach(function (g) {
    var wrap = document.createElement("div");
    wrap.className = "opt-group";
    wrap.innerHTML = '<span>' + g.label + '</span><div class="opts" role="group" aria-label="' + g.label + '"></div>';
    var opts = wrap.querySelector(".opts");
    g.list.forEach(function (item, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "opt" + (g.swatch ? " swatch" : "");
      b.dataset.key = g.key;
      b.dataset.i = i;
      b.setAttribute("aria-label", g.label + " " + (g.swatch ? i + 1 : item.name));
      if (g.swatch) b.style.background = item;
      b.addEventListener("click", function () { face[g.key] = i; refresh(); });
      opts.appendChild(b);
    });
    optionsBox.appendChild(wrap);
  });

  function refresh() {
    $("preview").innerHTML = Faces.svg(face, "face preview");
    var p = $("preview").firstChild;
    p.classList.add("bounce");
    optionsBox.querySelectorAll(".opt").forEach(function (b) {
      var key = b.dataset.key, i = +b.dataset.i;
      b.setAttribute("aria-pressed", face[key] === i);
      if (!b.classList.contains("swatch")) {
        var f = Object.assign({}, face);
        f[key] = i;
        if (key !== "hair" && FEATURE_ZOOM[key]) f.hair = 0;
        b.innerHTML = Faces.svg(f, "", FEATURE_ZOOM[key]);
      }
    });
  }

  $("dice").addEventListener("click", function () {
    face = Faces.random();
    refresh();
    this.classList.remove("roll");
    void this.offsetWidth;
    this.classList.add("roll");
  });

  function openBuilder() {
    refresh();
    $("fErr").textContent = "";
    builderDlg.showModal();
    builderDlg.scrollTop = 0;
    // On small screens the face builder comes first, so don't jump past it to the letter
    if (window.matchMedia("(min-width: 761px)").matches) setTimeout(function () { $("fText").focus(); }, 50);
    else $("dice").focus();
  }
  $("addBtn").addEventListener("click", openBuilder);
  $("firstBtn").addEventListener("click", openBuilder);

  // Prompt chips add a starting phrase to the letter
  $("prompts").addEventListener("click", function (e) {
    if (e.target.tagName !== "BUTTON") return;
    var t = $("fText"), add = e.target.textContent.replace("…", " ");
    t.value = (t.value && !/\s$/.test(t.value) ? t.value + " " : t.value) + add;
    t.focus();
  });

  $("fSend").addEventListener("change", function () {
    $("momRow").hidden = !this.checked;
    if (this.checked) $("fMom").focus();
  });

  function fail(input, msg) {
    $("fErr").textContent = msg;
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.focus();
  }

  $("letterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = $("fText").value.trim(), name = $("fName").value.trim();
    var email = $("fEmail"), mom = $("fMom"), send = $("fSend").checked;
    if (!text) return fail($("fText"), "Write a few words to your mom first.");
    if (!name) return fail($("fName"), "Add your name so she knows it’s from you.");
    if (email.value && !email.checkValidity()) return fail(email, "That email doesn’t look right.");
    if (send && (!mom.value || !mom.checkValidity())) return fail(mom, "Add your mom’s email so we can send it to her.");

    var pub = { id: "l" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: name, text: text,
                face: Object.assign({}, face), date: new Date().toISOString().slice(0, 10) };
    var priv = (email.value || send) ? { email: email.value.trim(), momEmail: send ? mom.value.trim() : "", sendToMom: send } : null;

    var submit = this.querySelector('[type="submit"]');
    submit.disabled = true;
    Letters.add(pub, priv).then(function (saved) {
      letters.unshift(saved);
      builderDlg.close();
      $("letterForm").reset();
      $("momRow").hidden = true;
      face = Faces.random();
      render(saved.id);
      toast("Your letter is on the wall ♥");
    }).catch(function () {
      $("fErr").textContent = "Sorry, we couldn’t save your letter. Please try again.";
    }).then(function () { submit.disabled = false; });
  });

  // Close dialogs with the × button or by clicking outside
  [letterDlg, builderDlg].forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d || e.target.hasAttribute("data-close")) d.close(); });
  });

  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 3000);
  }

  Letters.list().then(function (list) { letters = list; render(); }).catch(function () {
    render();
    toast("We couldn’t load the letters right now. Please refresh.");
  });
})();
