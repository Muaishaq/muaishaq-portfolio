import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { ArrowUpRight, Github, Layers, ChevronDown, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { categoryLabels, projects, type Project, type ProjectCategory } from "@/data/portfolio";

type Filter = ProjectCategory | "all";
const FILTERS = Object.keys(categoryLabels) as Filter[];

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="flex gap-3 font-mono text-[11px] uppercase tracking-wider">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-primary hover:underline">
          Live <ArrowUpRight className="size-3" />
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <Github className="size-3" /> Code
        </a>
      )}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span key={s} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
      ))}
    </div>
  );
}

/** Captured page that slowly scrolls inside a masked viewport, like a video. */
function SitePreview({ p, animated = true, className = "" }: { p: Project; animated?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`site-preview rounded-lg border border-border bg-card ${className}`}>
      {inView && p.preview && (
        <div
          className={animated ? "site-preview-scroll" : "site-preview-static"}
          style={{ backgroundImage: `url(${p.preview})` }}
          role="img"
          aria-label={`Live capture of ${p.title}`}
        />
      )}
      <span className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary backdrop-blur-sm">
        <span className="size-1.5 animate-pulse rounded-full bg-success" /> live
      </span>
    </div>
  );
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-popover">
        {project && (
          <>
            <DialogHeader>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{categoryLabels[project.category]} · {project.year}</span>
              <DialogTitle className="font-display text-2xl">{project.title}</DialogTitle>
              <DialogDescription>{project.summary}</DialogDescription>
            </DialogHeader>
            {project.live && (
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
                  <span className="size-2 rounded-full bg-destructive" /><span className="size-2 rounded-full bg-chart-4" /><span className="size-2 rounded-full bg-success" />
                  <span className="ml-2 flex-1 truncate font-mono text-[10px] text-muted-foreground">{project.live}</span>
                  <a href={project.live} target="_blank" rel="noreferrer" aria-label="Open site in a new tab" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary hover:underline">
                    Open <ExternalLink className="size-3" />
                  </a>
                </div>
                <iframe
                  src={project.live}
                  title={`${project.title} live preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  className="h-[55vh] w-full bg-background"
                />
                <p className="border-t border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                  Browse the real site right here — links inside it work. Prefer a full screen? Use <span className="font-mono text-primary">Open ↗</span>.
                </p>
              </div>
            )}
            <div className="space-y-4">
              {project.highlights && (
                <ul className="space-y-2 text-sm">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2"><span className="text-primary">→</span>{h}</li>
                  ))}
                </ul>
              )}
              <Tags items={project.stack} />
              <ProjectLinks p={project} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [showArchive, setShowArchive] = useState(false);

  const visible = useMemo(() => projects.filter((p) => filter === "all" || p.category === filter), [filter]);
  const featured = visible.filter((p) => p.flagship);
  const rest = visible.filter((p) => !p.flagship);
  const primary = featured.length ? featured : rest.slice(0, 4);
  const archive = featured.length ? rest : rest.slice(4);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// selected work</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Flagship systems</h2>
        </div>
        <div role="tablist" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => { setFilter(f); setShowArchive(false); }}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {categoryLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {primary.map((p, i) => (
          <button key={p.id} onClick={() => setSelected(p)}
            className={`bento group flex flex-col gap-4 p-6 text-left hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow ${i === 0 && primary.length === 3 ? "md:row-span-2" : ""}`}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>{categoryLabels[p.category]} · {p.year}</span>
              {p.flagship && <span className="text-primary">★ Flagship</span>}
            </div>
            {p.live && <SitePreview p={p} className="aspect-[16/10] w-full" />}
            <h3 className="text-xl font-semibold group-hover:text-primary">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.summary}</p>
            {p.highlights && i === 0 && (
              <ul className="space-y-1.5 text-sm">
                {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-primary">→</span>{h}</li>)}
              </ul>
            )}
            <div className="mt-auto space-y-3">
              <Tags items={p.stack} />
              <div className="flex items-center justify-between">
                <ProjectLinks p={p} />
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary"><Layers className="size-3.5" /> Details</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {archive.length > 0 && (
        <div className="mt-6">
          <button onClick={() => setShowArchive((s) => !s)} className="mx-auto flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-foreground">
            {showArchive ? "Hide" : "Explore"} project archive ({archive.length})
            <ChevronDown className={`size-4 transition-transform ${showArchive ? "rotate-180" : ""}`} />
          </button>
          {showArchive && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {archive.map((p) => (
                <button key={p.id} onClick={() => setSelected(p)} className="bento flex flex-col gap-2 p-4 text-left hover:border-primary/50">
                  {p.live && <SitePreview p={p} animated={false} className="aspect-[16/10] w-full" />}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{categoryLabels[p.category]} · {p.year}</span>
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{p.summary}</p>
                  <div className="mt-auto pt-2"><ProjectLinks p={p} /></div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
