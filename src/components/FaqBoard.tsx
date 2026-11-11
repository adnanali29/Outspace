"use client";

import { useState } from "react";
import { faqs, whatsappHref } from "@/content";
import { Piece, type PieceType } from "./Piece";
import { WhatsAppIcon } from "./WhatsAppButton";

const PIECES: PieceType[] = ["p", "n", "b", "r", "q", "k"];

// Squares alternate like a chessboard. The pattern depends on how many squares fit
// in a row, so phones (2 across) and laptops (5 across) each get their own colours.
function squareColours(i: number) {
  const isDark = (across: number) => (Math.floor(i / across) + i % across) % 2 === 0;
  const onPhone = isDark(2);
  const onLaptop = isDark(5);
  return [
    onPhone ? "bg-teal-deep text-white" : "bg-white text-ink",
    onLaptop ? "lg:bg-teal-deep lg:text-white" : "lg:bg-white lg:text-ink",
  ].join(" ");
}

export function FaqBoard() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-3xl shadow-xl shadow-teal-deep/20 ring-4 ring-teal-deep lg:grid-cols-5">
      {faqs.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={item.q}
            type="button"
            aria-expanded={isOpen}
            onClick={() => setOpen(isOpen ? null : i)}
            className={`relative flex aspect-square flex-col p-3 text-left transition-colors focus-visible:z-10 focus-visible:-outline-offset-4 sm:aspect-[2/1] sm:p-5 lg:aspect-square lg:p-4 ${
              isOpen ? "bg-flame text-ink" : `overflow-hidden ${squareColours(i)}`
            }`}
          >
            {!isOpen && (
              <Piece
                type={PIECES[i % PIECES.length]}
                className="absolute -right-1 -bottom-2 text-6xl opacity-15"
              />
            )}
            {isOpen ? (
              <>
                <span className="text-xs leading-snug font-semibold">{item.q}</span>
                <span className="mt-1.5 text-xs leading-snug font-medium sm:text-sm lg:text-[0.8rem]">
                  {item.a}
                </span>
              </>
            ) : (
              <>
                <span className="relative font-display text-[0.95rem] leading-snug font-bold sm:text-lg lg:text-base">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="relative mt-auto grid size-7 place-items-center rounded-full bg-flame text-xl leading-none font-medium text-ink"
                >
                  +
                </span>
              </>
            )}
          </button>
        );
      })}
      {/* Fills the board's last empty square, so it ends on a dark square. */}
      {whatsappHref && faqs.items.length % 2 === 1 && faqs.items.length % 5 !== 0 && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex aspect-square flex-col bg-ink p-3 text-white transition-colors hover:bg-teal-deep sm:aspect-[2/1] sm:p-5 lg:aspect-square lg:p-4"
        >
          <span className="font-display text-[0.95rem] leading-snug font-bold sm:text-lg lg:text-base">
            {faqs.more.q}
          </span>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-peach">
            <WhatsAppIcon className="size-5 text-[#25D366]" />
            {faqs.more.cta}
          </span>
        </a>
      )}
    </div>
  );
}
