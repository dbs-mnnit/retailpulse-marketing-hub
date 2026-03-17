import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, BarChart3, Zap, Target, Sparkles, ArrowRight, 
  Users, Brain, AlertTriangle, CheckCircle2, RefreshCw, ArrowUpRight, Shield
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  useGetMarginAnalysisQuery, 
  useGetDemandPredictionQuery, 
  useGetCustomerSegmentsQuery, 
  useGetBusinessInsightsQuery 
} from '@/app/api/aiApi';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function IntelligencePage() {
  const { data: marginResult, isLoading: marginLoading, refetch: refetchMargin } = useGetMarginAnalysisQuery();
  const { data: demandResult, isLoading: demandLoading, refetch: refetchDemand } = useGetDemandPredictionQuery();
  const { data: segmentsResult, isLoading: segmentsLoading } = useGetCustomerSegmentsQuery();
  const { data: insightsResult, isLoading: insightsLoading, refetch: refetchInsights } = useGetBusinessInsightsQuery();

  const handleDeepScan = () => {
    refetchMargin();
    refetchDemand();
    refetchInsights();
  };

  const marginChartData = [
    { stage: 'Gross Price', amount: 100, fill: '#22d3ee' },
    { stage: 'COGS', amount: -60, fill: '#4b5563' },
    { stage: 'Discounts', amount: (marginResult?.summary?.leakedCount ?? 0) > 0 ? -8 : -3, fill: '#f43f5e' },
    { stage: 'Tax Gap', amount: -2, fill: '#fbbf24' },
    { stage: 'Logistics', amount: -8, fill: '#6366f1' },
    { stage: 'Net Profit', amount: (marginResult?.summary?.leakedCount ?? 0) > 0 ? 22 : 27, fill: '#10b981' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header Evolution */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Cognitive Layer</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-white">Neural Hub</h1>
            <Badge className="bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-lg text-[9px] uppercase tracking-widest px-3 py-1 font-black shadow-glow">
              <Brain className="h-3 w-3 mr-1.5" /> Core_AI_v4
            </Badge>
          </div>
          <p className="text-gray-500 font-medium mt-1">Predictive orchestration and margin efficiency protocol.</p>
        </div>
        <Button onClick={handleDeepScan} className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-cyan-50 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all flex items-center gap-3">
          <Zap className="h-4 w-4" /> Initialize Deep Scan
        </Button>
      </div>

      {/* AI Business Insights Digest Evolution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden glass border-white/5 rounded-[3rem] p-12 shadow-premium bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-12 right-12 opacity-5"><Brain className="h-48 w-48" /></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <Badge className="transparent-glass text-white border-white/10 rounded-lg font-black text-[9px] uppercase tracking-[0.3em] px-4 py-2">
              <Sparkles className="h-3 w-3 mr-2 text-cyan-400" /> Intelligence Stream
            </Badge>
            {insightsResult?.aiDigest?.sentiment && (
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-glow ${
                insightsResult.aiDigest.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                <div className={`h-1 w-1 rounded-full animate-pulse ${insightsResult.aiDigest.sentiment === 'positive' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {insightsResult.aiDigest.sentiment}
              </div>
            )}
          </div>

          {insightsLoading ? (
            <div className="h-48 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-2 border-white/5 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">Synthesizing Cognitive Digest...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-display font-black tracking-tight text-white mb-8 max-w-2xl leading-tight uppercase">
                {insightsResult?.aiDigest?.headline || 'Neural link established with business nodes.'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Epoch Revenue</span>
                  <div className="text-4xl font-display font-black text-white tracking-tighter">₹{(insightsResult?.metrics?.currentWeek?.revenue || 0).toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Node Operations</span>
                  <div className="text-4xl font-display font-black text-white tracking-tighter">{insightsResult?.metrics?.currentWeek?.orders || 0}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Momentum Vector</span>
                  <div className={`text-4xl font-display font-black tracking-tighter ${
                    parseFloat(insightsResult?.metrics?.revenueChange) > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {insightsResult?.metrics?.revenueChange || '0'}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 flex items-center gap-2 mb-4">
                    <Zap className="h-3 w-3" /> Core Observations
                  </h4>
                  {insightsResult?.aiDigest?.insights && (
                    <div className="space-y-3">
                      {insightsResult.aiDigest.insights.slice(0, 3).map((insight: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl glass border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-gray-400 leading-relaxed uppercase tracking-wide">{insight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-2 mb-4">
                    <Shield className="h-3 w-3" /> Tactical Protocol
                  </h4>
                  {insightsResult?.aiDigest?.recommendation && (
                    <div className="p-6 rounded-[2rem] glass border-white/5 bg-indigo-500/[0.03] relative group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors" />
                      <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Algorithm Recommends:</p>
                      <p className="text-sm text-gray-300 font-medium leading-relaxed uppercase tracking-wider">{insightsResult.aiDigest.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Margin Copilot + Target Alignment Evolution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass border-white/5 rounded-[2.5rem] p-10 shadow-premium overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp className="h-32 w-32" /></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-1">Margin Copilot</h3>
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Efficiency through the profit waterfall</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-2">Protocol Health</p>
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-glow inline-flex items-center gap-2 ${
                  marginResult?.overallHealth === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  <div className={`h-1 w-1 rounded-full animate-pulse ${marginResult?.overallHealth === 'Optimal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {marginLoading ? 'Syncing...' : marginResult?.overallHealth || 'Analyzing'}
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marginChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                  <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#4b5563', fontWeight: 900 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass border-white/10 p-4 rounded-xl shadow-premium backdrop-blur-xl">
                            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">{payload[0].payload.stage}</p>
                            <p className="text-xl font-display font-black text-white">{payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Margin Leakage Alerts Evolution */}
            {marginResult?.leakageCases && marginResult.leakageCases.length > 0 && (
              <div className="mt-10 space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-500">Leakage Discovered</h4>
                {marginResult.leakageCases.slice(0, 2).map((item: any) => (
                  <div key={item.productId} className="p-5 rounded-2xl glass border-rose-500/10 bg-rose-500/[0.02] flex items-center gap-6 group hover:bg-rose-500/[0.04] transition-all">
                    <div className="p-3 rounded-xl glass border-rose-500/10 text-rose-500"><AlertTriangle className="h-5 w-5 animate-pulse" /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-black text-white uppercase tracking-tight">{item.name}</p>
                        <span className="text-[10px] font-black text-rose-400">₹{item.avgSalesPrice} ➔ ₹{item.currentBasePrice}</span>
                      </div>
                      <p className="text-[9px] text-rose-900/60 font-black uppercase tracking-widest">{item.leakageReason}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Customer Segmentation Evolution */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium flex flex-col h-full">
          <div className="mb-10">
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-white mb-1 flex items-center gap-3">
              <Users className="h-5 w-5 text-indigo-400" /> Segmentation
            </h3>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Neural RFM Dynamics</p>
          </div>

          <div className="flex-1 flex flex-col">
            {segmentsLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-30">
                 <div className="w-8 h-8 border border-white/10 border-t-indigo-400 rounded-full animate-spin" />
                 <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Mapping Customer Matrix...</p>
              </div>
            ) : segmentsResult?.segments ? (
              <>
                <div className="h-48 relative">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={segmentsResult.segments.filter((s: any) => s.count > 0)} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="count">
                        {segmentsResult.segments.map((s: any, i: number) => (
                          <Cell key={i} fill={s.color} stroke="none" fillOpacity={0.8} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <Users className="h-6 w-6 text-white/10" />
                  </div>
                </div>
                
                <div className="space-y-3 mt-8">
                  {segmentsResult.segments.map((seg: any) => (
                    <div key={seg.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shadow-glow" style={{ backgroundColor: seg.color }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{seg.name}</span>
                      </div>
                      <span className="text-sm font-display font-black text-white">{seg.count}</span>
                    </div>
                  ))}
                </div>

                {segmentsResult?.aiAnalysis?.topInsight && (
                  <div className="mt-8 p-6 rounded-[1.5rem] glass border-indigo-500/10 bg-indigo-500/[0.02] shadow-glow-sm">
                    <p className="text-[10px] text-indigo-400 font-medium leading-relaxed uppercase tracking-wider">
                      <Brain className="h-3 w-3 inline mr-2 mb-1" /> {segmentsResult.aiAnalysis.topInsight}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-10">
                 <RefreshCw className="h-10 w-10 animate-spin-slow" />
                 <p className="text-[9px] font-black uppercase tracking-widest uppercase">Data Sync Required</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Demand Forecasting Evolution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass border-white/5 rounded-[3rem] p-12 shadow-premium">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-1">Demand Prediction</h3>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Predictive stock depletion matrix (7-Day Projection)</p>
          </div>
          <Button onClick={() => refetchDemand()} variant="outline" className="h-12 px-6 rounded-xl glass border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-cyan-400 transition-all gap-3">
            <RefreshCw className="h-3 w-3" /> Sync Algorithm
          </Button>
        </div>

        {demandLoading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-6">
            <div className="w-12 h-12 border-2 border-white/5 border-t-cyan-400 rounded-full animate-spin shadow-glow" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Solving Prediction Equations...</p>
          </div>
        ) : demandResult && Array.isArray(demandResult) && demandResult.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Entity Designation</th>
                  <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Active Stock</th>
                  <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Projected Depletion</th>
                  <th className="text-right p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Urgency Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {demandResult.map((item: any) => (
                  <tr key={item.productId} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="p-6 font-display font-black text-sm uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">{item.name}</td>
                    <td className="p-6 font-black text-xs text-white uppercase tracking-widest">{item.currentStock} UNITS</td>
                    <td className="p-6 font-black text-xs text-cyan-400 uppercase tracking-widest shadow-glow">{item.sevenDayPrediction} PROJECTED</td>
                    <td className="p-6 text-right">
                      <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-glow ${
                        item.restockUrgency === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {item.restockUrgency === 'high' ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                        {item.restockUrgency === 'high' ? 'CRITICAL_DEPLETION' : 'STABLE_NODE'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 opacity-20">
            <BarChart3 className="h-16 w-16 mx-auto mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Historical Data Required for Forecast</p>
          </div>
        )}
      </motion.div>

      {/* AI Segment Actions Evolution */}
      {segmentsResult?.aiAnalysis?.segmentActions && segmentsResult.aiAnalysis.segmentActions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-10">
          <div className="flex items-center gap-4">
             <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">Recommended Actions</h3>
             <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {segmentsResult.aiAnalysis.segmentActions.map((action: any, i: number) => (
              <div key={i} className="p-8 rounded-[2.5rem] glass border-white/5 hover:bg-white/[0.04] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyan-400/10 transition-colors" />
                <div className="flex items-center justify-between mb-8">
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest glass border-white/5 text-gray-400">{action.segment}</Badge>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-glow ${
                    action.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                    action.priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                    'bg-white/5 text-gray-500 border border-white/5'
                  }`}>{action.priority}_PRIORITY</div>
                </div>
                <p className="text-lg font-display font-black text-white mb-4 uppercase tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">{action.action}</p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 text-[9px] font-black text-gray-700 uppercase tracking-widest">
                      <Target className="h-3 w-3 text-cyan-400" /> Vector: {action.channel}
                   </div>
                   <Button variant="ghost" size="icon" className="h-10 w-10 glass border-white/5 rounded-xl group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
