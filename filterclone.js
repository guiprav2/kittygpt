function filterclone(root, filter, iframes) {
  let croot = filter(root.cloneNode(false), root);
  if (!croot) return null;

  let stack = [{ original: root, clone: croot }];

  while (stack.length > 0) {
    let { original, clone } = stack.pop();

    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;

      if (
        iframes &&
        child.nodeType === Node.ELEMENT_NODE &&
        child.tagName === 'IFRAME' &&
        child.src &&
        child.src.startsWith(location.origin) &&
        child.contentDocument &&
        child.contentDocument.documentElement
      ) {
        try {
          let div = document.createElement('div');
          div.setAttribute('data-originaltag', 'iframe');
          cchild = filter(div, child);
          if (cchild) {
            clone.appendChild(cchild);
            let iframeBody = child.contentDocument.body;
            let clonedBody = filterclone(iframeBody, filter, true);
            if (clonedBody) {
              for (let iframeChild of clonedBody.childNodes) {
                cchild.appendChild(iframeChild.cloneNode(true));
              }
            }
          }
          continue;
        } catch (e) {
          console.warn('Could not access iframe content:', e);
          cchild = filter(child.cloneNode(false), child);
        }
      } else {
        if (child.nodeType === Node.ELEMENT_NODE) {
          cchild = child.cloneNode(false);
        } else {
          cchild = child.cloneNode(true);
        }
        cchild = filter(cchild, child);
      }

      if (cchild) {
        clone.appendChild(cchild);
        if (child.nodeType === Node.ELEMENT_NODE) {
          stack.push({ original: child, clone: cchild });
        }
      }
    }
  }

  return croot;
}

export default filterclone;
