import { useEffect, useState } from "react";

/** Types and deletes each phrase in turn. Lightweight: a single timer. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length] ?? "";
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const delay = done ? 1800 : deleting ? 30 : 60;
    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (empty) {
        setDeleting(false);
        return setIndex((i) => i + 1);
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return (
    <span className="text-primary" aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[0.08em] animate-pulse bg-primary align-baseline">&nbsp;</span>
    </span>
  );
}
