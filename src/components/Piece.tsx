const glyphs = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };

export type PieceType = keyof typeof glyphs;

// Chess pieces as text, so they take any colour and need no image files. The
// trailing character stops phones from swapping the pawn for an emoji.
export function Piece({ type, className = "" }: { type: PieceType; className?: string }) {
  return (
    <span aria-hidden className={`font-chess leading-none ${className}`}>
      {glyphs[type]}
      {"︎"}
    </span>
  );
}
