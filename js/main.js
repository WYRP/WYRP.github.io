(function () {
  "use strict";

  var projects = (window.PROJECTS || []).filter(function (p) { return !p.hidden; });
  var grid = document.getElementById("project-grid");
  var filters = document.getElementById("filters");
  var modal = document.getElementById("project-modal");
  var activeTag = "All";
  var lastFocus = null;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "className") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function thumbFor(p) {
    if (p.thumbnail === false) return null;
    if (p.thumbnail) return p.thumbnail;
    var media = p.media || [];
    for (var i = 0; i < media.length; i++) {
      var m = media[i];
      if (m.type === "image") return m.src;
      if (m.type === "youtube") return m.poster || "https://img.youtube.com/vi/" + m.id + "/hqdefault.jpg";
    }
    return null;
  }

  function hasVideo(p) {
    return (p.media || []).some(function (m) {
      return m.type === "video" || m.type === "youtube" || m.type === "vimeo";
    });
  }

  // Stable soft color per project for cards without an image
  function hue(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return h;
  }

  /* ---------- Filters ---------- */
  function renderFilters() {
    var tags = ["All"];
    projects.forEach(function (p) {
      (p.tags || []).forEach(function (t) { if (tags.indexOf(t) === -1) tags.push(t); });
    });
    filters.innerHTML = "";
    if (tags.length <= 2) return; // no point filtering
    tags.forEach(function (t) {
      var b = el("button", { type: "button", className: "chip" + (t === activeTag ? " active" : ""), text: t });
      b.setAttribute("aria-pressed", t === activeTag ? "true" : "false");
      b.addEventListener("click", function () {
        activeTag = t;
        renderFilters();
        renderGrid();
      });
      filters.appendChild(b);
    });
  }

  /* ---------- Grid ---------- */
  function renderGrid() {
    grid.innerHTML = "";
    projects
      .filter(function (p) { return activeTag === "All" || (p.tags || []).indexOf(activeTag) !== -1; })
      .forEach(function (p) {
        var src = thumbFor(p);
        var thumb = el("div", { className: "card-thumb" });
        if (src) {
          var img = el("img", { src: src, alt: "", loading: "lazy" });
          if (p.thumbnailPosition) img.style.objectPosition = p.thumbnailPosition;
          thumb.appendChild(img);
        } else {
          var h = hue(p.id || p.title);
          thumb.style.background =
            "linear-gradient(135deg, hsl(" + h + " 45% 78%), hsl(" + ((h + 40) % 360) + " 50% 62%))";
          thumb.appendChild(el("span", { className: "card-initial", text: (p.title || "?").charAt(0) }));
        }
        if (hasVideo(p)) thumb.appendChild(el("span", { className: "badge", text: "▶ Video" }));

        var tagRow = el("div", { className: "tags" }, (p.tags || []).map(function (t) {
          return el("span", { className: "tag", text: t });
        }));

        var card = el("button", { type: "button", className: "card", "aria-label": "Open project: " + p.title }, [
          thumb,
          el("div", { className: "card-body" }, [
            el("div", { className: "card-meta", text: p.year || "" }),
            el("h3", { text: p.title }),
            el("p", { text: p.summary || "" }),
            tagRow
          ])
        ]);
        card.addEventListener("click", function () { location.hash = "project-" + p.id; });
        grid.appendChild(card);
      });
  }

  /* ---------- Modal ---------- */
  function mediaNode(m) {
    var inner;
    if (m.type === "text") {
      var block = el("div", { className: "story-block" });
      if (m.heading) block.appendChild(el("h3", { text: m.heading }));
      (m.body || "").split(/\n\n+/).forEach(function (para) {
        para = para.trim();
        if (!para) return;
        if (/^- /m.test(para)) {
          block.appendChild(el("ul", null, para.split(/\n/).map(function (li) {
            return el("li", { text: li.replace(/^-\s*/, "") });
          })));
        } else {
          block.appendChild(el("p", { text: para }));
        }
      });
      return block;
    }
    if (m.type === "image") {
      inner = el("img", { src: m.src, alt: m.caption || "", loading: "lazy" });
    } else if (m.type === "video") {
      var vAttrs = { src: m.src, controls: "", preload: "metadata", playsinline: "" };
      if (m.poster) vAttrs.poster = m.poster;
      if (m.loop) { vAttrs.loop = ""; vAttrs.muted = ""; vAttrs.autoplay = ""; }
      inner = el("video", vAttrs);
      if (m.loop) inner.muted = true;
    } else if (m.type === "youtube") {
      var ytSrc = "https://www.youtube-nocookie.com/embed/" + m.id + "?rel=0" +
        (m.start ? "&start=" + m.start : "") + (m.end ? "&end=" + m.end : "");
      var ytFrame = function (autoplay) {
        return el("iframe", {
          src: ytSrc + (autoplay ? "&autoplay=1" : ""),
          title: m.caption || "YouTube video",
          allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen",
          allowfullscreen: "",
          loading: "lazy"
        });
      };
      if (m.poster) {
        // Show our own still until the viewer presses play, then load the clip.
        var facade = el("button", { type: "button", className: "yt-facade", "aria-label": "Play video" }, [
          el("img", { src: m.poster, alt: "" }),
          el("span", { className: "yt-play", "aria-hidden": "true", text: "▶" })
        ]);
        inner = el("div", { className: "embed" }, [facade]);
        facade.addEventListener("click", function () { inner.replaceChild(ytFrame(true), facade); });
      } else {
        inner = el("div", { className: "embed" }, [ytFrame(false)]);
      }
    } else if (m.type === "vimeo") {
      inner = el("div", { className: "embed" }, [el("iframe", {
        src: "https://player.vimeo.com/video/" + m.id,
        title: m.caption || "Vimeo video",
        allow: "fullscreen; picture-in-picture",
        allowfullscreen: "",
        loading: "lazy"
      })]);
    } else {
      return null;
    }
    return el("figure", { className: "media" }, [inner, m.caption ? el("figcaption", { text: m.caption }) : null]);
  }

  function openProject(id) {
    var p = projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var body = modal.querySelector(".modal-body");
    body.innerHTML = "";

    body.appendChild(el("div", { className: "card-meta", text: p.year || "" }));
    body.appendChild(el("h2", { id: "modal-title", text: p.title }));
    body.appendChild(el("div", { className: "tags" }, (p.tags || []).map(function (t) {
      return el("span", { className: "tag", text: t });
    })));

    var media = p.media || [];
    var isStory = media.some(function (m) { return m.type === "text"; });
    function addDescription() {
      (p.description || p.summary || "").split(/\n\n+/).forEach(function (para) {
        if (para.trim()) body.appendChild(el("p", { text: para.trim() }));
      });
    }
    function addMedia() {
      media.forEach(function (m) {
        var n = mediaNode(m);
        if (n) body.appendChild(n);
      });
    }
    // Story layout (has text sections): intro first, then the sections in order.
    // Otherwise: media at the top, description underneath.
    if (isStory) { addDescription(); addMedia(); } else { addMedia(); addDescription(); }

    if (p.links && p.links.length) {
      body.appendChild(el("div", { className: "link-row" }, p.links.map(function (l) {
        return el("a", { href: l.url, target: "_blank", rel: "noopener", className: "btn btn-secondary", text: l.label + " ↗" });
      })));
    }

    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-close").focus();
  }

  function closeProject() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.querySelector(".modal-body").innerHTML = ""; // stops playing videos
    document.body.classList.remove("no-scroll");
    if (location.hash.indexOf("#project-") === 0) {
      history.replaceState(null, "", location.pathname + location.search + "#projects");
    }
    if (lastFocus) lastFocus.focus();
  }

  function onHash() {
    var h = location.hash;
    if (h.indexOf("#project-") === 0) openProject(h.slice("#project-".length));
    else closeProject();
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.closest(".modal-close")) closeProject();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeProject();
    });
  }

  if (grid) {
    renderFilters();
    renderGrid();
    window.addEventListener("hashchange", onHash);
    onHash();
  }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
