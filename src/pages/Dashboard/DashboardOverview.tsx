import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Coins, TrendingUp, ArrowUpRight, ArrowDownRight, Bell, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useGetCampaignsQuery, useGetAnalyticsQuery } from '@/app/api/dataApi';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function DashboardOverview() {
  const { data: analytics = {} as any, isLoading: analyticsLoading, error: analyticsError } = useGetAnalyticsQuery();
  const { data: campaigns = [], isLoading: campaignsLoading, error: campaignsError } = useGetCampaignsQuery();

  if (analyticsLoading || campaignsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="h-12 w-12 rounded-2xl border-2 border-border border-t-primary animate-spin shadow-glow" />
        <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Synchronizing Data Matrix...</span>
      </div>
    );
  }

  if (analyticsError || campaignsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] glass rounded-[2rem] border-destructive/20 p-12 text-center">
        <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
          <ArrowDownRight className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Matrix Link Severed</h3>
        <p className="text-muted-foreground text-sm max-w-xs font-bold">Unable to establish a secure data uplink. Please verify your connection protocols.</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Revenue', value: '₹4,82,450', trend: '+14.2%', up: true, icon: TrendingUp, color: 'from-emerald-500/20 to-transparent', iconColor: 'text-emerald-500' },
    { title: 'Pending Receivables', value: '₹1,24,000', trend: '-2.4%', up: false, icon: BarChart3, color: 'from-primary/20 to-transparent', iconColor: 'text-primary' },
    { title: 'Active Bookings', value: '12', trend: '+20%', up: true, icon: Bell, color: 'from-accent/20 to-transparent', iconColor: 'text-accent' },
    { title: 'StarCoins Issued', value: '45,200', trend: '+8.3%', up: true, icon: Coins, color: 'from-orange-500/20 to-transparent', iconColor: 'text-orange-500' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Overview</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-foreground transition-colors duration-500">Command Center</h1>
          <p className="text-muted-foreground font-bold mt-1">Real-time telemetry and operational orchestration index.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="h-14 px-8 rounded-2xl glass border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
            Export Dataset
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all flex items-center gap-3 hover:opacity-90 active:scale-95">
             Initialize Protocol
          </Button>
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <motion.div 
            key={card.title} 
            variants={fadeInUp} 
            className="glass border-border rounded-[2rem] p-8 shadow-premium relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-muted/30"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">{card.title}</span>
                <div className={`h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border shadow-glow-sm transition-transform group-hover:scale-110 ${card.iconColor}`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-3xl font-display font-black tracking-tight mb-2 text-foreground">{card.value}</div>
              <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${card.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                <div className={`h-1 w-1 rounded-full animate-pulse ${card.up ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {card.trend} <span className="text-muted-foreground/40 font-black ml-1">VECTOR</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass border-border rounded-[2.5rem] p-10 shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-[8px] font-black text-foreground/5 uppercase tracking-[1em] rotate-90 origin-top-right">Telemetry Matrix</div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Growth Intelligence</h3>
              <p className="text-lg font-black uppercase tracking-widest text-foreground">Performance Protocol</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow transition-all" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Input</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow transition-all" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Conversion</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={analytics?.chartData || []}>
              <defs>
                <linearGradient id="gradSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/20" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: 'currentColor' }} className="text-muted-foreground/50" dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: 'currentColor' }} className="text-muted-foreground/50" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '24px', border: '1px solid hsl(var(--border))', backdropFilter: 'blur(20px)', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
                itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '8px', fontWeight: 900 }}
              />
              <Area type="monotone" dataKey="sent" stroke="var(--primary)" fill="url(#gradSent)" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: 'var(--primary)', strokeWidth: 2, fill: '#fff' }} />
              <Area type="monotone" dataKey="opened" stroke="var(--accent)" fill="url(#gradOpened)" strokeWidth={4} dot={false} activeDot={{ r: 6, stroke: 'var(--accent)', strokeWidth: 2, fill: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="glass border-border rounded-[2.5rem] p-10 shadow-premium flex flex-col items-center">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-10 w-full text-left">Network Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={analytics?.channelData || []} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                {(analytics?.channelData || []).map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '24px', border: '1px solid hsl(var(--border))', backdropFilter: 'blur(20px)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-4 mt-10 w-full">
            {(analytics?.channelData || []).map((ch: any) => (
              <div key={ch.name} className="flex items-center justify-between bg-muted/20 border border-border rounded-2xl p-4 group hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-glow" style={{ backgroundColor: ch.color }} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{ch.name}</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-foreground">{ch.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass border-border rounded-[2.5rem] p-10 shadow-premium">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Operational Log</h3>
            <p className="text-lg font-black uppercase tracking-widest text-foreground">Recent Activity Streams</p>
          </div>
          <Link to="/dashboard/campaigns">
            <Button variant="ghost" className="h-10 px-6 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted font-black">Synchronize View</Button>
          </Link>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operation Name</th>
                <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vector</th>
                <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Status</th>
                <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Range</th>
                <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Resource Load</th>
              </tr>
            </thead>
            <tbody>
              {(campaigns || []).slice(0, 4).map((c: any) => (
                <tr key={c.id} className="group hover:bg-muted/10 transition-colors border-b border-border/10 last:border-0">
                  <td className="py-6 px-4">
                    <span className="text-xs font-black uppercase tracking-widest transition-colors group-hover:text-primary text-foreground">{c.name}</span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-muted/40 border border-border text-muted-foreground group-hover:text-foreground transition-colors capitalize">{c.channel}</span>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:shadow-glow transition-all capitalize ${
                      c.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      c.status === 'sent' ? 'bg-primary/10 text-primary border border-primary/20' :
                      c.status === 'scheduled' ? 'bg-accent/10 text-accent border border-accent/20' :
                      'bg-muted text-muted-foreground border border-border'
                    }`}>{c.status}</span>
                  </td>
                  <td className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{(c.audienceSize || 0).toLocaleString()} <span className="text-[8px] text-muted-foreground/40 ml-1">Nodes</span></td>
                  <td className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{(c.creditsUsed || 0).toLocaleString()} <span className="text-[8px] text-muted-foreground/40 ml-1">Compute</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
