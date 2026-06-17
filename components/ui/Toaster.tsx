"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export function Toaster() {
  const toast = useUiStore((s) => s.toast);
  const clear = useUiStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clear, 2200);
    return () => clearTimeout(t);
  }, [toast, clear]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 md:bottom-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="flex items-center gap-2.5 rounded-full border border-gold/40 bg-surface-2/95 py-2.5 pl-2.5 pr-5 shadow-gold backdrop-blur-md"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gold">
              <Check className="h-4 w-4 text-background" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium text-foreground">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
