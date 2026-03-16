import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/app/store";

import LandingPage from "./pages/Landing/LandingPage";
import { LoginPage, SignupPage, ForgotPasswordPage } from "./pages/Auth/AuthPages";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import CustomersPage from "./pages/Customers/CustomersPage";
import CampaignList, { CreateCampaignPage } from "./pages/Campaigns/CampaignsPage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import CreditsPage from "./pages/Credits/CreditsPage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import DesignStudioPage from "./pages/DesignStudio/DesignStudioPage";
import TemplatesPage from "./pages/Templates/TemplatesPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="campaigns" element={<CampaignList />} />
              <Route path="campaigns/create" element={<CreateCampaignPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="design-studio" element={<DesignStudioPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
