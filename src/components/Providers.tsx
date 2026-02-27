"use client";

import { LanguageProvider } from "@/i18n/LanguageContext";
import { RequestsProvider } from "@/i18n/RequestsContext";
import PasswordGate from "@/components/PasswordGate";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <LanguageProvider>
        <RequestsProvider>{children}</RequestsProvider>
      </LanguageProvider>
    </PasswordGate>
  );
}
