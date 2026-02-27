"use client";

import { PlusCircle, Users, ArrowRightLeft, Landmark } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const actions: {
  icon: typeof PlusCircle;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  href: string;
  color: string;
  bg: string;
}[] = [
  {
    icon: PlusCircle,
    labelKey: "createAPool",
    descKey: "createAPoolDesc",
    href: "/pools/create",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Users,
    labelKey: "joinAPool",
    descKey: "joinAPoolDesc",
    href: "/pools/join",
    color: "text-aa-blue",
    bg: "bg-aa-blue/10",
  },
  {
    icon: ArrowRightLeft,
    labelKey: "swapTurn",
    descKey: "swapTurnDesc",
    href: "/pools/swap",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Landmark,
    labelKey: "connectBank",
    descKey: "connectBankDesc",
    href: "/settings",
    color: "text-aa-purple",
    bg: "bg-aa-purple/10",
  },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-base font-semibold mb-4">{t("quickActions")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.labelKey}
            href={action.href}
            className="flex items-start gap-3 p-4 bg-surface rounded-xl border border-border hover:bg-surface-hover transition text-left group"
          >
            <div
              className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}
            >
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <div>
              <div className="text-sm font-semibold group-hover:text-accent transition">
                {t(action.labelKey)}
              </div>
              <div className="text-xs text-secondary mt-0.5 leading-relaxed">
                {t(action.descKey)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
