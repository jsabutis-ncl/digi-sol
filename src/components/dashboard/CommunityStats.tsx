"use client";

import { Users, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const stats: {
  labelKey: TranslationKey;
  value: string;
  icon: typeof PiggyBank;
  color: string;
  bg: string;
}[] = [
  {
    labelKey: "activePools",
    value: "3",
    icon: PiggyBank,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    labelKey: "totalMembers",
    value: "15",
    icon: Users,
    color: "text-aa-blue",
    bg: "bg-aa-blue/10",
  },
  {
    labelKey: "totalSaved",
    value: "$12,500",
    icon: TrendingUp,
    color: "text-aa-amber",
    bg: "bg-aa-amber/10",
  },
  {
    labelKey: "trustScore",
    value: "98%",
    icon: ShieldCheck,
    color: "text-aa-purple",
    bg: "bg-aa-purple/10",
  },
];

export default function CommunityStats() {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-base font-semibold mb-4">{t("communityOverview")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.labelKey}
            className="bg-surface rounded-xl border border-border p-4"
          >
            <div
              className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted mt-0.5">{t(stat.labelKey)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
