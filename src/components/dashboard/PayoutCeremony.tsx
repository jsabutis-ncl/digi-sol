"use client";

import { PartyPopper, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "square" | "circle" | "strip";
}

const COLORS = [
  "#12ff80",
  "#5f8afa",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#ffffff",
];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 8,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 1.5,
    shape: (["square", "circle", "strip"] as const)[
      Math.floor(Math.random() * 3)
    ],
  }));
}

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
  const [floatingAmounts, setFloatingAmounts] = useState<
    { id: number; x: number }[]
  >([]);

  const confetti = useMemo(() => (open ? generateConfetti(60) : []), [open]);

  useEffect(() => {
    if (!open) {
      setShowContent(false);
      setFloatingAmounts([]);
      return;
    }
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!showContent) return;
    const ints: NodeJS.Timeout[] = [];
    for (let i = 0; i < 5; i++) {
      ints.push(
        setTimeout(() => {
          setFloatingAmounts((prev) => [
            ...prev,
            { id: i, x: 20 + Math.random() * 60 },
          ]);
        }, 800 + i * 400)
      );
    }
    return () => ints.forEach(clearTimeout);
  }, [showContent]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Confetti layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="absolute animate-confetti"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <div
              style={{
                width: p.shape === "strip" ? p.size * 0.4 : p.size,
                height: p.shape === "strip" ? p.size * 2.5 : p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "2px",
                opacity: 0.9,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating dollar amounts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingAmounts.map((f) => (
          <div
            key={f.id}
            className="absolute animate-float-up text-accent/60 font-bold text-lg"
            style={{ left: `${f.x}%`, bottom: "30%" }}
          >
            +${amount.toLocaleString()}
          </div>
        ))}
      </div>

      {/* Main card */}
      {showContent && (
        <div className="relative z-10 max-w-sm w-full mx-4 animate-scale-in">
          <div className="bg-surface border border-accent/30 rounded-2xl overflow-hidden animate-glow-pulse">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-highlight text-muted hover:text-foreground transition z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Radial glow behind icon */}
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
                Payout Complete!
              </h2>
              <p className="text-sm text-secondary text-center">
                {recipientName} received their payout
              </p>
            </div>

            {/* Amount spotlight */}
            <div className="px-6 pb-6">
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center mb-4">
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
                  Amount Received
                </div>
                <div className="text-4xl font-bold text-accent tracking-tight">
                  ${amount.toLocaleString()}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {poolName} &middot; Round {round}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-accent text-background font-semibold text-sm hover:bg-accent/90 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
