"use client";

import AppShell from "@/components/layout/AppShell";
import { showToast } from "@/components/shared/Toast";
import {
  User,
  Bell,
  Shield,
  Landmark,
  Globe,
  ChevronRight,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("Jonathan S.");
  const [email, setEmail] = useState("jonathan@example.com");
  const [notifications, setNotifications] = useState({
    contributions: true,
    payouts: true,
    reminders: true,
    marketing: false,
  });
  const [bankLinked, setBankLinked] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("Settings saved successfully", "success");
    }, 1000);
  };

  const handleLinkBank = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setBankLinked(true);
      showToast("Bank account connected successfully!", "success");
    }, 1500);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "bank", label: "Bank Account", icon: Landmark },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="flex gap-6">
          <div className="w-52 shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition text-left ${
                  activeTab === tab.id
                    ? "bg-highlight text-foreground"
                    : "text-secondary hover:bg-surface-hover hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-surface rounded-xl border border-border p-6">
            {activeTab === "profile" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold">Profile Settings</h2>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">
                    Language
                  </label>
                  <select className="w-full px-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition appearance-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Swahili</option>
                  </select>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold">
                  Notification Preferences
                </h2>
                {Object.entries(notifications).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <div className="text-sm font-medium capitalize">
                        {key}
                      </div>
                      <div className="text-xs text-muted">
                        {key === "contributions" && "When members contribute to your pools"}
                        {key === "payouts" && "When you receive a payout"}
                        {key === "reminders" && "Upcoming contribution reminders"}
                        {key === "marketing" && "Product updates and tips"}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof typeof prev],
                        }))
                      }
                      className={`relative w-11 h-6 rounded-full transition ${
                        val ? "bg-accent" : "bg-highlight"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          val ? "translate-x-5.5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
                >
                  {saving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold">Security Settings</h2>
                <div className="bg-highlight rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-accent" />
                    <div>
                      <div className="text-sm font-medium">
                        Two-Factor Authentication
                      </div>
                      <div className="text-xs text-muted">
                        Add an extra layer of security
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      showToast("2FA setup initiated (demo)", "info")
                    }
                    className="px-4 py-2 rounded-lg border border-accent text-accent text-xs font-medium hover:bg-accent/10 transition"
                  >
                    Enable
                  </button>
                </div>
                <div className="bg-highlight rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium">
                        Active Sessions
                      </div>
                      <div className="text-xs text-muted">
                        1 active session
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      showToast("All other sessions revoked", "success")
                    }
                    className="px-4 py-2 rounded-lg border border-border text-secondary text-xs font-medium hover:bg-surface-hover transition"
                  >
                    Revoke All
                  </button>
                </div>
              </div>
            )}

            {activeTab === "bank" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold">Bank Account</h2>
                {bankLinked ? (
                  <div className="bg-accent/5 rounded-xl border border-accent/20 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          Bank Account Connected
                        </div>
                        <div className="text-xs text-muted">
                          Chase &middot; ****4289
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-secondary mb-3">
                      Your contributions will be automatically debited from
                      this account.
                    </p>
                    <button
                      onClick={() => {
                        setBankLinked(false);
                        showToast("Bank account disconnected", "info");
                      }}
                      className="px-4 py-2 rounded-lg border border-aa-red/30 text-aa-red text-xs font-medium hover:bg-aa-red/10 transition"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-highlight mb-4">
                      <Landmark className="w-8 h-8 text-muted" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">
                      No Bank Account Linked
                    </h3>
                    <p className="text-xs text-muted mb-4 max-w-xs mx-auto">
                      Connect your bank account to enable automatic
                      contributions and instant payouts.
                    </p>
                    <button
                      onClick={handleLinkBank}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {saving ? "Connecting..." : "Connect Bank Account"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
