import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowUpRight, ArrowDownRight, ShoppingCart, Zap, TrendingUp, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useGetCreditsQuery } from '@/app/api/dataApi';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const packages = [
  { id: 'p1', credits: 1000, price: 499, label: 'Starter', color: 'from-slate-500 to-gray-600' },
  { id: 'p2', credits: 5000, price: 1999, label: 'Growth', popular: true, color: 'from-indigo-500 to-violet-600' },
  { id: 'p3', credits: 20000, price: 5999, label: 'Enterprise', color: 'from-amber-500 to-orange-600' },
];

export default function CreditsPage() {
  const { data: creditsData, isLoading, error } = useGetCreditsQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center gap-3 text-muted-foreground"><div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> Loading credits...</div>
    </div>
  );
  if (error) return <div className="p-8 text-center text-destructive">Error loading credits.</div>;

  const history = creditsData?.history || [];
  const stats = creditsData?.stats || { available: 0, used: 0, purchased: 0 };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Credit Vault</h1>
          <p className="text-muted-foreground font-medium mt-1">Messaging fuel for your campaigns and automations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-2xl gradient-bg text-primary-foreground gap-2 h-12 px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all">
              <ShoppingCart className="h-4 w-4" /> Buy Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-lg p-0 overflow-hidden">
            <div className="p-8 bg-gray-950 text-white">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-black">Purchase Credits</DialogTitle>
                <p className="text-gray-400 font-medium text-sm mt-1">Select a package that fits your volume</p>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-4">
              {packages.map((pkg) => (
                <button key={pkg.id} className={`relative w-full p-6 rounded-2xl border-2 text-left transition-all hover:border-primary hover:shadow-lg group ${pkg.popular ? 'border-primary bg-primary/5 shadow-md' : 'border-border'}`}>
                  {pkg.popular && (
                    <span className="absolute -top-3 right-4 gradient-bg text-primary-foreground text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Best Value</span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-white shadow-lg`}>
                        <Coins className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-black text-lg">{pkg.credits.toLocaleString()} credits</div>
                        <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{pkg.label}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black">₹{pkg.price.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground font-bold">₹{(pkg.price / pkg.credits).toFixed(2)}/credit</div>
                    </div>
                  </div>
                </button>
              ))}
              <Button className="w-full rounded-2xl gradient-bg text-primary-foreground mt-2 h-14 font-black text-base shadow-lg">
                <CreditCard className="h-5 w-5 mr-2" /> Complete Purchase
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Hero Stats */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="relative overflow-hidden bg-gray-900 text-white rounded-3xl p-8 shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="h-32 w-32" /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="h-5 w-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Available</span>
            </div>
            <div className="text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">{stats.available.toLocaleString()}</div>
            <p className="text-xs text-gray-500 font-bold mt-3">Ready to deploy</p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Used This Month</span>
          </div>
          <div className="text-4xl font-black text-gray-900">{stats.used.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-3 text-xs font-bold text-indigo-600">
            <ArrowUpRight className="h-3 w-3" /> 14% vs last month
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-violet-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Purchased</span>
          </div>
          <div className="text-4xl font-black text-gray-900">{stats.purchased.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-3 text-xs font-bold text-emerald-600">
            <ArrowUpRight className="h-3 w-3" /> Lifetime volume
          </div>
        </motion.div>
      </motion.div>

      {/* Credit Ledger */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-gray-900">Transaction Ledger</h3>
          <Badge variant="outline" className="rounded-full text-[10px] font-black uppercase tracking-widest px-4 py-1.5">Last 30 Days</Badge>
        </div>
        <div className="space-y-3">
          {history.map((h: any) => (
            <div key={h.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${h.type === 'purchase' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {h.type === 'purchase' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{h.description}</div>
                  <div className="text-xs text-muted-foreground font-medium">{h.date}</div>
                </div>
              </div>
              <span className={`font-black text-lg ${h.type === 'purchase' ? 'text-emerald-600' : 'text-gray-900'}`}>
                {h.type === 'purchase' ? '+' : '-'}{h.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
