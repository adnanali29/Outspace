import Image from "next/image";
import type { ReactNode } from "react";
import {
  approach,
  careAndSupport,
  closing,
  faqs,
  footer,
  founder,
  heart,
  hero,
  insideSession,
  learn,
  missionVision,
  navLinks,
  outcomes,
  program,
  services,
  start,
  stories,
  talkToUs,
  team,
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
    <h2 className="reveal max-w-3xl font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance uppercase text-ink md:text-[2.65rem]">
      {children}
    </h2>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-3 text-xs font-bold tracking-widest uppercase ${light ? "text-peach" : "text-ember"}`}>
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

function Ring({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute rounded-full ${className}`} />
  );
}

function MonitorIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`fill-none stroke-current stroke-[1.5] ${className}`}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

/* ─── 1. HERO ─── */
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
        <div className="absolute inset-x-0 top-0 h-[23rem] lg:inset-y-0 lg:h-auto">
          <HeroSlideshow />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -bottom-px bg-gradient-to-b from-cream/70 via-cream/85 to-cream to-90% lg:bg-gradient-to-r lg:from-cream/95 lg:via-cream/80 lg:to-cream/40 lg:to-100%"
          />
        </div>
        <div className="wrap-wide relative grid items-center gap-x-14 gap-y-8 py-8 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[minmax(0,1fr)_26.5rem] lg:py-10 short:py-5 xl:gap-x-20">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-teal-deep">
              <MonitorIcon className="size-4" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[2.2rem] leading-[1.1] font-bold tracking-tight text-balance uppercase sm:text-4xl xl:text-[3.25rem] short:mt-3 short:text-[2.4rem]">
              {hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink lg:mx-0 lg:text-xl short:mt-3 short:text-lg">
              {hero.lede}
            </p>
            {hero.subLede && (
              <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
                {hero.subLede}
              </p>
            )}
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

/* ─── 2. THE HEART OF OUTPACE (Clean, Justified, Balanced Design) ─── */
function Heart() {
  return (
    <section
      id="heart"
      className="relative overflow-hidden bg-teal-deep py-16 text-white md:py-24"
    >
      <Ring className="-right-32 -bottom-32 size-[28rem] border-[3rem] border-white/5" />
      <div className="wrap relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Column: Clean, Structured Text */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <Kicker light>{heart.kicker}</Kicker>
              <h2 className="reveal font-display text-3xl leading-[1.12] font-bold tracking-tight text-balance uppercase md:text-4xl lg:text-[2.65rem]">
                {heart.title}
              </h2>
            </div>

            {/* 3 key needs */}
            <div className="reveal space-y-2.5 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15">
              {heart.lines.map((line, i) => (
                <div
                  key={line}
                  className="flex items-center gap-3 text-sm leading-snug text-white/95 md:text-base"
                >
                  <span
                    aria-hidden
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-peach font-display text-xs font-bold text-ember"
                  >
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>

            {/* Narrative description */}
            <p className="reveal text-base leading-relaxed text-white/90 md:text-lg">
              {heart.body}
            </p>

            {/* Standout promise card */}
            <div className="reveal rounded-2xl bg-flame px-5 py-4 font-display text-lg leading-snug font-bold text-ink shadow-lg shadow-black/15 md:text-xl">
              {heart.promise}
            </div>

            {/* Caring mentor note */}
            <div className="reveal flex items-center gap-3.5 rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm ring-1 ring-white/10">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-peach text-2xl text-ember">
                <Piece type="q" className="text-ember" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-peach">
                  Your Child Growth Mentor
                </p>
                <p className="text-xs leading-snug text-white/85">
                  A caring presence who listens, understands and helps your child grow with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Crisp Video Player Card */}
          <div className="reveal flex flex-col justify-center">
            <div className="overflow-hidden rounded-3xl bg-black/30 p-3.5 shadow-2xl ring-1 ring-white/20 backdrop-blur-md sm:p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/60 shadow-inner">
                {/* Video element: place video at public/video/intro.mp4 */}
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/hero/online-chess-coaching-warmth.jpg"
                  className="size-full object-cover"
                >
                  <source src="/video/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-3.5 flex items-center justify-between px-2 text-xs text-white/80">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-flame" />
                  <span className="font-semibold text-peach">Live Online Session</span>
                </span>
                <span>Coach &amp; Mentor in action</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. WHAT YOUR CHILD DEVELOPS ─── */
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
      </div>
    </section>
  );
}

/* ─── PLAY CHESS ─── */
function Play() {
  return (
    <section id="play" className="bg-mist py-12 md:py-20">
      <div className="wrap">
        <ChessGame />
      </div>
    </section>
  );
}

/* ─── 8. HOW IT WORKS ─── */
function Start() {
  return (
    <section id="start" className="py-12 md:py-20">
      <div className="wrap">
        <Kicker>{start.kicker}</Kicker>
        <Heading>{start.title}</Heading>
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
      </div>
    </section>
  );
}

/* ─── 9. THE PROGRAMME ─── */
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
          <h3 className="font-display text-xl font-bold uppercase md:text-2xl">{program.numbersTitle}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
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

          <h3 className="mt-6 font-display text-lg font-bold uppercase">{program.listTitle}</h3>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
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

/* ─── 10. TAKE A LOOK INSIDE ─── */
function InsideSession() {
  return (
    <section id="inside" className="py-12 md:py-20">
      <div className="wrap">
        <Kicker>{insideSession.kicker}</Kicker>
        <Heading>{insideSession.title}</Heading>
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insideSession.items.map((item) => (
            <li key={item} className="reveal flex items-start gap-3 rounded-2xl bg-mist p-5 ring-1 ring-line">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-deep text-white">
                <CheckMark className="size-3.5" />
              </span>
              <p className="text-sm leading-relaxed md:text-base">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <a href="#book" className={primaryButton}>
            Book a Free Introductory &amp; Assessment Session
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 11. THE OUTCOMES ─── */
function Outcomes() {
  return (
    <section id="outcomes" className="bg-mist py-12 md:py-20">
      <div className="wrap">
        <Kicker>{outcomes.kicker}</Kicker>
        <Heading>{outcomes.title}</Heading>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {outcomes.items.map((item) => (
            <div
              key={item.title}
              className="reveal flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-peach text-3xl text-flame-deep">
                <Piece type={item.piece} className="text-3xl" />
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug font-bold uppercase text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 12. WHY OUTPACE ─── */
function WhyOutpace() {
  return (
    <section id="why-outpace" className="py-16 md:py-24">
      <div className="wrap">
        <Kicker>{approach.kicker}</Kicker>
        <Heading>{approach.title}</Heading>

        <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-line">
          <div className="hidden grid-cols-2 bg-teal-deep px-6 py-3.5 text-sm font-semibold uppercase text-white md:grid">
            <span>What your child needs</span>
            <span>How Outpace supports them</span>
          </div>
          <ul className="divide-y divide-line bg-white">
            {approach.rows.map((row) => (
              <li key={row.need} className="reveal grid gap-1 px-6 py-4.5 md:grid-cols-2 md:gap-6">
                <p className="font-medium text-muted">{row.need}</p>
                <p className="font-display leading-snug font-bold text-ink">{row.answer}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal mt-6 rounded-2xl bg-cream px-6 py-4 text-center font-display text-base font-bold text-teal-deep ring-1 ring-line md:text-lg">
          {approach.teamNote}
        </p>
      </div>
    </section>
  );
}

/* ─── 13. OUR MISSION & VISION (1 Section, 2 Side-by-Side Cards) ─── */
function MissionVision() {
  const { mission, vision } = missionVision;
  return (
    <section id="mission" className="bg-cream py-16 md:py-24">
      <div className="wrap">
        <div className="text-center">
          <Kicker>{missionVision.kicker}</Kicker>
          <Heading>{missionVision.title}</Heading>
        </div>

        {/* 2 equal-height cards: Mission & Vision */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Card 1: Our Mission */}
          <article className="reveal flex flex-col justify-between rounded-3xl bg-teal-deep p-8 text-white shadow-xl ring-1 ring-white/10 md:p-10">
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider uppercase text-peach">
                {mission.title}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug font-bold text-balance text-white md:text-3xl">
                &ldquo;{mission.subtitle}&rdquo;
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
                {mission.body}
              </p>
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="font-display text-base font-bold text-peach">
                {mission.close}
              </p>
            </div>
          </article>

          {/* Card 2: Our Vision */}
          <article className="reveal flex flex-col justify-between rounded-3xl bg-peach p-8 text-ink shadow-xl ring-1 ring-line md:p-10">
            <div>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wider uppercase text-ember">
                {vision.title}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug font-bold text-balance text-ink md:text-3xl">
                &ldquo;{vision.subtitle}&rdquo;
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/90 md:text-lg">
                {vision.body}
              </p>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="font-display text-base font-bold text-flame-deep">
                A world where every child is understood and given the opportunity to thrive.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ─── 14. OUR FOUNDER ─── */
function Founder() {
  return (
    <section id="founder" className="py-16 md:py-24">
      <div className="wrap max-w-4xl">
        <Kicker>{founder.role}</Kicker>
        <Heading>{founder.name}</Heading>
        <p className="reveal mt-2 font-display text-xl leading-snug font-bold uppercase text-flame-deep md:text-2xl">
          {founder.tagline}
        </p>

        <div className="reveal mt-8 rounded-3xl bg-teal-deep p-8 text-white shadow-xl shadow-teal-deep/20 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="grid size-20 shrink-0 place-items-center rounded-full bg-peach font-display text-3xl font-bold text-ember">
              O
            </div>
            <div className="space-y-4 text-base leading-relaxed opacity-95 md:text-lg">
              {founder.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 30)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 15. CARE AND SUPPORT ─── */
function CareAndSupport() {
  return (
    <section id="care" className="bg-teal-deep py-14 text-white md:py-20">
      <div className="wrap">
        <Kicker light>{careAndSupport.title}</Kicker>
        <h2 className="reveal font-display text-3xl leading-[1.15] font-bold tracking-tight text-balance uppercase md:text-4xl">
          {careAndSupport.subtitle}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {careAndSupport.items.map((item) => (
            <li key={item.title} className="reveal rounded-2xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/15">
              <h3 className="font-display text-lg font-bold text-peach">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-90">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── 16. THE OUTPACE CHESS JOURNEY ─── */
function Journey() {
  return (
    <section id="journey" className="bg-mist py-12 md:py-20">
      <div className="wrap">
        <Kicker>{start.levelsTitle}</Kicker>
        <Heading>{start.levelsSubtitle}</Heading>
        <p className="mt-2 text-muted md:text-lg">{start.levelsIntro}</p>

        <ol className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {start.levels.map((level, i) => (
            <li
              key={level.name}
              className="reveal flex flex-col rounded-2xl bg-white p-4 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 md:flex-row md:gap-4 md:p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream text-ember">
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

/* ─── STORIES FROM OUR FAMILIES ─── */
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

        <h3 className="reveal mt-8 font-display text-xl font-bold uppercase md:text-2xl">
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

/* ─── BEYOND CHESS (Small Glimpse Card) ─── */
function Services() {
  return (
    <section id="services" className="py-10 md:py-16">
      <div className="wrap">
        <div className="reveal flex flex-col items-start justify-between gap-6 rounded-3xl bg-mist p-6 ring-1 ring-line sm:p-8 md:flex-row md:items-center md:gap-10">
          <div className="max-w-xl">
            <Kicker>{services.kicker}</Kicker>
            <h3 className="font-display text-2xl font-bold tracking-tight uppercase text-ink md:text-3xl">
              {services.title}
            </h3>
            <p className="mt-1 text-sm text-muted md:text-base">
              {services.lead}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {services.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm ring-1 ring-line transition-all hover:bg-teal-deep hover:text-white"
                >
                  <span>{item.name}</span>
                  <span className="text-muted group-hover:text-white">→</span>
                </a>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <a
              href={services.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-deep ring-1 ring-teal-deep/30 shadow-sm transition-colors hover:bg-teal-deep hover:text-white"
            >
              {services.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MEET OUR TEAM (Placed right above FAQs) ─── */
function Team() {
  return (
    <section id="team" className="bg-cream py-16 md:py-24">
      <div className="wrap">
        <div className="text-center">
          <Kicker>{team.kicker}</Kicker>
          <Heading>{team.title}</Heading>
          <p className="reveal mx-auto mt-3 max-w-2xl text-muted md:text-lg">
            {team.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {team.members.map((member) => (
            <div
              key={member.name}
              className="group reveal flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-mist">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-teal-deep">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 17. FAQs ─── */
function Faqs() {
  return (
    <section id="faqs" className="py-12 md:py-20">
      <div className="wrap">
        <Kicker>{faqs.kicker}</Kicker>
        <Heading>{faqs.title}</Heading>
        <p className="mt-2 mb-6 text-muted">{faqs.hint}</p>
        <FaqBoard />
      </div>
    </section>
  );
}

/* ─── CLOSING CTA ─── */
function Closing() {
  return (
    <section className="relative overflow-hidden bg-teal-deep py-16 text-center text-white md:py-24">
      <Ring className="-top-48 -left-48 size-[30rem] border-[3.5rem] border-white/5" />
      <Ring className="-right-40 -bottom-56 size-[30rem] border-[3.5rem] border-flame/25" />
      <div className="wrap relative">
        <Kicker light>{closing.kicker}</Kicker>
        <h2 className="mx-auto max-w-2xl font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance uppercase md:text-[3rem]">
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

/* ─── FOOTER ─── */
function FooterTitle({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-display text-base font-bold uppercase text-ink">{children}</p>;
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

/* ─── FULL LANDING PAGE ─── */
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
        {/* 1. Hero */}
        <Hero savedLead={savedLead} onSubmit={onSubmit} />

        {/* 2. The Heart of Outpace */}
        <Heart />

        {/* 7. What your child develops */}
        <Learn />

        {/* Play chess */}
        <Play />

        {/* 8. How it works */}
        <Start />

        {/* 9. The programme */}
        <Program />

        {/* 10. Take a look inside */}
        <InsideSession />

        {/* 11. The outcomes */}
        <Outcomes />

        {/* 12. Why Outpace */}
        <WhyOutpace />

        {/* 13. Our Mission & Vision (1 section, 2 cards: Mission & Vision) */}
        <MissionVision />

        {/* 14. Our Founder */}
        <Founder />

        {/* 15. Care and support */}
        <CareAndSupport />

        {/* 16. The Outpace chess journey */}
        <Journey />

        {/* Family stories */}
        <Stories />

        {/* Beyond chess (Small glimpse card) */}
        <Services />

        {/* Meet our team (Positioned directly above FAQs) */}
        <Team />

        {/* 17. Questions parents ask (FAQs) */}
        <Faqs />

        {/* Closing CTA */}
        <Closing />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
