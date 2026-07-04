import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { I18nProvider, Lang } from "./lib/i18n";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { AccountModal } from "./components/AccountModal";

const queryClient = new QueryClient();

function AccountModalHost() {
  const { showAccount, closeAccount } = useAuth();
  if (!showAccount) return null;
  return <AccountModal onClose={closeAccount} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LangWrapper({ lang }: { lang: Lang }) {
  return (
    <I18nProvider lang={lang}>
      <Index />
    </I18nProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AccountModalHost />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LangWrapper lang="en" />} />
            <Route path="/fr" element={<LangWrapper lang="fr" />} />
            <Route path="/fr/*" element={<LangWrapper lang="fr" />} />
            <Route path="/ar" element={<LangWrapper lang="ar" />} />
            <Route path="/ar/*" element={<LangWrapper lang="ar" />} />
            <Route path="/game/:id" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
