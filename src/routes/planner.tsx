import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — NovaDesk" },
      {
        name: "description",
        content: "Turn a goal into a prioritized, time-boxed task plan you can edit and follow.",
      },
      { property: "og:title", content: "AI Task Planner — NovaDesk" },
      {
        property: "og:description",
        content: "Break work into prioritized steps with time estimates and a suggested order.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AppShell>
      <ToolWorkspace
        icon="🗓️"
        title="AI Task Planner"
        subtitle="Goal → prioritized plan"
        actionLabel="Build my plan"
        outputLabel="Suggested plan"
        system="You are a pragmatic productivity coach. Produce a prioritized task plan with P0/P1/P2 labels, time estimates and a suggested order. Keep it realistic for the stated time available."
        fields={[
          {
            name: "goal",
            label: "Goal or workload",
            type: "textarea",
            rows: 4,
            placeholder: "Ship the onboarding revamp, prep Q3 recap, clear inbox",
          },
          {
            name: "horizon",
            label: "Time frame",
            type: "select",
            options: ["Today", "This week", "Next two weeks", "This month"],
          },
          { name: "hours", label: "Hours available", placeholder: "6 focused hours" },
          {
            name: "constraints",
            label: "Constraints & fixed commitments",
            type: "textarea",
            rows: 3,
            placeholder: "Standup at 9:30, client call Thursday 14:00",
          },
        ]}
        buildPrompt={(v) =>
          `Goal/workload:\n${v.goal}\n\nTime frame: ${v.horizon}\nHours available: ${v.hours}\nConstraints: ${v.constraints}`
        }
      />
    </AppShell>
  );
}
