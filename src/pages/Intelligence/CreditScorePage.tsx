import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, TrendingUp, ArrowUpRight, Clock, CheckCircle2,
  AlertTriangle, Building2, Share2, Zap, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCreditScoreQuery } from '@/app/api/intelligenceApi';
import { useAppSelector } from '@/app/hooks';

const fallbackBreakdown = [
  { factor: 'Revenue Consistency', score: 88, weight: '25%', trend: 'up' },
  { factor: 'Receivables Health', score: 72, weight: '20%', trend: 'up' },
  { factor: 'Cash Flow Stability', score: 81, weight: '20%', trend: 'stable' },
  { factor: 'Customer Growth', score: 78, weight: '15%', trend: 'up' },
  { factor: 'Expense Discipline', score: 65, weight: '20%', trend: 'down' },
];

const loanOffers = [
  { partner: 'HDFC Bank', amount: '₹5,00,000', rate: '12.5%', tenure: '24 months', status: 'Pre-Approved' },
  { partner: 'Lendingkart', amount: '₹3,00,000', rate: '14.0%', tenure: '18 months', status: 'Eligible' },
  { partner: 'Bajaj Finserv', amount: '₹8,00,000', rate: '11.8%', tenure: '36 months', status: 'Pre-Approved' },
];

function ScoreGauge({ score }: { score: number }) {
  const angle = (score / 100) * 180;
  const color = score >= 80 ? 'hsl(142, 71%, 45%)' : score >= 60 ? 'hsl(35, 92%, 50%)' : 'hsl(0, 84.2%, 60.2%)';
  return (
    <div className="relative w-48 h-24 mx-auto">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" strokeLinecap="round" />
        <motion.path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
          initial={{ strokeDasharray: '0 251.2' }} animate={{ strokeDasharray: `${(angle / 180) * 251.2} 251.2` }}
          transition={{ duration: 1.5, ease: 'easeOut' }} />
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-0">
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-sm text-muted-foreground ml-1 mb-1">/100</span>
      </div>
    </div>
  );
}

export default function CreditScorePage() {
  const businessId = useAppSelector((state) => state.business.currentId) || '';
  const { data, isLoading } = useGetCreditScoreQuery(businessId, { skip: !businessId });

  const overallScore = data?.overall || Math.round(fallbackBreakdown.reduce((s, f) => s + f.score * parseFloat(f.weight) / 100, 0));
  const breakdown = data?.breakdown || fallbackBreakdown;
  const tier = data?.tier || (overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Work');
  const tierColor = overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-amber-600' : 'text-red-500';

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3"><Shield className="h-8 w-8 text-green-600" /> Polestar Credit Score</h1>
          <p className="text-muted-foreground mt-1 text-base">Your business credibility score for faster loan approvals.</p>
        </div>
        <Button className="rounded-xl gradient-bg text-primary-foreground gap-2"><Share2 className="h-4 w-4" /> Share with Lender</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl p-8 shadow-card border border-green-500/20 text-center">
          <h3 className="font-semibold mb-6">Your Score</h3>
          {isLoading ? <div className="w-48 h-24 mx-auto bg-muted animate-pulse rounded-xl" /> : <ScoreGauge score={overallScore} />}
          <p className={`text-lg font-bold mt-4 ${tierColor}`}>{tier}</p>
          <p className="text-xs text-muted-foreground mt-1">Updated {isLoading ? '...' : '2 hours ago'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Score Breakdown</h3>
          <div className="space-y-4">
            {isLoading ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4"><div className="h-3 w-full bg-muted animate-pulse rounded-full" /></div>
            )) : breakdown.map((factor: any) => (
              <div key={factor.factor} className="flex items-center gap-4">
                <span className="text-sm font-medium w-44">{factor.factor}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${factor.score}%` }} transition={{ duration: 0.8 }}
                    className="h-full rounded-full" style={{ backgroundColor: factor.score >= 80 ? 'hsl(142, 71%, 45%)' : factor.score >= 60 ? 'hsl(35, 92%, 50%)' : 'hsl(0, 84.2%, 60.2%)' }} />
                </div>
                <span className="text-sm font-bold w-12 text-right">{factor.score}</span>
                <Badge variant="outline" className="text-[10px] rounded-md w-12 text-center">{factor.weight}</Badge>
                {factor.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-600" />}
                {factor.trend === 'down' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                {factor.trend === 'stable' && <Clock className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Available Loan Offers</h3>
          <p className="text-xs text-muted-foreground mt-1">Based on your Polestar Credit Score</p>
        </div>
        <div className="divide-y divide-border">
          {loanOffers.map((offer) => (
            <div key={offer.partner} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
              <div>
                <p className="font-bold">{offer.partner}</p>
                <p className="text-sm text-muted-foreground">{offer.rate} · {offer.tenure}</p>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-bold text-xl">{offer.amount}</p>
                  <Badge className={`rounded-lg text-xs ${offer.status === 'Pre-Approved' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>{offer.status}</Badge>
                </div>
                <Button size="sm" className="rounded-xl">Apply</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
