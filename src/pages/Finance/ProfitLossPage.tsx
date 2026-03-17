import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, DollarSign, BarChart3, Download,
  ArrowUpRight, ArrowDownRight, Wallet, Receipt, ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const monthlyPL = [
  { month: 'Oct', revenue: 320000, expenses: 210000 },
  { month: 'Nov', revenue: 380000, expenses: 230000 },
  { month: 'Dec', revenue: 450000, expenses: 275000 },
  { month: 'Jan', revenue: 410000, expenses: 260000 },
  { month: 'Feb', revenue: 395000, expenses: 245000 },
  { month: 'Mar', revenue: 480000, expenses: 280000 },
];

const expenseBreakdown = [
  { category: 'Inventory / COGS', amount: 145000, pct: '51.8%' },
  { category: 'Salaries & Wages', amount: 60000, pct: '21.4%' },
  { category: 'Rent & Utilities', amount: 33000, pct: '11.8%' },
  { category: 'Marketing', amount: 22000, pct: '7.9%' },
  { category: 'Technology', amount: 12000, pct: '4.3%' },
  { category: 'Other', amount: 8000, pct: '2.9%' },
];

const currentRevenue = 480000;
const currentExpenses = 280000;
const netProfit = currentRevenue - currentExpenses;
const margin = ((netProfit / currentRevenue) * 100).toFixed(1);

export default function ProfitLossPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Profit & Loss</h1>
          <p className="text-muted-foreground mt-1 text-base">Your business P&L statement at a glance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
          <Button variant="outline" className="rounded-xl gap-2"><ShieldCheck className="h-4 w-4" /> Lender Packet</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹{(currentRevenue/1000).toFixed(0)}K</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600"><ArrowUpRight className="h-3 w-3" /> 21.5% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">₹{(currentExpenses/1000).toFixed(0)}K</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-red-500"><ArrowUpRight className="h-3 w-3" /> 14.3% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{(netProfit/1000).toFixed(0)}K</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600"><TrendingUp className="h-3 w-3" /> Healthy</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-violet-500/10 border-primary/20 shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{margin}%</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600"><ArrowUpRight className="h-3 w-3" /> Above industry avg</div>
          </CardContent>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
        <h3 className="font-semibold mb-6 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Revenue vs Expenses (6 Months)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyPL} barGap={4}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
              <div className="bg-background/90 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl">
                <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
                <p className="text-sm text-green-600">Revenue: ₹{(payload[0].value as number / 1000).toFixed(0)}K</p>
                <p className="text-sm text-red-500">Expenses: ₹{(payload[1].value as number / 1000).toFixed(0)}K</p>
                <p className="text-sm font-bold mt-1">Profit: ₹{(((payload[0].value as number) - (payload[1].value as number)) / 1000).toFixed(0)}K</p>
              </div>
            ) : null} />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={32} fill="hsl(142, 71%, 45%)" />
            <Bar dataKey="expenses" radius={[8, 8, 0, 0]} barSize={32} fill="hsl(0, 84.2%, 60.2%)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Receipt className="h-5 w-5 text-violet-500" /> Expense Breakdown</h3>
          <div className="space-y-3">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium w-40">{item.category}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: item.pct }} transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full" />
                  </div>
                </div>
                <span className="text-sm font-bold ml-4 w-20 text-right">₹{(item.amount / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl p-6 shadow-card border border-green-500/20">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Wallet className="h-5 w-5 text-green-600" /> AI Financial Insight</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-background border border-border">
              <p className="text-sm font-bold mb-1">💡 Tip: Reduce COGS by 5%</p>
              <p className="text-xs text-muted-foreground">Your Inventory costs are 51.8% of expenses. Consider consolidating vendors to negotiate bulk pricing — could save ₹7,250/month.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border">
              <p className="text-sm font-bold mb-1">📈 Positive Trend</p>
              <p className="text-xs text-muted-foreground">Revenue grew 21.5% but expenses only rose 14.3%. Your operational efficiency is improving month over month.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border">
              <p className="text-sm font-bold mb-1">🏦 Lender Ready</p>
              <p className="text-xs text-muted-foreground">With a {margin}% profit margin and consistent growth, you qualify for Polestar's recommended lending partners.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
