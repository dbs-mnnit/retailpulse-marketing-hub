import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Megaphone, Palette, LayoutTemplate, BarChart3, 
  Coins, CreditCard, Settings, Bell, ChevronLeft, Menu, LogOut, Package, Clock,
  Sparkles, FileText, Crown, TrendingUp, Receipt, Briefcase, Truck,
  Star, UserCheck, FlaskConical, Shield, Bot, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import AIAssistant from '@/components/AI/AIAssistant';
import { Logo } from '@/components/Logo';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/pos', icon: CreditCard, label: 'POS Checkout' },
  { to: '/dashboard/shifts', icon: Clock, label: 'Shift Control' },
  { to: '/dashboard/orders', icon: Package, label: 'Store Orders' },
  { to: '/dashboard/bookings', icon: Bell, label: 'Service Bookings' },
  { to: '/dashboard/receivables', icon: BarChart3, label: 'Receivables' },
  { to: '/dashboard/inventory', icon: LayoutTemplate, label: 'Inventory IQ' },
  { to: '/dashboard/procurement', icon: Truck, label: 'Procurement' },
  { to: '/dashboard/customers', icon: Users, label: 'Customers' },
  { to: '/dashboard/crm', icon: Briefcase, label: 'CRM Pipeline' },
  { to: '/dashboard/campaigns', icon: Megaphone, label: 'Campaigns' },
  { to: '/dashboard/reviews', icon: Star, label: 'Reviews' },
  { to: '/dashboard/staff', icon: UserCheck, label: 'Staff Hub' },
  { to: '/dashboard/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/dashboard/profit-loss', icon: TrendingUp, label: 'Profit & Loss' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/simulation', icon: FlaskConical, label: 'Simulation Lab' },
  { to: '/dashboard/credit-score', icon: Shield, label: 'Credit Score' },
  { to: '/dashboard/growth-agent', icon: Bot, label: 'Growth Agent' },
  { to: '/dashboard/starcoin', icon: Coins, label: 'StarCoin' },
  { to: '/dashboard/design-studio', icon: Palette, label: 'Design Studio' },
  { to: '/dashboard/templates', icon: FileText, label: 'Templates' },
  { to: '/dashboard/credits', icon: Sparkles, label: 'Credits' },
  { to: '/dashboard/subscription', icon: Crown, label: 'Subscription' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];


export default function DashboardLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-500 font-sans selection:bg-primary/30">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-500 ease-[0.16, 1, 0.3, 1]",
        collapsed ? "w-[100px]" : "w-72",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "p-4 lg:p-6" // Added padding for floating effect
      )}>
        <div className={cn(
          "flex-1 flex flex-col glass border-border rounded-[2.5rem] shadow-premium overflow-hidden transition-all duration-500",
          "bg-muted/30"
        )}>
          <div className={cn("flex items-center h-20 px-6 border-b border-border/10", collapsed ? "justify-center" : "justify-between")}>
            <Logo className="h-8" showText={!collapsed} />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hidden lg:flex rounded-xl bg-muted/30 border border-border/20 hover:bg-muted/50 transition-all" 
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform duration-500", collapsed && "rotate-180")} />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 relative group overflow-hidden",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                  collapsed && "justify-center px-0 h-12 w-12 mx-auto"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-all duration-500", isActive && "scale-110", "group-hover:scale-110")} />
                    {!collapsed && <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">{item.label}</span>}
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-glow" 
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className={cn("p-4 border-t border-border/10", collapsed ? "flex justify-center" : "")}>
            <NavLink 
              to="/login" 
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all", 
                collapsed && "justify-center h-12 w-12"
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Sign Out</span>}
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main */}
      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Superior Header */}
        <header className="h-24 px-8 lg:px-12 flex items-center justify-between relative z-30">
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-border/50 via-border/20 to-transparent" />
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden h-12 w-12 rounded-2xl bg-muted/30 border border-border/20" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden lg:flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Active Workspace</span>
              <span className="text-sm font-black uppercase tracking-widest text-foreground">Main Command Center</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/20 relative group hover:bg-muted/50 transition-all">
              <Sparkles className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[8px] font-black items-center justify-center text-primary-foreground">A</span>
              </span>
            </Button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-border/10">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-black uppercase tracking-widest text-foreground">Operator 01</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Super Admin</div>
              </div>
               <Avatar className="h-12 w-12 rounded-2xl border border-border shadow-premium">
                <AvatarFallback className="bg-primary text-primary-foreground font-black text-sm">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dynamic Page content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 no-scrollbar relative">
          {/* Subtle page background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
