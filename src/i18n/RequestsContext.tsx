"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface MoneyRequest {
  id: string;
  requesterName: string;
  requesterInitials: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "denied";
  approvals: string[];
  createdAt: string;
}

interface RequestsContextValue {
  requests: MoneyRequest[];
  addRequest: (req: Omit<MoneyRequest, "id" | "status" | "approvals" | "createdAt">) => void;
  approveRequest: (id: string, approverName: string) => void;
  denyRequest: (id: string) => void;
}

const APPROVAL_THRESHOLD = 3;

const RequestsContext = createContext<RequestsContextValue | null>(null);

const initialRequests: MoneyRequest[] = [
  {
    id: "demo-1",
    requesterName: "Carol S.",
    requesterInitials: "CS",
    amount: 800,
    reason: "Medical emergency",
    status: "pending",
    approvals: ["Alice M."],
    createdAt: "Feb 25, 2026",
  },
];

export function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<MoneyRequest[]>(initialRequests);

  const addRequest = useCallback(
    (req: Omit<MoneyRequest, "id" | "status" | "approvals" | "createdAt">) => {
      const newReq: MoneyRequest = {
        ...req,
        id: `req-${Date.now()}`,
        status: "pending",
        approvals: [],
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setRequests((prev) => [newReq, ...prev]);
    },
    []
  );

  const approveRequest = useCallback((id: string, approverName: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id || r.status !== "pending") return r;
        if (r.approvals.includes(approverName)) return r;
        const newApprovals = [...r.approvals, approverName];
        return {
          ...r,
          approvals: newApprovals,
          status: newApprovals.length >= APPROVAL_THRESHOLD ? "approved" : "pending",
        };
      })
    );
  }, []);

  const denyRequest = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id && r.status === "pending" ? { ...r, status: "denied" as const } : r))
    );
  }, []);

  return (
    <RequestsContext.Provider value={{ requests, addRequest, approveRequest, denyRequest }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequests must be used within RequestsProvider");
  return ctx;
}
