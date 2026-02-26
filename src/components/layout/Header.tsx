"use client";

import {
  Bell,
  ChevronDown,
  Copy,
  Shield,
  Wallet,
  X,
  Check,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { showToast } from "@/components/shared/Toast";

export default function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("0xA23189af97B0897BEEF397D");
    setCopied(true);
    showToast("Address copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const notifications = [
    {
      id: "1",
      text: "Alice M. contributed $500 to Community Savings",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      text: "Carol S. contribution is overdue",
      time: "1 hr ago",
      unread: false,
    },
    {
      id: "3",
      text: "You received $2,500 payout from Round 1",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <header className="h-[52px] bg-surface border-b border-border flex items-center justify-between px-4 shrink-0 relative z-40">
      <Link href="/" className="flex items-center gap-1.5">
        <Shield className="w-6 h-6 text-accent" />
        <span className="text-lg font-bold tracking-tight">
          Digi<span className="text-accent">Sol</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/earnings"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-highlight hover:bg-surface-hover transition text-sm"
        >
          <Wallet className="w-4 h-4 text-accent" />
          <span className="text-secondary">$2,500</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-highlight transition"
          >
            <Bell className="w-4 h-4 text-secondary" />
            {notifications.some((n) => n.unread) && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-background text-[10px] font-bold flex items-center justify-center">
                {notifications.filter((n) => n.unread).length}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="text-sm font-semibold">Notifications</span>
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="p-1 rounded hover:bg-highlight text-muted"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="divide-y divide-border max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 hover:bg-surface-hover transition cursor-pointer ${
                        n.unread ? "bg-accent/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {n.unread && (
                          <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs text-foreground leading-relaxed">
                            {n.text}
                          </p>
                          <p className="text-[10px] text-muted mt-1">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <Link
                    href="/transactions"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-accent hover:underline"
                  >
                    View all activity
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-highlight hover:bg-surface-hover transition"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <span className="text-[10px] font-bold text-background">JS</span>
            </div>
            <div className="text-left">
              <div className="text-xs text-secondary flex items-center gap-1">
                0xA23...397D
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                  className="text-muted cursor-pointer hover:text-secondary"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-accent" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <div className="text-sm font-medium">Jonathan S.</div>
                  <div className="text-xs text-muted font-mono">
                    0xA23...397D
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-secondary hover:bg-surface-hover hover:text-foreground transition"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/earnings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-secondary hover:bg-surface-hover hover:text-foreground transition"
                  >
                    My Earnings
                  </Link>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      showToast("Signed out (demo)", "info");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-aa-red hover:bg-surface-hover transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
