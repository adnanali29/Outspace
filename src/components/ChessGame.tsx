"use client";

import { Chess, type Move, type Square } from "chess.js";
import { useEffect, useMemo, useState } from "react";
import { useContent } from "./ContentProvider";
import { pickMove, type Level } from "./chessEngine";
import { Piece, type PieceType } from "./Piece";

const FILES = "abcdefgh";
const SQUARES = Array.from({ length: 64 }, (_, i) => {
  return `${FILES[i % 8]}${8 - Math.floor(i / 8)}` as Square;
});
const NAMES = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
const COMPUTER_DELAY = 500;

const place = (square: Square) => ({
  left: `${FILES.indexOf(square[0]) * 12.5}%`,
  top: `${(8 - Number(square[1])) * 12.5}%`,
});

type BoardPiece = { id: string; type: PieceType; color: "w" | "b"; square: Square };

function applyToPieces(pieces: BoardPiece[], move: Move) {
  const takenAt = move.flags.includes("e") ? (`${move.to[0]}${move.from[1]}` as Square) : move.to;
  const rank = move.from[1];
  const rookFrom = move.flags.includes("k") ? `h${rank}` : move.flags.includes("q") ? `a${rank}` : "";
  const rookTo = move.flags.includes("k") ? `f${rank}` : `d${rank}`;

  return pieces
    .filter((piece) => !move.captured || piece.square !== takenAt)
    .map((piece) => {
      if (piece.square === move.from) {
        return { ...piece, square: move.to, type: move.promotion ?? piece.type };
      }
      if (piece.square === rookFrom) return { ...piece, square: rookTo as Square };
      return piece;
    });
}

// The game is rebuilt from its list of moves, so taking a move back or starting
// again only ever means changing that list. Pieces keep an id so they slide.
function replay(history: string[]) {
  const game = new Chess();
  let pieces: BoardPiece[] = game
    .board()
    .flat()
    .filter((piece) => piece !== null)
    .map((piece) => ({ ...piece, id: piece.square }));
  const taken: { w: PieceType[]; b: PieceType[] } = { w: [], b: [] };
  let last: Move | null = null;

  for (const san of history) {
    last = game.move(san);
    pieces = applyToPieces(pieces, last);
    if (last.captured) taken[last.color].push(last.captured);
  }
  return { game, pieces, taken, last };
}

function Taken({ label, pieces }: { label: string; pieces: PieceType[] }) {
  const { game: copy } = useContent();
  return (
    <div className="flex min-h-7 items-center gap-2 text-sm">
      <span className="shrink-0 font-semibold">{label}</span>
      <span className="flex flex-wrap text-lg text-teal-deep">
        {pieces.length === 0 ? (
          <span className="text-sm text-muted">{copy.noneTaken}</span>
        ) : (
          pieces.map((type, i) => <Piece key={i} type={type} />)
        )}
      </span>
    </div>
  );
}

export function ChessGame() {
  const { game: copy } = useContent();
  const [history, setHistory] = useState<string[]>([]);
  const [level, setLevel] = useState<Level>("easy");
  const [selected, setSelected] = useState<Square | null>(null);
  const [hint, setHint] = useState<{ from: Square; to: Square; at: number } | null>(null);

  const { game, pieces, taken, last } = useMemo(() => replay(history), [history]);
  const fen = game.fen();
  const over = game.isGameOver();
  const myTurn = game.turn() === "w" && !over;
  const shownHint = hint?.at === history.length ? hint : null;

  useEffect(() => {
    if (game.isGameOver() || game.turn() !== "b") return;
    const timer = setTimeout(() => {
      const move = pickMove(fen, level);
      setHistory((moves) => [...moves, move.san]);
    }, COMPUTER_DELAY);
    return () => clearTimeout(timer);
  }, [game, fen, level]);

  const selectedMoves =
    selected && myTurn ? game.moves({ square: selected, verbose: true }) : [];
  const targets = selectedMoves.map((move) => move.to);
  const checkedKing = game.inCheck()
    ? pieces.find((piece) => piece.type === "k" && piece.color === game.turn())?.square
    : null;

  function isMovable(square: Square) {
    return myTurn && game.get(square)?.color === "w" && game.moves({ square }).length > 0;
  }

  function handleSquare(square: Square) {
    // A pawn reaching the far side always becomes a queen, to keep things simple.
    const move = selectedMoves.find(
      (option) => option.to === square && (!option.promotion || option.promotion === "q"),
    );
    if (move) {
      setHistory((moves) => [...moves, move.san]);
      setSelected(null);
    } else if (isMovable(square)) {
      setSelected(square === selected ? null : square);
    }
  }

  function showHint() {
    const move = pickMove(fen, "hard");
    setHint({ from: move.from, to: move.to, at: history.length });
    setSelected(null);
  }

  function takeBack() {
    setHistory((moves) => moves.slice(0, game.turn() === "w" ? -2 : -1));
    setSelected(null);
  }

  function newGame() {
    setHistory([]);
    setSelected(null);
  }

  const status = game.isCheckmate()
    ? game.turn() === "b"
      ? copy.youWon
      : copy.computerWon
    : over
      ? copy.draw
      : !myTurn
        ? copy.thinking
        : game.inCheck()
          ? copy.check
          : history.length === 0
            ? copy.start
            : copy.yourMove;

  return (
    <div className="grid items-start gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)]">
      <div className="text-center lg:col-span-2">
        <p className="mb-3 text-sm font-semibold text-ember">{copy.kicker}</p>
        <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance md:text-[2.5rem] lg:text-[length:var(--heading-size)] lg:whitespace-nowrap">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-muted">{copy.intro}</p>
      </div>

      <div className="lg:col-start-1 lg:row-start-2">
        <div role="group" aria-label={copy.levelLabel}>
          <p className="text-sm font-semibold">{copy.levelLabel}</p>
          <div className="mt-2 inline-flex rounded-full bg-white p-1">
            {copy.levels.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={level === option.value}
                onClick={() => setLevel(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  level === option.value ? "bg-teal-deep text-white" : "text-muted hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-start-3">
        <div
          aria-live="polite"
          className={`rounded-2xl p-4 font-semibold ${
            game.isCheckmate() && game.turn() === "b" ? "bg-flame text-ink" : "bg-white"
          }`}
        >
          {status}
        </div>
        <div className="mt-3 hidden gap-1 lg:grid">
          <Taken label={copy.youTook} pieces={taken.w} />
          <Taken label={copy.computerTook} pieces={taken.b} />
        </div>
      </div>

      <div className="@container mx-auto w-full max-w-lg lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:max-w-none">
        <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-teal-deep/25 ring-4 ring-white">
          <div className="grid grid-cols-8">
            {SQUARES.map((square, i) => {
              const dark = (i + Math.floor(i / 8)) % 2 === 1;
              const piece = game.get(square);
              const isTarget = targets.includes(square);
              const canAct = isTarget || isMovable(square);
              const isHint = square === shownHint?.from || square === shownHint?.to;
              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => handleSquare(square)}
                  disabled={!canAct}
                  aria-label={`${square}${
                    piece
                      ? `, ${piece.color === "w" ? "white" : "black"} ${NAMES[piece.type]}`
                      : ""
                  }${isTarget ? ", move here" : ""}`}
                  aria-pressed={square === selected}
                  className={`relative aspect-square focus-visible:z-20 focus-visible:-outline-offset-2 ${
                    canAct ? "cursor-pointer" : "cursor-default"
                  } ${
                    square === checkedKing
                      ? "bg-flame"
                      : square === selected
                        ? "bg-flame/80"
                        : isHint
                          ? "bg-peach ring-4 ring-flame ring-inset"
                          : square === last?.from || square === last?.to
                            ? "bg-peach"
                            : dark
                              ? "bg-teal"
                              : "bg-cream"
                  }`}
                >
                  {isTarget && (
                    <span
                      className={`absolute z-10 rounded-full ${
                        piece
                          ? "inset-[6%] border-[0.7cqw] border-ink/50"
                          : "inset-[34%] bg-ink/35"
                      }`}
                    />
                  )}
                  {i % 8 === 0 && (
                    <span
                      aria-hidden
                      className={`absolute top-[4%] left-[6%] text-[2.2cqw] font-semibold ${
                        dark ? "text-white/90" : "text-teal-deep"
                      }`}
                    >
                      {square[1]}
                    </span>
                  )}
                  {i >= 56 && (
                    <span
                      aria-hidden
                      className={`absolute right-[6%] bottom-[2%] text-[2.2cqw] font-semibold ${
                        dark ? "text-white/90" : "text-teal-deep"
                      }`}
                    >
                      {square[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Pieces sit above the squares and only slide, so taps reach the buttons. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {pieces.map((piece) => (
              <span
                key={piece.id}
                style={place(piece.square)}
                className="absolute grid size-[12.5%] place-items-center transition-[left,top] duration-300 motion-reduce:transition-none"
              >
                <Piece
                  type={piece.type}
                  className={`text-[9.6cqw] ${
                    piece.color === "w"
                      ? "text-white [paint-order:stroke_fill] [-webkit-text-stroke:0.09em_var(--color-ink)]"
                      : "text-ink"
                  }`}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-start-4">
        <div className="mb-3 grid gap-1 lg:hidden">
          <Taken label={copy.youTook} pieces={taken.w} />
          <Taken label={copy.computerTook} pieces={taken.b} />
        </div>
        <div className="flex flex-wrap gap-2">
          {over ? (
            <a
              href="#book"
              className="rounded-full bg-flame px-5 py-2.5 font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-flame/30"
            >
              {copy.cta}
            </a>
          ) : (
            <button
              type="button"
              disabled={!myTurn}
              onClick={showHint}
              className="rounded-full bg-flame px-5 py-2.5 font-semibold text-ink transition-colors disabled:opacity-50"
            >
              {copy.hint}
            </button>
          )}
          <button
            type="button"
            disabled={!(myTurn || over) || history.length === 0}
            onClick={takeBack}
            className="rounded-full px-5 py-2.5 font-semibold text-teal-deep ring-2 ring-teal-deep transition-colors enabled:hover:bg-teal-deep enabled:hover:text-white disabled:opacity-50"
          >
            {copy.takeBack}
          </button>
          <button
            type="button"
            disabled={history.length === 0}
            onClick={newGame}
            className="rounded-full px-5 py-2.5 font-semibold text-teal-deep ring-2 ring-teal-deep transition-colors enabled:hover:bg-teal-deep enabled:hover:text-white disabled:opacity-50"
          >
            {copy.newGame}
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {copy.note}{" "}
          <a href="#book" className="font-semibold text-ember underline underline-offset-2">
            {copy.noteLink}
          </a>
        </p>
      </div>
    </div>
  );
}
