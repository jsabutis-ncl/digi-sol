import AppShell from "@/components/layout/AppShell";
import {
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  BarChart3,
  Sparkles,
} from "lucide-react";

const updates = [
  {
    date: "Feb 2026",
    title: "Smart Guarantor System",
    description:
      "Add guarantors to your pools for extra security. If a member defaults on their contribution, guarantors can step in automatically to cover the shortfall.",
    icon: ShieldCheck,
    color: "text-accent",
    bg: "bg-accent/10",
    tag: "New Feature",
  },
  {
    date: "Feb 2026",
    title: "Instant Payouts",
    description:
      "Receive your pool payout instantly when it's your turn. No more waiting for manual transfers — funds are distributed automatically at the end of each round.",
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    tag: "New Feature",
  },
  {
    date: "Jan 2026",
    title: "Turn Swapping",
    description:
      "Negotiate with other members to swap your payout position. Perfect for when you need funds earlier or want to accommodate another member's needs.",
    icon: ArrowRightLeft,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    tag: "Enhancement",
  },
  {
    date: "Jan 2026",
    title: "Pool Analytics Dashboard",
    description:
      "Get detailed insights into your pool performance with charts, contribution history, and trust score breakdowns.",
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    tag: "Enhancement",
  },
];

export default function WhatsNewPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-accent" />
          <h1 className="text-2xl font-bold">What&apos;s New</h1>
        </div>

        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.title}
              className="bg-surface rounded-xl border border-border p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${update.bg} flex items-center justify-center shrink-0`}
                >
                  <update.icon className={`w-6 h-6 ${update.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{update.title}</h3>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent/20 text-accent rounded">
                      {update.tag}
                    </span>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed mb-2">
                    {update.description}
                  </p>
                  <span className="text-[10px] text-muted">{update.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
