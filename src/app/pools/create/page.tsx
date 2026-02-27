"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  ArrowLeft,
  DollarSign,
  Users,
  Calendar,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePoolPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [contribution, setContribution] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [members, setMembers] = useState<string[]>([]);
  const [memberInput, setMemberInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addMember = () => {
    const trimmed = memberInput.trim();
    if (trimmed && !members.includes(trimmed)) {
      setMembers([...members, trimmed]);
      setMemberInput("");
    }
  };

  const removeMember = (m: string) => {
    setMembers(members.filter((x) => x !== m));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contribution) return;
    setLoading(true);
    setTimeout(() => {
      showToast(`"${name}" ${t("poolCreated")}`, "success");
      router.push("/pools");
    }, 1500);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/pools"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToPools")}
        </Link>

        <h1 className="text-2xl font-bold mb-1">{t("createNewPool")}</h1>
        <p className="text-sm text-secondary mb-6">
          {t("createPoolDesc")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">
              {t("poolName")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("poolNamePlaceholder")}
              required
              className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                {t("contributionAmount")}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="500"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                {t("frequency")}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition appearance-none"
              >
                <option value="weekly">{t("weekly")}</option>
                <option value="bi-weekly">{t("biWeekly")}</option>
                <option value="monthly">{t("monthly")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">
              {t("inviteMembers")}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMember();
                    }
                  }}
                  placeholder={t("nameOrEmail")}
                  className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                />
              </div>
              <button
                type="button"
                onClick={addMember}
                className="px-4 py-2.5 bg-highlight border border-border rounded-lg hover:bg-surface-hover transition"
              >
                <Plus className="w-4 h-4 text-secondary" />
              </button>
            </div>
            {members.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {members.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                  >
                    {m}
                    <button
                      type="button"
                      onClick={() => removeMember(m)}
                      className="hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-muted mt-1.5">
              You + {members.length} {t("membersLabel")} ={" "}
              {members.length + 1} {t("rounds")}
            </p>
          </div>

          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              {t("poolSummary")}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">{t("poolName")}</span>
                <span className="font-medium">
                  {name || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("perRoundContribution")}</span>
                <span className="font-medium">
                  {contribution ? `$${contribution}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("frequency")}</span>
                <span className="font-medium capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("members")}</span>
                <span className="font-medium">{members.length + 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{t("payoutPerRound")}</span>
                <span className="font-semibold text-accent">
                  {contribution
                    ? `$${(
                        parseFloat(contribution) *
                        (members.length + 1)
                      ).toLocaleString()}`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/pools"
              className="flex-1 py-2.5 text-center rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
            >
              {t("cancel")}
            </Link>
            <button
              type="submit"
              disabled={!name || !contribution || loading}
              className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? t("creating") : t("createPool")}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
