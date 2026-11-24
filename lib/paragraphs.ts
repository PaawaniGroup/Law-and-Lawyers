/** Splits long prose into short paragraphs at sentence boundaries (formatting only; text is unchanged). */
export function chunkSentences(text: string, perParagraph = 2): string[] {
  const sentences = text.split(/(?<=\.)\s+(?=[A-Z])/);
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += perParagraph) out.push(sentences.slice(i, i + perParagraph).join(" "));
  return out;
}
