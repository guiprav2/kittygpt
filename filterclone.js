function filterclone(root, filter) {
  let croot = filter(root.cloneNode(false), root);
  if (!croot) return null;
  let stack = [{ original: root, clone: croot }];
  while (stack.length > 0) {
    let { original, clone } = stack.pop();
    for (let child = original.firstChild; child; child = child.nextSibling) {
      let cchild;
      if (child.nodeType === Node.ELEMENT_NODE) cchild = child.cloneNode(false);
      else cchild = child.cloneNode(true);
      cchild = filter(cchild, child);
      cchild && clone.appendChild(cchild);
      if (cchild && child.nodeType === Node.ELEMENT_NODE) {
        stack.push({ original: child, clone: cchild });
      }
    }
  }
  return croot;
}

export default filterclone;
