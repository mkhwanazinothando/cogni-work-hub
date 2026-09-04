import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — NovaDesk" },
      {
        name: "description",
        content: "Generate professional, editable work emails from a structured prompt.",
      },
      { property: "og:title", content: "Smart Email Generator — NovaDesk" },
      {
        property: "og:description",
        content: "Set tone, audience and key points, then edit the AI draft before sending.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppShell>
      <ToolWorkspace
        icon="✉️"
        title="Smart Email Generator"
        subtitle="Structured prompt → editable draft"
        actionLabel="Generate draft"
        outputLabel="Generated draft"
        system="You are an expert business communicator. Write clear, concise workplace emails. Return only the email, starting with a subject line."
        fields={[
          { name: "recipient", label: "Recipient", placeholder: "Jordan, client at Northwind" },
          {
            name: "tone",
            label: "Tone",
            type: "select",
            options: ["Professional & warm", "Formal", "Friendly", "Direct & brief", "Apologetic"],
          },
          { name: "goal", label: "Goal", placeholder: "Follow up on the contract" },
          {
            name: "points",
            label: "Key points",
            type: "textarea",
            placeholder: "Pricing, 30-day rollout timeline, book a call this week",
          },
          {
            name: "length",
            label: "Length",
            type: "select",
            options: ["Short (under 80 words)", "Medium", "Detailed"],
          },
        ]}
        buildPrompt={(v) =>
          `Write a work email.\nRecipient: ${v.recipient}\nTone: ${v.tone}\nGoal: ${v.goal}\nKey points: ${v.points}\nLength: ${v.length}`
        }
      />
    </AppShell>
  );
}
