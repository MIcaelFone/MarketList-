"use client";

import { useEffect } from "react";
import { hydrateState } from "@/stores/hydration/hydrate-state";
import { useAppUiStore } from "@/stores/app-ui.store";

export function useHydrationStatus() {
  const isHydrating = useAppUiStore((state) => state.isHydrating);
  const hydratedOnce = useAppUiStore((state) => state.hydratedOnce);

  useEffect(() => {
    if (!hydratedOnce) {
      hydrateState();
    }
  }, [hydratedOnce]);

  return { isHydrating, hydratedOnce };
}
