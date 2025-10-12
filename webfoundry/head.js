(async () => {
let promises = [];
(() => {
        let link = document.createElement('link');
        link.className = 'wf-nf-link';
        link.rel = 'stylesheet';
        link.href = 'https://www.nerdfonts.com/assets/css/webfont.css';
        let plink = Promise.withResolvers();
        link.onload = () => plink.resolve('nf');
        link.onerror = err => plink.reject(err);
        promises.push(plink.promise);
        document.head.append(link);
      })(...[]);
let prefix = location.pathname.startsWith('/files/') ? '../' : '';
let mf = false;
(() => {
        let script = document.createElement('script');
        script.className = 'wf-tw-script';
        script.src = `${prefix}webfoundry/tailplay4.dafuq.js`;
        let pscript = Promise.withResolvers();
        script.onload = () => {
          if (mf) {
            let config = document.createElement('script');
            config.className = 'wf-tw-setup';
            config.textContent = `tailwind.config = { prefix: '.tw' };`;
            document.head.append(config);
          }
          pscript.resolve('tw');
        };
        script.onerror = err => pscript.reject(err);
        document.head.append(script);
        promises.push(pscript.promise);
      })(...[]);
(() => {
      let preflight = document.createElement('style');
      preflight.className = 'wf-preflight';
      preflight.textContent = `[hidden] { display: none !important }
body { display: flow-root }
dialog { margin: auto }`;
      prefix === '../' &&
        (preflight.textContent += `\n:not(.navbar-burger) > :empty { min-height: 1rem }
.wf.component-pattern {
  background-color: #06c;
  background-image: linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255,255,255,0.2) 2px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;
}`);
      let ppreflight = Promise.withResolvers();
      preflight.onload = () => ppreflight.resolve('preflight');
      preflight.onerror = err => ppreflight.reject(err);
      promises.push(ppreflight.promise);
      document.head.append(preflight);
    })(...[]);
await Promise.all(promises);
let div = document.createElement('div'); document.body.append(div); div.remove();
document.body.style.display = 'flow-root';
})();