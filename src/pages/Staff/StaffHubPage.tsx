import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Trophy, Crown, Award, TrendingUp, Clock, DollarSign,
  Medal, Zap, Calendar, BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetStaffPerformanceQuery } from '@/app/api/staffApi';
import { useAppSelector } from '@/app/hooks';

const fallbackStaff = [
  { _id: '1', name: 'Arjun Mehta', role: 'cashier', totalSales: 285000, orderCount: 342, avgOrderValue: 833, incentive: 14250 },
  { _id: '2', name: 'Priya Kumari', role: 'manager', totalSales: 245000, orderCount: 298, avgOrderValue: 822, incentive: 12250 },
  { _id: '3', name: 'Rohan Singh', role: 'staff', totalSales: 198000, orderCount: 256, avgOrderValue: 773, incentive: 9900 },
  { _id: '4', name: 'Meera Patel', role: 'cashier', totalSales: 176000, orderCount: 220, avgOrderValue: 800, incentive: 8800 },
  { _id: '5', name: 'Karan Joshi', role: 'staff', totalSales: 142000, orderCount: 185, avgOrderValue: 768, incentive: 7100 },
];
const fallbackWeekly = [
  { day: 'Mon', sales: 42000 }, { day: 'Tue', sales: 38000 }, { day: 'Wed', sales: 45000 },
  { day: 'Thu', sales: 51000 }, { day: 'Fri', sales: 62000 }, { day: 'Sat', sales: 78000 }, { day: 'Sun', sales: 55000 },
];

export default function StaffHubPage() {
  const businessId = useAppSelector((state) => state.business.currentId) || '';
  const { data, isLoading } = useGetStaffPerformanceQuery(businessId, { skip: !businessId });

  const staff = data?.staff?.length ? data.staff : fallbackStaff;
  const weekly = data?.weekly?.length ? data.weekly : fallbackWeekly;
  const summary = data?.summary || {
    totalStaff: staff.length,
    totalSales: staff.reduce((s: number, st: any) => s + st.totalSales, 0),
    totalIncentives: staff.reduce((s: number, st: any) => s + st.incentive, 0),
    avgRating: 4.6,
  };

  const rankIcons = [Crown, Medal, Award];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Personnel Layer</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-foreground">Staff Intelligence</h1>
          <p className="text-muted-foreground font-bold mt-1">Personnel performance metrics and incentive orchestration.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all flex items-center gap-3 hover:opacity-90">
          <Calendar className="h-4 w-4" /> Finalize Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'NODE DENSITY', value: summary.totalStaff, icon: Users, color: 'text-primary' },
          { label: 'CUMULATIVE YIELD', value: `₹${(summary.totalSales / 100000).toFixed(1)}L`, icon: TrendingUp, color: 'text-primary' },
          { label: 'INCENTIVE LOAD', value: `₹${(summary.totalIncentives / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-primary' },
          { label: 'COGNITIVE INDEX', value: summary.avgRating, icon: Trophy, color: 'text-primary' },
        ].map((s) => (
          <div key={s.label} className="p-8 rounded-[2rem] glass border-border bg-muted/30 shadow-premium group hover:bg-muted/50 transition-all">
            <div className="flex items-center justify-between mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{s.label}</span>
               <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center border border-border ${s.color}`}>
                  <s.icon className="h-5 w-5" />
               </div>
            </div>
            {isLoading ? <div className="h-10 w-24 bg-muted animate-spin-slow rounded-lg" /> : <div className="text-3xl font-display font-black text-foreground tracking-tight">{s.value}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="glass border-border bg-card rounded-[2.5rem] p-10 shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity"><Trophy className="h-32 w-32 text-primary" /></div>
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3 mb-10">
             <Crown className="h-4 w-4" /> Elite Tier Leaderboard
          </h3>
          <div className="space-y-6">
            {staff.slice(0, 5).map((member: any, i: number) => {
              const RankIcon = rankIcons[i] || Zap;
              return (
                <motion.div key={member._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-4 rounded-2xl glass border-border bg-muted/30 hover:bg-muted/50 transition-all group/item">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-primary text-primary-foreground shadow-glow' : i === 1 ? 'bg-muted-foreground text-foreground' : i === 2 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {i < 3 ? <RankIcon className="h-5 w-5" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black text-sm uppercase tracking-tight text-foreground">{member.name}</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{member.orderCount} Operations</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-sm text-primary">₹{(member.totalSales / 1000).toFixed(0)}K</p>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.2em] rounded-lg border-border text-muted-foreground">{member.role}</Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 glass border-white/5 rounded-[2.5rem] p-10 shadow-premium">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-1">Temporal Velocity</h3>
              <p className="text-lg font-black uppercase tracking-widest text-foreground">Daily Operational Output</p>
            </div>
            <BarChart3 className="h-6 w-6 text-primary opacity-20" />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={weekly}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 900 }} />
              <Tooltip 
                 cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                 content={({ active, payload }) => active && payload?.length ? (
                <div className="glass border-white/10 p-4 rounded-xl shadow-premium backdrop-blur-xl">
                   <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">{payload[0].payload.day}</p>
                   <p className="text-2xl font-display font-black text-white">₹{payload[0].value?.toLocaleString('en-IN')}</p>
                </div>
              ) : null} />
              <Bar dataKey="sales" fill="#22d3ee" radius={[8, 8, 8, 8]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass border-border bg-card rounded-[3rem] p-10 shadow-premium overflow-hidden">
        <div className="p-4 mb-8">
           <h3 className="text-xl font-display font-black uppercase tracking-tight text-foreground mb-1">Personnel Registry</h3>
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Complete efficiency audit per operational node.</p>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Node ID</th>
                <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Designation</th>
                <th className="text-left py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Operational Role</th>
                <th className="text-right py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Total Yield</th>
                <th className="text-right py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Ops Count</th>
                <th className="text-right py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Yield / Op</th>
                <th className="text-right py-6 px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Allocated Incentive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {isLoading ? Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-white/5">{Array.from({ length: 7 }).map((_, j) => <td key={j} className="py-6 px-6"><div className="h-4 w-16 bg-white/5 animate-pulse rounded" /></td>)}</tr>
              )) : staff.map((member: any, i: number) => (
                <tr key={member._id} className="group hover:bg-muted/20 transition-all border-b border-border last:border-0 text-foreground">
                  <td className="py-8 px-6 font-display font-black text-[10px] tracking-widest text-muted-foreground group-hover:text-primary transition-colors uppercase">{i + 1}</td>
                  <td className="py-8 px-6">
                     <span className="font-display font-black text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{member.name}</span>
                  </td>
                  <td className="py-8 px-6">
                     <Badge variant="outline" className="rounded-lg border-border bg-muted/30 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground capitalize">{member.role}</Badge>
                  </td>
                  <td className="py-8 px-6 text-right font-display font-black text-sm">₹{member.totalSales.toLocaleString('en-IN')}</td>
                  <td className="py-8 px-6 text-right font-black text-xs text-muted-foreground">{member.orderCount}</td>
                  <td className="py-8 px-6 text-right font-black text-xs text-muted-foreground">₹{member.avgOrderValue}</td>
                  <td className="py-8 px-6 text-right">
                     <span className="text-sm font-display font-black text-emerald-500 shadow-glow">₹{member.incentive.toLocaleString('en-IN')}</span>
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
