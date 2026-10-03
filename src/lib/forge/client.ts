import { activeStageFromText, parseForgeOutput } from "./parse";
import { useForge } from "@/store/forge";

export async function runForge(input: {
  transcript: string;
  hint: string;
  mode: "forge" | "deepen";
  previous?: string;
  signal: AbortSignal;
}) {
  const store = useForge.getState();
  store.startForge();

  let res: Response;
  try {
    res = await fetch("/api/forge", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify({
        transcript: input.transcript,
        hint: input.hint,
        mode: input.mode,
        previous: input.previous,
      }),
      signal: input.signal,
    });
  } catch (err) {
    if (input.signal.aborted) {
      store.failForge("Halted.");
      throw err;
    }
    store.failForge("Could not reach the forge.");
    throw err;
  }

  if (!res.ok) {
    let message = `Forge failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* keep default */
    }
    store.failForge(message);
    throw new Error(message);
  }

  if (!res.body) {
    store.failForge("Empty response from the forge.");
    throw new Error("empty");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";
      for (const frame of frames) {
        const line = frame
          .split("\n")
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.slice(5).trim())
          .join("");
        if (!line || line === "[DONE]") continue;
        try {
          const payload = JSON.parse(line) as { t?: string; error?: string };
          if (payload.error) {
            store.failForge(payload.error);
            throw new Error(payload.error);
          }
          if (payload.t) {
            raw += payload.t;
            const partial = parseForgeOutput(raw);
            store.pushStream(raw, activeStageFromText(raw, true), partial);
          }
        } catch (err) {
          if (err instanceof SyntaxError) continue;
          throw err;
        }
      }
    }
  } catch (err) {
    if (input.signal.aborted) {
      store.failForge("Halted.");
      throw err;
    }
    throw err;
  }

  if (!raw.trim()) {
    store.failForge("The forge returned nothing. Try a longer transcript.");
    throw new Error("empty");
  }
  store.finishForge(raw);
}
