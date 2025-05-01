function filterclone(root, filter, iframes) {
  let croot = filter(root.cloneNode(false), root);
  if (!croot) return null;

  let stack = [{ original: root, clone: croot }];

  while (stack.length > 0) {
    let { original, clone } = stack.pop();

    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;

      if (child.nodeType === Node.ELEMENT_NODE) {
        cchild = child.cloneNode(false);
      } else {
        cchild = child.cloneNode(true);
      }

      cchild = filter(cchild, child);
      if (cchild) {
        clone.appendChild(cchild);

        if (child.nodeType === Node.ELEMENT_NODE) {
          if (
            iframes &&
            child.tagName === 'IFRAME' &&
            child.src &&
            child.src.startsWith(location.origin) &&
            child.contentDocument
          ) {
            try {
              let iframeDoc = child.contentDocument;
              let clonedIframeDoc = filterclone(iframeDoc, filter, true);
              if (clonedIframeDoc) {
                // Clone the body of the iframe into the iframe element
                for (let iframeChild of clonedIframeDoc.childNodes) {
                  cchild.appendChild(iframeChild.cloneNode(true));
                }
              }
            } catch (e) {
              // Ignore cross-origin iframes or access errors
              console.warn('Could not access iframe content:', e);
            }
          } else {
            stack.push({ original: child, clone: cchild });
          }
        }
      }
    }
  }

  return croot;
}

export default filterclone;
