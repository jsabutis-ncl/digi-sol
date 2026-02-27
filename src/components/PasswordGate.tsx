"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

const PASS = "susu";
const STORAGE_KEY = "digi-sol-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setAuthed(true);
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (authed) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASS) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm flex flex-col items-center gap-6 p-8 rounded-2xl bg-surface border border-border transition-transform ${error ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
      >
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <Lock className="w-7 h-7 text-accent" />
        </div>

        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Nclusion DigiSol</h1>
          <p className="text-sm text-secondary mt-1">Enter password to continue</p>
        </div>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted text-center text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
        />

        {error && (
          <p className="text-aa-red text-sm -mt-3">Incorrect password</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-accent text-background font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
