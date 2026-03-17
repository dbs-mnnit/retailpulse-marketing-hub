import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Zap, Pause, Play, BarChart3, TrendingUp, Gift,
  ArrowUpRight, Clock, CheckCircle2, XCircle, Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const experiments = [
  { id: 1, name: '10% Flash Discount — Weekend', type: 'Coupon', status: 'active', result: '+22% orders', roi: '₹14,200', created: '3 days ago', confidence: 88 },
  { id: 2, name: 'Free Delivery over ₹999', type: 'Shipping', status: 'active', result: '+15% AOV', roi: '₹8,500', created: '5 days ago', confidence: 72 },
  { id: 3, name: 'Win-Back SMS to 60-day idle', type: 'Re-engagement', status: 'completed', result: '18% re-activated', roi: '₹22,000', created: '1 week ago', confidence: 91 },
  { id: 4, name: 'Bundle: Buy 2 Get 1 Free', type: 'Promotion', status: 'paused', result: '+8% volume', roi: '₹3,200', created: '2 weeks ago', confidence: 54 },
  { id: 5, name: 'Loyalty Bonus: 2x StarCoins', type: 'Loyalty', status: 'completed', result: '+31% repeat', roi: '₹18,900', created: '2 weeks ago', confidence: 85 },
];

const performanceData = [
  { day: 'Mon', baseline: 12000, withAgent: 15200 },
  { day: 'Tue', baseline: 11000, withAgent: 16800 },
  { day: 'Wed', baseline: 13500, withAgent: 17200 },
  { day: 'Thu', baseline: 12800, withAgent: 19500 },
  { day: 'Fri', baseline: 14000, withAgent: 22100 },
  { day: 'Sat', baseline: 18000, withAgent: 28500 },
  { day: 'Sun', baseline: 15000, withAgent: 21000 },
];

const statusConfig: Record<string, { color: string; icon: any }> = {
  active: { color: 'bg-green-500/10 text-green-600', icon: Play },
  completed: { color: 'bg-blue-500/10 text-blue-600', icon: CheckCircle2 },
  paused: { color: 'bg-amber-500/10 text-amber-600', icon: Pause },
  failed: { color: 'bg-red-500/10 text-red-500', icon: XCircle },
};

export default function GrowthAgentPage() {
  const [autopilot, setAutopilot] = useState(true);
  const totalROI = experiments.reduce((s, e) => s + parseInt(e.roi.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-violet-500" /> Growth Agent
          </h1>
          <p className="text-muted-foreground mt-1 text-base">AI-powered autonomous marketing experiments.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className={autopilot ? 'text-green-600 font-bold' : 'text-muted-foreground'}>Auto-Pilot</span>
            <Switch checked={autopilot} onCheckedChange={setAutopilot} />
          </div>
          <Button className="rounded-xl gradient-bg text-primary-foreground gap-2"><Zap className="h-4 w-4" /> New Experiment</Button>
        </div>
      </div>

      {autopilot && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl p-4 border border-green-500/20 flex items-center gap-3 text-sm">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium">Auto-Pilot is ON — The Growth Agent is running experiments autonomously based on your business data.</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Experiments</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{experiments.filter(e => e.status === 'active').length}</div><p className="text-xs text-green-600 mt-1">Running now</p></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total ROI Generated</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-green-600">₹{totalROI.toLocaleString('en-IN')}</div><p className="text-xs text-muted-foreground mt-1">All time</p></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Confidence</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{Math.round(experiments.reduce((s, e) => s + e.confidence, 0) / experiments.length)}%</div></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">80%</div><p className="text-xs text-green-600 mt-1">4 of 5 experiments won</p></CardContent>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-3xl p-6 shadow-card border border-border">
        <h3 className="font-semibold mb-6 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Baseline vs Agent-Boosted Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 0%, 60%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(0, 0%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="agentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
              <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="text-sm text-muted-foreground">Baseline: ₹{(payload[0].value as number / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-600 font-bold">With Agent: ₹{(payload[1].value as number / 1000).toFixed(0)}K</p>
              </div>
            ) : null} />
            <Area type="monotone" dataKey="baseline" stroke="hsl(0, 0%, 60%)" fill="url(#baseGrad)" strokeWidth={2} strokeDasharray="5 5" />
            <Area type="monotone" dataKey="withAgent" stroke="hsl(142, 71%, 45%)" fill="url(#agentGrad)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border"><h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5 text-violet-500" /> Experiment Log</h3></div>
        <div className="divide-y divide-border">
          {experiments.map((exp) => {
            const cfg = statusConfig[exp.status];
            const SIcon = cfg.icon;
            return (
              <div key={exp.id} className="p-5 hover:bg-muted/10 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${cfg.color}`}><SIcon className="h-5 w-5" /></div>
                  <div>
                    <p className="font-bold text-sm">{exp.name}</p>
                    <p className="text-xs text-muted-foreground">{exp.type} · {exp.created}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{exp.result}</p>
                    <p className="text-xs text-muted-foreground">ROI: {exp.roi}</p>
                  </div>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full" style={{ width: `${exp.confidence}%` }} />
                  </div>
                  <Badge className={`rounded-lg text-xs ${cfg.color}`}>{exp.status}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
