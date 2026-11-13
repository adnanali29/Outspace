"use client";

import { useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "@/content";
import { saveHomepage, uploadImage } from "../actions";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "../ui";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };
type Path = (string | number)[];

// The page, section by section, in the order visitors see it.
const SECTIONS: { id: string; label: string; keys: string[]; note?: string }[] = [
  { id: "hero", label: "Hero banner", keys: ["hero", "heroImages", "heroSlideSeconds", "trust"] },
  { id: "heart", label: "The heart of Outpace", keys: ["heart"] },
  { id: "learn", label: "What your child develops", keys: ["learn"] },
  { id: "start", label: "How it works & levels", keys: ["start"] },
  { id: "inside", label: "Take a look inside", keys: ["insideSession"] },
  { id: "game", label: "Play chess", keys: ["game"] },
  { id: "program", label: "The programme", keys: ["program"] },
  { id: "outcomes", label: "Outcomes", keys: ["outcomes"] },
  { id: "approach", label: "Why Outpace", keys: ["approach"] },
  { id: "belief", label: "Purpose, vision & founder", keys: ["belief"] },
  { id: "care", label: "Care and support", keys: ["careAndSupport"] },
  {
    id: "stories",
    label: "Family stories",
    keys: ["stories"],
    note: "Parent quotes are shown word for word, so only change them if the parent has agreed.",
  },
  { id: "services", label: "Beyond chess", keys: ["services"] },
  { id: "team", label: "Our team", keys: ["team"] },
  { id: "faqs", label: "FAQs", keys: ["faqs"] },
  { id: "closing", label: "Closing banner", keys: ["closing"] },
  {
    id: "booking",
    label: "Booking form",
    keys: ["sessionSlots", "sessionMinutes", "childAges", "chessLevels"],
    note: "These are the choices parents see on the booking form.",
  },
  { id: "thanks", label: "Thank-you page", keys: ["thanks"], note: "Shown after a parent books a session." },
  { id: "chrome", label: "Menu & footer", keys: ["navLinks", "footer"] },
  {
    id: "contact",
    label: "Contact & WhatsApp",
    keys: ["contact"],
    note: "Every WhatsApp button on the page uses this number and message.",
  },
  { id: "seo", label: "Google & sharing", keys: ["seo"], note: "The page title and description shown on Google." },
];

const LABELS: Record<string, string> = {
  eyebrow: "Small line above the title",
  titleAccent: "Highlighted end of the title",
  lede: "Main text",
  subLede: "Second line",
  playLink: "Chess game link text",
  kicker: "Small label above the heading",
  src: "Photo",
  image: "Photo",
  alt: "Photo description (read by screen readers and Google)",
  q: "Question",
  a: "Answer",
  href: "Link",
  desc: "Description",
  by: "Name",
  piece: "Chess piece icon",
  heroSlideSeconds: "Seconds per photo",
  heroImages: "Slideshow photos",
  trust: "Numbers under the hero",
  whatsappNumber: "WhatsApp number (digits with country code, like 918296014487)",
  whatsappMessage: "Message that is pre-filled in WhatsApp",
  phone: "Phone number, as shown",
  phoneHref: "Phone link (tel:+91…)",
  videoUrl: "Video (a link, or a /videos/… path)",
  sessionSlots: "Session times",
  weekday: "Day of the week (0 = Sunday, 6 = Saturday)",
  hour: "Hour (0–23)",
  sessionMinutes: "Session length in minutes (for the calendar file)",
  childAges: "Child ages",
  chessLevels: "Chess levels",
  navLinks: "Menu links",
  numbersNote: "Note under the numbers",
  teamNote: "Note under the table",
  missionBody: "Mission text",
  missionClose: "Mission closing line",
  quoteAccent: "Second line of the quote",
  levelsNote: "Note under the levels",
  noteLink: "Note link text",
  cta: "Button text",
};

const LONG_FIELDS = new Set(["text", "body", "a", "quote", "bio", "desc", "answer", "description", "intro", "missionBody", "lede"]);
const HIDDEN = new Set(["game.levels.*.value"]);
const LOCKED_LISTS = new Set(["game.levels"]);
const PIECES = [
  { value: "p", label: "♟ Pawn" },
  { value: "n", label: "♞ Knight" },
  { value: "b", label: "♝ Bishop" },
  { value: "r", label: "♜ Rook" },
  { value: "q", label: "♛ Queen" },
  { value: "k", label: "♚ King" },
];

function humanize(key: string) {
  if (LABELS[key]) return LABELS[key];
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// "team.groups.*.members" style key for a path, used by the rules above.
const ruleKey = (path: Path) => path.map((part) => (typeof part === "number" ? "*" : part)).join(".");

function setIn(target: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(target)) {
    const copy = [...target];
    copy[head as number] = setIn(copy[head as number], rest, value);
    return copy;
  }
  const object = (target ?? {}) as JsonObject;
  return { ...object, [head]: setIn(object[head as string], rest, value) };
}

// The default first item of a list, used as the shape for new items.
function templateFor(path: Path): Json | undefined {
  let node: unknown = defaultContent;
  for (const part of path) {
    if (node === undefined || node === null) return undefined;
    node = typeof part === "number" ? (node as unknown[])[0] : (node as Record<string, unknown>)[part];
  }
  return Array.isArray(node) ? (node[0] as Json | undefined) : undefined;
}

function blank(template: Json, key = ""): Json {
  if (typeof template === "string") return key === "piece" ? template : "";
  if (typeof template === "number" || typeof template === "boolean" || template === null) return template;
  if (Array.isArray(template)) return [];
  return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, blank(v, k)]));
}

const isImageField = (key: string, value: string) =>
  key === "src" || key === "image" || /\.(jpe?g|png|webp|avif|gif)$/i.test(value) || value.startsWith("/media/");

function summaryOf(item: Json, index: number) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    for (const key of ["title", "name", "q", "label", "role", "need", "by", "value"]) {
      const value = item[key];
      if (typeof value === "string" && value) return value;
    }
  }
  return `Item ${index + 1}`;
}

// Shrinks big photos in the browser before upload, so they stay quick to load.
async function shrinkImage(file: File): Promise<File> {
  const MAX_SIDE = 2000;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 1_500_000) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const toBlob = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.85));
  let blob = await toBlob("image/webp");
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg");
  if (!blob) return file;
  const extension = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], `${file.name.replace(/\.\w+$/, "")}.${extension}`, { type: blob.type });
}

type FieldProps = { name: string; value: Json; path: Path; onChange: (path: Path, value: Json) => void };

function Field({ name, value, path, onChange }: FieldProps): ReactNode {
  const rule = ruleKey(path);
  if (HIDDEN.has(rule)) return null;
  const id = `f-${path.join("-")}`;
  const label = humanize(name);

  if (Array.isArray(value)) return <ListField name={name} value={value} path={path} onChange={onChange} />;

  if (value && typeof value === "object") {
    return (
      <fieldset className="space-y-4 rounded-2xl border border-line p-4">
        <legend className="px-1 text-sm font-bold text-teal-deep">{label}</legend>
        {Object.entries(value).map(([key, child]) => (
          <Field key={key} name={key} value={child} path={[...path, key]} onChange={onChange} />
        ))}
      </fieldset>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-semibold">
          {label}
        </label>
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(path, event.target.value === "" ? 0 : Number(event.target.value))}
          className={`${inputClass} max-w-40`}
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={value} onChange={(event) => onChange(path, event.target.checked)} />
        {label}
      </label>
    );
  }

  const text = typeof value === "string" ? value : "";
  if (name === "piece") {
    return (
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-semibold">
          {label}
        </label>
        <select id={id} value={text} onChange={(event) => onChange(path, event.target.value)} className={`${inputClass} max-w-48`}>
          {PIECES.map((piece) => (
            <option key={piece.value} value={piece.value}>
              {piece.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (isImageField(name, text)) return <ImageField id={id} label={label} value={text} path={path} onChange={onChange} />;

  const long = LONG_FIELDS.has(name) || text.length > 70;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {long ? (
        <textarea
          id={id}
          value={text}
          rows={3}
          onChange={(event) => onChange(path, event.target.value)}
          className={`${inputClass} [field-sizing:content] min-h-20 leading-relaxed`}
        />
      ) : (
        <input id={id} value={text} onChange={(event) => onChange(path, event.target.value)} className={inputClass} />
      )}
    </div>
  );
}

function ImageField({ id, label, value, path, onChange }: { id: string; label: string; value: string; path: Path; onChange: FieldProps["onChange"] }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const data = new FormData();
      data.set("file", await shrinkImage(file));
      const result = await uploadImage(data);
      if (result.url) onChange(path, result.url);
      else setError(result.error ?? "Upload failed.");
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold">{label}</p>
      <div className="flex items-start gap-3">
        <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-mist ring-1 ring-line">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of any path
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="grid size-full place-items-center text-xs text-muted">No photo</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file);
            }}
          />
          <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={secondaryButtonClass}>
            {busy ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
          </button>
          <input
            id={id}
            aria-label={`${label} address`}
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className={`${inputClass} text-xs! text-muted`}
          />
          {error && <p className="text-sm font-semibold text-ember">{error}</p>}
        </div>
      </div>
    </div>
  );
}

const iconButton =
  "grid size-8 cursor-pointer place-items-center rounded-full text-sm font-bold text-teal-deep ring-1 ring-line hover:bg-mist disabled:cursor-not-allowed disabled:opacity-30";

function ListField({ name, value, path, onChange }: FieldProps & { value: Json[] }) {
  const locked = LOCKED_LISTS.has(ruleKey(path));
  const template = templateFor(path) ?? value[0] ?? "";
  const objects = typeof template === "object" && template !== null;
  const hasPhoto = objects && Object.entries(template as JsonObject).some(([k, v]) => typeof v === "string" && isImageField(k, v));

  const move = (from: number, to: number) => {
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(path, next);
  };
  const remove = (index: number) => {
    if (objects && !window.confirm(`Remove “${summaryOf(value[index], index)}”?`)) return;
    onChange(path, value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="mb-2 text-sm font-bold text-teal-deep">
        {humanize(name)} <span className="font-semibold text-muted">({value.length})</span>
      </p>
      <ol className={hasPhoto ? "grid gap-3 sm:grid-cols-2 2xl:grid-cols-3" : "space-y-3"}>
        {value.map((item, index) => (
          <li key={index} className="rounded-2xl bg-cream/60 p-3 ring-1 ring-line">
            <div className="mb-2 flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-muted">
                {index + 1}. {objects ? summaryOf(item, index) : ""}
              </span>
              {!locked && (
                <>
                  <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => move(index, index - 1)} className={iconButton}>
                    &uarr;
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === value.length - 1}
                    onClick={() => move(index, index + 1)}
                    className={iconButton}
                  >
                    &darr;
                  </button>
                  <button type="button" aria-label="Remove" onClick={() => remove(index)} className={`${iconButton} text-ember!`}>
                    &times;
                  </button>
                </>
              )}
            </div>
            {objects && item && typeof item === "object" && !Array.isArray(item) ? (
              <div className="space-y-3">
                {Object.entries(item).map(([key, child]) => (
                  <Field key={key} name={key} value={child} path={[...path, index, key]} onChange={onChange} />
                ))}
              </div>
            ) : (
              <Field name={name === "childAges" ? "Age" : "Text"} value={item} path={[...path, index]} onChange={onChange} />
            )}
          </li>
        ))}
      </ol>
      {!locked && (
        <button type="button" onClick={() => onChange(path, [...value, blank(template)])} className={`${secondaryButtonClass} mt-3`}>
          + Add {hasPhoto ? "photo" : "item"}
        </button>
      )}
    </div>
  );
}

export function HomepageEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<JsonObject>(initial as unknown as JsonObject);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [sectionId, setSectionId] = useState(SECTIONS[0].id);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [saving, startSaving] = useTransition();
  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);
  const section = SECTIONS.find((item) => item.id === sectionId) ?? SECTIONS[0];

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change(path: Path, value: Json) {
    setStatus(null);
    setContent((current) => setIn(current, path, value) as JsonObject);
  }

  function save() {
    const snapshot = content;
    startSaving(async () => {
      try {
        await saveHomepage(snapshot);
        setSavedJson(JSON.stringify(snapshot));
        setStatus({ kind: "ok", text: "Saved. The live page now shows these changes." });
      } catch {
        setStatus({ kind: "error", text: "Couldn’t save. Check your connection and try again." });
      }
    });
  }

  function restoreSection() {
    if (!window.confirm(`Put “${section.label}” back to the original text and photos? Click Save to apply.`)) return;
    setContent((current) => {
      const next = { ...current };
      for (const key of section.keys) next[key] = (defaultContent as unknown as JsonObject)[key];
      return next;
    });
  }

  return (
    <div>
      <div className="sticky top-[6.5rem] z-20 -mx-4 mb-6 flex flex-wrap items-center gap-3 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8 lg:top-0">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold">Homepage</h1>
          <p aria-live="polite" className={`text-sm font-semibold ${status?.kind === "error" ? "text-ember" : dirty ? "text-flame-deep" : "text-muted"}`}>
            {status?.text ?? (dirty ? "You have unsaved changes." : "Everything is saved.")}
          </p>
        </div>
        <button type="button" onClick={save} disabled={!dirty || saving} className={primaryButtonClass}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div>
          <label htmlFor="section-picker" className="sr-only">
            Section
          </label>
          <select
            id="section-picker"
            value={section.id}
            onChange={(event) => setSectionId(event.target.value)}
            className={`${inputClass} lg:hidden`}
          >
            {SECTIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <nav aria-label="Sections" className="sticky top-24 hidden space-y-0.5 lg:block">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSectionId(item.id)}
                aria-current={item.id === section.id ? "true" : undefined}
                className={`block w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  item.id === section.id ? "bg-teal-deep text-white" : "text-ink hover:bg-mist"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <section className="min-w-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-line md:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold">{section.label}</h2>
              {section.note && <p className="mt-1 text-sm text-muted">{section.note}</p>}
            </div>
            <button type="button" onClick={restoreSection} className="cursor-pointer text-sm font-semibold text-ember underline underline-offset-2">
              Restore original
            </button>
          </div>
          <div className="space-y-6">
            {section.keys.map((key) => (
              <Field key={key} name={key} value={content[key]} path={[key]} onChange={change} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
