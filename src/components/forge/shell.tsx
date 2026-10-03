import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/forge/header";
import { getForgeAvailability } from "@/lib/forge/status";
import { useForge } from "@/store/forge";

export function Shell({ children }: { children: ReactNode }) {
  const hydrate = useForge((s) => s.hydrate);
  const setAiAvailable = useForge((s) => s.setAiAvailable);

  useEffect(() => {
    hydrate();
    void getForgeAvailability().then((r) => setAiAvailable(r.available));
  }, [hydrate, setAiAvailable]);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="grain" />
      <SiteHeader />
      <div className="relative z-10">{children}</div>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          className: "border-border bg-surface text-fg",
        }}
      />
    </div>
  );
}
