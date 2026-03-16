import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockCreditHistory } from '@/services/mockData';

const packages = [
  { id: 'p1', credits: 1000, price: 29, label: 'Starter' },
  { id: 'p2', credits: 5000, price: 99, label: 'Growth', popular: true },
  { id: 'p3', credits: 20000, price: 299, label: 'Enterprise' },
];

export default function CreditsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Credits</h1>
          <p className="text-muted-foreground mt-1">Manage your messaging credits</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-xl gradient-bg text-primary-foreground gap-2"><ShoppingCart className="h-4 w-4" /> Buy Credits</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-lg">
            <DialogHeader><DialogTitle className="font-display text-xl">Purchase Credits</DialogTitle></DialogHeader>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {packages.map((pkg) => (
                <button key={pkg.id} className={`relative p-5 rounded-xl border-2 text-left transition-all hover:border-primary ${pkg.popular ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">Popular</span>
                  )}
                  <div className="text-xl font-bold">{pkg.credits.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mb-3">credits</div>
                  <div className="text-lg font-semibold">${pkg.price}</div>
                </button>
              ))}
            </div>
            <Button className="w-full rounded-xl gradient-bg text-primary-foreground mt-2 h-11 font-semibold">Purchase Now</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-2xl p-5 shadow-card">
          <span className="text-sm text-muted-foreground">Available Credits</span>
          <div className="text-3xl font-bold mt-2 gradient-text">4,250</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background rounded-2xl p-5 shadow-card">
          <span className="text-sm text-muted-foreground">Credits Used</span>
          <div className="text-3xl font-bold mt-2">7,250</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background rounded-2xl p-5 shadow-card">
          <span className="text-sm text-muted-foreground">Credits Purchased</span>
          <div className="text-3xl font-bold mt-2">15,000</div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-background rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-6">Credit History</h3>
        <div className="space-y-3">
          {mockCreditHistory.map((h) => (
            <div key={h.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${h.type === 'purchase' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                  {h.type === 'purchase' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium text-sm">{h.description}</div>
                  <div className="text-xs text-muted-foreground">{h.date}</div>
                </div>
              </div>
              <span className={`font-semibold ${h.type === 'purchase' ? 'text-green-600' : 'text-foreground'}`}>
                {h.type === 'purchase' ? '+' : ''}{h.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
