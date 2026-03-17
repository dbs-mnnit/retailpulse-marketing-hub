import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Shield, ArrowRight, CreditCard, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const plans = [
  { 
    name: 'Starter', price: '₹999', period: '/mo', capacity: 'Up to 500 products',
    features: ['POS + Storefront', 'Basic Analytics', '500 StarCoins/mo', 'Email Support', '1 Staff Login'],
    current: false, color: 'from-slate-500 to-gray-600'
  },
  { 
    name: 'Growth', price: '₹2,999', period: '/mo', capacity: 'Unlimited products',
    features: ['Everything in Starter', 'AI Intelligence Hub', '5,000 StarCoins/mo', 'Service Bookings', 'Priority Support', '5 Staff Logins'],
    current: true, popular: true, color: 'from-indigo-500 to-violet-600'
  },
  { 
    name: 'Enterprise', price: '₹7,999', period: '/mo', capacity: 'Multi-location',
    features: ['Everything in Growth', 'Unlimited StarCoins', 'White-label Storefront', 'Custom API Access', 'Dedicated Success Manager', '∞ Staff Logins', 'SOC 2 Compliance'],
    current: false, color: 'from-amber-500 to-orange-600'
  },
];

const billingHistory = [
  { date: 'Mar 1, 2026', description: 'Growth Plan — Monthly', amount: '₹2,999', status: 'Paid' },
  { date: 'Feb 1, 2026', description: 'Growth Plan — Monthly', amount: '₹2,999', status: 'Paid' },
  { date: 'Jan 1, 2026', description: 'Starter Plan — Monthly', amount: '₹999', status: 'Paid' },
  { date: 'Dec 1, 2025', description: 'Starter Plan — Monthly', amount: '₹999', status: 'Paid' },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Subscription</h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your plan, billing, and usage</p>
        </div>
        <Button variant="outline" className="rounded-2xl font-bold gap-2 h-11 border-gray-200">
          <Download className="h-4 w-4" /> Export Invoices
        </Button>
      </div>

      {/* Current Plan Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden bg-gray-950 text-white rounded-3xl p-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Crown className="h-48 w-48" /></div>
        <div className="absolute top-10 right-32 w-48 h-48 rounded-full bg-indigo-500/20 blur-[80px]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl">Growth Plan</h3>
              <Badge className="bg-white/10 text-white border-white/20 rounded-full font-bold text-[10px] uppercase tracking-widest">Active</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Monthly Price</span>
              <div className="text-2xl font-black mt-1">₹2,999</div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Next Billing</span>
              <div className="text-2xl font-black mt-1">Apr 1</div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Products Used</span>
              <div className="text-2xl font-black mt-1">842 / ∞</div>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">StarCoins/mo</span>
              <div className="text-2xl font-black mt-1 text-amber-400">5,000</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Plan Comparison */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div 
            key={plan.name} 
            variants={fadeInUp} 
            className={`relative bg-white rounded-3xl p-8 shadow-card border transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
              plan.current ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
            }`}
          >
            {plan.current && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Current Plan</span>
            )}
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mb-5`}>
              {plan.name === 'Starter' && <Zap className="h-6 w-6 text-white" />}
              {plan.name === 'Growth' && <Crown className="h-6 w-6 text-white" />}
              {plan.name === 'Enterprise' && <Shield className="h-6 w-6 text-white" />}
            </div>
            <h3 className="font-display font-black text-xl mb-1">{plan.name}</h3>
            <p className="text-xs text-muted-foreground font-bold mb-4">{plan.capacity}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-muted-foreground font-medium">{plan.period}</span>
            </div>
            <Separator className="mb-6" />
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full rounded-2xl h-12 font-bold ${plan.current ? '' : 'gradient-bg text-primary-foreground shadow-lg'}`} 
              variant={plan.current ? 'outline' : 'default'} 
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
              {!plan.current && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Billing History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900">Billing History</h3>
          <Button variant="ghost" className="text-indigo-600 font-bold text-sm gap-2"><RefreshCw className="h-4 w-4" /> Refresh</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="text-left py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Description</th>
                <th className="text-left py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Amount</th>
                <th className="text-left py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="text-left py-4 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-muted-foreground">{b.date}</td>
                  <td className="py-4 font-bold text-gray-900">{b.description}</td>
                  <td className="py-4 font-black text-gray-900">{b.amount}</td>
                  <td className="py-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-full text-[10px] font-bold">{b.status}</Badge>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm" className="text-indigo-600 font-bold text-xs gap-1"><Download className="h-3 w-3" /> PDF</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
