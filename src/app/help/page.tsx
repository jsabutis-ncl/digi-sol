"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is a ROSCA?",
    a: "A ROSCA (Rotating Savings and Credit Association) is a group savings scheme where members contribute a fixed amount each period, and one member receives the total pool each round on a rotating basis.",
  },
  {
    q: "How do I create a pool?",
    a: "Click 'New Pool' in the sidebar or go to My Pools → Create Pool. Set the contribution amount, frequency, and invite members to join.",
  },
  {
    q: "What happens if a member defaults?",
    a: "If a member misses a contribution, their trust score decreases and they are flagged. If you have the Smart Guarantor System enabled, guarantors can step in to cover the shortfall.",
  },
  {
    q: "How are payouts distributed?",
    a: "Payouts follow the rotation order set when the pool is created. Each round, all members contribute and the designated member receives the total pool amount.",
  },
  {
    q: "Can I leave a pool early?",
    a: "You can request to leave a pool, but you must have completed all contributions for rounds where you've already received a payout. The pool organizer must approve your departure.",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-accent" />
          <h1 className="text-2xl font-bold">Help Center</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => showToast("Documentation opened (demo)", "info")}
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <BookOpen className="w-6 h-6 text-accent mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              Documentation
            </h3>
            <p className="text-xs text-muted mt-1">
              Learn how DigiSol works
            </p>
          </button>
          <button
            onClick={() =>
              showToast("Live chat coming soon!", "info")
            }
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <MessageCircle className="w-6 h-6 text-aa-blue mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              Live Chat
            </h3>
            <p className="text-xs text-muted mt-1">
              Talk to our support team
            </p>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText("support@digisol.app");
              showToast("Email copied: support@digisol.app", "success");
            }}
            className="bg-surface rounded-xl border border-border p-5 text-left hover:border-accent/30 transition group"
          >
            <Mail className="w-6 h-6 text-aa-purple mb-3" />
            <h3 className="text-sm font-semibold group-hover:text-accent transition">
              Email Support
            </h3>
            <p className="text-xs text-muted mt-1">support@digisol.app</p>
          </button>
        </div>

        <h2 className="text-base font-semibold mb-4">
          Frequently Asked Questions
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
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-xs text-secondary leading-relaxed">
                    {faq.a}
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
