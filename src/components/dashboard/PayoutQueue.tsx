"use client";

import { Crown, ArrowDown, Clock, Sparkles } from "lucide-react";

interface QueueMember {
  round: number;
  name: string;
  initials: string;
  amount: number;
  status: "paid" | "next" | "waiting";
  estimatedDate: string;
}

const queue: QueueMember[] = [
  { round: 1, name: "You", initials: "JS", amount: 2500, status: "paid", estimatedDate: "Feb 15" },
  { round: 2, name: "Alice M.", initials: "AM", amount: 2500, status: "next", estimatedDate: "Mar 15" },
  { round: 3, name: "Bob K.", initials: "BK", amount: 2500, status: "waiting", estimatedDate: "Apr 15" },
  { round: 4, name: "Carol S.", initials: "CS", amount: 2500, status: "waiting", estimatedDate: "May 15" },
  { round: 5, name: "Dave L.", initials: "DL", amount: 2500, status: "waiting", estimatedDate: "Jun 15" },
];

export default function PayoutQueue() {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
        <Crown className="w-4 h-4 text-amber-400" />
        Payout Queue
      </h3>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[29px] top-6 bottom-6 w-px bg-border z-0" />

          <div className="relative z-10">
            {queue.map((m, i) => (
              <div key={m.round}>
                <div
                  className="flex items-center gap-4 px-4 py-3.5 animate-queue-slide-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Position indicator */}
                  <div className="relative">
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold z-10 relative
                        ${
                          m.status === "paid"
                            ? "bg-accent text-background"
                            : m.status === "next"
                            ? "bg-amber-400 text-background animate-glow-pulse"
                            : "bg-highlight text-muted border border-border"
                        }`}
                      style={
                        m.status === "next"
                          ? {
                              boxShadow: "0 0 16px rgba(251, 191, 36, 0.35)",
                            }
                          : undefined
                      }
                    >
                      {m.status === "paid" ? "✓" : m.round}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${
                        m.status === "next"
                          ? "bg-amber-400/20 text-amber-400 ring-2 ring-amber-400/40"
                          : m.status === "paid"
                          ? "bg-accent/15 text-accent"
                          : "bg-highlight text-muted"
                      }`}
                  >
                    {m.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium truncate ${
                          m.status === "paid"
                            ? "text-secondary line-through"
                            : m.status === "next"
                            ? "text-foreground"
                            : "text-muted"
                        }`}
                      >
                        {m.name}
                      </span>
                      {m.status === "next" && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-400/20 text-amber-400 rounded-full whitespace-nowrap">
                          <Sparkles className="w-2.5 h-2.5" />
                          Up Next
                        </span>
                      )}
                      {m.status === "paid" && (
                        <span className="text-[10px] text-accent/70">Received</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted mt-0.5">
                      <Clock className="w-3 h-3" />
                      {m.status === "paid"
                        ? `Paid on ${m.estimatedDate}`
                        : `Est. ${m.estimatedDate}`}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right shrink-0">
                    <div
                      className={`text-sm font-mono font-semibold ${
                        m.status === "next"
                          ? "text-amber-400"
                          : m.status === "paid"
                          ? "text-muted"
                          : "text-secondary"
                      }`}
                    >
                      ${m.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Arrow connector between items */}
                {i < queue.length - 1 && (
                  <div className="flex justify-center -my-1.5 relative z-10">
                    <ArrowDown className="w-3 h-3 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
