import { createFileRoute } from "@tanstack/react-router";
import { buildUserMessage, FORGE_SYSTEM_PROMPT } from "@/lib/forge/prompt";

const MAX_TRANSCRIPT = 80_000;
const MAX_HINT = 2_000;
const MAX_PREVIOUS = 120_000;

type ForgeBody = {
  transcript?: unknown;
  hint?: unknown;
  mode?: unknown;
  previous?: unknown;
};

export const Route = createFileRoute("/api/forge")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "Live forge is unavailable in this environment." },
            { status: 503 },
          );
        }

        let body: ForgeBody;
        try {
          body = (await request.json()) as ForgeBody;
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const transcript = typeof body.transcript === "string" ? body.transcript.trim() : "";
        const hint = typeof body.hint === "string" ? body.hint.trim() : "";
        const mode = body.mode === "deepen" ? "deepen" : "forge";
        const previous = typeof body.previous === "string" ? body.previous : undefined;

        if (transcript.length < 200) {
          return Response.json(
            { error: "Need at least 200 characters of conversation." },
            { status: 400 },
          );
        }
        if (transcript.length > MAX_TRANSCRIPT) {
          return Response.json({ error: "Transcript exceeds the cap." }, { status: 400 });
        }
        if (hint.length > MAX_HINT) {
          return Response.json({ error: "Signal is too long." }, { status: 400 });
        }
        if (previous && previous.length > MAX_PREVIOUS) {
          return Response.json({ error: "Previous pass is too large." }, { status: 400 });
        }

        const xai = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.5",
            stream: true,
            temperature: 0.35,
            max_tokens: 12000,
            messages: [
              { role: "system", content: FORGE_SYSTEM_PROMPT },
              {
                role: "user",
                content: buildUserMessage({
                  transcript,
                  hint,
                  mode,
                  previous: mode === "deepen" ? previous : undefined,
                }),
              },
            ],
          }),
          signal: request.signal,
        });

        if (!xai.ok || !xai.body) {
          let detail = `Forge upstream error ${xai.status}`;
          try {
            const errBody = (await xai.json()) as { error?: { message?: string } };
            if (errBody.error?.message) detail = errBody.error.message;
          } catch {
            /* keep */
          }
          return Response.json({ error: detail }, { status: 502 });
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const upstream = xai.body;

        const stream = new ReadableStream({
          async start(controller) {
            const reader = upstream.getReader();
            let buf = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split("\n");
                buf = lines.pop() ?? "";
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed.startsWith("data:")) continue;
                  const data = trimmed.slice(5).trim();
                  if (!data || data === "[DONE]") continue;
                  try {
                    const json = JSON.parse(data) as {
                      choices?: { delta?: { content?: string } }[];
                    };
                    const t = json.choices?.[0]?.delta?.content;
                    if (t) {
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ t })}\n\n`),
                      );
                    }
                  } catch {
                    /* skip malformed */
                  }
                }
              }
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            } catch (err) {
              const message =
                err instanceof Error ? err.message : "The stream failed.";
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`),
              );
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
