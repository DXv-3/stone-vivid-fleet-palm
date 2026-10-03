import { createServerFn } from "@tanstack/react-start";

export const getForgeAvailability = createServerFn({ method: "GET" }).handler(
  async () => {
    return { available: Boolean(process.env.XAI_API_KEY) };
  },
);
