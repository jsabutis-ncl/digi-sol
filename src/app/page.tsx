"use client";

import AppShell from "@/components/layout/AppShell";
import PoolBalance from "@/components/dashboard/PoolBalance";
import PendingContributions from "@/components/dashboard/PendingContributions";
import NewFeatures from "@/components/dashboard/NewFeatures";
import QuickActions from "@/components/dashboard/QuickActions";
import PayoutQueue from "@/components/dashboard/PayoutQueue";
import PayoutCountdown from "@/components/dashboard/PayoutCountdown";
import PayoutCeremony from "@/components/dashboard/PayoutCeremony";
import CommunityStats from "@/components/dashboard/CommunityStats";
import { PartyPopper } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [ceremonyOpen, setCeremonyOpen] = useState(false);

  return (
    <AppShell>
      <div className="max-w-[1120px] mx-auto space-y-8">
        {/* Hero: Balance left, Countdown right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <PoolBalance />
          <PayoutCountdown
            onPayoutReached={() => setCeremonyOpen(true)}
          />
        </div>

        {/* Stats bar */}
        <CommunityStats />

        {/* Core panels: Contributions + Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PendingContributions />
          <PayoutQueue />
        </div>

        {/* Lower: Quick Actions + What's New side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <QuickActions />
          <div className="space-y-4">
            <NewFeatures />
            {/* Demo trigger */}
            <button
              onClick={() => setCeremonyOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent/90 to-aa-amber/90 text-background text-sm font-semibold hover:from-accent hover:to-aa-amber transition-all shadow-lg shadow-accent/10"
            >
              <PartyPopper className="w-4 h-4" />
              Simulate Payout Ceremony
            </button>
          </div>
        </div>
      </div>

      <PayoutCeremony
        open={ceremonyOpen}
        onClose={() => setCeremonyOpen(false)}
        recipientName="Alice M."
        amount={2500}
        poolName="Community Savings"
        round={2}
      />
    </AppShell>
  );
}
