import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({ onOpenCv }: { onOpenCv: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a href="#top" className="font-mono text-sm font-semibold tracking-wider">
        {profile.handle}<span className="text-primary">/</span>CS-26
      </a>
      <div className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</a>
        ))}
        <button onClick={onOpenCv} className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">View CV</button>
      </div>
      <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-14 border-b border-border bg-background p-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base">{l.label}</a>
          ))}
          <button onClick={() => { setOpen(false); onOpenCv(); }} className="mt-2 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground">View CV</button>
        </div>
      )}
    </nav>
  );
}
