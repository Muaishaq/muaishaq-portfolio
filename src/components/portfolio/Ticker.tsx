/** Broadcast-style news marquee. Pure CSS animation (GPU transform). */
export function Ticker({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="flex h-9 items-center overflow-hidden border-b border-border bg-card/60">
      <span className="z-10 flex h-full shrink-0 items-center gap-2 bg-primary px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" /> Live
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-6 font-mono text-xs text-muted-foreground">
          {loop.map((item, i) => (
            <span key={i} aria-hidden={i >= items.length}>
              <span className="mr-3 text-primary">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
