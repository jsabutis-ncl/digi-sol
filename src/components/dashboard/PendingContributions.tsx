"use client";

import { Clock, ArrowUpRight, Users, Check } from "lucide-react";
import { useState } from "react";
import { showToast } from "@/components/shared/Toast";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";

interface Contribution {
  id: string;
  member: string;
  initials: string;
  amount: number;
  dueDate: string;
  status: "pending" | "overdue" | "paid";
}

const initialContributions: Contribution[] = [
  {
    id: "1",
    member: "Alice M.",
    initials: "AM",
    amount: 500,
    dueDate: "Mar 1, 2026",
    status: "pending",
  },
  {
    id: "2",
    member: "Bob K.",
    initials: "BK",
    amount: 500,
    dueDate: "Mar 1, 2026",
    status: "pending",
  },
  {
    id: "3",
    member: "Carol S.",
    initials: "CS",
    amount: 500,
    dueDate: "Feb 28, 2026",
    status: "overdue",
  },
];

const statusColors = {
  pending: "text-aa-amber",
  overdue: "text-aa-red",
  paid: "text-accent",
};

export default function PendingContributions() {
  const [contributions, setContributions] =
    useState<Contribution[]>(initialContributions);
  const { t } = useTranslation();

  const statusLabels = {
    pending: t("pending"),
    overdue: t("overdue"),
    paid: t("paid"),
  };

  const markPaid = (id: string) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "paid" as const } : c))
    );
    const member = contributions.find((c) => c.id === id)?.member;
    showToast(`${member} ${t("markedAsPaid")}`, "success");
  };

  return (
    <div className="bg-surface rounded-xl border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary" />
          {t("pendingContributions")}
        </h3>
      </div>

      {contributions.filter((c) => c.status !== "paid").length === 0 ? (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-highlight mb-3">
            <Users className="w-8 h-8 text-muted" />
          </div>
          <p className="text-sm text-muted">
            {t("allUpToDate")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {contributions.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    c.status === "paid"
                      ? "bg-accent/20 text-accent"
                      : "bg-highlight text-secondary"
                  }`}
                >
                  {c.status === "paid" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    c.initials
                  )}
                </div>
                <div>
                  <div
                    className={`text-sm font-medium ${
                      c.status === "paid" ? "line-through text-muted" : ""
                    }`}
                  >
                    {c.member}
                  </div>
                  <div className="text-xs text-muted">{t("due")} {c.dueDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    ${c.amount.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs capitalize ${statusColors[c.status]}`}
                  >
                    {statusLabels[c.status]}
                  </div>
                </div>
                {c.status !== "paid" && (
                  <button
                    onClick={() => markPaid(c.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition"
                    title={t("markAsPaid")}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-border">
        <Link
          href="/transactions"
          className="w-full text-center text-xs text-accent hover:underline flex items-center justify-center gap-1"
        >
          {t("viewAllContributions")}
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
