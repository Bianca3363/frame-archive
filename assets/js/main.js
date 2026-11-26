(() => {
  const translations = {
    en: {
      navProfile:"PROFILE",navPortfolio:"PORTFOLIO",heroKicker:"A PERSONAL MOVING IMAGE ARCHIVE",heroTitle:"Some moments<br>stay <em>in motion.</em>",heroIntro:"A collection of places, people and passing moments — captured, cut and kept.",explore:"EXPLORE THE ARCHIVE",selected:"SELECTED WORKS / 001—",portfolioTitle:"Portfolio",filterAll:"ALL",filterVideo:"VIDEO",filterImage:"IMAGE",filterArticle:"ARTICLE",empty:"No projects in this category yet.",interludeEyebrow:"A NOTE ON TIME",interludeText:"“The camera remembers<br>what the moment <em>cannot hold.</em>”",aboutEyebrow:"BEHIND THE FRAMES",aboutTitle:"An ongoing study<br>of <em>seeing.</em>",aboutText:"This is a personal space for the videos I make and the moments I want to keep. Each piece is a small record of a place, a feeling or a passing thought.",contact:"GET IN TOUCH",footerNote:"AN INDEPENDENT VIDEO COLLECTION",backTop:"BACK TO TOP ↑",projects:"PROJECTS",close:"CLOSE ×",missing:"Video coming soon — add an embed link in assets/js/projects.js."
    },
    zh: {
      navProfile:"个人主页",navPortfolio:"作品集",heroKicker:"个人影像档案",heroTitle:"有些瞬间，<br>始终在<em>流动。</em>",heroIntro:"关于地点、人物与转瞬即逝的时刻——记录、剪辑，并珍藏。",explore:"探索影像档案",selected:"精选作品 / 001—",portfolioTitle:"作品集",filterAll:"全部",filterVideo:"视频",filterImage:"图片",filterArticle:"文章",empty:"这个分类暂时还没有作品。",interludeEyebrow:"关于时间",interludeText:"“镜头记住了<br>那些<em>瞬间留不住的事。</em>”",aboutEyebrow:"关于影像",aboutTitle:"一场关于<em>观看</em><br>的持续练习。",aboutText:"这里收藏我制作的视频，以及那些想要留住的瞬间。每一段影像，都是关于一个地方、一种感受或一个转瞬即逝的念头。",contact:"联系我",footerNote:"独立个人影像集",backTop:"返回顶部 ↑",projects:"个作品",close:"关闭 ×",missing:"视频即将上线——请在 assets/js/projects.js 中添加视频嵌入链接。"
    }
  };
  let lang = "en";
  let filter = "all";
  const grid = document.getElementById("projectGrid");
  const dialog = document.getElementById("videoDialog");
  const frame = document.getElementById("videoFrame");
  const t = key => translations[lang][key] || key;
  const safe = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function renderText(){
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.getElementById("languageToggle").textContent = lang === "en" ? "中 / EN" : "中 / EN";
    document.getElementById("closeDialog").textContent = t("close");
    renderProjects();
  }
  function renderProjects(){
    const projects = (window.PROJECTS || []).filter(p => filter === "all" || p.category === filter);
    grid.innerHTML = projects.map(p => {
      const title = lang === "zh" ? p.titleZh : p.title;
      const subtitle = lang === "zh" ? p.subtitleZh : p.subtitle;
      return `<article class="project-card" data-id="${safe(p.id)}" tabindex="0" role="button" aria-label="${safe(title)}">
        <div class="project-image"><img src="${safe(p.cover)}" alt="${safe(title)}" loading="lazy"><span class="image-index">${safe(p.id)} / FRAME</span><span class="play-mark" aria-hidden="true">▶</span></div>
        <div class="project-meta"><div><h3 class="project-title">${safe(title)}</h3><p class="project-subtitle">${safe(subtitle)}</p></div><span class="project-type">${safe(p.category.toUpperCase())}</span></div>
      </article>`;
    }).join("");
    document.getElementById("emptyNote").hidden = projects.length !== 0;
    document.getElementById("workCount").textContent = String(projects.length).padStart(2,"0") + " " + t("projects");
    grid.querySelectorAll(".project-card").forEach(card => {
      const open = () => openProject(card.dataset.id);
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){e.preventDefault();open();} });
    });
  }
  function openProject(id){
    const p = (window.PROJECTS || []).find(item => item.id === id);
    if(!p) return;
    document.getElementById("dialogTitle").textContent = lang === "zh" ? p.titleZh : p.title;
    document.getElementById("dialogDescription").textContent = lang === "zh" ? p.descriptionZh : p.description;
    frame.innerHTML = "";
    if(p.video){
      const videoUrl = p.video.trim();
      if(/\.mp4($|\?)/i.test(videoUrl)){
        const video = document.createElement("video"); video.src = videoUrl; video.controls = true; video.autoplay = true; video.playsInline = true; frame.appendChild(video); video.style.width="100%";video.style.height="100%";
      } else {
        const iframe = document.createElement("iframe"); iframe.src = videoUrl; iframe.title = p.title; iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; iframe.allowFullscreen = true; frame.appendChild(iframe);
      }
    } else {
      const note = document.createElement("div"); note.className = "no-video"; note.textContent = t("missing"); frame.appendChild(note);
    }
    dialog.showModal();
  }
  document.getElementById("languageToggle").addEventListener("click", () => { lang = lang === "en" ? "zh" : "en"; renderText(); });
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
    renderProjects();
  }));
  function closeDialog(){ dialog.close(); frame.innerHTML = ""; }
  document.getElementById("closeDialog").addEventListener("click", closeDialog);
  dialog.addEventListener("click", e => { if(e.target === dialog) closeDialog(); });
  renderText();
})();