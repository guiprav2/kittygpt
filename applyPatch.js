import path, { dirname } from "path";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { mkdirSync } from "fs";

export default function applyPatch(
  patchText,
  baseDir = ".",
  { strict = true } = {}
) {
  let lines = patchText.split(/\r?\n/);
  let i = 0;

  let pushback = null;
  const nextLine = () => {
    if (pushback !== null) {
      let x = pushback;
      pushback = null;
      return x;
    }
    return lines[i++] ?? null;
  };
  const unread = (x) => (pushback = x);

  while (i < lines.length) {
    let line = nextLine();
    if (line !== "*** Begin Patch") continue;

    let header = nextLine();
    if (!header) throw new Error("Malformed patch: missing file header");

    //
    // UPDATE FILE
    //
    let m = /^\*\*\* Update File: (.+)$/.exec(header);
    if (m) {
      let filename = m[1].trim();
      let fullPath = path.join(baseDir, filename);

      // Read existing or treat as empty file
      let original = existsSync(fullPath)
        ? readFileSync(fullPath, "utf8")
        : "";

      let patched = applyFilePatch(
        filename,
        original,
        nextLine,
        unread,
        strict
      );

      ensureWrite(fullPath, patched);

      let end = nextLine();
      if (end !== "*** End Patch")
        throw new Error("Malformed patch: missing End Patch");

      continue;
    }

    //
    // DELETE FILE
    //
    m = /^\*\*\* Delete File: (.+)$/.exec(header);
    if (m) {
      let filename = m[1].trim();
      let fullPath = path.join(baseDir, filename);

      if (existsSync(fullPath)) unlinkSync(fullPath);

      let end = nextLine();
      if (end !== "*** End Patch")
        throw new Error("Malformed patch: missing End Patch");

      continue;
    }

    throw new Error("Unknown patch header: " + header);
  }

  return true;

  // ------------------------------
  // Helpers
  // ------------------------------

  function ensureWrite(p, data) {
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, data, "utf8");
  }

  function applyFilePatch(filename, original, nextLine, unread, strict) {
    let out = original.split(/\r?\n/);

    while (true) {
      let line = nextLine();
      if (line == null || line === "*** End Patch") {
        if (line === "*** End Patch") unread(line);
        break;
      }

      if (line.trim() !== "@@") continue; // ChatGPT hunk header

      //
      // Collect hunk lines
      //
      let hunk = [];
      while (true) {
        let l = nextLine();
        if (l == null || l.trim() === "@@" || l === "*** End Patch") {
          unread(l);
          break;
        }
        hunk.push(l);
      }

      //
      // Find anchor
      //
      let anchor = findHunkAnchor(out, hunk, strict);
      if (anchor < 0)
        throw new Error(`Unable to anchor hunk in ${filename}`);

      //
      // Apply operations at anchor
      //
      let pos = anchor;
      for (let l of hunk) {
        if (l.startsWith(" ")) {
          pos++;
        } else if (l.startsWith("-")) {
          out.splice(pos, 1);
        } else if (l.startsWith("+")) {
          out.splice(pos, 0, l.slice(1));
          pos++;
        } else {
          throw new Error(`Invalid hunk line in ${filename}: ${l}`);
        }
      }
    }

    return out.join("\n");
  }

  function findHunkAnchor(lines, hunk, strict) {
    // find first stable line (context or removal)
    let key = null;
    for (let l of hunk) {
      if (l.startsWith(" ") || l.startsWith("-")) {
        key = l.slice(1);
        break;
      }
    }

    // If hunk has only additions
    if (key == null) return lines.length;

    // Find all candidate lines
    let candidates = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === key) candidates.push(i);
    }

    if (candidates.length === 0) {
      if (strict) throw new Error(`Anchor not found for: "${key}"`);
      return lines.length; // fuzzy mode: append at end
    }

    // Simple: choose first (same strategy as patch -F0)
    return candidates[0];
  }
}
