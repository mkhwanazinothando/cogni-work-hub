import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, DEFAULT_MODEL } from "./ai-gateway.server";

const GenerateInput = z.object({
  system: z.string().min(1),
  prompt: z.string().min(1),
});

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

async function runModel(system: string, messages: { role: "user" | "assistant"; content: string }[]) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("The AI service isn't configured yet.");

  const gateway = createLovableAiGatewayProvider(key);
  const result = streamText({
    model: gateway(DEFAULT_MODEL),
    system,
    messages,
  });

  try {
    return await result.text;
  } catch (error) {
    const status = (error as { statusCode?: number; status?: number })?.statusCode ??
      (error as { status?: number })?.status;
    if (status === 429) throw new Error("Too many requests right now — please try again in a moment.");
    if (status === 402) throw new Error("The AI workspace is out of credits. Add credits to keep generating.");
    if (status === 403) throw new Error("AI access is blocked for this workspace.");
    throw new Error((error as Error)?.message || "The AI request failed.");
  }
}

export const generateOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const text = await runModel(data.system, [{ role: "user", content: data.prompt }]);
    return { text };
  });

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const text = await runModel(
      "You are Nova, an AI workplace productivity assistant. Be concise, practical and professional. Use markdown-free plain text with short paragraphs or simple bullet lines.",
      data.messages,
    );
    return { text };
  });
