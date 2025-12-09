(async () => {
  {
    let script = document.createElement('script');
    script.className = 'wf-gfont-script';
    script.textContent = `let observer = new MutationObserver(muts => {
  let gfonts = [];
  for (let mut of muts) {
    if (mut.type === 'childList') {
      for (let x of mut.addedNodes) {
        if (x.nodeType !== 1) continue;
        for (let y of [x, ...x.querySelectorAll('*')]) {
          gfonts.push(...[...y.classList].filter(x => x.match(/^gfont-\\[.+?\\]$/)).map((x) => x.slice('gfont-['.length, -1)));
        }
      }
    } else if (mut.type === 'attributes') {
      gfonts.push(...[...mut.target.classList].filter((x) => x.match(/^gfont-\\[.+?\\]$/)).map(x => x.slice('gfont-['.length, -1)));
    }
  }
  for (let x of gfonts) {
    let id = \`gfont-[\${x}]\`;
    let style = document.getElementById(id);
    if (style) continue;
    style = document.createElement('style');
    style.id = id;
    style.textContent = \`@import url('https://fonts.googleapis.com/css2?family=\${x.replace(/_/g, '+')}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.gfont-\\\\[\${x}\\\\] { font-family: "\${x.replace(/_/g, ' ')}" }
\`;
    document.head.append(style);
  }
});
observer.observe(document, { attributes: true, childList: true, subtree: true });
`;
    document.head.append(script);
  }
  let cfg = (await import('../wf.config.js')).default;
  let promises = [];
  let prefix = location.pathname.startsWith('/files/') ? '../' : '';
  if (cfg.nerdfonts) {
    let link = document.createElement('link');
    link.className = 'wf-nf-link';
    link.rel = 'stylesheet';
    link.href = 'https://www.nerdfonts.com/assets/css/webfont.css';
    let plink = Promise.withResolvers();
    link.onload = () => plink.resolve('nf');
    link.onerror = err => plink.reject(err);
    promises.push(plink.promise);
    document.head.append(link);
  }
  if (cfg.tailwind) {
    let script = document.createElement('script');
    script.className = 'wf-tw-script';
    script.src = `${prefix}webfoundry/tailplay4.dafuq.js`;
    let pscript = Promise.withResolvers();
    script.onload = () => pscript.resolve('tw');
    script.onerror = err => pscript.reject(err);
    document.head.append(script);
    promises.push(pscript.promise);
  }
  if (cfg.betterscroll) {
    let style = document.createElement('style');
    style.className = 'wf-betterscroll-style';
    style.textContent = `::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #b0b0b0;
}
::-webkit-scrollbar-thumb:horizontal {
  background-clip: padding-box;
}
::-webkit-scrollbar-thumb:vertical {
  background-clip: padding-box;
}
`;
    document.head.append(style);
  }
  {
    let preflight = document.createElement('style');
    preflight.className = 'wf-preflight';
    preflight.textContent = `[hidden] { display: none !important } dialog { margin: auto } :empty { min-height: 1rem }`;
    let ppreflight = Promise.withResolvers();
    preflight.onload = () => ppreflight.resolve('preflight');
    preflight.onerror = err => ppreflight.reject(err);
    promises.push(ppreflight.promise);
    document.head.append(preflight);
  }
  await Promise.all(promises);
  let div = document.createElement('div'); document.body.append(div); div.remove();
  document.body.style.display = '';
})();
