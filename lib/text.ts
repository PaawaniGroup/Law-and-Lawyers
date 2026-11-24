/** Greedy word-wrap into short lines, used to set headlines line by line. */
export function splitLines(text: string, maxChars = 16): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (!current) current = word;
    else if ((current + " " + word).length <= maxChars) current += " " + word;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}
