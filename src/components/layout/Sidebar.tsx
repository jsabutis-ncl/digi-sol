"use client";

import {
  Home,
  PiggyBank,
  ArrowLeftRight,
  BookUser,
  LayoutGrid,
  Settings,
  HelpCircle,
  Sparkles,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "My Pools", href: "/pools", icon: PiggyBank },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Members", href: "/members", icon: Users },
  { label: "Earnings", href: "/earnings", icon: TrendingUp },
  { label: "Address Book", href: "/address-book", icon: BookUser },
  { label: "Apps", href: "/apps", icon: LayoutGrid },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[230px] bg-surface border-r border-border flex flex-col shrink-0 h-full">
      <div className="p-3">
        <Link
          href="/pools"
          className="block bg-accent/10 border border-accent/20 rounded-lg p-3 mb-3 hover:bg-accent/15 transition"
        >
          <div className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1">
            Active Pool
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
              1/5
            </div>
            <div>
              <div className="text-sm font-medium">Community Savings</div>
              <div className="text-xs text-muted">
                Round 1 of 5 &middot; $500/mo
              </div>
            </div>
          </div>
        </Link>

        <div className="flex gap-1.5 mb-2">
          <Link
            href="/pools"
            className="flex-1 p-1.5 rounded-md bg-highlight hover:bg-surface-hover transition"
            title="My Pools"
          >
            <LayoutGrid className="w-4 h-4 text-secondary mx-auto" />
          </Link>
          <Link
            href="/transactions"
            className="flex-1 p-1.5 rounded-md bg-highlight hover:bg-surface-hover transition"
            title="Transactions"
          >
            <ArrowLeftRight className="w-4 h-4 text-secondary mx-auto" />
          </Link>
          <Link
            href="/address-book"
            className="flex-1 p-1.5 rounded-md bg-highlight hover:bg-surface-hover transition"
            title="Address Book"
          >
            <BookUser className="w-4 h-4 text-secondary mx-auto" />
          </Link>
        </div>

        <Link
          href="/pools/create"
          className="w-full py-2 bg-accent text-background font-semibold rounded-lg text-sm hover:bg-accent/90 transition flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          New Pool
        </Link>
      </div>

      <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-highlight text-foreground"
                    : "text-secondary hover:bg-surface-hover hover:text-foreground"
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border space-y-0.5">
        <Link
          href="/whats-new"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-secondary hover:bg-surface-hover hover:text-foreground transition"
        >
          <Sparkles className="w-4 h-4" />
          What&apos;s new
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-secondary hover:bg-surface-hover hover:text-foreground transition"
        >
          <HelpCircle className="w-4 h-4" />
          Need help?
        </Link>
      </div>
    </aside>
  );
}
