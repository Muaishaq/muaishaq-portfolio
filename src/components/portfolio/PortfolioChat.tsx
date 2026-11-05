import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import { askPortfolioAssistant } from "@/lib/portfolio-chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is TechTrust?",
  "What's his tech stack?",
  "Is he open to work?",
  "Tell me about his leadership",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Ishaq's assistant. Ask me about his projects, skills, credentials or how to hire him.",
};

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = useServerFn(askPortfolioAssistant);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { messages: next.slice(1).slice(-20) } });
      setMessages((m) => [...m, { role: "assistant", content: res.text }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Connection problem. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close assistant" : "Ask about Muhammed"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex items-center gap-2 rounded-full bg-electric px-4 h-12 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask AI"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Ask about Muhammed"
          className="fixed z-[60] inset-x-2 bottom-20 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px] h-[min(560px,calc(100dvh-7rem))] flex flex-col rounded-md border border-white/10 bg-carbon text-white shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-sm border border-electric/40 font-mono text-[10px] text-electric">MI</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Ishaq's Assistant</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Ask about my work</p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto max-w-[85%] rounded-sm bg-electric px-3 py-2 text-white">{m.content}</div>
              ) : (
                <div key={i} className="max-w-[95%] leading-relaxed text-zinc-300 [&_a]:text-electric [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_p+p]:mt-2 [&_strong]:text-white">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ),
            )}
            {loading && <div className="font-mono text-xs text-zinc-500 animate-pulse">Thinking…</div>}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:border-electric hover:text-white">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-white/10 p-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Ask a question…"
              className="min-h-11 max-h-32 flex-1 resize-none rounded-sm border border-white/10 bg-transparent px-3 py-2.5 text-base sm:text-sm text-white placeholder:text-zinc-600 focus:border-electric focus:outline-none"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send" className="grid size-11 shrink-0 place-items-center rounded-sm bg-electric text-white disabled:opacity-40">
              <ArrowUp className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
