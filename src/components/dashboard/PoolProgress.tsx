"use client";

import { TrendingUp } from "lucide-react";

interface PoolRound {
  round: number;
  member: string;
  status: "completed" | "current" | "upcoming";
  amount: number;
}

const rounds: PoolRound[] = [
  { round: 1, member: "You", status: "completed", amount: 2500 },
  { round: 2, member: "Alice M.", status: "current", amount: 2500 },
  { round: 3, member: "Bob K.", status: "upcoming", amount: 2500 },
  { round: 4, member: "Carol S.", status: "upcoming", amount: 2500 },
  { round: 5, member: "Dave L.", status: "upcoming", amount: 2500 },
];

export default function PoolProgress() {
  const currentRound = rounds.findIndex((r) => r.status === "current") + 1;
  const totalRounds = rounds.length;
  const progress = ((currentRound) / totalRounds) * 100;

  return (
    <div>
      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-accent" />
        Pool Progress
      </h3>

      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary">
            Round {currentRound} of {totalRounds}
          </span>
          <span className="text-sm font-semibold text-accent">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="w-full h-2 bg-highlight rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2">
          {rounds.map((r) => (
            <div
              key={r.round}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition
                ${
                  r.status === "current"
                    ? "bg-accent/10 border border-accent/20"
                    : r.status === "completed"
                    ? "bg-highlight/50"
                    : "bg-transparent"
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${
                      r.status === "completed"
                        ? "bg-accent text-background"
                        : r.status === "current"
                        ? "bg-accent/20 text-accent border border-accent"
                        : "bg-highlight text-muted"
                    }`}
                >
                  {r.status === "completed" ? "✓" : r.round}
                </div>
                <span
                  className={
                    r.status === "current"
                      ? "text-accent font-medium"
                      : r.status === "completed"
                      ? "text-secondary line-through"
                      : "text-muted"
                  }
                >
                  {r.member}
                  {r.status === "current" && (
                    <span className="ml-1.5 text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded font-semibold">
                      Receiving
                    </span>
                  )}
                </span>
              </div>
              <span
                className={`text-xs font-mono ${
                  r.status === "completed"
                    ? "text-muted"
                    : r.status === "current"
                    ? "text-accent"
                    : "text-muted"
                }`}
              >
                ${r.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
