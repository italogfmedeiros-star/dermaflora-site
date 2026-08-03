// Divide o HTML do post em duas metades para encaixar o CTA do WhatsApp no
// meio do artigo.
//
// A versão anterior casava blocos com uma regex (`<(p|h2|...)>.*?</\1>`), o que
// causava dois defeitos: o quantificador preguiçoso parava no primeiro
// fechamento e truncava listas aninhadas, e tudo que não casasse com a regex
// — imagem, linha divisória, bloco de código — sumia do artigo publicado,
// porque a saída era apenas a junção dos trechos casados.
//
// Aqui o HTML é percorrido em nível superior respeitando profundidade, e todo
// segmento é preservado. Só alguns tipos contam para achar o meio; os demais
// seguem no lugar em que estavam.

/** Blocos que contam para calcular o meio do artigo. */
const COUNTED_TAGS = new Set(["p", "h2", "h3", "ul", "ol", "blockquote"]);

/** Elementos sem fechamento: consomem apenas a própria tag. */
const VOID_TAGS = new Set([
  "img",
  "hr",
  "br",
  "input",
  "source",
  "track",
  "wbr",
]);

/**
 * Abaixo disso o artigo é curto demais para comportar um CTA no meio e o texto
 * segue inteiro. `src/components/admin/cta-marker.ts` importa esta constante
 * para que o marcador do editor e a divisão real nunca discordem.
 */
export const MIN_BLOCKS_FOR_SPLIT = 4;

type Segment = { html: string; counts: boolean };

type TagToken = {
  name: string;
  closing: boolean;
  selfClosing: boolean;
  start: number;
  end: number;
};

/**
 * Fim da tag iniciada em `from`, ignorando `>` dentro de valores de atributo —
 * `alt="a > b"` é HTML válido e quebraria uma busca ingênua pelo caractere.
 */
function findTagEnd(html: string, from: number) {
  let quote: string | null = null;

  for (let i = from; i < html.length; i += 1) {
    const char = html[i];

    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === ">") {
      return i + 1;
    }
  }

  return html.length;
}

const TAG_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9-]*/;

function nextTag(html: string, from: number): TagToken | null {
  let cursor = from;

  while (cursor < html.length) {
    const start = html.indexOf("<", cursor);
    if (start === -1) return null;

    if (html.startsWith("<!--", start)) {
      const commentEnd = html.indexOf("-->", start);
      cursor = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }

    const closing = html[start + 1] === "/";
    const nameStart = start + (closing ? 2 : 1);
    const name = TAG_NAME_PATTERN.exec(html.slice(nameStart, nameStart + 32))?.[0];

    // "<" solto no texto (ex.: "5 < 10"): não é tag, segue procurando.
    if (!name) {
      cursor = start + 1;
      continue;
    }

    const end = findTagEnd(html, nameStart + name.length);

    return {
      name: name.toLowerCase(),
      closing,
      selfClosing: html[end - 2] === "/",
      start,
      end,
    };
  }

  return null;
}

/** Posição logo após o fechamento que corresponde à abertura já consumida. */
function findMatchingClose(html: string, name: string, from: number) {
  let depth = 1;
  let cursor = from;

  while (cursor < html.length) {
    const tag = nextTag(html, cursor);
    if (!tag) break;

    cursor = tag.end;
    if (tag.name !== name) continue;

    if (tag.closing) {
      depth -= 1;
      if (depth === 0) return tag.end;
    } else if (!tag.selfClosing && !VOID_TAGS.has(tag.name)) {
      depth += 1;
    }
  }

  // HTML malformado: consome até o fim em vez de descartar o restante.
  return html.length;
}

function parseTopLevel(html: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;

  while (cursor < html.length) {
    const tag = nextTag(html, cursor);
    if (!tag) break;

    // Texto solto antes da tag também é conteúdo: preserva.
    if (tag.start > cursor) {
      const text = html.slice(cursor, tag.start);
      if (text.trim()) segments.push({ html: text, counts: false });
    }

    if (tag.closing) {
      segments.push({ html: html.slice(tag.start, tag.end), counts: false });
      cursor = tag.end;
      continue;
    }

    const end =
      VOID_TAGS.has(tag.name) || tag.selfClosing
        ? tag.end
        : findMatchingClose(html, tag.name, tag.end);

    segments.push({
      html: html.slice(tag.start, end),
      counts: COUNTED_TAGS.has(tag.name),
    });
    cursor = end;
  }

  if (cursor < html.length) {
    const rest = html.slice(cursor);
    if (rest.trim()) segments.push({ html: rest, counts: false });
  }

  return segments;
}

export function splitContentInHalf(html: string) {
  const segments = parseTopLevel(html);
  const countable = segments.reduce((total, s) => total + (s.counts ? 1 : 0), 0);

  if (countable < MIN_BLOCKS_FOR_SPLIT) {
    return { before: html, after: "" };
  }

  // O corte cai logo após o bloco do meio, mantendo o comportamento anterior.
  const midpoint = Math.ceil(countable / 2);
  let seen = 0;
  let splitIndex = segments.length;

  for (let i = 0; i < segments.length; i += 1) {
    if (!segments[i].counts) continue;

    seen += 1;
    if (seen === midpoint) {
      splitIndex = i + 1;
      break;
    }
  }

  const join = (list: Segment[]) => list.map((s) => s.html).join("");

  return {
    before: join(segments.slice(0, splitIndex)),
    after: join(segments.slice(splitIndex)),
  };
}
