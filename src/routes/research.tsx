import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — NovaDesk" },
      {
        name: "description",
        content: "Get a structured briefing on any work topic, with key findings and open questions.",
      },
      { property: "og:title", content: "AI Research Assistant — NovaDesk" },
      {
        property: "og:description",
        content: "Structured research briefings for market scans, vendors and internal decisions.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <ToolWorkspace
        icon="🔎"
        title="AI Research Assistant"
        subtitle="Question → structured briefing"
        actionLabel="Research topic"
        outputLabel="Research briefing"
        system="You are a careful research analyst. Produce a structured briefing: Overview, Key findings, Considerations/risks, and 'Verify these' (claims the reader should confirm with a primary source). State clearly when something is uncertain or may be out of date. Do not fabricate statistics or citations."
        fields={[
          {
            name: "topic",
            label: "Topic or question",
            type: "textarea",
            rows: 3,
            placeholder: "How are remote-work collaboration tools priced for mid-size teams?",
          },
          {
            name: "depth",
            label: "Depth",
            type: "select",
            options: ["Quick scan", "Standard briefing", "Deep dive"],
          },
          { name: "audience", label: "Audience", placeholder: "Head of Operations" },
          {
            name: "focus",
            label: "Angles to cover",
            type: "textarea",
            rows: 3,
            placeholder: "Pricing, adoption trends, main vendors, risks",
          },
        ]}
        buildPrompt={(v) =>
          `Topic: ${v.topic}\nDepth: ${v.depth}\nAudience: ${v.audience}\nAngles to cover: ${v.focus}`
        }
      />
    </AppShell>
  );
}
