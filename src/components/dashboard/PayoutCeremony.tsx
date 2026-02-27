"use client";

import { PartyPopper, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";

interface PayoutCeremonyProps {
  open: boolean;
  onClose: () => void;
  recipientName: string;
  amount: number;
  poolName: string;
  round: number;
}

export default function PayoutCeremony({
  open,
  onClose,
  recipientName,
  amount,
  poolName,
  round,
}: PayoutCeremonyProps) {
  const [showContent, setShowContent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) {
      setShowContent(false);
      return;
    }
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {showContent && (
        <div className="relative z-10 max-w-sm w-full mx-4 animate-scale-in">
          <div className="bg-surface border border-accent/30 rounded-2xl overflow-hidden animate-glow-pulse">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-highlight text-muted hover:text-foreground transition z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative pt-10 pb-6 flex flex-col items-center">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, rgba(18,255,128,0.5) 0%, transparent 70%)",
                }}
              />

              <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-4 relative">
                <PartyPopper className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-xl font-bold text-center mb-1">
                {t("payoutComplete")}
              </h2>
              <p className="text-sm text-secondary text-center">
                {recipientName} {t("receivedPayout")}
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center mb-4">
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
                  {t("amountReceived")}
                </div>
                <div className="text-4xl font-bold text-accent tracking-tight">
                  ${amount.toLocaleString()}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {poolName} &middot; {t("round")} {round}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-accent text-background font-semibold text-sm hover:bg-accent/90 transition"
              >
                {t("continue")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
