"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import Modal from "@/components/shared/Modal";
import {
  UserPlus,
  ShieldCheck,
  AlertTriangle,
  Star,
  MoreHorizontal,
  Mail,
  Copy,
} from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  initials: string;
  role: "organizer" | "member" | "guarantor";
  trustScore: number;
  totalContributed: number;
  joinedDate: string;
  status: "active" | "defaulted" | "new";
}

const allMembers: Member[] = [
  { id: "1", name: "You (Jonathan S.)", initials: "JS", role: "organizer", trustScore: 100, totalContributed: 3250, joinedDate: "Jan 2026", status: "active" },
  { id: "2", name: "Alice M.", initials: "AM", role: "member", trustScore: 98, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
  { id: "3", name: "Bob K.", initials: "BK", role: "member", trustScore: 95, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
  { id: "4", name: "Carol S.", initials: "CS", role: "member", trustScore: 72, totalContributed: 1500, joinedDate: "Jan 2026", status: "defaulted" },
  { id: "5", name: "Dave L.", initials: "DL", role: "guarantor", trustScore: 100, totalContributed: 2500, joinedDate: "Jan 2026", status: "active" },
];

const roleColors = {
  organizer: "bg-accent/20 text-accent",
  member: "bg-highlight text-secondary",
  guarantor: "bg-purple-400/20 text-purple-400",
};

export default function MembersPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    showToast(`Invitation sent to ${inviteEmail}`, "success");
    setInviteEmail("");
    setInviteOpen(false);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Members</h1>
            <p className="text-sm text-secondary mt-1">
              {allMembers.length} members across all pools
            </p>
          </div>
          <button
            onClick={() => setInviteOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition"
          >
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {allMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-surface-hover transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      m.status === "defaulted"
                        ? "bg-red-400/20 text-red-400"
                        : "bg-highlight text-secondary"
                    }`}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{m.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${roleColors[m.role]}`}
                      >
                        {m.role}
                      </span>
                      {m.status === "defaulted" && (
                        <span className="flex items-center gap-0.5 text-[10px] text-red-400">
                          <AlertTriangle className="w-3 h-3" /> Defaulted
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      Joined {m.joinedDate} &middot; Contributed $
                      {m.totalContributed.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        className={`w-3.5 h-3.5 ${
                          m.trustScore >= 90
                            ? "text-accent"
                            : m.trustScore >= 70
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      />
                      <span className="font-semibold">{m.trustScore}%</span>
                    </div>
                    <div className="text-[10px] text-muted">Trust Score</div>
                  </div>
                  <button
                    onClick={() =>
                      showToast(`Options for ${m.name}`, "info")
                    }
                    className="p-1.5 rounded-lg hover:bg-highlight text-muted hover:text-foreground transition"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={inviteOpen}
          onClose={() => setInviteOpen(false)}
          title="Invite a Member"
        >
          <div className="space-y-4">
            <p className="text-sm text-secondary">
              Send an invitation to join your pool.
            </p>
            <div>
              <label className="text-xs text-muted mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInvite();
                  }}
                  placeholder="friend@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                />
              </div>
            </div>
            <div className="bg-highlight rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted mb-0.5">Invite Code</div>
                <div className="text-sm font-mono text-foreground">
                  POOL-7X9K
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("POOL-7X9K");
                  showToast("Invite code copied!", "success");
                }}
                className="p-2 rounded-lg hover:bg-surface-hover text-muted hover:text-foreground transition"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setInviteOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
              >
                Send Invite
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
