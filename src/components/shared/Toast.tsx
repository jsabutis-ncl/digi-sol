"use client";

import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

let toastListeners: ((toast: ToastData) => void)[] = [];

export function showToast(message: string, type: ToastData["type"] = "info") {
  const toast: ToastData = { id: crypto.randomUUID(), message, type };
  toastListeners.forEach((fn) => fn(toast));
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const colors = {
  success: "text-accent border-accent/30 bg-accent/10",
  error: "text-aa-red border-aa-red/30 bg-aa-red/10",
  info: "text-aa-blue border-aa-blue/30 bg-aa-blue/10",
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (t: ToastData) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 3500);
    };
    toastListeners.push(handler);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handler);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] space-y-2">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg ${colors[t.type]} animate-in slide-in-from-right`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-sm text-foreground">{t.message}</span>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((x) => x.id !== t.id))
              }
              className="ml-2 p-0.5 rounded hover:bg-highlight/50 text-muted"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
