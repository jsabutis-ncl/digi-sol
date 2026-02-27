"use client";

import AppShell from "@/components/layout/AppShell";
import { useTranslation } from "@/i18n/LanguageContext";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Check,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "contribution" | "payout" | "withdrawal";
  member: string;
  pool: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const allTransactions: Transaction[] = [
  { id: "1", type: "payout", member: "You", pool: "Community Savings", amount: 2500, date: "Feb 15, 2026", status: "completed" },
  { id: "2", type: "contribution", member: "Alice M.", pool: "Community Savings", amount: 500, date: "Feb 14, 2026", status: "completed" },
  { id: "3", type: "contribution", member: "Bob K.", pool: "Community Savings", amount: 500, date: "Feb 14, 2026", status: "completed" },
  { id: "4", type: "contribution", member: "You", pool: "Community Savings", amount: 500, date: "Feb 14, 2026", status: "completed" },
  { id: "5", type: "contribution", member: "Carol S.", pool: "Community Savings", amount: 500, date: "Feb 13, 2026", status: "pending" },
  { id: "6", type: "contribution", member: "Dave L.", pool: "Community Savings", amount: 500, date: "Feb 13, 2026", status: "completed" },
  { id: "7", type: "contribution", member: "You", pool: "Family Fund", amount: 250, date: "Feb 10, 2026", status: "completed" },
  { id: "8", type: "withdrawal", member: "You", pool: "Office Savings Club", amount: 800, date: "Feb 5, 2026", status: "completed" },
  { id: "9", type: "contribution", member: "You", pool: "Office Savings Club", amount: 100, date: "Feb 1, 2026", status: "completed" },
  { id: "10", type: "contribution", member: "Carol S.", pool: "Community Savings", amount: 500, date: "Jan 15, 2026", status: "failed" },
];

const typeIcons = {
  contribution: ArrowUpRight,
  payout: ArrowDownLeft,
  withdrawal: ArrowDownLeft,
};

const typeColors = {
  contribution: "text-accent",
  payout: "text-aa-blue",
  withdrawal: "text-aa-amber",
};

const statusIcons = {
  completed: Check,
  pending: Clock,
  failed: AlertTriangle,
};

const statusColors = {
  completed: "text-accent",
  pending: "text-aa-amber",
  failed: "text-aa-red",
};

type FilterType = "all" | "contribution" | "payout" | "withdrawal";

export default function TransactionsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all"
      ? allTransactions
      : allTransactions.filter((t) => t.type === filter);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t("transactionsTitle")}</h1>
            <p className="text-sm text-secondary mt-1">
              {t("allPoolActivity")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted" />
          {(["all", "contribution", "payout", "withdrawal"] as FilterType[]).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${
                  filter === f
                    ? "bg-accent/20 text-accent"
                    : "bg-surface text-secondary hover:bg-surface-hover"
                }`}
              >
                {f === "all" ? t("all") : f === "contribution" ? t("contributions") : f === "payout" ? t("payouts") : t("withdrawals")}
              </button>
            )
          )}
        </div>

        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((tx) => {
              const TypeIcon = typeIcons[tx.type];
              const StatusIcon = statusIcons[tx.status];
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-surface-hover transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-highlight flex items-center justify-center ${typeColors[tx.type]}`}
                    >
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {tx.type === "contribution"
                          ? `${tx.member} ${t("contributedAction")}`
                          : tx.type === "payout"
                          ? t("payoutReceived")
                          : t("withdrawal")}
                      </div>
                      <div className="text-xs text-muted">
                        {tx.pool} &middot; {tx.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div
                        className={`text-sm font-semibold ${
                          tx.type === "payout"
                            ? "text-accent"
                            : tx.type === "withdrawal"
                            ? "text-aa-amber"
                            : ""
                        }`}
                      >
                        {tx.type === "contribution" ? "-" : "+"}$
                        {tx.amount.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-[10px] font-medium capitalize ${statusColors[tx.status]}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {tx.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted text-sm">
            {t("noTransactions")}
          </div>
        )}
      </div>
    </AppShell>
  );
}
