"use client";

import { Users, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";

const stats = [
  {
    label: "Active Pools",
    value: "3",
    icon: PiggyBank,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Total Members",
    value: "15",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Total Saved",
    value: "$12,500",
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    label: "Trust Score",
    value: "98%",
    icon: ShieldCheck,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

export default function CommunityStats() {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">Community Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-xl border border-border p-4"
          >
            <div
              className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
