"use client";

import { PlusCircle, Users, ArrowRightLeft, Landmark } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: PlusCircle,
    label: "Create a Pool",
    description: "Start a new savings circle with friends or community members",
    href: "/pools/create",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Users,
    label: "Join a Pool",
    description: "Browse open pools or enter an invite code to join",
    href: "/pools/join",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: ArrowRightLeft,
    label: "Swap Turn",
    description: "Negotiate with another member to swap your payout position",
    href: "/pools/swap",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Landmark,
    label: "Connect Bank",
    description: "Link your bank account for automatic contributions",
    href: "/settings",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

export default function QuickActions() {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-start gap-3 p-4 bg-surface rounded-xl border border-border hover:bg-surface-hover transition text-left group"
          >
            <div
              className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}
            >
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <div>
              <div className="text-sm font-semibold group-hover:text-accent transition">
                {action.label}
              </div>
              <div className="text-xs text-secondary mt-0.5 leading-relaxed">
                {action.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
