import { Fragment, type ReactNode } from "react";
import katex from "katex";

type MathSegment =
  | { kind: "text"; value: string }
  | { kind: "math"; value: string; display: boolean };

/**
 * Matches display math ($$...$$, \[...\]) or inline math (\(...\), $...$).
 * Inline dollar math disallows leading/trailing whitespace and trailing digits
 * so ordinary currency mentions (e.g. "$50 and $100") stay plain text.
 */
const MATH_TOKEN_REGEX =
  /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\((.+?)\\\)|(?<!\\)\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/g;

/**
 * Matches inline bold (**...**) and italic (*...*) outside math segments.
 */
const STYLE_TOKEN_REGEX =
  /\*\*([^*\n]+?)\*\*|(?<!\\)\*(?!\s)([^*\n]+?)(?<!\s)\*/g;

function isCurrencyFalsePositive(expr: string): boolean {
  return (
    /^\d/.test(expr) &&
    /\s+[a-zA-Z]{2,}/.test(expr) &&
    !/[\\^_{}=<>±×÷·]/u.test(expr)
  );
}

export function splitMathSegments(input: string): MathSegment[] {
  const segments: MathSegment[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(MATH_TOKEN_REGEX)) {
    const start = match.index ?? 0;
    const full = match[0];
    const displayExpr = match[1] ?? match[2];
    const inlineParenExpr = match[3];
    const inlineDollarExpr = match[4];

    if (
      inlineDollarExpr !== undefined &&
      isCurrencyFalsePositive(inlineDollarExpr)
    ) {
      continue;
    }

    if (start > lastIndex) {
      segments.push({ kind: "text", value: input.slice(lastIndex, start) });
    }

    const expr = displayExpr ?? inlineParenExpr ?? inlineDollarExpr ?? "";
    segments.push({
      kind: "math",
      value: expr.trim(),
      display: displayExpr !== undefined,
    });
    lastIndex = start + full.length;
  }

  if (lastIndex < input.length) {
    segments.push({ kind: "text", value: input.slice(lastIndex) });
  }

  return segments;
}

function renderLatexToHtml(expr: string, displayMode: boolean): string {
  return katex.renderToString(expr, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
    output: "htmlAndMathml",
  });
}

function renderStyledTextNodes(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIdx = 0;

  for (const match of text.matchAll(STYLE_TOKEN_REGEX)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const boldText = match[1];
    const italicText = match[2];
    if (boldText !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${tokenIdx}`} className="font-extrabold">
          {boldText}
        </strong>,
      );
    } else if (italicText !== undefined) {
      nodes.push(
        <em key={`${keyPrefix}-i-${tokenIdx}`} className="italic">
          {italicText}
        </em>,
      );
    }

    lastIndex = start + match[0].length;
    tokenIdx += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Renders question, option, and explanation strings with KaTeX math/chemistry
 * notation ($...$, $$...$$) and inline emphasis (**bold**, *italic*).
 */
export function RichFormattedText({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  const segments = splitMathSegments(text);

  return (
    <Tag
      className={`whitespace-pre-line break-words [overflow-wrap:anywhere] ${className}`.trim()}
    >
      {segments.map((seg, idx) => {
        if (seg.kind === "text") {
          return (
            <Fragment key={`txt-${idx}`}>
              {renderStyledTextNodes(seg.value, `seg-${idx}`)}
            </Fragment>
          );
        }

        const html = renderLatexToHtml(seg.value, seg.display);
        if (seg.display) {
          return (
            <span
              key={`math-${idx}`}
              className="my-2 block overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={`math-${idx}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </Tag>
  );
}
