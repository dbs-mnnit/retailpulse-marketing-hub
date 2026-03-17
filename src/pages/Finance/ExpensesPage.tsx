import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, Upload, Plus, PieChart as PieChartIcon, TrendingDown, Wallet,
  Search, Filter, ArrowUpRight, ArrowDownRight, Loader2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetExpensesQuery, useAddExpenseMutation, useUploadReceiptMutation } from '@/app/api/financeApi';
import { useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';

const categoryColors: Record<string, string> = {
  Inventory: 'hsl(221.2, 83.2%, 53.3%)',
  Rent: 'hsl(262.1, 83.3%, 57.8%)',
  Salaries: 'hsl(142, 71%, 45%)',
  Utilities: 'hsl(35, 92%, 50%)',
  Marketing: 'hsl(0, 84.2%, 60.2%)',
  Other: 'hsl(200, 50%, 60%)',
};

const fallbackTrendData = [
  { month: 'Oct', amount: 120000 }, { month: 'Nov', amount: 135000 },
  { month: 'Dec', amount: 155000 }, { month: 'Jan', amount: 142000 },
  { month: 'Feb', amount: 138000 }, { month: 'Mar', amount: 150000 },
];

export default function ExpensesPage() {
  const [showOCR, setShowOCR] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Inventory', date: '' });

  // API hooks — gracefully falls back to empty when no businessId in session
  const businessId = useAppSelector((state) => state.business.currentId) || '';
  const { data: expenses, isLoading, error } = useGetExpensesQuery(businessId, { skip: !businessId });
  const [addExpenseFn, { isLoading: isAdding }] = useAddExpenseMutation();
  const [uploadReceiptFn, { isLoading: isUploading }] = useUploadReceiptMutation();

  // Derive category breakdown from data or use fallback
  const expenseList = expenses || [];
  const categoryMap: Record<string, number> = {};
  expenseList.forEach((e: any) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + (e.amount || 0);
  });
  const categoryData = Object.keys(categoryMap).length > 0
    ? Object.entries(categoryMap).map(([name, value]) => ({ name, value, color: categoryColors[name] || 'hsl(200, 50%, 60%)' }))
    : [
        { name: 'Inventory', value: 45000, color: categoryColors.Inventory },
        { name: 'Rent', value: 25000, color: categoryColors.Rent },
        { name: 'Salaries', value: 60000, color: categoryColors.Salaries },
        { name: 'Utilities', value: 8000, color: categoryColors.Utilities },
        { name: 'Marketing', value: 12000, color: categoryColors.Marketing },
      ];
  const totalExpenses = categoryData.reduce((s, c) => s + c.value, 0);
  const topCategory = categoryData.reduce((a, b) => a.value > b.value ? a : b, categoryData[0]);

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return toast.error('Please fill all fields');
    try {
      await addExpenseFn({ businessId, description: newExpense.description, amount: Number(newExpense.amount), category: newExpense.category, date: newExpense.date }).unwrap();
      toast.success('Expense added successfully');
      setNewExpense({ description: '', amount: '', category: 'Inventory', date: '' });
      setShowAdd(false);
    } catch { toast.error('Failed to add expense'); }
  };

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadReceiptFn({ businessId, file }).unwrap();
      toast.success('Receipt scanned! Expense created automatically.');
      setShowOCR(false);
    } catch { toast.error('Failed to scan receipt'); }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Expense Manager</h1>
          <p className="text-muted-foreground mt-1 text-base">Track, categorize, and optimize your business spending.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl flex items-center gap-2" onClick={() => setShowOCR(!showOCR)}>
            <Upload className="h-4 w-4" /> Scan Receipt
          </Button>
          <Button className="rounded-xl gradient-bg text-primary-foreground flex items-center gap-2" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      {showOCR && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-r from-primary/5 to-violet-500/5 rounded-3xl p-8 border border-primary/20 text-center">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4 opacity-60" />
          <h3 className="font-bold text-lg mb-2">AI Receipt Scanner</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload a photo of any receipt — our AI will extract the vendor, amount, and category.</p>
          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium cursor-pointer hover:opacity-90 transition-opacity">
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {isUploading ? 'Scanning...' : 'Choose Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
          </label>
        </motion.div>
      )}

      {showAdd && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="bg-background rounded-3xl p-6 border border-border shadow-card space-y-4">
          <h3 className="font-bold">New Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Description" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} className="rounded-xl" />
            <Input type="number" placeholder="Amount (₹)" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="rounded-xl" />
            <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
              {Object.keys(categoryColors).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} className="rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Button className="rounded-xl gradient-bg text-primary-foreground" onClick={handleAddExpense} disabled={isAdding}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Expense
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 text-destructive text-sm">
          Failed to load expenses. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total This Month</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <div className="h-8 w-24 bg-muted animate-pulse rounded-lg" /> :
              <div className="text-3xl font-bold">₹{totalExpenses.toLocaleString('en-IN')}</div>}
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-destructive"><ArrowUpRight className="h-3 w-3" /> 8% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Largest Category</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <div className="h-8 w-20 bg-muted animate-pulse rounded-lg" /> :
              <div className="text-3xl font-bold">{topCategory.name}</div>}
            <div className="text-xs text-muted-foreground mt-1">₹{topCategory.value.toLocaleString('en-IN')} · {((topCategory.value / totalExpenses) * 100).toFixed(1)}% of total</div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <div className="h-8 w-16 bg-muted animate-pulse rounded-lg" /> :
              <div className="text-3xl font-bold">₹{expenseList.filter((e: any) => e.status === 'pending').reduce((s: number, e: any) => s + (e.amount || 0), 0).toLocaleString('en-IN') || '0'}</div>}
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600"><ArrowDownRight className="h-3 w-3" /> {expenseList.filter((e: any) => e.status === 'pending').length} pending</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><TrendingDown className="h-5 w-5 text-primary" /> Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fallbackTrendData}>
              <defs><linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={({ active, payload }) => active && payload?.length ? (
                <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl"><p className="text-lg font-bold">₹{payload[0].value?.toLocaleString('en-IN')}</p></div>
              ) : null} />
              <Area type="monotone" dataKey="amount" stroke="hsl(221.2, 83.2%, 53.3%)" fill="url(#expGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><PieChartIcon className="h-5 w-5 text-violet-500" /> By Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
              {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} /><span className="font-medium">{cat.name}</span></div>
                <span className="text-muted-foreground">₹{cat.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search expenses..." className="pl-10 h-10 rounded-xl" /></div>
          <Button variant="outline" size="sm" className="rounded-lg gap-2"><Filter className="h-4 w-4" /> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Description</th>
                <th className="text-left py-4 px-6 font-semibold">Category</th>
                <th className="text-right py-4 px-6 font-semibold">Amount</th>
                <th className="text-left py-4 px-6 font-semibold">Date</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {Array.from({ length: 5 }).map((_, j) => <td key={j} className="py-4 px-6"><div className="h-4 w-20 bg-muted animate-pulse rounded" /></td>)}
                </tr>
              )) : expenseList.length > 0 ? expenseList.map((exp: any) => (
                <tr key={exp._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6 font-medium">{exp.description}</td>
                  <td className="py-4 px-6"><Badge variant="outline" className="rounded-lg">{exp.category}</Badge></td>
                  <td className="py-4 px-6 text-right font-bold">₹{(exp.amount || 0).toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 text-muted-foreground">{exp.date ? new Date(exp.date).toLocaleDateString() : '-'}</td>
                  <td className="py-4 px-6"><Badge className={`rounded-lg ${exp.status === 'paid' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>{exp.status || 'pending'}</Badge></td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">No expenses yet. Click "Add Expense" to start tracking.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
