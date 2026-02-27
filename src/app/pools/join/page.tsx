"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  ArrowLeft,
  Search,
  Users,
  PiggyBank,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const openPools = [
  {
    id: "a",
    name: "Neighborhood Fund",
    organizer: "Maria G.",
    members: 3,
    maxMembers: 6,
    contribution: 200,
    frequency: "Monthly",
  },
  {
    id: "b",
    name: "Tech Workers Circle",
    organizer: "Kevin R.",
    members: 7,
    maxMembers: 10,
    contribution: 1000,
    frequency: "Monthly",
  },
  {
    id: "c",
    name: "Weekend Savers",
    organizer: "Linda T.",
    members: 2,
    maxMembers: 5,
    contribution: 50,
    frequency: "Weekly",
  },
];

export default function JoinPoolPage() {
  const { t } = useTranslation();
  const [inviteCode, setInviteCode] = useState("");
  const [search, setSearch] = useState("");
  const [joining, setJoining] = useState<string | null>(null);

  const filtered = openPools.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinByCode = () => {
    if (!inviteCode.trim()) return;
    setJoining("code");
    setTimeout(() => {
      setJoining(null);
      setInviteCode("");
      showToast(t("joinedSuccess"), "success");
    }, 1500);
  };

  const handleJoin = (poolName: string, poolId: string) => {
    setJoining(poolId);
    setTimeout(() => {
      setJoining(null);
      showToast(`${t("joined")} "${poolName}" ${t("joinedPool")}`, "success");
    }, 1500);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/pools"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToPools")}
        </Link>

        <h1 className="text-2xl font-bold mb-1">{t("joinAPoolTitle")}</h1>
        <p className="text-sm text-secondary mb-6">
          {t("joinPoolDesc")}
        </p>

        <div className="bg-surface rounded-xl border border-border p-5 mb-6">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-secondary" />
            {t("haveInviteCode")}
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinByCode();
              }}
              placeholder={t("enterInviteCode")}
              className="flex-1 px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
            />
            <button
              onClick={handleJoinByCode}
              disabled={!inviteCode.trim() || joining === "code"}
              className="px-5 py-2.5 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
            >
              {joining === "code" ? t("joining") : t("join")}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPools")}
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((pool) => (
            <div
              key={pool.id}
              className="bg-surface rounded-xl border border-border p-4 flex items-center justify-between hover:border-accent/30 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{pool.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                    <span>{t("by")} {pool.organizer}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {pool.members}/{pool.maxMembers}
                    </span>
                    <span>
                      ${pool.contribution}/{pool.frequency.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleJoin(pool.name, pool.id)}
                disabled={joining === pool.id}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-accent text-accent text-sm font-medium hover:bg-accent/10 transition disabled:opacity-40"
              >
                {joining === pool.id ? (
                  t("joining")
                ) : (
                  <>
                    {t("join")} <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted text-sm">
              {t("noPoolsFound")} &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
