import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { useGetAnalyticsQuery, useGetCampaignsQuery } from '@/app/api/dataApi';
import { TrendingUp, Mail, Eye, MousePointerClick, ArrowUpRight, Zap, Target, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function AnalyticsPage() {
  const { data: analytics, isLoading: analyticsLoading, error: analyticsError } = useGetAnalyticsQuery();
  const { data: campaigns, isLoading: campaignsLoading, error: campaignsError } = useGetCampaignsQuery();

  if (analyticsLoading || campaignsLoading) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 opacity-50">
        <div className="w-12 h-12 border-2 border-white/10 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Synthesizing Performance Data...</p>
      </div>
    );
  }

  if (analyticsError || campaignsError) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 text-rose-500">
        <div className="h-16 w-16 border border-rose-500/20 rounded-full flex items-center justify-center bg-rose-500/5">
          <TrendingUp className="h-8 w-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Analytics Stream Offline</p>
      </div>
    );
  }

  const metrics = [
    { title: 'Messages Sent', value: (analytics?.totalSent ?? analytics?.sentCount ?? 0).toLocaleString(), trend: '+12%', icon: Mail, color: 'from-cyan-500 to-indigo-600', glow: 'shadow-cyan-500/20' },
    { title: 'Delivered', value: (analytics?.delivered ?? analytics?.deliveredCount ?? 0).toLocaleString(), trend: '+8%', icon: Target, color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/20' },
    { title: 'Opened', value: (analytics?.opened ?? analytics?.openedCount ?? 0).toLocaleString(), trend: '+15%', icon: Eye, color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/20' },
    { title: 'Clicked', value: (analytics?.clicked ?? analytics?.clickedCount ?? 0).toLocaleString(), trend: '+22%', icon: MousePointerClick, color: 'from-orange-500 to-rose-600', glow: 'shadow-orange-500/20' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Intelligence Layer</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-white">Campaign Analytics</h1>
          <p className="text-gray-500 font-medium mt-1">Deep performance metrics across all transmission vectors.</p>
        </div>
        <Badge variant="outline" className="h-10 rounded-xl glass border-white/5 text-[10px] font-black uppercase tracking-widest px-6 flex items-center gap-2 text-gray-400">
          <Zap className="h-3 w-3 text-cyan-400" /> Real-time Feed
        </Badge>
      </div>

      {/* Metric Cards Evolution */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <motion.div key={m.title} variants={fadeInUp} className="glass border-white/5 rounded-[2rem] p-8 shadow-premium group hover:bg-white/[0.04] transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-8">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center ${m.glow} group-hover:scale-110 transition-transform duration-500`}>
                <m.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 transparent-glass rounded-full text-[10px] font-black text-emerald-400 shadow-glow">
                <TrendingUp className="h-3 w-3" /> {m.trend}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{m.title}</p>
            <div className="text-4xl font-display font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors">{m.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Evolution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight uppercase text-white mb-1">Engagement Dynamics</h3>
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Temporal activity across network nodes</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={analytics?.chartData || []}>
              <defs>
                <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradClick" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 800 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 800 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(5, 5, 5, 0.9)', 
                  borderRadius: '20px', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(20px)',
                  padding: '20px'
                }} 
              />
              <Area type="monotone" dataKey="opened" stroke="#22d3ee" fill="url(#gradOpen)" strokeWidth={4} strokeLinecap="round" />
              <Area type="monotone" dataKey="clicked" stroke="#6366f1" fill="url(#gradClick)" strokeWidth={4} strokeLinecap="round" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-display font-black tracking-tight uppercase text-white mb-1">Vector Distribution</h3>
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Throughput efficiency by transmission mode</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={[
              { channel: 'EMAIL', sent: 5200, opened: 3640 },
              { channel: 'SMS', sent: 3800, opened: 3040 },
              { channel: 'WHATSAPP', sent: 3450, opened: 3105 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 800 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 800 }} />
              <Tooltip 
                 contentStyle={{ 
                  backgroundColor: 'rgba(5, 5, 5, 0.9)', 
                  borderRadius: '20px', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)'
                }}
              />
              <Bar dataKey="sent" fill="#22d3ee" radius={[12, 12, 4, 4]} />
              <Bar dataKey="opened" fill="#6366f1" radius={[12, 12, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Campaign Table Evolution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass border-white/5 rounded-[3rem] p-12 shadow-premium overflow-hidden">
        <h3 className="text-2xl font-display font-black tracking-tight uppercase text-white mb-10">Transmission Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Operation</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Vector</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Throughput</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Open Efficiency</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Cick Dynamics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {(campaigns || []).filter((c: any) => c.status === 'completed').map((c: any) => (
                <tr key={c.id || c._id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="p-6 font-display font-black text-sm uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">{c.name}</td>
                  <td className="p-6">
                    <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest glass border-white/5 text-gray-400">{c.channel}</Badge>
                  </td>
                  <td className="p-6 font-black text-xs text-white uppercase tracking-widest">{c.stats?.sent?.toLocaleString() ?? 0} NODES</td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <span className="text-emerald-400 font-black text-sm shadow-glow">{c.stats?.openRate ?? 0}%</span>
                       <div className="flex-1 max-w-[50px] h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 shadow-glow" style={{ width: `${c.stats?.openRate ?? 0}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <div className="flex-1 max-w-[50px] h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 shadow-glow" style={{ width: `${c.stats?.clickRate ?? 0}%` }} />
                       </div>
                       <span className="text-indigo-400 font-black text-sm shadow-glow">{c.stats?.clickRate ?? 0}%</span>
                    </div>
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
