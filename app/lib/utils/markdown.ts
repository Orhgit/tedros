// Minimal Markdown renderer for vetted internal content (rights seed bodies,
// future ADR snippets). Supports the subset we author: h2, h3, paragraphs,
// unordered lists, ordered lists, **bold**, *italic*, `code`, links, and
// blank-line block separators. No HTML in source, no nested lists.
//
// This avoids pulling in a 30KB+ markdown lib for ~200 lines of seed body.
// User-provided content must NOT be rendered through this without revisiting
// the XSS posture — the seed is our own.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(line: string): string {
  // Order matters: links first (they contain brackets that ** would otherwise
  // glomp), then bold, italic, code.
  let s = escapeHtml(line);
  // Inline code with backticks. Matches non-greedy.
  s = s.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-earth-100 px-1 py-0.5 text-[0.95em]">$1</code>',
  );
  // Markdown links [text](url). The renderer escapes both halves.
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text: string, url: string) => {
    const safeUrl = url.replace(/"/g, "%22");
    return `<a href="${safeUrl}" class="text-earth-700 underline hover:text-earth-900" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  // **bold** (must run before *italic* to avoid the closing * matching the
  // bold pair).
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // *italic*
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

export function renderMarkdown(source: string): string {
  const lines = source.split(/\r?\n/);
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    // Skip blank lines between blocks.
    if (trimmed === "") {
      i += 1;
      continue;
    }

    // ## heading
    if (trimmed.startsWith("## ")) {
      blocks.push(
        `<h2 class="font-display mt-8 mb-3 text-2xl font-semibold text-earth-900">${renderInline(trimmed.slice(3))}</h2>`,
      );
      i += 1;
      continue;
    }

    // ### heading
    if (trimmed.startsWith("### ")) {
      blocks.push(
        `<h3 class="font-display mt-6 mb-2 text-xl font-semibold text-earth-900">${renderInline(trimmed.slice(4))}</h3>`,
      );
      i += 1;
      continue;
    }

    // Unordered list — consecutive lines starting with "- ".
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("- ")) {
        items.push(
          `<li class="my-1.5">${renderInline((lines[i] ?? "").trim().slice(2))}</li>`,
        );
        i += 1;
      }
      blocks.push(`<ul class="my-3 list-disc ps-6">${items.join("")}</ul>`);
      continue;
    }

    // GFM table — a `| … |` row followed by a `|---|` separator. Heritage
    // event bodies shipped tables that rendered as one raw text line before
    // this existed (TED-125).
    if (trimmed.startsWith("|") && /^\|?[\s:|-]+\|?$/.test((lines[i + 1] ?? "").trim())) {
      const splitRow = (row: string): string[] =>
        row
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());

      const headers = splitRow(trimmed);
      i += 2; // skip header + separator rows
      const rows: string[][] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("|")) {
        rows.push(splitRow((lines[i] ?? "").trim()));
        i += 1;
      }
      const thead = `<thead><tr>${headers
        .map(
          (h) =>
            `<th class="border-b border-earth-200 px-3 py-2 text-start font-semibold">${renderInline(h)}</th>`,
        )
        .join("")}</tr></thead>`;
      const tbody = `<tbody>${rows
        .map(
          (r) =>
            `<tr>${r
              .map(
                (c) => `<td class="border-b border-earth-100 px-3 py-2">${renderInline(c)}</td>`,
              )
              .join("")}</tr>`,
        )
        .join("")}</tbody>`;
      blocks.push(
        `<div class="my-4 overflow-x-auto"><table class="w-full min-w-max border-collapse text-sm">${thead}${tbody}</table></div>`,
      );
      continue;
    }

    // Ordered list — consecutive lines starting with "<digit>. " or
    // "<digit>+. " etc.
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test((lines[i] ?? "").trim())) {
        const content = (lines[i] ?? "").trim().replace(/^\d+\.\s/, "");
        items.push(`<li class="my-1.5">${renderInline(content)}</li>`);
        i += 1;
      }
      blocks.push(`<ol class="my-3 list-decimal ps-6">${items.join("")}</ol>`);
      continue;
    }

    // Paragraph — collect consecutive non-blank, non-block-marker lines.
    const para: string[] = [];
    while (i < lines.length) {
      const t = (lines[i] ?? "").trim();
      if (
        t === "" ||
        t.startsWith("## ") ||
        t.startsWith("### ") ||
        t.startsWith("- ") ||
        t.startsWith("|") ||
        /^\d+\.\s/.test(t)
      ) {
        break;
      }
      para.push(t);
      i += 1;
    }
    blocks.push(`<p class="my-3 leading-relaxed">${renderInline(para.join(" "))}</p>`);
  }

  return blocks.join("\n");
}
