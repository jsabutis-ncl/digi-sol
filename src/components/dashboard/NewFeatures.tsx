"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";

export default function NewFeatures() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">{t("newInDigiSol")}</h3>

      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold">{t("smartGuarantor")}</h4>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent/20 text-accent rounded">
                {t("newBadge")}
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed mb-3">
              {t("smartGuarantorDesc")}
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent text-accent text-xs font-medium hover:bg-accent/10 transition"
            >
              {t("setUpGuarantors")}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
