import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are "Ishaq's Assistant", a friendly guide on Muhammed Ishaq's portfolio website. Answer visitors' questions (often recruiters) about Muhammed concisely, in a warm professional tone, using short markdown.

Facts about Muhammed Ishaq:
- AI/ML Engineer and Full-stack engineer based in Keffi, Nigeria. Available for internships, freelance projects and AI training work.
- Computer Science graduate, Federal University Dutsin-Ma (FUDMA): Second Class Upper, CGPA 4.39.
- 3+ years building, 30+ projects shipped, 2x student president (NACOS FUDMA chapter leadership).
- Built TechTrust: an AI-powered developer credential verification platform combining a MindSpore MLP neural network with GitHub API data. Team Leader at the Huawei ICT Academy Innovation Competition, reaching the National Finals (Jan 29, 2026). Also his final-year project under Dr. Umar Ilaysu.
- Credentials: Mercor "Introduction to Agents" certificate of recognition (Oct 30, 2026, AI agent evaluation, ID MRC-2026-G32FZKWF); Microsoft & LinkedIn Career Essentials in Generative AI; LinkedIn courses on GenAI search, Intro to AI, Ethics in GenAI, Microsoft 365 Copilot, Streamlining work with Copilot, What is Generative AI; HTML certification.
- Interests: AI/ML, full-stack, robotics, forex trading (SMC + CRT), content creation, football (5-year team captain).
- Contact: techiemuaishaq@gmail.com, +234 806 863 8021, LinkedIn/GitHub/X: muaishaq.

Rules: Only state facts listed above. If you don't know something, say so and suggest emailing him. Keep answers under 120 words.`;

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
});

export const askPortfolioAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const response = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM_PROMPT,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
      });
      let text = "";
      for (const item of response.output ?? []) {
        if (item.type === "message") {
          for (const part of item.content ?? []) {
            if (part.type === "output_text") text += part.text;
          }
        }
      }
      return { ok: true as const, text: text || "Sorry, I couldn't come up with an answer." };
    } catch (err) {
      console.error("portfolio assistant error", err);
      const busy = err instanceof GatewayError && (err.httpStatus === 429 || err.httpStatus === 402);
      return {
        ok: false as const,
        text: busy
          ? "I'm a little busy right now. Please try again in a moment."
          : "Something went wrong. You can reach Muhammed directly at techiemuaishaq@gmail.com.",
      };
    }
  });
