"use client";

import { LanguageProvider } from "@/i18n/LanguageContext";
import { RequestsProvider } from "@/i18n/RequestsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RequestsProvider>{children}</RequestsProvider>
    </LanguageProvider>
  );
}
