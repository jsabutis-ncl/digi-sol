"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import Modal from "@/components/shared/Modal";
import { ArrowLeft, ArrowRightLeft, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const members = [
  { id: "1", name: "Alice M.", round: 2, initials: "AM" },
  { id: "2", name: "Bob K.", round: 3, initials: "BK" },
  { id: "3", name: "Carol S.", round: 4, initials: "CS" },
  { id: "4", name: "Dave L.", round: 5, initials: "DL" },
];

export default function SwapTurnPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const myRound = 1;

  const selectedMember = members.find((m) => m.id === selected);

  const handleSwapRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmOpen(false);
      setSelected(null);
      showToast(
        `${t("swapRequestSent")} ${selectedMember?.name}!`,
        "success"
      );
    }, 1200);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToDashboard")}
        </Link>

        <h1 className="text-2xl font-bold mb-1">{t("swapTurnTitle")}</h1>
        <p className="text-sm text-secondary mb-6">
          {t("swapDesc")} ({t("round")} {myRound}) {t("with")}
        </p>

        <div className="bg-surface rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-sm font-semibold">{t("yourPosition")}</div>
              <div className="text-xs text-muted">
                {t("round")} {myRound} &mdash; {t("communitySavings")}
              </div>
            </div>
            <div className="ml-auto">
              <span className="px-2.5 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                {t("completed")}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-secondary mb-3">
          {t("selectMember")}
        </h3>

        <div className="space-y-2">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition text-left ${
                selected === m.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-surface hover:bg-surface-hover"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    selected === m.id
                      ? "bg-accent text-background"
                      : "bg-highlight text-secondary"
                  }`}
                >
                  {m.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-muted">{t("round")} {m.round}</div>
                </div>
              </div>
              <div className="text-xs text-muted">
                {t("round")} {m.round}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={!selected}
            className="w-full py-3 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {t("sendSwapRequest")}
          </button>
        </div>

        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title={t("confirmSwapRequest")}
        >
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              {t("swapConfirmText")}{" "}
              <span className="text-foreground font-medium">
                ({t("round")} {myRound})
              </span>{" "}
              {t("swapConfirmWith")}{" "}
              <span className="text-foreground font-medium">
                {selectedMember?.name}
              </span>{" "}
              <span className="text-foreground font-medium">
                ({t("round")} {selectedMember?.round})
              </span>
              .
            </p>
            <p className="text-xs text-muted">
              {t("swapNeedAccept")}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
              >
                {loading ? t("sending") : t("confirm")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
