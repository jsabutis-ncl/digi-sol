"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import Modal from "@/components/shared/Modal";
import {
  UserPlus,
  AlertTriangle,
  Star,
  Trash2,
  Mail,
  Copy,
} from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  initials: string;
  role: "organizer" | "member" | "guarantor";
  trustScore: number;
  totalContributed: number;
  joinedDate: string;
  status: "active" | "defaulted" | "new";
}

const initialMembers: Member[] = [
  { id: "1", name: "You (Jonathan S.)", initials: "JS", role: "organizer", trustScore: 100, totalContributed: 3250, joinedDate: "Jan 2026", status: "active" },
  { id: "2", name: "Alice M.", initials: "AM", role: "member", trustScore: 98, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
  { id: "3", name: "Bob K.", initials: "BK", role: "member", trustScore: 95, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
  { id: "4", name: "Carol S.", initials: "CS", role: "member", trustScore: 72, totalContributed: 1500, joinedDate: "Jan 2026", status: "defaulted" },
  { id: "5", name: "Dave L.", initials: "DL", role: "guarantor", trustScore: 100, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
];

const roleColors = {
  organizer: "bg-accent/20 text-accent",
  member: "bg-highlight text-secondary",
  guarantor: "bg-aa-purple/20 text-aa-purple",
};

export default function MembersPage() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [removeTarget, setRemoveTarget] = useState<Member | null>(null);

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    showToast(`${t("invitationSent")} ${inviteEmail}`, "success");
    setInviteEmail("");
    setInviteOpen(false);
  };

  const handleRemove = () => {
    if (!removeTarget) return;
    setMembers((prev) => prev.filter((m) => m.id !== removeTarget.id));
    showToast(`${removeTarget.name} ${t("hasBeenRemoved")}`, "success");
    setRemoveTarget(null);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t("membersTitle")}</h1>
            <p className="text-sm text-secondary mt-1">
              {members.length} {t("membersCount")}
            </p>
          </div>
          <button
            onClick={() => setInviteOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition"
          >
            <UserPlus className="w-4 h-4" />
            {t("inviteMember")}
          </button>
        </div>

        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-surface-hover transition group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      m.status === "defaulted"
                        ? "bg-aa-red/20 text-aa-red"
                        : "bg-highlight text-secondary"
                    }`}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{m.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${roleColors[m.role]}`}
                      >
                        {m.role === "organizer" ? t("organizer") : m.role === "member" ? t("member") : t("guarantor")}
                      </span>
                      {m.status === "defaulted" && (
                        <span className="flex items-center gap-0.5 text-[10px] text-aa-red">
                          <AlertTriangle className="w-3 h-3" /> {t("defaulted")}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {t("joined")} {m.joinedDate} &middot; {t("contributed")} $
                      {m.totalContributed.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        className={`w-3.5 h-3.5 ${
                          m.trustScore >= 90
                            ? "text-accent"
                            : m.trustScore >= 70
                            ? "text-accent"
                            : "text-aa-red"
                        }`}
                      />
                      <span className="font-semibold">{m.trustScore}%</span>
                    </div>
                    <div className="text-[10px] text-muted">{t("trustScoreLabel")}</div>
                  </div>
                  {m.role !== "organizer" && (
                    <button
                      onClick={() => setRemoveTarget(m)}
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-aa-red/10 text-aa-red hover:bg-aa-red/20 transition"
                      title={`Remove ${m.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={inviteOpen}
          onClose={() => setInviteOpen(false)}
          title={t("inviteAMember")}
        >
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              {t("sendInvitation")}
            </p>
            <div>
              <label className="text-xs text-muted mb-1.5 block">
                {t("emailAddress")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInvite();
                  }}
                  placeholder={t("emailPlaceholder")}
                  className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                />
              </div>
            </div>
            <div className="bg-highlight rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted mb-0.5">{t("inviteCode")}</div>
                <div className="text-sm font-mono text-foreground">
                  POOL-7X9K
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("POOL-7X9K");
                  showToast(t("inviteCodeCopied"), "success");
                }}
                className="p-2 rounded-lg hover:bg-surface-hover text-muted hover:text-foreground transition"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setInviteOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
              >
                {t("sendInvite")}
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={!!removeTarget}
          onClose={() => setRemoveTarget(null)}
          title={t("removeMember")}
        >
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              {t("removeConfirm")}{" "}
              <span className="text-foreground font-medium">{removeTarget?.name}</span>{" "}
              {t("removeWarning")}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRemoveTarget(null)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 py-2.5 rounded-lg bg-aa-red text-white text-sm font-semibold hover:bg-aa-red/90 transition"
              >
                {t("remove")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
