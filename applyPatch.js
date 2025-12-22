import { dirname } from "path";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { mkdirSync } from "fs";

export default function applyPatch(patchText, baseDir = ".", { strict = true } = {}) {
  let lines = patchText.split(/\r?\n/);
  let i = 0;

  let pushback = null;
  function nextLine() {
    if (pushback !== null) {
      const x = pushback;
      pushback = null;
      return x;
    }
    return lines[i++] ?? null;
  }
  function unread(x) { pushback = x; }

  while (i < lines.length) {
    let line = nextLine();
    if (line === "*** Begin Patch") {
      let header = nextLine();

      //
      // FILE UPDATE
      //
      let m = /^\*\*\* Update File: (.+)$/.exec(header);
      if (m) {
        let filename = m[1].trim();
        let fullPath = `${baseDir}/${filename}`;

        let original = existsSync(fullPath)
          ? readFileSync(fullPath, "utf8")
          : "";

        let newText = applyFilePatch(filename, original, nextLine, unread, strict);

        writeFileSyncEnsure(fullPath, newText, "utf8");

        let end = nextLine();
        if (end !== "*** End Patch")
          throw new Error("Malformed patch: missing End Patch");

        continue;
      }

      //
      // FILE DELETION
      //
      m = /^\*\*\* Delete File: (.+)$/.exec(header);
      if (m) {
        let filename = m[1].trim();
        let fullPath = `${baseDir}/${filename}`;

        if (existsSync(fullPath)) unlinkSync(fullPath);

        let end = nextLine();
        if (end !== "*** End Patch")
          throw new Error("Malformed patch: missing End Patch");

        continue;
      }

      throw new Error("Malformed patch: unknown header: " + header);
    }
  }
}

function applyFilePatch(filename, original, nextLine, unread, strict) {
  let out = original.split(/\r?\n/);

  while (true) {
    let line = nextLine();
    if (line == null || line === "*** End Patch") {
      if (line === "*** End Patch") unread(line);
      break;
    }

    // ChatGPT-style hunk header: "@@"
    if (line.trim() !== "@@") continue;

    let oldPos = 0;
    let newPos = 0;

    while (true) {
      let l = nextLine();
      if (l == null || l.trim() === "@@" || l === "*** End Patch") {
        unread(l);
        break;
      }

      //
      //  CONTEXT LINE
      //
      if (l.startsWith(" ")) {
        let expect = l.slice(1);
        if (strict) {
          if (out[oldPos] !== expect)
            throw mismatch("context", filename, expect, out[oldPos]);
        }
        oldPos++;
        newPos++;
      }

      //
      //  REMOVE LINE
      //
      else if (l.startsWith("-")) {
        let expect = l.slice(1);
        if (strict) {
          if (out[oldPos] !== expect)
            throw mismatch("remove", filename, expect, out[oldPos]);
        }
        out.splice(oldPos, 1);
      }

      //
      //  ADD LINE
      //
      else if (l.startsWith("+")) {
        out.splice(newPos, 0, l.slice(1));
        newPos++;
      }

      else {
        throw new Error(`Invalid hunk line in ${filename}: ${l}`);
      }
    }
  }

  return out.join("\n");
}

function mismatch(type, filename, expect, found) {
  return new Error(
    `${type} mismatch in ${filename}\n` +
    `Expected: "${expect}"\n` +
    `Found:    "${found}"`
  );
}

function writeFileSyncEnsure(path, data) {
  let dir = dirname(path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path, data);
}
