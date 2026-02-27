"use client";

import { ArrowUpRight, DollarSign, HandCoins } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { showToast } from "@/components/shared/Toast";
import { useTranslation } from "@/i18n/LanguageContext";
import { useRequests } from "@/i18n/RequestsContext";

export default function PoolBalance() {
  const [contributeOpen, setContributeOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { addRequest } = useRequests();

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContributeOpen(false);
      setAmount("");
      showToast(`${t("contributedSuccess")} $${amount}`, "success");
    }, 1200);
  };

  const handleRequest = () => {
    if (!amount || parseFloat(amount) <= 0 || !reason.trim()) return;
    setLoading(true);
    setTimeout(() => {
      addRequest({
        requesterName: "You (Jonathan S.)",
        requesterInitials: "JS",
        amount: parseFloat(amount),
        reason: reason.trim(),
      });
      setLoading(false);
      setRequestOpen(false);
      setAmount("");
      setReason("");
      showToast(t("requestSubmitted"), "success");
    }, 800);
  };

  return (
    <>
      <div>
        <div className="text-sm text-secondary mb-1">{t("totalPoolValue")}</div>
        <div className="text-4xl font-bold tracking-tight mb-4">
          $2,500<span className="text-secondary">.00</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAmount("");
              setContributeOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-accent text-accent font-medium text-sm hover:bg-accent/10 transition"
          >
            <ArrowUpRight className="w-4 h-4" />
            {t("contribute")}
          </button>
          <button
            onClick={() => {
              setAmount("");
              setReason("");
              setRequestOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-aa-amber text-aa-amber font-medium text-sm hover:bg-aa-amber/10 transition"
          >
            <HandCoins className="w-4 h-4" />
            {t("requestMoney")}
          </button>
        </div>
      </div>

      <Modal
        open={contributeOpen}
        onClose={() => setContributeOpen(false)}
        title={t("contributeToPool")}
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary">
            {t("contributePrompt")}{" "}
            <span className="text-foreground font-medium">
              {t("communitySavings")}
            </span>{" "}
            {t("pool")}.
          </p>
          <div>
            <label className="text-xs text-muted mb-1.5 block">{t("amount")}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500.00"
                className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[100, 250, 500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(String(preset))}
                  className="px-3 py-1 text-xs rounded-md bg-highlight hover:bg-surface-hover text-secondary hover:text-foreground border border-border transition"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setContributeOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleContribute}
              disabled={!amount || parseFloat(amount) <= 0 || loading}
              className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? t("processing") : t("contribute")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        title={t("requestMoneyTitle")}
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary">
            {t("requestPrompt")}
          </p>
          <div>
            <label className="text-xs text-muted mb-1.5 block">{t("amount")}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500.00"
                className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[250, 500, 1000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(String(preset))}
                  className="px-3 py-1 text-xs rounded-md bg-highlight hover:bg-surface-hover text-secondary hover:text-foreground border border-border transition"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">{t("reason")}</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t("reasonPlaceholder")}
              className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setRequestOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleRequest}
              disabled={!amount || parseFloat(amount) <= 0 || !reason.trim() || loading}
              className="flex-1 py-2.5 rounded-lg bg-aa-amber text-background text-sm font-semibold hover:bg-aa-amber/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? t("processing") : t("submitRequest")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
