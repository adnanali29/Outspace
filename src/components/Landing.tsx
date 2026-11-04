import type { ReactNode } from "react";
import {
  approach,
  closing,
  coaches,
  faqs,
  footer,
  heart,
  hero,
  includes,
  levels,
  mission,
  navLinks,
  outcomes,
  preview,
  safety,
  skills,
  stats,
  steps,
  testimonials,
  vision,
  whatsappHref,
} from "@/content";
import { BookingForm, type Lead } from "./BookingForm";
import { Header } from "./Header";
import { HeroSlideshow } from "./HeroSlideshow";
import { KnightBoard } from "./KnightBoard";
import { MobileBar } from "./MobileBar";

function Heading({
  children,
  light = false,
  wide = false,
}: {
  children: ReactNode;
  light?: boolean;
  wide?: boolean;
}) {
  return (
    <h2
      className={`reveal font-display text-3xl leading-[1.08] font-bold tracking-tight text-balance ${
        wide ? "md:text-[2.4rem] short:text-3xl" : "max-w-3xl md:text-[2.75rem]"
      } ${light ? "text-white" : "text-ink"}`}
    >
      {children}
    </h2>
  );
}

function Kicker({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-3 text-xs font-bold tracking-[0.14em] uppercase ${
        light ? "text-flame" : "text-ember"
      }`}
    >
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

function PlayMark({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-full bg-flame shadow-[0_0_0_10px_rgb(240_128_56/0.2)] transition-transform group-hover:scale-110 ${
        small ? "size-11" : "size-[4.5rem]"
      }`}
    >
      <svg viewBox="0 0 24 24" className={`ml-1 fill-ink ${small ? "size-4" : "size-7"}`}>
        <path d="M6 4l14 8-14 8z" />
      </svg>
    </span>
  );
}

function HeroQuote({ className }: { className: string }) {
  return (
    <figure
      className={`rounded-xl border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-sm ${className}`}
    >
      <blockquote className="ph text-sm">{hero.quote}</blockquote>
      <figcaption className="mt-1 text-xs whitespace-pre-wrap text-mist">
        {hero.quoteBy}
      </figcaption>
    </figure>
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
    <section
      id="top"
      className="relative flex flex-col overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-65px)]"
    >
      <HeroSlideshow />
      <div className="wrap-wide relative grid flex-1 items-center gap-x-20 gap-y-7 py-6 lg:grid-cols-[minmax(0,1fr)_28rem] lg:grid-rows-[1fr_auto] lg:gap-y-6 lg:pt-5 lg:pb-0 short:pt-3 short:gap-y-3">
        <div className="text-center lg:text-left">
          <p className="mb-3 text-xs font-bold tracking-[0.1em] text-flame uppercase md:text-sm short:mb-2">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[1.95rem] leading-[1.04] font-bold tracking-tight text-balance sm:text-[2.1rem] lg:text-[clamp(2.1rem,6.3vh,3.25rem)]">
            {hero.title} <span className="text-flame">{hero.titleAccent}</span>
          </h1>
          <p className="mt-3 leading-snug font-medium sm:mt-4 sm:text-lg short:mt-3 short:text-base">
            {hero.lede}
          </p>
          <p className="mt-1.5 hidden leading-snug text-mist sm:block short:text-sm">
            {hero.body}
          </p>
          <ul className="mt-4 space-y-2 text-sm sm:text-base short:mt-3 short:space-y-1 short:text-sm">
            {hero.points.map((point) => (
              <li key={point} className="leading-snug lg:flex lg:gap-3">
                <span className="mr-2 inline-grid size-[1.1rem] shrink-0 place-items-center rounded-[4px] bg-flame align-text-bottom text-ink lg:mt-0.5 lg:mr-0">
                  <CheckMark className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <HeroQuote className="mt-5 hidden sm:block short:mt-3 short:py-2 tiny:hidden" />
        </div>

        <div className="order-first lg:order-none lg:col-start-2 lg:row-start-1">
          <BookingForm savedLead={savedLead} onSubmit={onSubmit} />
        </div>
        <HeroQuote className="order-last text-center sm:hidden" />

        <section
          aria-label="Outpace in numbers"
          className="mx-[calc(50%-50vw)] border-y border-white/15 bg-black/60 backdrop-blur-sm lg:col-span-2 lg:border-b-0"
        >
          <dl className="wrap-wide grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`border-white/15 px-3 py-3 text-center short:py-2 lg:pr-4 lg:pl-6 lg:text-left ${
                  i % 2 === 1 ? "border-l" : ""
                } ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l" : ""
                } ${i === 0 ? "lg:pl-0" : ""}`}
              >
                <dt className="font-display text-2xl leading-tight font-bold text-white short:text-xl">
                  {stat.value}
                </dt>
                <dd className="text-xs text-mist">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}

function Heart() {
  return (
    <section id="about" className="section-fade py-12 md:py-16">
      <div className="wrap">
        <Kicker>{heart.kicker}</Kicker>
        <Heading wide>{heart.title}</Heading>
        <div className="mt-7 grid items-center gap-8 short:mt-5 lg:grid-cols-[1fr_19rem_1fr] lg:gap-10 short:lg:grid-cols-[1fr_16rem_1fr]">
          <div>
            <p className="reveal font-medium leading-relaxed short:text-sm">
              {heart.intro}
            </p>
            <ol className="mt-4 space-y-2.5 short:mt-3 short:space-y-1.5">
              {heart.moves.map((move, i) => (
                <li key={move} className="reveal flex items-baseline gap-3">
                  <span className="w-5 shrink-0 font-display text-sm font-bold text-ember">
                    {i + 1}.
                  </span>
                  <span className="leading-snug short:text-sm">{move}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <KnightBoard />
          </div>
          <div>
            <p className="reveal rounded-xl bg-ink px-5 py-4 font-display text-xl leading-snug font-semibold text-white short:py-3 short:text-lg">
              {heart.promise}
            </p>
            <div className="reveal mt-4 space-y-3 text-sm leading-relaxed text-muted short:mt-3 short:space-y-2">
              {heart.outro.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </div>
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
      className="grid size-10 shrink-0 grid-cols-4 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
    >
      {Array.from({ length: 16 }, (_, i) => {
        const dark = (i + Math.floor(i / 4)) % 2 === 0;
        return (
          <span
            key={i}
            className={
              lit.includes(i)
                ? "bg-flame"
                : dark
                  ? "bg-current opacity-35"
                  : "bg-current opacity-15"
            }
          />
        );
      })}
    </div>
  );
}

function Skills() {
  return (
    <section id="program" className="section-fade py-12 md:py-16">
      <div className="wrap">
        <Kicker>{skills.kicker}</Kicker>
        <Heading wide>{skills.title}</Heading>
        <p className="reveal mt-3 text-pretty text-muted">
          {skills.intro}
        </p>
        <div className="chess-skills reveal mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-line shadow-xl shadow-ink/10 short:mt-5 lg:grid-cols-3">
          {skills.items.map((item, i) => (
            <div key={item.title} className="group p-4 sm:p-6 short:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <MiniBoard lit={skillPatterns[i]} />
                <h3 className="font-display text-lg leading-tight font-semibold sm:text-xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed opacity-80 sm:text-base short:mt-2 short:text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Includes() {
  return (
    <section className="band section-fade grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
      <div>
        <Kicker>{includes.kicker}</Kicker>
        <Heading>{includes.title}</Heading>
        <ul className="mt-7 divide-y divide-line">
          {includes.items.map((item) => (
            <li
              key={item}
              className="reveal flex items-center gap-4 py-3.5 text-lg leading-snug"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-flame/15 text-ember">
                <CheckMark className="size-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal relative pb-10 lg:pb-0">
        <div className="board relative aspect-[4/3] overflow-hidden rounded-2xl">
          <span className="ph absolute top-0 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-b-lg bg-white px-4 py-2 text-center text-sm font-semibold">
            {includes.media}
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-0 grid grid-cols-2 gap-3 lg:-bottom-6">
          {includes.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-white p-4 shadow-xl shadow-ink/15"
            >
              <p className="font-display text-3xl font-bold text-ember">
                {item.value}
              </p>
              <p className="mt-0.5 text-sm leading-snug text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Preview() {
  return (
    <section className="dark-fade relative overflow-hidden py-16 text-white md:py-24">
      <div
        aria-hidden
        className="board absolute inset-y-0 left-0 w-2/3 opacity-40 [mask-image:linear-gradient(to_left,transparent,black)]"
      />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <div className="reveal group relative flex aspect-video flex-col items-center justify-center gap-6 rounded-2xl border border-white/15 bg-ink-2 p-6 text-center shadow-2xl shadow-black/40">
          <PlayMark />
          <p className="ph text-sm font-semibold md:text-base">{preview.media}</p>
          <span className="ph absolute bottom-3 left-3 rounded bg-ink-3 px-2 py-1 text-xs">
            {preview.duration}
          </span>
        </div>
        <div>
          <Kicker light>{preview.kicker}</Kicker>
          <Heading light>{preview.title}</Heading>
          <ul className="mt-6 space-y-4">
            {preview.items.map((item) => (
              <li key={item} className="reveal flex gap-3 leading-snug text-mist">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-flame text-ink">
                  <CheckMark className="size-3.5" />
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

function Steps() {
  return (
    <section id="how-it-works" className="section-fade py-16 md:py-24">
      <div className="wrap">
        <Kicker>{steps.kicker}</Kicker>
        <Heading>{steps.title}</Heading>
        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden
            className="absolute top-7 right-[20%] left-[5%] hidden border-t-2 border-dashed border-flame/50 lg:block"
          />
          {steps.items.map((step, i) => (
            <li key={step.title} className="group reveal relative">
              <span className="grid size-14 place-items-center rounded-xl bg-flame font-display text-2xl font-bold shadow-lg shadow-flame/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl leading-tight font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const outcomeStyles = [
  "bg-ink text-white [&_p:last-child]:text-mist [&_h3]:text-flame",
  "bg-flame text-ink [&_h3]:text-ink",
  "border border-line bg-white [&_h3]:text-ember",
];

function Outcomes() {
  return (
    <section className="band section-fade py-16 md:py-24">
      <Kicker>{outcomes.kicker}</Kicker>
      <Heading>{outcomes.title}</Heading>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {outcomes.items.map((item, i) => (
          <div
            key={item.label}
            className={`reveal rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5 md:min-h-56 ${outcomeStyles[i]}`}
          >
            <h3 className="text-xs font-bold tracking-[0.12em] uppercase">
              {item.label}
            </h3>
            <p className="mt-4 font-display text-xl leading-snug font-medium md:text-2xl">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="band section-fade py-16 md:py-24">
      <Kicker>{approach.kicker}</Kicker>
      <Heading>{approach.title}</Heading>
      <div className="reveal mt-8 hidden overflow-hidden rounded-2xl bg-white shadow-xl shadow-ink/5 md:block">
        <table className="w-full text-left">
          <thead className="text-sm">
            <tr>
              <td className="w-1/4 bg-ink px-6 py-4" />
              <th scope="col" className="bg-ink px-6 py-4 font-semibold text-white">
                {approach.columns[0]}
              </th>
              <th scope="col" className="bg-flame px-6 py-4 font-bold text-ink">
                {approach.columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {approach.rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-line transition-colors first:border-0 hover:bg-paper"
              >
                <th scope="row" className="px-6 py-5 font-display text-lg font-semibold">
                  {row.label}
                </th>
                <td className="px-6 py-5 text-muted">{row.need}</td>
                <td className="bg-flame/10 px-6 py-5 font-semibold">
                  <span className="flex items-center gap-3">
                    <CheckMark className="size-4 shrink-0 text-ember" />
                    {row.answer}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-4 md:hidden">
        {approach.rows.map((row) => (
          <div key={row.label} className="reveal overflow-hidden rounded-2xl bg-white">
            <h3 className="bg-ink px-5 py-3 font-display font-semibold text-white">
              {row.label}
            </h3>
            <p className="px-5 pt-4 text-muted">
              <span className="block text-xs font-bold tracking-wide uppercase">
                {approach.columns[0]}
              </span>
              {row.need}
            </p>
            <p className="mt-3 bg-flame/10 px-5 py-4 font-semibold">
              <span className="block text-xs font-bold tracking-wide text-ember uppercase">
                {approach.columns[1]}
              </span>
              {row.answer}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{approach.note}</p>
    </section>
  );
}

function MissionVision() {
  return (
    <section id="mission" className="section-fade py-16 md:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <Kicker>{mission.kicker}</Kicker>
          <p className="reveal font-display text-2xl leading-snug font-semibold text-balance md:text-[2.1rem]">
            {mission.lede}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {mission.body.map((text) => (
              <p key={text} className="reveal">
                {text}
              </p>
            ))}
          </div>
          <p className="reveal mt-7 border-l-4 border-flame pl-5 font-display text-xl leading-snug font-semibold md:text-2xl">
            {mission.closing}
          </p>
        </div>
        <aside className="relative self-start overflow-hidden rounded-2xl bg-ink p-8 text-white lg:sticky lg:top-24">
          <div
            aria-hidden
            className="board absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent_55%,black)]"
          />
          <div className="relative">
            <Kicker light>{vision.kicker}</Kicker>
            <p className="font-display text-2xl leading-snug font-semibold text-balance">
              {vision.lede}
            </p>
            <div className="mt-5 space-y-4 leading-relaxed text-mist">
              {vision.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Coaches() {
  return (
    <section id="coaches" className="band section-fade py-16 md:py-24">
      <Kicker>{coaches.kicker}</Kicker>
      <Heading>{coaches.title}</Heading>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {coaches.items.map((coach, i) => (
          <article
            key={i}
            className="group reveal overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
          >
            <div className="board grid aspect-[5/3] place-items-center p-4 text-center text-sm font-semibold text-white transition-transform duration-500 group-hover:scale-[1.03]">
              <span className="ph rounded bg-ink/70 px-2 py-1">{coach.media}</span>
            </div>
            <div className="p-5">
              <h3 className="ph font-display text-lg font-semibold">{coach.name}</h3>
              <p className="ph mt-1 text-sm text-muted">{coach.title}</p>
              <p className="ph mt-2 text-sm leading-relaxed">{coach.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="dark-fade py-16 md:py-24">
      <div className="wrap">
        <Kicker light>{testimonials.kicker}</Kicker>
        <Heading light>{testimonials.title}</Heading>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <figure
              key={i}
              className="group reveal rounded-2xl border border-white/10 bg-ink-2 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-flame/60"
            >
              <div className="flex aspect-[2/1] flex-col items-center justify-center gap-3 rounded-xl bg-ink-3 p-3 text-center text-sm font-semibold text-white">
                <PlayMark small />
                <span className="ph">{item.media}</span>
              </div>
              <span
                aria-hidden
                className="mt-3 block h-8 font-display text-6xl leading-[1] text-flame"
              >
                &ldquo;
              </span>
              <blockquote className="ph leading-relaxed text-mist">
                {item.quote}
              </blockquote>
              <figcaption className="ph mt-3 text-sm font-semibold text-white">
                {item.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const safetyIcons = [
  "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  "M16 19v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1M9 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM22 19v-1a4 4 0 00-3-3.9M16 3.2a3.5 3.5 0 010 6.6",
  "M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z",
];

function Safety() {
  return (
    <section className="band section-fade py-16 md:py-24">
      <Kicker>{safety.kicker}</Kicker>
      <Heading>{safety.title}</Heading>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {safety.items.map((item, i) => (
          <div
            key={item.title}
            className="group reveal rounded-2xl border border-line/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-ink text-flame transition-colors duration-300 group-hover:bg-flame group-hover:text-ink">
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-6 fill-none stroke-current stroke-[1.8]"
              >
                <path d={safetyIcons[i]} />
              </svg>
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// A rising staircase: each level starts higher and darker than the last.
const levelStyles = [
  "lg:mt-24 bg-white",
  "lg:mt-16 bg-white",
  "lg:mt-8 bg-white",
  "bg-ink text-white [&_h3]:text-white [&_p]:text-mist",
];

function Levels() {
  return (
    <section id="levels" className="band section-fade py-16 md:py-24">
      <Kicker>{levels.kicker}</Kicker>
      <Heading>{levels.title}</Heading>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {levels.items.map((level, i) => (
          <div
            key={level.label}
            className={`reveal flex flex-col rounded-2xl border border-line/70 p-6 transition-transform duration-300 hover:-translate-y-1.5 ${levelStyles[i]}`}
          >
            <div aria-hidden className="mb-5 flex gap-1">
              {levels.items.map((_, square) => (
                <span
                  key={square}
                  className={`size-3 rounded-[3px] ${
                    square <= i ? "bg-flame" : "bg-line/50"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-bold tracking-[0.12em] text-ember uppercase">
              {level.label}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{level.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{level.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {levels.notes.map((note) => (
          <p
            key={note}
            className="reveal rounded-xl border border-dashed border-mist bg-white px-6 py-4 text-sm leading-relaxed"
          >
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faqs" className="band section-fade py-16 md:py-24">
      <Kicker>{faqs.kicker}</Kicker>
      <Heading>{faqs.title}</Heading>
      <div className="chess-alt reveal mt-8 grid overflow-hidden rounded-2xl border border-line shadow-xl shadow-ink/10 lg:grid-cols-3">
        {faqs.items.map((item) => (
          <div key={item.q} className="p-6 lg:p-7">
            <h3 className="font-display text-lg leading-snug font-semibold">
              {item.q}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{item.a}</p>
          </div>
        ))}
        <div className="p-6 lg:p-7">
          <h3 className="font-display text-lg leading-snug font-semibold">
            {faqs.more.q}
          </h3>
          <p className="mt-2 text-sm leading-relaxed opacity-80">{faqs.more.a}</p>
          <a
            href="#book"
            className="mt-4 inline-block rounded-lg bg-flame px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-flame-deep"
          >
            {faqs.more.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="band section-fade py-16 md:py-24">
      <div className="chess-gradient reveal relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white md:py-20">
        <div className="relative">
          <p className="mb-4 text-sm font-bold text-flame">{closing.kicker}</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-[1.08] font-bold tracking-tight text-balance md:text-5xl">
            {closing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">{closing.body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#book"
              className="rounded-lg bg-flame px-6 py-3.5 font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-flame-deep"
            >
              Book my free session
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/70 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold tracking-[0.12em] text-white uppercase">
      {children}
    </p>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-sm text-mist">
      <div aria-hidden className="chess-strip h-8" />
      <div className="wrap grid gap-10 pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-white">
            Outpace Academy
          </p>
          <p className="mt-2 font-semibold text-flame">{footer.tagline}</p>
          <p className="mt-3 max-w-xs leading-relaxed">{footer.blurb}</p>
          <a
            href="#book"
            className="mt-5 inline-block rounded-lg bg-flame px-4 py-2.5 font-bold text-ink transition-colors hover:bg-flame-deep"
          >
            Book free session
          </a>
        </div>
        <nav aria-label="Footer">
          <FooterTitle>Explore</FooterTitle>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <FooterTitle>{footer.programTitle}</FooterTitle>
          <ul className="space-y-2.5">
            {footer.program.map((item) => (
              <li key={item} className="leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FooterTitle>Get in touch</FooterTitle>
          <ul className="space-y-2.5">
            <li>{footer.location}</li>
            <li>
              <a
                href={`https://${footer.website}`}
                className="transition-colors hover:text-white"
              >
                {footer.website}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>{footer.copyright}</p>
          <p className="ph w-fit">{footer.privacy}</p>
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
        <Skills />
        <Steps />
        <Includes />
        <Preview />
        <Outcomes />
        <Approach />
        <MissionVision />
        <Coaches />
        <Testimonials />
        <Safety />
        <Levels />
        <Faqs />
        <Closing />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
