"use client";

import AppShell from "@/components/layout/AppShell";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  PiggyBank,
  DollarSign,
  Calendar,
} from "lucide-react";

const earningsSummary = [
  { label: "Total Earned", value: "$5,800", icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
  { label: "Total Contributed", value: "$3,250", icon: ArrowUpRight, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Net Gain", value: "$2,550", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
  { label: "Active Pools", value: "3", icon: PiggyBank, color: "text-purple-400", bg: "bg-purple-400/10" },
];

const payoutHistory = [
  { id: "1", pool: "Community Savings", amount: 2500, date: "Feb 15, 2026", round: 1 },
  { id: "2", pool: "Office Savings Club", amount: 800, date: "Jan 20, 2026", round: 3 },
  { id: "3", pool: "Community Savings", amount: 2500, date: "Dec 15, 2025", round: 5 },
];

const upcomingPayouts = [
  { pool: "Family Fund", amount: 1000, estimatedDate: "Mar 10, 2026", round: 1 },
];

export default function EarningsPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Earnings</h1>
        <p className="text-sm text-secondary mb-6">
          Track your savings performance across all pools
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {earningsSummary.map((s) => (
            <div
              key={s.label}
              className="bg-surface rounded-xl border border-border p-4"
            >
              <div
                className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}
              >
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {upcomingPayouts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Upcoming Payouts
            </h2>
            <div className="space-y-2">
              {upcomingPayouts.map((p) => (
                <div
                  key={p.pool}
                  className="bg-accent/5 rounded-xl border border-accent/20 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                      <ArrowDownLeft className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{p.pool}</div>
                      <div className="text-xs text-muted">
                        Round {p.round} &middot; Est. {p.estimatedDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-accent">
                    ${p.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            Payout History
          </h2>
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {payoutHistory.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-surface-hover transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-highlight flex items-center justify-center text-blue-400">
                      <ArrowDownLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{p.pool}</div>
                      <div className="text-xs text-muted">
                        Round {p.round} &middot; {p.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-accent">
                    +${p.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
