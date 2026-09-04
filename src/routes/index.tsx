import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, ResponsibleAiNotice } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaDesk — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft emails, summarize meetings, plan tasks, research topics and chat with an AI assistant from one clean workspace.",
      },
      { property: "og:title", content: "NovaDesk — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "One workspace for AI email drafts, meeting summaries, task plans and research.",
      },
    ],
  }),
  component: Dashboard,
});

const cards = [
  {
    to: "/notes" as const,
    icon: "📝",
    title: "Meeting Notes Summarizer",
    body: "Turn raw meeting notes into key takeaways, decisions and action items.",
    cta: "Open summarizer",
  },
  {
    to: "/planner" as const,
    icon: "🗓️",
    title: "AI Task Planner",
    body: "Break a goal into a prioritized, time-boxed plan for your day or week.",
    cta: "Plan my day",
  },
  {
    to: "/research" as const,
    icon: "🔎",
    title: "AI Research Assistant",
    body: "Get a structured briefing on any work topic, with angles worth verifying.",
    cta: "Start research",
  },
];

function Dashboard() {
  return (
    <AppShell>
      <section className="rounded-3xl overflow-hidden relative border border-border shadow-sm">
        <div className="chrome absolute inset-0 opacity-90" />
        <div className="relative px-6 sm:px-8 py-7">
          <span className="inline-flex items-center gap-1.5 bg-card/85 text-primary text-xs font-semibold rounded-full px-3 py-1">
            ✦ Welcome back, Alex
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground drop-shadow-sm mt-3">
            Your AI workplace copilot
          </h1>
          <p className="text-primary-foreground/90 text-sm sm:text-base mt-2 max-w-lg">
            Draft, summarize, plan, and research — all from one chrome-bright workspace.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="bg-card text-primary font-semibold text-sm rounded-full px-5 py-2.5 shadow-md hover:bg-secondary"
            >
              + New draft
            </Link>
            <Link
              to="/chat"
              className="bg-card/20 text-primary-foreground font-semibold text-sm rounded-full px-5 py-2.5 border border-card/50 backdrop-blur-sm"
            >
              Ask Nova
            </Link>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 panel overflow-hidden">
          <div className="h-1.5 chrome" />
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="chrome size-9 rounded-xl grid place-items-center text-primary-foreground text-base">
                  ✉️
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg leading-none">
                    Smart Email Generator
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Structured prompt → editable draft
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-primary bg-secondary border border-border rounded-full px-2.5 py-1">
                Nova AI
              </span>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-secondary border border-border p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Prompt
                </p>
                <div className="mt-2 text-[13px] text-foreground/80 leading-relaxed">
                  <p className="font-medium">Tone: Professional, warm</p>
                  <p className="font-medium">Goal: Follow up on contract</p>
                  <p className="font-medium">Key points: pricing, timeline, next steps</p>
                </div>
              </div>
              <div className="rounded-2xl bg-background border border-dashed border-border p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Generated draft
                </p>
                <div className="mt-2 text-[13px] text-foreground/80 leading-relaxed">
                  <p className="font-semibold text-foreground">
                    Subject: Contract follow-up &amp; next steps
                  </p>
                  <p className="mt-1.5">Hi Jordan,</p>
                  <p className="mt-1.5">
                    Following up on the pricing and timeline we discussed. Could we lock in a 30-day
                    rollout and schedule a call this week?
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/email"
                className="inline-block chrome text-primary-foreground text-xs font-semibold rounded-full px-4 py-2 shadow-chrome"
              >
                Write a real email
              </Link>
            </div>
          </div>
        </div>

        <div className="panel overflow-hidden flex flex-col">
          <div className="h-1.5 chrome" />
          <div className="p-5">
            <div className="flex items-center gap-2.5">
              <div className="chrome size-9 rounded-xl grid place-items-center text-primary-foreground text-base">
                💬
              </div>
              <div>
                <h2 className="font-display font-bold text-base leading-none">Chat Assistant</h2>
                <p className="text-xs text-muted-foreground mt-1">Nova · always on</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="ml-8 max-w-[85%] rounded-2xl rounded-tr-sm bg-background border border-border px-3.5 py-2.5 text-[13px] text-foreground/85">
                Want me to turn these talking points into a client email?
              </div>
              <div className="mr-8 max-w-[85%] ml-auto rounded-2xl rounded-tl-sm bg-gradient-to-br from-primary to-accent text-primary-foreground px-3.5 py-2.5 text-[13px]">
                Yes — keep it under 80 words.
              </div>
              <div className="ml-8 max-w-[85%] rounded-2xl rounded-tr-sm bg-background border border-border px-3.5 py-2.5 text-[13px] text-foreground/85">
                Done. I drafted a concise version and pulled in the Q3 figures.
              </div>
            </div>
          </div>
          <div className="mt-auto p-4 pt-2">
            <Link
              to="/chat"
              className="rounded-full bg-card border border-border flex items-center gap-2 px-4 py-2"
            >
              <span className="text-sm text-muted-foreground flex-1">Message Nova…</span>
              <span className="chrome size-7 rounded-full grid place-items-center text-primary-foreground text-xs">
                ↑
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.to} className="panel p-5 flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="chrome size-9 rounded-xl grid place-items-center text-primary-foreground text-base">
                {c.icon}
              </div>
              <h3 className="font-display font-bold text-base">{c.title}</h3>
            </div>
            <p className="mt-4 rounded-2xl bg-background border border-border p-4 text-[13px] text-foreground/80 leading-relaxed flex-1">
              {c.body}
            </p>
            <Link
              to={c.to}
              className="mt-4 w-full text-center bg-card text-primary text-xs font-semibold rounded-full py-2 border border-border hover:bg-secondary"
            >
              {c.cta}
            </Link>
          </div>
        ))}
      </section>

      <ResponsibleAiNotice />
    </AppShell>
  );
}
