import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical, TrendingUp, TrendingDown, DollarSign, Percent, BarChart3,
  Play, RotateCcw, ArrowUpRight, ArrowDownRight, Lightbulb, Loader2, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRunSimulationMutation } from '@/app/api/aiApi';
import { useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';

const baseScenario = { price: 500, discount: 10, volume: 200, cogs: 280 };

function simulate(price: number, discount: number, volume: number, cogs: number) {
  const effectivePrice = price * (1 - discount / 100);
  const revenue = effectivePrice * volume;
  const totalCost = cogs * volume;
  const profit = revenue - totalCost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  return { revenue, totalCost, profit, margin, effectivePrice };
}

export default function SimulationPage() {
  const [price, setPrice] = useState(baseScenario.price);
  const [discount, setDiscount] = useState(baseScenario.discount);
  const [volume, setVolume] = useState(baseScenario.volume);
  const [cogs, setCogs] = useState(baseScenario.cogs);

  const [runSimMutation, { isLoading: isPending }] = useRunSimulationMutation();

  const current = simulate(baseScenario.price, baseScenario.discount, baseScenario.volume, baseScenario.cogs);
  const projected = simulate(price, discount, volume, cogs);
  const profitChange = current.profit > 0 ? ((projected.profit - current.profit) / current.profit * 100).toFixed(1) : '0';

  const projectionData = Array.from({ length: 6 }, (_, i) => {
    const monthVolume = Math.round(volume * (1 + i * 0.05));
    const sim = simulate(price, discount, monthVolume, cogs);
    return { month: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i], profit: Math.round(sim.profit), revenue: Math.round(sim.revenue) };
  });

  const reset = () => { setPrice(baseScenario.price); setDiscount(baseScenario.discount); setVolume(baseScenario.volume); setCogs(baseScenario.cogs); };

  const runBackendSim = async () => {
    try {
      const result = await runSimMutation({
        params: {
          priceChange: ((price - baseScenario.price) / baseScenario.price) * 100,
          discountChange: discount - baseScenario.discount,
          volumeChange: ((volume - baseScenario.volume) / baseScenario.volume) * 100,
          cogsChange: ((cogs - baseScenario.cogs) / baseScenario.cogs) * 100,
        }
      }).unwrap();
      toast.success(`Matrix resolved — Projected Yield: ₹${result?.projected?.profit?.toLocaleString('en-IN') || 'N/A'}`);
    } catch {
      toast.info('Local node processing (Matrix Link Offline)');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Physics Simulation</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-white">Simulation Lab</h1>
          <p className="text-gray-500 font-medium mt-1">Hypothetical market projection and profit elasticity model.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all gap-3" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset Matrix
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-cyan-50 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all flex items-center gap-3" onClick={runBackendSim} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} Resolve Scenario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
          
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
             <FlaskConical className="h-4 w-4" /> Variables
          </h3>
          
          <div className="space-y-8">
            {[
              { label: 'Market Unit Price (₹)', value: price, set: setPrice, min: 100, max: 2000, step: 10 },
              { label: 'Discount Coefficient (%)', value: discount, set: setDiscount, min: 0, max: 50, step: 1 },
              { label: 'Monthly Throughput', value: volume, set: setVolume, min: 10, max: 1000, step: 10 },
              { label: 'COGS Density (₹)', value: cogs, set: setCogs, min: 50, max: 1500, step: 10 },
            ].map((s) => (
              <div key={s.label} className="group/item">
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/item:text-indigo-400 transition-colors">{s.label}</span>
                  <span className="text-sm font-display font-black text-white">{s.label.includes('₹') ? `₹${s.value}` : s.label.includes('%') ? `${s.value}%` : s.value}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/[0.03] rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-cyan-400 transition-all" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'PROJECTED REVENUE', value: `₹${(projected.revenue / 1000).toFixed(0)}K`, icon: DollarSign },
              { label: 'ESTIMATED PROFIT', value: `₹${(projected.profit / 1000).toFixed(0)}K`, change: profitChange, icon: TrendingUp },
              { label: 'NET ELASTICITY', value: `${projected.margin.toFixed(1)}%`, color: projected.margin > 20 ? 'text-emerald-400' : projected.margin > 0 ? 'text-amber-400' : 'text-rose-500', icon: Percent },
              { label: 'EFFECTIVE INDEX', value: `₹${projected.effectivePrice.toFixed(0)}`, icon: Target },
            ].map((m) => (
              <div key={m.label} className="p-6 rounded-2xl glass border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">{m.label}</p>
                <div className={`text-2xl font-display font-black tracking-tight ${m.color || 'text-white'}`}>{m.value}</div>
                {m.change && (
                  <div className={`flex items-center gap-1.5 text-[10px] font-black mt-1.5 ${Number(m.change) >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {Number(m.change) >= 0 ? <TrendingUp className="h-3 w-3 shadow-glow" /> : <TrendingDown className="h-3 w-3 shadow-glow" />} 
                    {m.change}% <span className="text-[8px] text-gray-700">DELTA</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-1">Temporal Yield Forecast</h3>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Profit trajectory across next 6 standard operating cycles</p>
               </div>
               <BarChart3 className="h-6 w-6 text-indigo-500 opacity-20" />
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 900 }} />
                  <Tooltip 
                    content={({ active, payload, label }) => active && payload?.length ? (
                      <div className="glass border-white/10 p-4 rounded-xl shadow-premium backdrop-blur-xl">
                        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-xl font-display font-black text-white">₹{(payload[0].value as number / 1000).toFixed(0)}K <span className="text-xs text-gray-500 font-black">YIELD</span></p>
                      </div>
                    ) : null} 
                  />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" fill="url(#profitGrad)" strokeWidth={4} strokeLinecap="round" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass border-amber-500/10 rounded-[2.5rem] p-8 bg-amber-500/[0.02] flex items-center gap-8 group">
        <div className="h-16 w-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:shadow-glow transition-all">
           <Lightbulb className="h-8 w-8" />
        </div>
        <div>
           <h3 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500 mb-2">Cognitive Insight</h3>
           <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.05em] leading-relaxed max-w-4xl">
              {projected.margin < 15
                ? 'Warning: Projected yield density is below safety thresholds. Consider reducing discount coefficient or optimizing COGS to maintain node stability.'
                : projected.margin > 40
                ? 'Excellent yield efficiency. Room detected for aggressive market capture or increased advertising throughput to scale volume.'
                : `Node running at ${projected.margin.toFixed(1)}% efficiency. A 5% increase in operational volume adds ₹${Math.round(projected.profit * 0.05 / 1000)}K to monthly yield.`
              }
           </p>
        </div>
      </motion.div>
    </div>
  );
}
