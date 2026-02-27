"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface FaqItem {
  qKey: TranslationKey;
  aKey: TranslationKey;
}

const faqs: FaqItem[] = [
  { qKey: "faqWhat", aKey: "faqWhatAnswer" },
  { qKey: "faqCreate", aKey: "faqCreateAnswer" },
  { qKey: "faqDefault", aKey: "faqDefaultAnswer" },
  { qKey: "faqPayout", aKey: "faqPayoutAnswer" },
  { qKey: "faqLeave", aKey: "faqLeaveAnswer" },
];

export default function HelpPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-accent" />
          <h1 className="text-2xl font-bold">{t("helpCenter")}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => showToast(t("docOpened"), "info")}
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <BookOpen className="w-6 h-6 text-accent mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              {t("documentation")}
            </h3>
            <p className="text-xs text-muted mt-1">
              {t("learnHow")}
            </p>
          </button>
          <button
            onClick={() =>
              showToast(t("liveChatSoon"), "info")
            }
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <MessageCircle className="w-6 h-6 text-aa-blue mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              {t("liveChat")}
            </h3>
            <p className="text-xs text-muted mt-1">
              {t("liveChatDesc")}
            </p>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText("support@digisol.app");
              showToast(t("emailCopied"), "success");
            }}
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <Mail className="w-6 h-6 text-aa-purple mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              {t("emailSupport")}
            </h3>
            <p className="text-xs text-muted mt-1">support@digisol.app</p>
          </button>
        </div>

        <h2 className="text-base font-semibold mb-4">
          {t("faq")}
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-hover transition"
              >
                <span className="text-sm font-medium pr-4">{t(faq.qKey)}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-xs text-secondary leading-relaxed">
                    {t(faq.aKey)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
