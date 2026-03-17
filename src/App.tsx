import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LandingPage from "./pages/Landing/LandingPage";
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage } from "./pages/Auth/AuthPages";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import CustomersPage from "./pages/Customers/CustomersPage";
import CampaignList, { CreateCampaignPage } from "./pages/Campaigns/CampaignsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import ReceivablesPage from "./pages/Operations/ReceivablesPage";
import OrdersPage from "./pages/Operations/OrdersPage";
import ShiftManagement from "./pages/Operations/ShiftManagement";
import InventoryIntelligencePage from "./pages/Operations/InventoryIntelligencePage";
import ProcurementPage from "./pages/Operations/ProcurementPage";
import PosPage from "./pages/Transactions/PosPage";
import BookingsPage from "./pages/Transactions/BookingsPage";
import IntelligencePage from "./pages/Analytics/IntelligencePage";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import CreditsPage from "./pages/Credits/CreditsPage";
import TemplatesPage from "./pages/Templates/TemplatesPage";
import DesignStudioPage from "./pages/DesignStudio/DesignStudioPage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import StorefrontPage from "@/pages/Storefront/StorefrontPage";
import CheckoutHub from "@/pages/Storefront/CheckoutHub";
import ExpensesPage from "./pages/Finance/ExpensesPage";
import ProfitLossPage from "./pages/Finance/ProfitLossPage";
import CRMPage from "./pages/CRM/CRMPage";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import StaffHubPage from "./pages/Staff/StaffHubPage";
import SimulationPage from "./pages/Intelligence/SimulationPage";
import CreditScorePage from "./pages/Intelligence/CreditScorePage";
import GrowthAgentPage from "./pages/Intelligence/GrowthAgentPage";
import NotFound from "./pages/NotFound";


import { ThemeProvider } from "./components/ThemeProvider";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "google-client-id";

const App = () => (
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="polestar-theme">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/s/:slug" element={<StorefrontPage />} />
            <Route path="/s/:slug/checkout" element={<CheckoutHub />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="pos" element={<PosPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="shifts" element={<ShiftManagement />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="receivables" element={<ReceivablesPage />} />
                <Route path="inventory" element={<InventoryIntelligencePage />} />
                <Route path="procurement" element={<ProcurementPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="crm" element={<CRMPage />} />
                <Route path="campaigns" element={<CampaignList />} />
                <Route path="campaigns/create" element={<CreateCampaignPage />} />
                <Route path="starcoin" element={<IntelligencePage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="profit-loss" element={<ProfitLossPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="staff" element={<StaffHubPage />} />
                <Route path="simulation" element={<SimulationPage />} />
                <Route path="credit-score" element={<CreditScorePage />} />
                <Route path="growth-agent" element={<GrowthAgentPage />} />
                <Route path="credits" element={<CreditsPage />} />
                <Route path="templates" element={<TemplatesPage />} />
                <Route path="design-studio" element={<DesignStudioPage />} />
                <Route path="subscription" element={<SubscriptionPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
