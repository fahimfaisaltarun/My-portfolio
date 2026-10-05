import type { ReactNode } from "react";

/**
 * Renders `text` with the first occurrence of `word` in the accent serif
 * style (the signature headline pattern). Returns plain text if not found.
 */
export function withEmphasis(
  text: string,
  word?: string,
  className = "accent-serif text-accent",
): ReactNode {
  if (!word || !text.includes(word)) return text;
  const index = text.indexOf(word);
  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{word}</span>
      {text.slice(index + word.length)}
    </>
  );
}
