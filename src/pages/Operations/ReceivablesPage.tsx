import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const agingData = [
  { range: '0-30 Days', amount: 450000, color: 'hsl(221.2, 83.2%, 53.3%)' },
  { range: '31-60 Days', amount: 280000, color: 'hsl(262.1, 83.3%, 57.8%)' },
  { range: '61-90 Days', amount: 150000, color: 'hsl(35, 92%, 50%)' },
  { range: '90+ Days', amount: 95000, color: 'hsl(0, 84.2%, 60.2%)' },
];

const invoices = [
  { id: 'INV-2024-001', customer: 'Nexus Retail Corp', amount: '₹45,000', due: '2024-03-20', status: 'overdue', risk: 'high' },
  { id: 'INV-2024-002', customer: 'Global Fashion Ltd', amount: '₹1,20,000', due: '2024-03-25', status: 'pending', risk: 'low' },
  { id: 'INV-2024-003', customer: 'Urban Eats', amount: '₹12,450', due: '2024-03-15', status: 'overdue', risk: 'medium' },
  { id: 'INV-2024-004', customer: 'Tech Haven', amount: '₹88,000', due: '2024-04-02', status: 'pending', risk: 'low' },
  { id: 'INV-2024-005', customer: 'Sunrise Groceries', amount: '₹32,000', due: '2024-03-10', status: 'paid', risk: 'none' },
];

export default function ReceivablesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Receivables & Aging</h1>
          <p className="text-muted-foreground mt-1 text-base">Track outstanding payments and cash flow health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="rounded-xl gradient-bg text-primary-foreground flex items-center gap-2">
            Add Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background border-border shadow-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹9,75,000</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-destructive">
              <ArrowUpRight className="h-3 w-3" /> 12% increase from last month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Days to Pay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24 Days</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600">
              <ArrowDownRight className="h-3 w-3" /> Improved by 4 days
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">88.5%</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600">
              <ArrowUpRight className="h-3 w-3" /> +2.1% efficiency
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Aging Buckets
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agingData}>
              <XAxis dataKey="range" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl">
                        <p className="text-xs font-medium text-muted-foreground">{payload[0].payload.range}</p>
                        <p className="text-lg font-bold">₹{payload[0].value.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={60}>
                {agingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" /> Collection Risk
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-destructive/5 border border-destructive/10">
              <div>
                <p className="text-sm font-bold">Nexus Retail Corp</p>
                <p className="text-xs text-muted-foreground">₹45,000 overdue by 12 days</p>
              </div>
              <Badge variant="destructive" className="rounded-lg">High Risk</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/5 border border-orange-500/10">
              <div>
                <p className="text-sm font-bold">Urban Eats</p>
                <p className="text-xs text-muted-foreground">₹12,450 overdue by 5 days</p>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 rounded-lg">Med Risk</Badge>
            </div>
            <div className="pt-4 px-2">
              <p className="text-xs text-muted-foreground italic">"AI Insight: Nexus Retail has a pattern of late payments on the 3rd week of the month."</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices or customers..." className="pl-10 h-10 rounded-xl" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Invoice ID</th>
                <th className="text-left py-4 px-6 font-semibold">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-right">Amount</th>
                <th className="text-left py-4 px-6 font-semibold">Due Date</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6 font-medium">{inv.id}</td>
                  <td className="py-4 px-6">{inv.customer}</td>
                  <td className="py-4 px-6 text-right font-bold">{inv.amount}</td>
                  <td className="py-4 px-6 text-muted-foreground">{inv.due}</td>
                  <td className="py-4 px-6">
                    <Badge className={cn(
                      "rounded-lg px-2 py-0.5 font-medium",
                      inv.status === 'overdue' ? 'bg-destructive/10 text-destructive' :
                      inv.status === 'paid' ? 'bg-green-500/10 text-green-600' :
                      'bg-primary/10 text-primary'
                    )}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
