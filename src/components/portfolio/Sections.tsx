import { useState } from "react";
import { Check, Copy, MapPin, ShieldCheck, ShieldAlert, BadgeCheck, Mail, Phone } from "lucide-react";
import {
  credentials, leadership, mercorCredential, profile, securityComparison, stackPillars, stats, timeline, typewriterPhrases,
} from "@/data/portfolio";
import mercorCert from "@/assets/mercor-intro-to-agents-certificate.png.asset.json";
import { Typewriter } from "./Typewriter";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (value: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1600);
  };
  return { copied, copy };
}

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-primary">{children}</p>;
}

export function HeroBento({ onOpenCv }: { onOpenCv: () => void }) {
  const { copied, copy } = useCopy();
  const email = profile.emails[0];
  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-4 px-4 pt-10 sm:px-6 lg:grid-cols-3">
      <div className="bento relative overflow-hidden p-6 sm:p-10 lg:col-span-2">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-success">
            <span className="size-1.5 animate-pulse rounded-full bg-success" /> Available for opportunities
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
            I engineer<br />
            <span className="block min-h-[2.2em] sm:min-h-[2.1em]"><Typewriter phrases={typewriterPhrases} /></span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">View work</a>
            <button onClick={onOpenCv} className="rounded-md border border-border px-5 py-2.5 text-sm hover:border-primary">Preview CV</button>
            <button onClick={() => copy(email)} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground">
              {copied === email ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              {copied === email ? "Email copied" : "Copy email"}
            </button>
          </div>
        </div>
      </div>
      <div className="bento overflow-hidden">
        <img src={profile.photo} alt="Muhammed Ishaq — AI Engineer and Full-Stack Developer" className="h-80 w-full object-cover object-top lg:h-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-3">
        {stats.map((s) => (
          <div key={s.label} className="bento p-5">
            <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StackAndSecurity() {
  return (
    <section id="stack" className="mx-auto grid max-w-6xl scroll-mt-24 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-5">
      <div className="bento p-6 lg:col-span-3">
        <Eyebrow>// technical stack</Eyebrow>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {stackPillars.map((p) => (
            <div key={p.title}>
              <h3 className="text-sm font-semibold">{p.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.items.map((i) => <span key={i} className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bento p-6 lg:col-span-2">
        <Eyebrow>// defensive engineering</Eyebrow>
        <h3 className="mt-2 text-xl font-semibold">Vibe code vs. hardened code</h3>
        <p className="mt-1 text-sm text-muted-foreground">Shipping fast is easy. Shipping safely is the job.</p>
        <ul className="mt-4 space-y-3">
          {securityComparison.map((row) => (
            <li key={row.hardened} className="grid grid-cols-2 gap-2 text-xs">
              <span className="flex gap-1.5 text-muted-foreground line-through decoration-destructive/60"><ShieldAlert className="size-3.5 shrink-0 text-destructive" />{row.vibe}</span>
              <span className="flex gap-1.5"><ShieldCheck className="size-3.5 shrink-0 text-success" />{row.hardened}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CredentialsDock() {
  return (
    <section id="credentials" className="mx-auto grid max-w-6xl scroll-mt-24 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-3">
      <a href={mercorCredential.href} target="_blank" rel="noreferrer" className="bento group overflow-hidden hover:border-primary/50 hover:shadow-glow">
        <img src={mercorCert.url} alt="Mercor Introduction to Agents certificate awarded to Muhammed Ishaq" className="aspect-[4/3] w-full object-cover object-top" loading="lazy" />
        <div className="p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Latest · {mercorCredential.date}</span>
          <h3 className="mt-1 font-semibold">{mercorCredential.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">{mercorCredential.issuer} · {mercorCredential.id}</p>
          <p className="mt-3 text-xs text-primary group-hover:underline">Verify authenticity →</p>
        </div>
      </a>
      <div className="bento p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <Eyebrow>// verified learning</Eyebrow>
          <span className="font-mono text-[10px] text-muted-foreground">{credentials.length + 1} credentials</span>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {credentials.map((c) => {
            const inner = (
              <>
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-sm leading-snug">{c.title}</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{c.issuer} · {c.date}</span>
                </span>
              </>
            );
            return (
              <li key={c.title}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="flex gap-2 rounded-md p-2 hover:bg-muted">{inner}</a>
                ) : (
                  <div className="flex gap-2 p-2">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bento p-6 lg:col-span-2">
        <Eyebrow>// leadership & impact</Eyebrow>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {leadership.map((l) => (
            <div key={l.role}>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">{l.org} · {l.period}</p>
              <h3 className="text-sm font-semibold">{l.role}</h3>
              <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                {l.points.map((p) => <li key={p}>→ {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bento p-6">
        <Eyebrow>// journey</Eyebrow>
        <ol className="mt-4 space-y-4 border-l border-border pl-4">
          {timeline.map((t) => (
            <li key={t.title} className="relative">
              <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-primary" />
              <p className="font-mono text-[10px] text-muted-foreground">{t.period}</p>
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs text-muted-foreground">{t.org}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ContactFooter() {
  const { copied, copy } = useCopy();
  return (
    <footer id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-28 pt-10 sm:px-6">
      <div className="bento relative overflow-hidden p-8 sm:p-12">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-5xl">Let's build something <span className="text-primary">secure</span>.</h2>
            <p className="mt-4 text-muted-foreground">Open to internships, freelance projects and AI training work. I respond fast.</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />{profile.location}</p>
          </div>
          <div className="space-y-3">
            {profile.emails.map((e) => (
              <button key={e} onClick={() => copy(e)} className="flex w-full items-center justify-between gap-3 rounded-md border border-border px-4 py-3 text-left font-mono text-sm hover:border-primary">
                <span className="flex min-w-0 items-center gap-2"><Mail className="size-4 shrink-0 text-primary" /><span className="truncate">{e}</span></span>
                {copied === e ? <Check className="size-4 text-success" /> : <Copy className="size-4 text-muted-foreground" />}
              </button>
            ))}
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-md border border-border px-4 py-3 font-mono text-sm hover:border-primary">
              <Phone className="size-4 text-primary" />{profile.phone}
            </a>
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 {profile.name} — {profile.location}</p>
    </footer>
  );
}
