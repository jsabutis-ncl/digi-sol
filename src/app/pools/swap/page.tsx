"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import Modal from "@/components/shared/Modal";
import { ArrowLeft, ArrowRightLeft, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const members = [
  { id: "1", name: "Alice M.", round: 2, initials: "AM" },
  { id: "2", name: "Bob K.", round: 3, initials: "BK" },
  { id: "3", name: "Carol S.", round: 4, initials: "CS" },
  { id: "4", name: "Dave L.", round: 5, initials: "DL" },
];

export default function SwapTurnPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const myRound = 1;

  const selectedMember = members.find((m) => m.id === selected);

  const handleSwapRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmOpen(false);
      setSelected(null);
      showToast(
        `Swap request sent to ${selectedMember?.name}!`,
        "success"
      );
    }, 1200);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="text-2xl font-bold mb-1">Swap Turn</h1>
        <p className="text-sm text-secondary mb-6">
          Request to swap your payout position (Round {myRound}) with another
          member.
        </p>

        <div className="bg-surface rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-sm font-semibold">Your Position</div>
              <div className="text-xs text-muted">
                Round {myRound} &mdash; Community Savings
              </div>
            </div>
            <div className="ml-auto">
              <span className="px-2.5 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                Completed
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-secondary mb-3">
          Select a member to swap with
        </h3>

        <div className="space-y-2">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition text-left ${
                selected === m.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-surface hover:bg-surface-hover"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    selected === m.id
                      ? "bg-accent text-background"
                      : "bg-highlight text-secondary"
                  }`}
                >
                  {m.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-muted">Round {m.round}</div>
                </div>
              </div>
              <div className="text-xs text-muted">
                Round {m.round}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={!selected}
            className="w-full py-3 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Swap Request
          </button>
        </div>

        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Confirm Swap Request"
        >
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              You are requesting to swap your position{" "}
              <span className="text-foreground font-medium">
                (Round {myRound})
              </span>{" "}
              with{" "}
              <span className="text-foreground font-medium">
                {selectedMember?.name}
              </span>{" "}
              <span className="text-foreground font-medium">
                (Round {selectedMember?.round})
              </span>
              .
            </p>
            <p className="text-xs text-muted">
              The other member will need to accept the swap before it takes
              effect.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
              >
                {loading ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
