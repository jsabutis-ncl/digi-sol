"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  BarChart3,
  Calculator,
  CalendarCheck,
  FileText,
  Globe,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface AppItem {
  nameKey: TranslationKey;
  descKey: TranslationKey;
  icon: typeof BarChart3;
  color: string;
  bg: string;
  status: "available" | "coming_soon";
}

const apps: AppItem[] = [
  {
    nameKey: "poolAnalytics",
    descKey: "poolAnalyticsDesc",
    icon: BarChart3,
    color: "text-accent",
    bg: "bg-accent/10",
    status: "available",
  },
  {
    nameKey: "contribCalculator",
    descKey: "contribCalculatorDesc",
    icon: Calculator,
    color: "text-aa-blue",
    bg: "bg-aa-blue/10",
    status: "available",
  },
  {
    nameKey: "schedulePlanner",
    descKey: "schedulePlannerDesc",
    icon: CalendarCheck,
    color: "text-aa-amber",
    bg: "bg-aa-amber/10",
    status: "available",
  },
  {
    nameKey: "exportReports",
    descKey: "exportReportsDesc",
    icon: FileText,
    color: "text-aa-purple",
    bg: "bg-aa-purple/10",
    status: "available",
  },
  {
    nameKey: "communityChat",
    descKey: "communityChatDesc",
    icon: MessageSquare,
    color: "text-aa-pink",
    bg: "bg-aa-pink/10",
    status: "coming_soon",
  },
  {
    nameKey: "defiBridge",
    descKey: "defiBridgeDesc",
    icon: Globe,
    color: "text-aa-cyan",
    bg: "bg-aa-cyan/10",
    status: "coming_soon",
  },
];

export default function AppsPage() {
  const { t } = useTranslation();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">{t("appsTitle")}</h1>
        <p className="text-sm text-secondary mb-6">
          {t("appsDesc")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <div
              key={app.nameKey}
              className="bg-surface rounded-xl border border-border p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${app.bg} flex items-center justify-center`}
                >
                  <app.icon className={`w-5 h-5 ${app.color}`} />
                </div>
                {app.status === "coming_soon" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-highlight text-muted">
                    {t("comingSoon")}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-1">{t(app.nameKey)}</h3>
              <p className="text-xs text-secondary flex-1 leading-relaxed">
                {t(app.descKey)}
              </p>
              <button
                onClick={() => {
                  if (app.status === "coming_soon") {
                    showToast(`${t(app.nameKey)} ${t("appComingSoon")}`, "info");
                  } else {
                    showToast(`${t(app.nameKey)} ${t("appOpened")}`, "success");
                  }
                }}
                disabled={app.status === "coming_soon"}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                  app.status === "coming_soon"
                    ? "bg-highlight text-muted cursor-not-allowed"
                    : "border border-accent text-accent hover:bg-accent/10"
                }`}
              >
                {app.status === "coming_soon" ? (
                  t("notifyMe")
                ) : (
                  <>
                    {t("open")} <ExternalLink className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
