function filtercloneFrame(iframe, filter, iframes, nothrow = true) {
  try {
    const iframeSrc = iframe.getAttribute('src');
    const iframeOrigin = iframeSrc
      ? new URL(iframeSrc, document.baseURI).origin
      : null;

    if (
      iframeOrigin === location.origin &&
      iframe.contentDocument &&
      iframe.contentDocument.documentElement
    ) {
      const div = document.createElement('div');
      div.setAttribute('data-originaltag', 'iframe');
      if (iframeSrc) div.setAttribute('data-src', iframeSrc);

      const wrapper = filter(div, iframe);
      if (!wrapper) return null;

      const iframeBody = iframe.contentDocument.body;
      const clonedBody = filterclone(iframeBody, filter, true, nothrow);
      if (clonedBody) {
        for (let child of clonedBody.childNodes) {
          wrapper.appendChild(child.cloneNode(true));
        }
      }
      return wrapper;
    }
  } catch (e) {
    if (!nothrow) throw e;
    console.warn('Error handling iframe:', e);
  }
  return null;
}

export default function filterclone(root, filter, iframes, nothrow = true) {
  if (
    iframes &&
    root.nodeType === Node.ELEMENT_NODE &&
    root.tagName === 'IFRAME'
  ) {
    const iframeClone = filtercloneFrame(root, filter, iframes, nothrow);
    if (iframeClone) return iframeClone;
    return null;
  }
  let croot;
  try {
    croot = filter(root.cloneNode(false), root);
  } catch (err) {
    if (!nothrow) throw err;
    console.warn('Error filtering root:', err);
    return null;
  }
  if (!croot) return null;
  const stack = [{ original: root, clone: croot }];
  while (stack.length > 0) {
    const { original, clone } = stack.pop();
    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;
      if (
        iframes &&
        child.nodeType === Node.ELEMENT_NODE &&
        child.tagName === 'IFRAME'
      ) {
        cchild = filtercloneFrame(child, filter, iframes, nothrow);
        if (cchild) {
          clone.appendChild(cchild);
        }
        continue;
      }
      try {
        if (child.nodeType === Node.ELEMENT_NODE) {
          cchild = child.cloneNode(false);
        } else {
          cchild = child.cloneNode(true);
        }
        cchild = filter(cchild, child);
      } catch (err) {
        if (!nothrow) throw err;
        console.warn('Error cloning child:', err);
        continue;
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
