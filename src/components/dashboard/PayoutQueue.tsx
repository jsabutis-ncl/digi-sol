"use client";

import { Crown, Clock, Sparkles, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
    <div className="bg-surface rounded-xl border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Crown className="w-4 h-4 text-aa-amber" />
          Payout Queue
        </h3>
      </div>

      <div className="divide-y divide-border">
        {queue.map((m, i) => (
          <div
            key={m.round}
            className={`flex items-center justify-between px-4 py-3 transition group ${
              m.status === "next" ? "bg-aa-amber/[0.04]" : "hover:bg-surface-hover"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.status === "paid"
                    ? "bg-accent/20 text-accent"
                    : m.status === "next"
                    ? "bg-aa-amber/20 text-aa-amber ring-1 ring-aa-amber/30"
                    : "bg-highlight text-muted"
                }`}
              >
                {m.status === "paid" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  m.initials
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      m.status === "paid"
                        ? "text-muted line-through"
                        : m.status === "next"
                        ? "text-foreground"
                        : ""
                    }`}
                  >
                    {m.name}
                  </span>
                  {m.status === "next" && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold bg-aa-amber/15 text-aa-amber rounded">
                      <Sparkles className="w-2.5 h-2.5" />
                      Up Next
                    </span>
                  )}
                  {m.status === "paid" && (
                    <span className="text-[10px] text-accent">Received</span>
                  )}
                </div>
                <div className="text-xs text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {m.status === "paid"
                    ? `Paid ${m.estimatedDate}`
                    : `Est. ${m.estimatedDate}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div
                  className={`text-sm font-semibold ${
                    m.status === "next"
                      ? "text-aa-amber"
                      : m.status === "paid"
                      ? "text-muted"
                      : ""
                  }`}
                >
                  ${m.amount.toLocaleString()}
                </div>
                <div className="text-xs text-muted">
                  Round {m.round}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <Link
          href="/pools"
          className="w-full text-center text-xs text-accent hover:underline flex items-center justify-center gap-1"
        >
          View pool details
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
