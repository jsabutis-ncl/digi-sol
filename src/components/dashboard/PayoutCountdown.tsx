"use client";

import { Timer, Sparkles } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const PAYOUT_DATE = new Date("2026-03-15T12:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = PAYOUT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-xl bg-highlight border border-border flex items-center justify-center">
          <span className="text-2xl font-bold font-mono tabular-nums text-foreground">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        {/* Subtle middle line like a flip clock */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-border/50" />
      </div>
      <span className="text-[10px] text-muted mt-1.5 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

export default function PayoutCountdown({
  onPayoutReached,
}: {
  onPayoutReached?: () => void;
}) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);
  const [hasFired, setHasFired] = useState(false);

  const stableCallback = useCallback(() => {
    if (onPayoutReached) onPayoutReached();
  }, [onPayoutReached]);

  useEffect(() => {
    const id = setInterval(() => {
      const t = calcTimeLeft();
      setTime(t);
      if (t.total <= 0 && !hasFired) {
        setHasFired(true);
        stableCallback();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [hasFired, stableCallback]);

  const totalDuration = PAYOUT_DATE.getTime() - new Date("2026-02-15T12:00:00").getTime();
  const elapsed = totalDuration - time.total;
  const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      {/* Shimmer bar at top */}
      <div className="h-1 w-full relative overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute inset-0 animate-shimmer opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(18,255,128,0.3), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Timer className="w-4 h-4 text-accent" />
            Next Payout
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">Alice M.</span>
          </div>
        </div>

        {time.total <= 0 ? (
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-accent animate-countdown-tick">
              Payout Time!
            </div>
            <p className="text-xs text-secondary mt-1">
              Alice M. is receiving $2,500
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3">
              <TimeUnit value={time.days} label="Days" />
              <span className="text-xl font-bold text-muted mt-[-18px]">:</span>
              <TimeUnit value={time.hours} label="Hours" />
              <span className="text-xl font-bold text-muted mt-[-18px]">:</span>
              <TimeUnit value={time.minutes} label="Min" />
              <span className="text-xl font-bold text-muted mt-[-18px]">:</span>
              <TimeUnit value={time.seconds} label="Sec" />
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted">
              <span>Mar 15, 2026 at 12:00 PM</span>
              <span>{Math.round(pct)}% elapsed</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
