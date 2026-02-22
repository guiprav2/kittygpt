import * as path from "path";
import { existsSync, readFileSync, unlinkSync, writeFileSync, mkdirSync } from "fs";

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
    // ADD FILE
    //
    m = /^\*\*\* Add File: (.+)$/.exec(header);
    if (m) {
      let filename = m[1].trim();
      let fullPath = path.join(baseDir, filename);

      if (existsSync(fullPath)) {
        if (strict) {
          throw new Error(`File already exists: ${filename}`);
        }
      }

      let content = [];

      while (true) {
        let l = nextLine();
        if (l == null)
          throw new Error("Malformed patch: missing End Patch");

        if (l === "*** End Patch") break;

        if (l.startsWith("+")) {
          content.push(l.slice(1));
        } else if (l.startsWith(" ")) {
          // Allow context lines (rare but safe)
          content.push(l.slice(1));
        } else if (l.startsWith("-")) {
          throw new Error(
            `Invalid removal in Add File for ${filename}: ${l}`
          );
        } else {
          throw new Error(
            `Invalid line in Add File for ${filename}: ${l}`
          );
        }
      }

      ensureWrite(fullPath, content.join("\n"));
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
    mkdirSync(path.dirname(p), { recursive: true });
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

      if (line.trim() !== "@@") continue;

      let hunk = [];
      while (true) {
        let l = nextLine();
        if (l == null || l.trim() === "@@" || l === "*** End Patch") {
          unread(l);
          break;
        }
        hunk.push(l);
      }

      let anchor = findHunkAnchor(out, hunk, strict);
      if (anchor < 0)
        throw new Error(`Unable to anchor hunk in ${filename}`);

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
    let key = null;
    for (let l of hunk) {
      if (l.startsWith(" ") || l.startsWith("-")) {
        key = l.slice(1);
        break;
      }
    }

    if (key == null) return lines.length;

    let candidates = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === key) candidates.push(i);
    }

    if (candidates.length === 0) {
      if (strict) throw new Error(`Anchor not found for: "${key}"`);
      return lines.length;
    }

    return candidates[0];
  }
}
