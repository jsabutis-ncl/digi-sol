"use client";

import { ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewFeatures() {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">New in DigiSol</h3>

      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold">Smart Guarantor System</h4>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent/20 text-accent rounded">
                New
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed mb-3">
              Add guarantors to your pools for extra security. If a member
              defaults, guarantors step in automatically.
            </p>
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent text-accent text-xs font-medium hover:bg-accent/10 transition"
            >
              Set up guarantors
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-aa-purple/10 border border-aa-purple/20 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-aa-purple" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold mb-1">Instant Payouts</h4>
            <p className="text-xs text-secondary leading-relaxed">
              Receive your pool payout instantly when it&apos;s your turn. No
              more waiting for manual transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
