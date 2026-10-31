// Home page: team, social channels, stats, timeline, journal, photos and donation progress. Content comes from site-data.js.
(function () {
  var esc = Site.esc, m = Site.money();
  function $(id) { return document.getElementById(id); }

  // ===== Campaign posts (social media track) =====
  $("campaignPosts").innerHTML = SITE.campaignPosts.map(function (c) {
    return '<figure><img src="' + esc(c.src) + '" alt="Campaign post: ' + esc(c.caption) + '" loading="lazy" data-zoom><figcaption>' + esc(c.caption) + '</figcaption></figure>';
  }).join("");

  // ===== Team =====
  $("team").innerHTML = SITE.team.map(function (t) {
    return '<span><i aria-hidden="true">' + esc(t.name.charAt(0)) + '</i><span>' + esc(t.name) + '<small>' + esc(t.role) + '</small></span></span>';
  }).join("");

  // ===== Social channels =====
  $("channels").innerHTML = SITE.socials.map(function (s) {
    return '<a class="channel" href="' + esc(s.url) + '" target="_blank" rel="noopener"><span>' + esc(s.name) + '</span><small>' + esc(s.handle) + ' ↗</small></a>';
  }).join("");

  // ===== Stats: a number that counts up, a figure written as text ("~500"), or "Updating" =====
  function tiles(box, list) {
    list.forEach(function (k) {
      var el = document.createElement("div"), has = typeof k.value === "number", shown = has ? "0" : (k.text || "Updating");
      el.className = "kpi";
      el.innerHTML = '<span class="val' + (has || k.text ? "" : " pending") + '">' + esc(shown) + '</span>' +
        '<span class="lbl">' + esc(k.label) + '</span>' +
        '<span class="sub">' + esc([k.sub, k.target ? "Goal " + Site.fmt(k.target) : "", k.updated ? "updated " + Site.timeAgo(k.updated) : ""]
          .filter(Boolean).join(" · ")) + '</span>' +
        (has && k.target ? '<div class="track"><div></div></div>' : "");
      box.appendChild(el);
      if (!has) return;
      Site.countUp(el.querySelector(".val"), k.value);
      if (k.target) setTimeout(function () { el.querySelector(".track div").style.width = Math.min(100, k.value / k.target * 100) + "%"; }, 400);
    });
  }

  tiles($("socialStats"), SITE.socialStats);
  tiles($("hospitalStats"), SITE.hospitalStats);
  $("liveText").textContent = SITE.socialUpdated ? "Updated " + Site.timeAgo(SITE.socialUpdated) : "";

  // ===== The children our support reaches: the gift photos, then any extra ones =====
  $("childrenPhotos").innerHTML = (SITE.giftPhotos || []).concat(SITE.childrenPhotos || []).map(function (g) {
    return '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy" data-zoom><figcaption>' + esc(g.caption) + '</figcaption></figure>';
  }).join("");

  // ===== Timeline =====
  $("timeline").innerHTML = SITE.timeline.map(function (t) {
    var d = new Date(t.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    return '<li><time datetime="' + esc(t.date) + '">' + esc(d) + '</time><b>' + esc(t.title) + '</b><p>' + esc(t.text) + '</p></li>';
  }).join("");

  // ===== Journal (in the order written in site-data.js; the first one is the lead) =====
  $("journalCards").innerHTML = SITE.posts.map(function (p, i) { return Site.journalCard(p, i === 0); }).join("");

  // ===== Moments: repeat the photos so the strip loops without a gap =====
  var photos = SITE.photos.slice();
  while (photos.length && photos.length < 8) photos = photos.concat(SITE.photos);
  var belt = $("belt");
  belt.innerHTML = photos.concat(photos).map(function (p, i) {
    return '<figure style="--r:' + ((i % 3) - 1) * 1.5 + 'deg"><img src="' + esc(p.src) + '" alt="' + esc(p.caption || "A moment from our project") + '" loading="lazy">' +
      (p.caption ? '<figcaption>' + esc(p.caption) + '</figcaption>' : "") + '</figure>';
  }).join("");
  belt.style.setProperty("--dur", photos.length * 5 + "s");

  // ===== Donation progress =====
  $("homeGoal").textContent = Site.fmt(m.totalIn) + " of " + Site.fmt(SITE.goal) + " VND raised (" + Math.round(m.pct) + "%)";
  setTimeout(function () { $("homeBar").style.width = m.pct + "%"; }, 300);
})();
