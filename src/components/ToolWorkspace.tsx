import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { generateOutput } from "@/lib/ai.functions";
import { ResponsibleAiNotice } from "./AppShell";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
};

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  fields: Field[];
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  outputLabel: string;
  actionLabel: string;
};

export function ToolWorkspace({
  icon,
  title,
  subtitle,
  fields,
  system,
  buildPrompt,
  outputLabel,
  actionLabel,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? (f.options?.[0] ?? "")])),
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const run = useServerFn(generateOutput);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  async function generate() {
    setLoading(true);
    try {
      const res = await run({ data: { system, prompt: buildPrompt(values) } });
      setOutput(res.text);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="rounded-3xl overflow-hidden relative border border-border shadow-sm">
        <div className="chrome absolute inset-0 opacity-90" />
        <div className="relative px-6 sm:px-8 py-7">
          <span className="inline-flex items-center gap-1.5 bg-card/85 text-primary text-xs font-semibold rounded-full px-3 py-1">
            {icon} {subtitle}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground drop-shadow-sm mt-3">
            {title}
          </h1>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="h-1.5 chrome" />
        <div className="p-5 sm:p-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-secondary border border-border p-4 space-y-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Structured prompt
              </p>
              {fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="block text-[13px] font-medium text-foreground/70 mb-1.5">
                    {f.label}
                  </span>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={f.rows ?? 4}
                      value={values[f.name]}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full resize-none rounded-xl bg-card border border-border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={values[f.name]}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                    >
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={values[f.name]}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                    />
                  )}
                </label>
              ))}
              <button
                onClick={generate}
                disabled={loading}
                className="chrome text-primary-foreground text-sm font-semibold rounded-full px-5 py-2.5 shadow-chrome disabled:opacity-60"
              >
                {loading ? "Working…" : actionLabel}
              </button>
            </div>

            <div className="rounded-2xl bg-background border border-dashed border-border p-4 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {outputLabel}
                </p>
                <span className="text-[11px] text-primary font-semibold">✎ Editable</span>
              </div>
              <textarea
                value={loading && !output ? "Generating…" : output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Your AI output will appear here — you can edit every word before using it."
                className="mt-2 flex-1 min-h-64 w-full resize-none bg-transparent text-[13px] leading-relaxed outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={generate}
                  disabled={loading}
                  className="chrome text-primary-foreground text-xs font-semibold rounded-full px-4 py-2 shadow-chrome disabled:opacity-60"
                >
                  Regenerate
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                  disabled={!output}
                  className="bg-card text-foreground/70 text-xs font-semibold rounded-full px-4 py-2 border border-border hover:bg-secondary disabled:opacity-50"
                >
                  Copy to clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResponsibleAiNotice />
    </>
  );
}
