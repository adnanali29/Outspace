import type { CSSProperties } from "react";

const SQUARE = 40;
const SIZE = SQUARE * 8;

const center = ([col, row]: number[]) => [
  col * SQUARE + SQUARE / 2,
  row * SQUARE + SQUARE / 2,
];

// Four knight moves across the board, each stop one L-shape from the last.
const stops = [
  [0, 7],
  [1, 5],
  [3, 4],
  [4, 2],
  [6, 1],
];
const corners = [
  [0, 5],
  [3, 5],
  [3, 2],
  [6, 2],
];

const path = stops
  .flatMap((stop, i) => (i === 0 ? [stop] : [corners[i - 1], stop]))
  .map(center)
  .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
  .join(" ");

// Where each stop appears along the scroll, as a percentage of the board's
// passage through the screen. Matches the path's range in globals.css.
const stopAt = (i: number) =>
  ({ "--at": 5 + i * 5 }) as CSSProperties;

export function KnightBoard() {
  const goal = stops[stops.length - 1];
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="A chessboard with a knight's path moving step by step towards a highlighted square"
      className="knight-board w-full rounded-2xl shadow-2xl shadow-ink/25"
    >
      {Array.from({ length: 64 }, (_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return (
          <rect
            key={i}
            x={col * SQUARE}
            y={row * SQUARE}
            width={SQUARE}
            height={SQUARE}
            fill={(col + row) % 2 === 0 ? "#e8e8e8" : "#111111"}
          />
        );
      })}
      <rect
        x={goal[0] * SQUARE}
        y={goal[1] * SQUARE}
        width={SQUARE}
        height={SQUARE}
        fill="#f08038"
        className="knight-stop"
        style={stopAt(stops.length - 1)}
      />
      <path
        d={path}
        pathLength={1}
        fill="none"
        stroke="#f08038"
        strokeWidth={4}
        strokeLinejoin="round"
        className="knight-path"
      />
      {stops.slice(0, -1).map((stop, i) => {
        const [cx, cy] = center(stop);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={7}
            fill="#0a0a0a"
            stroke="#f08038"
            strokeWidth={4}
            className="knight-stop"
            style={stopAt(i)}
          />
        );
      })}
    </svg>
  );
}
