"use client";

import { ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { showToast } from "@/components/shared/Toast";

export default function PoolBalance() {
  const [contributeOpen, setContributeOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContributeOpen(false);
      setAmount("");
      showToast(`Successfully contributed $${amount}`, "success");
    }, 1200);
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setWithdrawOpen(false);
      setAmount("");
      showToast(`Withdrawal of $${amount} initiated`, "success");
    }, 1200);
  };

  return (
    <>
      <div>
        <div className="text-sm text-secondary mb-1">Total pool value</div>
        <div className="text-4xl font-bold tracking-tight mb-4">
          $2,500<span className="text-secondary">.00</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAmount("");
              setContributeOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-accent text-accent font-medium text-sm hover:bg-accent/10 transition"
          >
            <ArrowUpRight className="w-4 h-4" />
            Contribute
          </button>
          <button
            onClick={() => {
              setAmount("");
              setWithdrawOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-surface-hover transition"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      <Modal
        open={contributeOpen}
        onClose={() => setContributeOpen(false)}
        title="Contribute to Pool"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary">
            Enter the amount you want to contribute to the{" "}
            <span className="text-foreground font-medium">
              Community Savings
            </span>{" "}
            pool.
          </p>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500.00"
                className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[100, 250, 500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(String(preset))}
                  className="px-3 py-1 text-xs rounded-md bg-highlight hover:bg-surface-hover text-secondary hover:text-foreground border border-border transition"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setContributeOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
            >
              Cancel
            </button>
            <button
              onClick={handleContribute}
              disabled={!amount || parseFloat(amount) <= 0 || loading}
              className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Contribute"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="Withdraw Funds"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary">
            Enter the amount to withdraw. Available balance:{" "}
            <span className="text-accent font-semibold">$2,500.00</span>
          </p>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                max={2500}
                className="w-full pl-9 pr-4 py-2.5 bg-highlight border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
              />
            </div>
            <button
              onClick={() => setAmount("2500")}
              className="mt-2 text-xs text-accent hover:underline"
            >
              Withdraw max
            </button>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setWithdrawOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-border text-secondary text-sm font-medium hover:bg-surface-hover transition"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > 2500 ||
                loading
              }
              className="flex-1 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
