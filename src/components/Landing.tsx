import type { ReactNode } from "react";
import {
  approach,
  belief,
  closing,
  faqs,
  footer,
  heart,
  hero,
  learn,
  navLinks,
  program,
  safety,
  services,
  start,
  stories,
  talkToUs,
  trust,
} from "@/content";
import { BookingForm, type Lead } from "./BookingForm";
import { ChessGame } from "./ChessGame";
import { FaqBoard } from "./FaqBoard";
import { Header } from "./Header";
import { HeroSlideshow } from "./HeroSlideshow";
import { Logo } from "./Logo";
import { MobileBar } from "./MobileBar";
import { Piece } from "./Piece";

const primaryButton =
  "inline-block rounded-full bg-flame px-7 py-3.5 font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-flame/30";

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="reveal max-w-3xl font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink md:text-[2.75rem]">
      {children}
    </h2>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-3 text-sm font-semibold ${light ? "text-peach" : "text-ember"}`}>
      {children}
    </p>
  );
}

function CheckMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`fill-none stroke-current stroke-[3] ${className}`}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

// The ring from the "O" in the logo, used as a large background shape.
function Ring({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute rounded-full ${className}`} />
  );
}

function Hero({
  savedLead,
  onSubmit,
}: {
  savedLead: Lead | null;
  onSubmit: (lead: Lead) => void;
}) {
  return (
    <section id="top" className="bg-cream">
      <div className="relative overflow-hidden">
        {/* Phones: the photo sits behind the words and fades out above the form,
            since stretching it down the whole column would blur it. Laptops: it
            fills the hero, with the cream layer strongest behind the words. */}
        <div className="absolute inset-x-0 top-0 h-[23rem] lg:inset-y-0 lg:h-auto">
          <HeroSlideshow />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -bottom-px bg-gradient-to-b from-cream/70 via-cream/85 to-cream to-90% lg:bg-gradient-to-r lg:from-cream/95 lg:via-cream/80 lg:to-cream/40 lg:to-100%"
          />
        </div>
        <div className="wrap-wide relative grid items-center gap-x-14 gap-y-8 py-8 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[minmax(0,1fr)_26.5rem] lg:py-10 short:py-5 xl:gap-x-20">
          <div className="text-center lg:text-left">
            <p className="inline-block rounded-full bg-mist px-4 py-1.5 text-sm font-semibold text-teal-deep">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] leading-[1.06] font-bold tracking-tight text-balance sm:text-5xl xl:text-[4rem] short:mt-3 short:text-[2.9rem]">
              {hero.title}{" "}
              <span className="relative mx-auto block w-fit pb-2 text-flame-deep lg:mx-0">
                {hero.titleAccent}
                {/* The orange sweep from the logo's ring. */}
                <svg
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2.5 w-full fill-none stroke-flame stroke-[5]"
                >
                  <path d="M4 10C80 2 220 1 296 8" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink lg:mx-0 lg:text-xl short:mt-3 short:text-lg">
              {hero.lede}
            </p>
            <a
              href="#play"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-teal-deep underline decoration-flame decoration-2 underline-offset-4 hover:text-ember"
            >
              <Piece type="n" className="text-2xl" />
              {hero.playLink}
            </a>
          </div>

          <BookingForm savedLead={savedLead} onSubmit={onSubmit} />
        </div>
      </div>

      <section aria-label="Outpace at a glance" className="relative border-t border-line bg-white">
        <dl className="wrap-wide grid grid-cols-2 gap-x-4 gap-y-5 py-5 lg:grid-cols-4 short:py-3">
          {trust.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5 text-center lg:text-left">
              <dt className="font-display text-2xl font-bold text-teal-deep md:text-3xl short:text-2xl">
                {item.value}
              </dt>
              <dd className="text-sm leading-snug text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}

function Heart() {
  return (
    <section
      id="heart"
      className="relative overflow-hidden bg-teal-deep py-12 text-white md:py-16"
    >
      <Ring className="-right-48 -bottom-48 size-[28rem] border-[3.5rem] border-white/5" />
      <div className="wrap relative grid items-center gap-x-14 gap-y-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:self-end">
          <Kicker light>{heart.kicker}</Kicker>
          <h2 className="reveal font-display text-3xl leading-[1.15] font-bold tracking-tight text-balance md:text-4xl">
            {heart.title}
          </h2>
          <p className="reveal mt-3 text-lg leading-relaxed">{heart.intro}</p>
        </div>
        {/* The lines read like a game's score sheet, one numbered move at a time. */}
        <ol className="rounded-3xl bg-white/10 px-5 py-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {heart.lines.map((line, i) => (
            <li
              key={line}
              className="reveal flex items-baseline gap-3 border-t border-white/15 py-3 leading-snug font-medium first:border-t-0 md:text-lg"
            >
              <span aria-hidden className="w-4 shrink-0 font-display font-bold text-peach">
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ol>
        <p className="reveal rounded-2xl bg-flame px-5 py-3.5 font-display text-xl leading-snug font-bold text-balance text-ink md:text-2xl lg:self-start">
          {heart.promise}
        </p>
      </div>
    </section>
  );
}

// Each skill gets its own 4x4 board pattern; numbers are the lit squares.
const skillPatterns = [
  [5, 6, 9, 10],
  [0, 5, 10, 15],
  [12, 13, 14, 9, 10, 6],
  [1, 4, 5, 6, 9, 13],
  [0, 1, 2, 7, 11, 14],
  [3, 6, 9, 12, 2, 13],
];

function MiniBoard({ lit }: { lit: number[] }) {
  return (
    <div
      aria-hidden
      className="grid size-10 shrink-0 grid-cols-4 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
    >
      {Array.from({ length: 16 }, (_, i) => {
        const dark = (i + Math.floor(i / 4)) % 2 === 0;
        return (
          <span
            key={i}
            className={lit.includes(i) ? "bg-flame" : dark ? "bg-teal" : "bg-teal/25"}
          />
        );
      })}
    </div>
  );
}

function Learn() {
  return (
    <section id="learn" className="py-12 md:py-20">
      <div className="wrap grid gap-x-12 gap-y-8 lg:grid-cols-[21rem_1fr]">
        <div>
          <Kicker>{learn.kicker}</Kicker>
          <Heading>{learn.title}</Heading>
          <p className="reveal mt-4 leading-relaxed text-muted md:text-lg">{learn.intro}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {learn.items.map((item, i) => (
            <li
              key={item.title}
              className="group reveal rounded-2xl bg-cream p-4 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1"
            >
              <MiniBoard lit={skillPatterns[i]} />
              <h3 className="mt-3 font-display text-lg leading-tight font-bold">{item.title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <dl className="reveal grid gap-4 rounded-2xl bg-mist p-5 sm:grid-cols-3 lg:col-span-2">
          {learn.outcomes.map((item) => (
            <div key={item.label}>
              <dt className="font-display font-bold text-teal-deep">{item.label}</dt>
              <dd className="mt-0.5 text-sm leading-snug text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Play() {
  return (
    <section id="play" className="bg-mist py-12 md:py-20">
      <div className="wrap">
        <ChessGame />
      </div>
    </section>
  );
}

const personStyles = [
  { card: "bg-teal-deep text-white", icon: "bg-white text-teal-deep" },
  { card: "bg-flame text-ink", icon: "bg-white text-ember" },
  { card: "bg-white text-ink ring-2 ring-flame", icon: "bg-peach text-ember" },
];

function Program() {
  return (
    <section id="program" className="bg-cream py-12 md:py-20">
      <div className="wrap">
        <Kicker>{program.kicker}</Kicker>
        <Heading>{program.title}</Heading>

        <div className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
          {program.people.map((person, i) => (
            <div
              key={person.role}
              className={`reveal flex items-center gap-4 rounded-2xl p-4 md:p-5 ${personStyles[i].card}`}
            >
              <span
                className={`grid size-14 shrink-0 place-items-center rounded-full ${personStyles[i].icon}`}
              >
                <Piece type={person.piece} className="text-3xl" />
              </span>
              <div>
                <h3 className="font-display text-lg leading-tight font-bold">{person.role}</h3>
                <p className="mt-1 text-sm leading-snug">{person.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-4 rounded-3xl bg-white p-5 ring-1 ring-line md:p-7">
          <h3 className="font-display text-xl font-bold md:text-2xl">{program.numbersTitle}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {program.numbers.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-2xl bg-cream px-2 py-4 text-center"
              >
                <dt className="font-display text-4xl leading-none font-bold text-flame-deep">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm leading-tight text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-6 font-display text-lg font-bold">{program.listTitle}</h3>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {program.list.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-snug font-medium">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-deep text-white">
                  <CheckMark className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhyOutpace() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap">
        <Kicker>{approach.kicker}</Kicker>
        <Heading>{approach.title}</Heading>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
          {approach.rows.map((row) => (
            <li key={row.label} className="reveal flex flex-col rounded-2xl bg-mist p-4 md:p-6">
              <h3 className="text-sm font-semibold text-ember">{row.label}</h3>
              <p className="mt-2 leading-snug text-muted">{row.need}</p>
              <span aria-hidden className="my-2 font-display text-xl font-bold text-flame">
                ↓
              </span>
              <p className="font-display text-lg leading-snug font-bold">{row.answer}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-5 grid gap-6 rounded-3xl bg-teal-deep p-7 text-white md:grid-cols-[13rem_1fr] md:p-9">
          <h3 className="font-display text-2xl leading-tight font-bold text-balance">
            {safety.title}
          </h3>
          <ul className="grid gap-5 sm:grid-cols-3">
            {safety.items.map((item) => (
              <li key={item.title}>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-snug">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" className="bg-cream py-12 md:py-20">
      <div className="wrap">
        <Kicker>{stories.kicker}</Kicker>
        <Heading>{stories.title}</Heading>

        <div className="reveal mt-8 rounded-3xl bg-teal-deep p-5 text-white md:p-7">
          <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stories.numbers.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="font-display text-3xl leading-none font-bold md:text-5xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-sm">{item.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-center text-xs">{stories.numbersNote}</p>
        </div>

        {/* Swipeable on phones, so four quotes don't fill four screens. */}
        <div
          role="group"
          aria-label={stories.kicker}
          tabIndex={0}
          className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
        >
          {stories.quotes.map((item) => (
            <figure
              key={item.by}
              className="flex w-[85%] shrink-0 snap-center flex-col rounded-2xl bg-white p-5 ring-1 ring-line md:w-auto"
            >
              <blockquote className="flex-1 text-sm leading-relaxed md:text-base">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-peach font-display font-bold text-ember"
                >
                  {item.by.replace(/^Adv\. \(Mrs\.\) /, "")[0]}
                </span>
                <span>
                  <span className="block font-semibold">{item.by}</span>
                  <span className="text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="reveal mt-8 font-display text-xl font-bold md:text-2xl">
          {stories.winsTitle}
        </h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-3 md:gap-4">
          {stories.wins.map((win) => (
            <li key={win.name} className="reveal flex gap-3 rounded-2xl bg-white p-4 ring-2 ring-flame/70">
              <Piece type="k" className="text-3xl text-flame-deep" />
              <div>
                <p className="font-display font-bold">{win.name}</p>
                <p className="mt-0.5 text-sm leading-snug font-semibold text-ember">{win.result}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{win.event}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Mission() {
  const { mission, vision, founder } = belief;
  return (
    <section id="mission" className="py-16 md:py-24">
      <div className="wrap">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>{belief.kicker}</Kicker>
          <p className="reveal font-display text-3xl leading-[1.15] font-bold tracking-tight text-balance md:text-5xl">
            {belief.quote} <span className="text-flame-deep">{belief.quoteAccent}</span>
          </p>
          <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {belief.line}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="reveal relative flex flex-col overflow-hidden rounded-3xl bg-teal-deep p-8 text-white md:p-10">
            <Piece
              type="n"
              className="absolute -right-3 -bottom-8 text-[11rem] text-white opacity-10"
            />
            <h2 className="relative text-sm font-semibold tracking-wide text-peach uppercase">
              {mission.title}
            </h2>
            <p className="relative mt-4 font-display text-2xl leading-snug font-bold text-balance md:text-3xl">
              {mission.lead}
            </p>
            <p className="relative mt-4 leading-relaxed">{mission.text}</p>
            <div className="relative mt-auto pt-8">
              <h3 className="text-sm font-semibold">{mission.listTitle}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {mission.list.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-teal-deep">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="reveal relative flex flex-col overflow-hidden rounded-3xl bg-peach p-8 md:p-10">
            <Piece
              type="k"
              className="absolute -right-3 -bottom-8 text-[11rem] text-flame opacity-20"
            />
            <h2 className="relative text-sm font-semibold tracking-wide text-ember uppercase">
              {vision.title}
            </h2>
            <p className="relative mt-4 font-display text-2xl leading-snug font-bold text-balance md:text-3xl">
              {vision.lead}
            </p>
            <p className="relative mt-4 leading-relaxed">{vision.text}</p>
            <div className="relative mt-auto pt-8">
              <h3 className="text-sm font-semibold">{vision.listTitle}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {vision.list.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-ember">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <div className="reveal mt-5 flex flex-col gap-4 rounded-3xl p-7 ring-2 ring-line sm:flex-row sm:items-center sm:gap-8 md:px-10">
          <p className="flex shrink-0 items-baseline gap-2 font-display font-bold text-flame-deep">
            <span className="text-6xl leading-none">{founder.value}</span>
            <span className="text-lg">{founder.label}</span>
          </p>
          <div>
            <h2 className="font-display text-xl font-bold">{founder.title}</h2>
            <p className="mt-1 leading-relaxed text-muted">{founder.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Start() {
  return (
    <section id="start" className="py-12 md:py-20">
      <div className="wrap">
        <Kicker>{start.kicker}</Kicker>
        <Heading>{start.title}</Heading>
        {/* One connected flow: arrows point down on phones and across on laptops. */}
        <ol className="mt-8 grid gap-6 lg:grid-cols-4">
          {start.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal relative flex items-center gap-4 rounded-2xl bg-mist p-4 lg:flex-col lg:items-start lg:p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-deep font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg leading-tight font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{step.text}</p>
              </div>
              {i < start.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -bottom-5 left-1/2 z-10 grid size-8 -translate-x-1/2 rotate-90 place-items-center rounded-full bg-flame font-bold text-ink lg:top-1/2 lg:-right-5 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <h3 className="reveal mt-12 font-display text-2xl leading-snug font-bold text-balance md:text-3xl">
          {start.levelsTitle}
        </h3>
        <p className="mt-1 text-muted">{start.levelsIntro}</p>
        <ol className="mt-5 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {start.levels.map((level, i) => (
            <li
              key={level.name}
              className="reveal flex flex-col rounded-2xl bg-cream p-4 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 md:flex-row md:gap-4 md:p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ember">
                <Piece type={level.piece} className="text-3xl" />
              </span>
              <div className="mt-2 flex flex-1 flex-col md:mt-0">
                <p className="text-xs font-semibold text-ember">Level {i + 1}</p>
                <h4 className="font-display leading-tight font-bold md:text-lg">{level.name}</h4>
                <p className="mt-1 flex-1 text-sm leading-snug text-muted">{level.text}</p>
                <p className="mt-2 text-xs font-semibold text-teal-deep">{level.duration}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{start.levelsNote}</p>
      </div>
    </section>
  );
}

const serviceStyles = {
  tuition: {
    piece: "b",
    card: "bg-teal-deep text-white",
    title: "text-peach",
    value: "text-white",
    pill: "text-teal-deep",
    watermark: "text-white opacity-10",
    button: "bg-white text-teal-deep hover:bg-peach",
  },
  programs: {
    piece: "q",
    card: "bg-peach",
    title: "text-ember",
    value: "text-flame-deep",
    pill: "text-ember",
    watermark: "text-flame opacity-20",
    button: "bg-flame text-ink hover:bg-white",
  },
} as const;

function Services() {
  return (
    <section id="services" className="bg-mist py-12 md:py-20">
      <div className="wrap">
        <Kicker>{services.kicker}</Kicker>
        <Heading>{services.title}</Heading>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {(["tuition", "programs"] as const).map((key) => {
            const service = services[key];
            const style = serviceStyles[key];
            return (
              <article
                key={key}
                className={`reveal relative flex flex-col overflow-hidden rounded-3xl p-6 md:p-7 ${style.card}`}
              >
                <Piece
                  type={style.piece}
                  className={`absolute -right-2 -bottom-6 text-[9rem] ${style.watermark}`}
                />
                <h3 className={`relative text-sm font-semibold tracking-wide uppercase ${style.title}`}>
                  {service.name}
                </h3>
                <p className="relative mt-2 font-display text-xl leading-snug font-bold text-balance md:text-2xl">
                  {service.lead}
                </p>
                <dl className="relative mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {service.facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline gap-1.5">
                      <dt className={`font-display text-2xl font-bold ${style.value}`}>
                        {fact.value}
                      </dt>
                      <dd className="text-sm">{fact.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="relative mt-4 space-y-3">
                  {service.groups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-sm font-semibold">{group.title}</h4>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className={`rounded-full bg-white px-3 py-1 text-xs font-semibold ${style.pill}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="relative mt-4 text-sm leading-snug">{service.note}</p>
                <div className="relative mt-auto pt-5">
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${style.button}`}
                  >
                    {service.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faqs" className="bg-cream py-12 md:py-20">
      <div className="wrap">
        <Kicker>{faqs.kicker}</Kicker>
        <Heading>{faqs.title}</Heading>
        <p className="mt-2 mb-6 text-muted">{faqs.hint}</p>
        <FaqBoard />
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden bg-teal-deep py-16 text-center text-white md:py-24">
      <Ring className="-top-48 -left-48 size-[30rem] border-[3.5rem] border-white/5" />
      <Ring className="-right-40 -bottom-56 size-[30rem] border-[3.5rem] border-flame/25" />
      <div className="wrap relative">
        <Kicker light>{closing.kicker}</Kicker>
        <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-[3.25rem]">
          {closing.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg">{closing.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#book" className={primaryButton}>
            Book my free session
          </a>
          <a
            href={talkToUs.href}
            {...(talkToUs.external && { target: "_blank", rel: "noreferrer" })}
            className="rounded-full px-7 py-3.5 font-semibold ring-2 ring-white/80 transition-colors hover:bg-white/10"
          >
            {talkToUs.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-display text-base font-bold text-ink">{children}</p>;
}

function Footer() {
  return (
    <footer className="bg-white text-sm text-muted">
      <div aria-hidden className="chess-strip h-8" />
      <div className="wrap grid gap-10 pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.6fr]">
        <div>
          <Logo className="h-12" />
          <p className="mt-4 font-semibold text-ember">{footer.tagline}</p>
          <p className="mt-2 max-w-xs leading-relaxed">{footer.blurb}</p>
        </div>
        <nav aria-label="Footer">
          <FooterTitle>Explore</FooterTitle>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-teal-deep">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <FooterTitle>Talk to us</FooterTitle>
          <ul className="space-y-2.5">
            <li className="leading-snug">{footer.address}</li>
            <li>
              <a href={footer.phoneHref} className="transition-colors hover:text-teal-deep">
                {footer.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${footer.email}`}
                className="break-all transition-colors hover:text-teal-deep"
              >
                {footer.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${footer.website}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-teal-deep"
              >
                {footer.website}
              </a>
            </li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-ink">
            {footer.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-teal-deep"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-5 text-xs md:flex-row md:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-teal-deep"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Landing({
  savedLead,
  onSubmit,
}: {
  savedLead: Lead | null;
  onSubmit: (lead: Lead) => void;
}) {
  return (
    <div className="pb-[4.5rem] lg:pb-0">
      <Header />
      <main>
        <Hero savedLead={savedLead} onSubmit={onSubmit} />
        <Heart />
        <Learn />
        <Play />
        <Start />
        <Program />
        <WhyOutpace />
        <Stories />
        <Mission />
        <Services />
        <Faqs />
        <Closing />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
