"use client";

import AppShell from "@/components/layout/AppShell";
import {
  PiggyBank,
  Plus,
  Users,
  Calendar,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

const pools = [
  {
    id: "1",
    name: "Community Savings",
    members: 5,
    contribution: 500,
    frequency: "Monthly",
    currentRound: 2,
    totalRounds: 5,
    totalValue: 2500,
    status: "active" as const,
    nextPayout: "Alice M.",
  },
  {
    id: "2",
    name: "Family Fund",
    members: 4,
    contribution: 250,
    frequency: "Bi-weekly",
    currentRound: 1,
    totalRounds: 4,
    totalValue: 1000,
    status: "active" as const,
    nextPayout: "You",
  },
  {
    id: "3",
    name: "Office Savings Club",
    members: 8,
    contribution: 100,
    frequency: "Weekly",
    currentRound: 6,
    totalRounds: 8,
    totalValue: 800,
    status: "active" as const,
    nextPayout: "Dave L.",
  },
];

const statusColors = {
  active: "bg-accent/20 text-accent",
  completed: "bg-aa-blue/20 text-aa-blue",
  pending: "bg-aa-amber/20 text-aa-amber",
};

export default function PoolsPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Pools</h1>
            <p className="text-sm text-secondary mt-1">
              Manage your savings circles
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/pools/join"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface-hover transition"
            >
              <Users className="w-4 h-4" />
              Join Pool
            </Link>
            <Link
              href="/pools/create"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition"
            >
              <Plus className="w-4 h-4" />
              Create Pool
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pools.map((pool) => (
            <Link
              key={pool.id}
              href={`/pools`}
              className="bg-surface rounded-xl border border-border p-5 hover:border-accent/30 hover:bg-surface-hover transition group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-accent transition">
                      {pool.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Users className="w-3 h-3" />
                      {pool.members} members
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    statusColors[pool.status]
                  }`}
                >
                  {pool.status}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Contribution</span>
                  <span className="text-foreground font-medium">
                    ${pool.contribution}/{pool.frequency.toLowerCase()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Progress</span>
                  <span className="text-foreground font-medium">
                    Round {pool.currentRound} of {pool.totalRounds}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Pool Value</span>
                  <span className="text-accent font-semibold">
                    ${pool.totalValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full h-1.5 bg-highlight rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{
                    width: `${
                      (pool.currentRound / pool.totalRounds) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted">
                  <Clock className="w-3 h-3" />
                  Next: {pool.nextPayout}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
