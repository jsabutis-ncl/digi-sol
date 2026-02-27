"use client";

import AppShell from "@/components/layout/AppShell";
import {
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface UpdateItem {
  date: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tagKey: TranslationKey;
  icon: typeof ShieldCheck;
  color: string;
  bg: string;
}

const updates: UpdateItem[] = [
  {
    date: "Feb 2026",
    titleKey: "smartGuarantor",
    descKey: "smartGuarantorDesc",
    tagKey: "newFeature",
    icon: ShieldCheck,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    date: "Feb 2026",
    titleKey: "instantPayouts",
    descKey: "instantPayoutsDesc",
    tagKey: "newFeature",
    icon: Zap,
    color: "text-aa-purple",
    bg: "bg-aa-purple/10",
  },
  {
    date: "Jan 2026",
    titleKey: "turnSwapping",
    descKey: "turnSwappingDesc",
    tagKey: "enhancement",
    icon: ArrowRightLeft,
    color: "text-aa-amber",
    bg: "bg-aa-amber/10",
  },
  {
    date: "Jan 2026",
    titleKey: "poolAnalyticsDashboard",
    descKey: "poolAnalyticsDashboardDesc",
    tagKey: "enhancement",
    icon: BarChart3,
    color: "text-aa-blue",
    bg: "bg-aa-blue/10",
  },
];

export default function WhatsNewPage() {
  const { t } = useTranslation();

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-accent" />
          <h1 className="text-2xl font-bold">{t("whatsNewTitle")}</h1>
        </div>

        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.titleKey}
              className="bg-surface rounded-xl border border-border p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${update.bg} flex items-center justify-center shrink-0`}
                >
                  <update.icon className={`w-6 h-6 ${update.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{t(update.titleKey)}</h3>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent/20 text-accent rounded">
                      {t(update.tagKey)}
                    </span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed mb-2">
                    {t(update.descKey)}
                  </p>
                  <span className="text-[10px] text-muted">{update.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
