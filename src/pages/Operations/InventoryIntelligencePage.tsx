import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  ArrowRight, 
  BarChart2, 
  TrendingDown, 
  Layers,
  Search,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const categoryData = [
  { name: 'Apparel', value: 45, color: 'hsl(221.2, 83.2%, 53.3%)' },
  { name: 'Accessories', value: 25, color: 'hsl(262.1, 83.3%, 57.8%)' },
  { name: 'Footwear', value: 20, color: 'hsl(142.1, 76.2%, 36.3%)' },
  { name: 'Other', value: 10, color: 'hsl(240, 5%, 64.9%)' },
];

const criticalStock = [
  { id: 1, name: 'Cotton T-Shirt (Large)', stock: 3, reorderAt: 10, status: 'critical' },
  { id: 2, name: 'Leather Belt (Black)', stock: 5, reorderAt: 15, status: 'low' },
  { id: 3, name: 'Denim Jeans (32)', stock: 2, reorderAt: 8, status: 'critical' },
];

export default function InventoryIntelligencePage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Inventory Intelligence</h1>
          <p className="text-muted-foreground mt-1 text-base">Optimize stock levels with AI-driven insights.</p>
        </div>
        <Button className="rounded-xl gradient-bg text-primary-foreground flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardStat title="Total SKUs" value="1,240" icon={Package} color="text-primary" />
        <CardStat title="Low Stock Alerts" value="42" icon={AlertTriangle} color="text-destructive" />
        <CardStat title="Dead Stock Value" value="₹1.4L" icon={TrendingDown} color="text-orange-500" />
        <CardStat title="Stock Turnover" value="8.4x" icon={Layers} color="text-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2">Stock Distribution</h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-full h-48 sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-3">
              {categoryData.map(c => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-muted-foreground">{c.name}</span>
                  </div>
                  <span className="font-bold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
          <h3 className="font-semibold mb-6 flex items-center gap-2 text-destructive">Critical Reorder Alerts</h3>
          <div className="space-y-4">
            {criticalStock.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface/50 border border-border group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", item.status === 'critical' ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-500')}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Only {item.stock} units left (Min: {item.reorderAt})</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-semibold group-hover:bg-primary/10">Reorder</Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Dead Stock Analysis</h3>
          <p className="text-xs text-muted-foreground">SKUs with zero movement in 90+ days</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DeadStockCard name="Classic Blazer (Red)" value="₹12,500" days="120" />
          <DeadStockCard name="Woolen Scarf (Blue)" value="₹4,200" days="95" />
          <DeadStockCard name="Silk Tie (Pattern)" value="₹8,800" days="110" />
        </div>
        <div className="mt-8 p-4 rounded-2xl gradient-subtle-bg border border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Polestar AI suggests running a clearance campaign for these items.</p>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground rounded-lg">Create Campaign</Button>
        </div>
      </motion.div>
    </div>
  );
}

function CardStat({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-background rounded-2xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function DeadStockCard({ name, value, days }: any) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-surface/30 hover:shadow-lg transition-all">
      <p className="font-bold text-sm mb-1">{name}</p>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-muted-foreground">Holding Value</p>
          <p className="text-lg font-bold text-primary">{value}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{days} Days Idle</p>
          <Badge variant="outline" className="text-[10px] h-4 mt-1 border-destructive text-destructive">Immobilized</Badge>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
