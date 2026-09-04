import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, ResponsibleAiNotice } from "@/components/AppShell";
import { chatWithAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant — NovaDesk" },
      {
        name: "description",
        content: "Chat with Nova, your AI workplace assistant, for quick drafts, answers and advice.",
      },
      { property: "og:title", content: "AI Chat Assistant — NovaDesk" },
      {
        property: "og:description",
        content: "A conversational assistant for everyday workplace tasks.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Hi, I'm Nova. Ask me to draft, summarize, plan or explain anything work-related.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const send = useServerFn(chatWithAssistant);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <section className="rounded-3xl overflow-hidden relative border border-border shadow-sm">
        <div className="chrome absolute inset-0 opacity-90" />
        <div className="relative px-6 sm:px-8 py-7">
          <span className="inline-flex items-center gap-1.5 bg-card/85 text-primary text-xs font-semibold rounded-full px-3 py-1">
            💬 Nova · always on
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground drop-shadow-sm mt-3">
            AI Chat Assistant
          </h1>
        </div>
      </section>

      <section className="panel overflow-hidden flex flex-col">
        <div className="h-1.5 chrome" />
        <div className="p-5 space-y-3 min-h-[24rem]">
          {messages.map((m, i) =>
            m.role === "assistant" ? (
              <div
                key={i}
                className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-background border border-border px-3.5 py-2.5 text-[13px] text-foreground/85"
              >
                {m.content}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[85%] ml-auto whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-gradient-to-br from-primary to-accent text-primary-foreground px-3.5 py-2.5 text-[13px]"
              >
                {m.content}
              </div>
            ),
          )}
          {loading && (
            <div className="max-w-[85%] rounded-2xl bg-background border border-border px-3.5 py-2.5 text-[13px] text-muted-foreground animate-pulse">
              Nova is thinking…
            </div>
          )}
        </div>
        <form onSubmit={submit} className="mt-auto p-4 pt-2">
          <div className="rounded-full bg-card border border-border flex items-center gap-2 px-4 py-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Nova…"
              className="text-sm flex-1 bg-transparent outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="chrome size-7 rounded-full grid place-items-center text-primary-foreground text-xs disabled:opacity-60"
            >
              ↑
            </button>
          </div>
        </form>
      </section>

      <ResponsibleAiNotice />
    </AppShell>
  );
}
