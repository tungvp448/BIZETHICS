// Faces: draws the simple customisable faces for the thank-you wall, and stores the letters.
var Faces = (function () {
  var INK = "#2b1d16", LIP = "#7a2433";

  var skins = ["#f9d5b7", "#f1b48f", "#d9935f", "#a86a42", "#6e4630", "#f4a261", "#e76f51", "#9fd8cb", "#8ab4e8", "#f6d365", "#c8b6ff", "#a7c957"];
  var hairColors = ["#2b1d16", "#5b3a1e", "#9c5a2c", "#e3a33b", "#d1553f", "#3d4f8f", "#ededed", "#1f6f5c"];
  var HEAD = "M50 24 C71 24 82 42 82 64 C82 90 68 108 50 108 C32 108 18 90 18 64 C18 42 29 24 50 24Z";

  function curls() {
    var s = '<path d="M18 60 C18 30 34 20 50 20 C66 20 82 30 82 60 C76 46 66 40 50 40 C34 40 24 46 18 60Z"/>';
    for (var a = -175; a <= -5; a += 17) {
      var t = a * Math.PI / 180;
      s += '<circle cx="' + (50 + 33 * Math.cos(t)).toFixed(1) + '" cy="' + (58 + 40 * Math.sin(t)).toFixed(1) + '" r="9.5"/>';
    }
    return s;
  }

  // Each hair style has a part drawn behind the head and a part drawn on top of it
  var hair = [
    { name: "None", back: "", front: "" },
    { name: "Short", back: "", front: '<path d="M17 62 C14 34 30 15 50 15 C70 15 86 34 83 62 C80 48 74 38 62 35 C56 41 44 42 36 37 C27 42 20 50 17 62Z"/>' },
    { name: "Curly", back: "", front: curls() },
    { name: "Long", back: '<path d="M15 62 C13 28 32 13 50 13 C68 13 87 28 85 62 L88 114 C70 118 30 118 12 114Z"/>',
      front: '<path d="M18 62 C17 34 32 18 50 18 C68 18 83 34 82 62 C77 44 66 34 54 30 C48 40 34 48 18 62Z"/>' },
    { name: "Bun", back: '<circle cx="50" cy="15" r="12"/>', front: '<path d="M18 60 C16 34 32 20 50 20 C68 20 84 34 82 60 C76 44 64 36 50 36 C36 36 24 44 18 60Z"/>' },
    { name: "Bob", back: '<path d="M13 66 C11 30 31 15 50 15 C69 15 89 30 87 66 L88 94 C80 98 72 96 70 88 L30 88 C28 96 20 98 12 94Z"/>',
      front: '<path d="M19 58 C20 32 36 20 50 20 C64 20 80 32 81 58 C72 50 62 46 50 46 C38 46 28 50 19 58Z"/>' },
    { name: "Spiky", back: "", front: '<path d="M18 60 L16 40 L26 44 L28 24 L38 34 L44 14 L52 30 L62 16 L66 34 L76 26 L76 44 L86 42 L82 60 C76 46 64 40 50 40 C36 40 24 46 18 60Z"/>' }
  ];

  function pair(fn) { return fn(38) + fn(62); }
  var stroke = ' fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
  var eyes = [
    { name: "Dots", svg: pair(function (x) { return '<circle cx="' + x + '" cy="62" r="3.3" fill="' + INK + '"/>'; }) },
    { name: "Bright", svg: pair(function (x) { return '<ellipse cx="' + x + '" cy="62" rx="3.2" ry="4.6" fill="' + INK + '"/><circle cx="' + (x + 1) + '" cy="60.4" r="1.2" fill="#fff"/>'; }) },
    { name: "Happy", svg: pair(function (x) { return '<path d="M' + (x - 5) + ' 64 Q' + x + ' 57 ' + (x + 5) + ' 64"' + stroke + '/>'; }) },
    { name: "Sleepy", svg: pair(function (x) { return '<path d="M' + (x - 5) + ' 62 Q' + x + ' 66 ' + (x + 5) + ' 62"' + stroke + '/>'; }) },
    { name: "Lashes", svg: pair(function (x) { return '<circle cx="' + x + '" cy="62" r="3" fill="' + INK + '"/><path d="M' + (x - 4) + ' 58 L' + (x - 6) + ' 55 M' + x + ' 57 L' + x + ' 53.5 M' + (x + 4) + ' 58 L' + (x + 6) + ' 55"' + stroke + ' stroke-width="1.8"/>'; }) },
    { name: "Glasses", svg: pair(function (x) { return '<circle cx="' + x + '" cy="62" r="2.8" fill="' + INK + '"/><circle cx="' + x + '" cy="62" r="8"' + stroke + ' stroke-width="2.2"/>'; }) + '<path d="M46 61 Q50 58 54 61"' + stroke + ' stroke-width="2.2"/>' }
  ];
  var noses = [
    { name: "Classic", svg: '<path d="M50 66 L45 78 L52 78"' + stroke + '/>' },
    { name: "Round", svg: '<ellipse cx="50" cy="75" rx="4.5" ry="3.5" fill="rgba(0,0,0,.18)"/>' },
    { name: "Curve", svg: '<path d="M50 67 Q54 74 49 78"' + stroke + '/>' },
    { name: "Button", svg: '<path d="M45 76 Q50 81 55 76"' + stroke + '/>' },
    { name: "Dots", svg: '<circle cx="47" cy="76" r="1.6" fill="' + INK + '"/><circle cx="53" cy="76" r="1.6" fill="' + INK + '"/>' }
  ];
  var mouths = [
    { name: "Smile", svg: '<path d="M40 87 Q50 96 60 87"' + stroke + '/>' },
    { name: "Grin", svg: '<path d="M38 86 Q50 100 62 86Z" fill="' + LIP + '"/><path d="M41 87 L59 87 L58 90 L42 90Z" fill="#fff"/>' },
    { name: "Oh", svg: '<ellipse cx="50" cy="91" rx="4" ry="5" fill="' + LIP + '"/>' },
    { name: "Small", svg: '<path d="M45 90 Q50 93 55 90"' + stroke + '/>' },
    { name: "Laugh", svg: '<path d="M37 85 Q50 106 63 85 Q50 90 37 85Z" fill="' + LIP + '"/>' },
    { name: "Smirk", svg: '<path d="M42 90 Q52 93 59 87"' + stroke + '/>' }
  ];

  function clamp(i, list) { i = parseInt(i, 10) || 0; return Math.max(0, Math.min(list.length - 1, i)); }

  // f = { skin, hair, hairColor, eyes, nose, mouth } (all indexes into the lists above); viewBox can zoom into part of the face
  function svg(f, cls, viewBox) {
    f = f || {};
    var h = hair[clamp(f.hair, hair)], hc = hairColors[clamp(f.hairColor, hairColors)];
    return '<svg class="' + (cls || "face") + '" viewBox="' + (viewBox || "0 0 100 120") + '" aria-hidden="true">' +
      '<g fill="' + hc + '">' + h.back + '</g>' +
      '<path d="' + HEAD + '" fill="' + skins[clamp(f.skin, skins)] + '"/>' +
      '<g fill="#ff7a9a" opacity=".3"><circle cx="31" cy="81" r="5"/><circle cx="69" cy="81" r="5"/></g>' +
      '<g class="eyes">' + eyes[clamp(f.eyes, eyes)].svg + '</g>' +
      noses[clamp(f.nose, noses)].svg +
      mouths[clamp(f.mouth, mouths)].svg +
      '<g fill="' + hc + '">' + h.front + '</g>' +
      '</svg>';
  }

  // A blank head, like an empty spot on the wall waiting for someone
  function blank(color) {
    return '<svg class="face" viewBox="0 0 100 120" aria-hidden="true"><path d="' + HEAD + '" fill="' + color + '"/></svg>';
  }

  function random() {
    function r(list) { return Math.floor(Math.random() * list.length); }
    return { skin: r(skins), hair: r(hair), hairColor: r(hairColors), eyes: r(eyes), nose: r(noses), mouth: r(mouths) };
  }

  return { svg: svg, blank: blank, random: random, skins: skins, hairColors: hairColors, hair: hair, eyes: eyes, noses: noses, mouths: mouths };
})();

// ============================================================
// Letters: where the thank-you letters are kept.
// Khi đã điền SITE.supabase trong site-data.js, thư được lưu chung trên Supabase và mọi người đọc được thư của nhau.
// Email của người viết và của mẹ được lưu ở bảng riêng (letter_contacts) mà website không đọc được.
// Khi chưa điền, thư chỉ lưu trong trình duyệt của từng người, kèm vài thư mẫu.
// ============================================================
var Letters = (function () {
  var KEY = "cftc-letters", PRIVATE_KEY = "cftc-letters-private";
  var cfg = (window.SITE && SITE.supabase) || {};
  var remote = !!(cfg.url && cfg.anonKey);

  function api(path, body) {
    return fetch(cfg.url.replace(/\/+$/, "") + "/rest/v1/" + path, {
      method: body ? "POST" : "GET",
      headers: { apikey: cfg.anonKey, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error("Supabase " + r.status + ": " + t); });
      return r.json();
    });
  }
  function fromRow(r) { return { id: r.id, name: r.name, text: r.message, face: r.face, date: String(r.created_at || "").slice(0, 10) }; }

  if (remote) return {
    shared: true,
    list: function () {
      return api("letters?select=id,name,message,face,created_at&order=created_at.desc&limit=300")
        .then(function (rows) { return rows.map(fromRow); });
    },
    add: function (pub, priv) {
      priv = priv || {};
      return api("rpc/submit_letter", {
        p_name: pub.name, p_message: pub.text, p_face: pub.face,
        p_email: priv.email || null, p_mom_email: priv.momEmail || null, p_send_to_mom: !!priv.sendToMom
      }).then(function (rows) { return fromRow(rows[0]); });
    }
  };

  // Thư mẫu hiển thị sẵn trên tường, có thể sửa hoặc xoá
  var samples = [
    { id: "s1", name: "Lan", text: "Thank you for every meal you cooked when you were tired. I see it now.", face: { skin: 1, hair: 3, hairColor: 0, eyes: 2, nose: 3, mouth: 0 } },
    { id: "s2", name: "Minh", text: "Mom, I promise to call you more often. Not just when I need something.", face: { skin: 2, hair: 1, hairColor: 0, eyes: 5, nose: 0, mouth: 5 } },
    { id: "s3", name: "Anonymous", text: "To all the carers: you are enough, and you are loved.", face: { skin: 8, hair: 0, hairColor: 0, eyes: 0, nose: 1, mouth: 1 } },
    { id: "s4", name: "Hà", text: "You learned to be brave so I could be brave too. Thank you, Mẹ.", face: { skin: 0, hair: 5, hairColor: 1, eyes: 4, nose: 4, mouth: 0 } },
    { id: "s5", name: "Tuấn", text: "I never said it out loud, so here it is: I love you, and I’m proud of you.", face: { skin: 3, hair: 6, hairColor: 0, eyes: 1, nose: 2, mouth: 4 } },
    { id: "s6", name: "Mai", text: "Thank you for saying “I’m not hungry” all those times. I knew. I know.", face: { skin: 9, hair: 4, hairColor: 4, eyes: 3, nose: 3, mouth: 3 } },
    { id: "s7", name: "Khoa", text: "Next time I come home, I’ll cook for you.", face: { skin: 7, hair: 2, hairColor: 5, eyes: 0, nose: 0, mouth: 1 } },
    { id: "s8", name: "Linh", text: "You held everything together. Let me hold some of it now.", face: { skin: 10, hair: 3, hairColor: 3, eyes: 1, nose: 1, mouth: 0 } }
  ];

  function read(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; } }

  return {
    shared: false,
    // Public letters only: { id, name, text, face, date }
    list: function () { return Promise.resolve(read(KEY).concat(samples)); },
    // pub goes on the wall; priv ({ email, momEmail, sendToMom }) is kept separately and never shown
    add: function (pub, priv) {
      var all = read(KEY);
      all.unshift(pub);
      var ok = write(KEY, all.slice(0, 300));
      if (priv) { var p = read(PRIVATE_KEY); p.unshift(Object.assign({ id: pub.id }, priv)); write(PRIVATE_KEY, p); }
      return ok ? Promise.resolve(pub) : Promise.reject(new Error("storage unavailable"));
    }
  };
})();
