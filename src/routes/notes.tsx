import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — NovaDesk" },
      {
        name: "description",
        content: "Turn raw meeting notes into takeaways, decisions and owner-assigned action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — NovaDesk" },
      {
        property: "og:description",
        content: "Paste messy notes and get a clean, editable meeting summary.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <ToolWorkspace
        icon="📝"
        title="Meeting Notes Summarizer"
        subtitle="Raw notes → clear summary"
        actionLabel="Summarize notes"
        outputLabel="Meeting summary"
        system="You summarize workplace meetings. Return a short summary, then 'Key decisions', 'Action items' (with owner and due date when stated), and 'Open questions'. Never invent facts that are not in the notes."
        fields={[
          { name: "title", label: "Meeting", placeholder: "Sprint 12 sync" },
          { name: "attendees", label: "Attendees", placeholder: "Alex, Priya, Jordan" },
          {
            name: "notes",
            label: "Raw notes or transcript",
            type: "textarea",
            rows: 10,
            placeholder: "Paste your notes here…",
          },
          {
            name: "style",
            label: "Summary style",
            type: "select",
            options: ["Bullet points", "Executive brief", "Detailed minutes"],
          },
        ]}
        buildPrompt={(v) =>
          `Meeting: ${v.title}\nAttendees: ${v.attendees}\nPreferred style: ${v.style}\n\nNotes:\n${v.notes}`
        }
      />
    </AppShell>
  );
}
