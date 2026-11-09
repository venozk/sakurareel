(() => {
  const E = window.EPISODES, S = window.SITE, app = document.getElementById("app");
  const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const grad = e => `--a:${esc(e.c[0])};--b:${esc(e.c[1])}`;
  const card = e => `<a class="card" href="#/watch/${esc(e.id)}" style="${grad(e)}">
    ${e.thumb ? `<img src="${esc(e.thumb)}" alt="" loading="lazy">` : `<div class="art"></div>`}
    <div class="meta"><strong>${esc(e.series)}</strong><span>Episode ${e.ep}: ${esc(e.title)}</span></div></a>`;

  function home() {
    const f = E[0];
    app.innerHTML = `<section class="hero" style="${grad(f)}">
      <h1>${esc(f.series)}</h1><p>${esc(f.desc)}</p>
      <a class="btn" href="#/watch/${esc(f.id)}">Watch episode ${f.ep}</a></section>
      <h2>Latest episodes</h2><div class="grid">${E.map(card).join("")}</div>`;
  }

  function browse() {
    app.innerHTML = `<input type="search" id="q" placeholder="Search series or episodes" aria-label="Search"><div class="grid" id="list" style="margin-top:24px"></div>`;
    const list = document.getElementById("list"), q = document.getElementById("q");
    const draw = () => {
      const t = q.value.toLowerCase();
      const r = E.filter(e => (e.series + " " + e.title).toLowerCase().includes(t));
      list.innerHTML = r.length ? r.map(card).join("") : `<p class="empty">No matches. Try another title.</p>`;
    };
    q.oninput = draw; draw();
  }

  function watch(id) {
    const e = E.find(x => x.id === id);
    if (!e) { app.innerHTML = `<p class="empty">Episode not found. <a href="#/browse">Browse all episodes</a></p>`; return; }
    document.title = `${e.series} Episode ${e.ep}: SakuraReel`;
    const player = e.youtube
      ? `<iframe class="player" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(e.youtube)}" title="${esc(e.title)}" allowfullscreen loading="lazy"></iframe>`
      : e.video
      ? `<video class="player" controls preload="metadata" src="${esc(e.video)}"></video>`
      : `<div class="player">This episode isn't uploaded yet. Add a youtube ID or video URL in data.js.</div>`;
    const more = E.filter(x => x.series === e.series && x.id !== e.id);
    app.innerHTML = `<div class="watch"><div>${player}
      <h1 style="margin-top:20px;font-size:1.8rem">${esc(e.series)}, Episode ${e.ep}: ${esc(e.title)}</h1>
      <p style="margin:8px 0"><span class="badge">Made with AI</span></p><p>${esc(e.desc)}</p>
      <div class="actions">
        ${e.download ? `<a class="btn" href="${esc(e.download)}" target="_blank" rel="noopener">Download episode</a>` : ""}</div></div>
      <aside class="side"><h2 style="margin:0">${more.length ? "More from this series" : "Keep watching"}</h2>
      ${(more.length ? more : E.filter(x => x.id !== e.id)).slice(0, 4).map(card).join("")}</aside></div>`;
  }

  function route() {
    const [, page, id] = location.hash.split("/");
    document.title = "SakuraReel: original anime made with AI";
    if (page === "watch") watch(id); else if (page === "browse") browse(); else home();
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", route); route();
})();
