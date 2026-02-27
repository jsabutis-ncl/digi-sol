"use client";

import { HandCoins, ThumbsUp, ThumbsDown, Check, X } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { useRequests } from "@/i18n/RequestsContext";
import { showToast } from "@/components/shared/Toast";

const TOTAL_VOTERS = 4;

export default function PendingRequests() {
  const { t } = useTranslation();
  const { requests, approveRequest, denyRequest } = useRequests();

  if (requests.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <HandCoins className="w-4 h-4 text-accent" />
            {t("pendingRequests")}
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-highlight mb-3">
            <HandCoins className="w-8 h-8 text-muted" />
          </div>
          <p className="text-sm text-muted">{t("noRequests")}</p>
        </div>
      </div>
    );
  }

  const isOwnRequest = (name: string) => name.startsWith("You");

  return (
    <div className="bg-surface rounded-xl border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <HandCoins className="w-4 h-4 text-accent" />
          {t("pendingRequests")}
        </h3>
      </div>

      <div className="divide-y divide-border">
        {requests.map((req) => (
          <div
            key={req.id}
            className={`px-4 py-3 transition ${
              req.status === "approved"
                ? "bg-accent/[0.03]"
                : req.status === "denied"
                ? "bg-aa-red/[0.03]"
                : "hover:bg-surface-hover"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    req.status === "approved"
                      ? "bg-accent/20 text-accent"
                      : req.status === "denied"
                      ? "bg-aa-red/20 text-aa-red"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  {req.status === "approved" ? (
                    <Check className="w-4 h-4" />
                  ) : req.status === "denied" ? (
                    <X className="w-4 h-4" />
                  ) : (
                    req.requesterInitials
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium truncate">
                      {isOwnRequest(req.requesterName) ? t("youRequested") : req.requesterName}
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      ${req.amount.toLocaleString()}
                    </span>
                    {req.status !== "pending" && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          req.status === "approved"
                            ? "bg-accent/15 text-accent"
                            : "bg-aa-red/15 text-aa-red"
                        }`}
                      >
                        {req.status === "approved" ? t("approved") : t("denied")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">{req.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted">
                      {t("requestedBy")} {req.createdAt}
                    </span>
                    {req.status === "pending" && (
                      <span className="text-[10px] text-secondary">
                        {req.approvals.length}/{TOTAL_VOTERS} {t("approvalsProgress")}
                      </span>
                    )}
                  </div>
                  {req.status === "pending" && req.approvals.length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      {req.approvals.map((name) => (
                        <span
                          key={name}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {req.status === "pending" && !isOwnRequest(req.requesterName) && (
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <button
                    onClick={() => {
                      approveRequest(req.id, "You (Jonathan S.)");
                      showToast(t("requestApproved"), "success");
                    }}
                    className="p-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition"
                    title={t("approve")}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      denyRequest(req.id);
                      showToast(t("requestDenied"), "info");
                    }}
                    className="p-1.5 rounded-lg bg-aa-red/10 text-aa-red hover:bg-aa-red/20 transition"
                    title={t("deny")}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
