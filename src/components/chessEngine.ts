import { Chess, type Color } from "chess.js";

export type Level = "easy" | "medium" | "hard";

const VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

function evaluate(game: Chess, side: Color) {
  let score = 0;
  for (const piece of game.board().flat()) {
    if (piece) score += (piece.color === side ? 1 : -1) * VALUES[piece.type];
  }
  return score;
}

const pickRandom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

// Three gentle opponents. Easy mostly wanders, medium grabs what it can see, and
// hard also checks the reply to each move. The small random term stops every game
// from playing out the same way. Search stays shallow to keep phones responsive.
export function pickMove(fen: string, level: Level) {
  const game = new Chess(fen);
  const side = game.turn();
  const moves = game.moves({ verbose: true });
  const mate = moves.find((move) => move.san.includes("#"));

  if (level === "easy") {
    const captures = moves.filter((move) => move.captured);
    return captures.length > 0 && Math.random() < 0.4 ? pickRandom(captures) : pickRandom(moves);
  }
  if (mate) return mate;

  let best = moves[0];
  let bestScore = -Infinity;
  for (const move of moves) {
    game.move(move);
    let score = evaluate(game, side);
    if (level === "hard") {
      const replies = game.moves({ verbose: true });
      score = replies.length === 0 ? 0 : Infinity;
      for (const reply of replies) {
        if (reply.san.includes("#")) {
          score = -1000;
          break;
        }
        game.move(reply);
        score = Math.min(score, evaluate(game, side));
        game.undo();
      }
    }
    game.undo();
    score += Math.random() * 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return best;
}
