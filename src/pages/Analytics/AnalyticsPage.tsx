import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockAnalytics, mockCampaigns } from '@/services/mockData';
import { TrendingUp, Mail, Eye, MousePointerClick, AlertCircle } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const metrics = [
  { title: 'Total Sent', value: '12,450', icon: Mail, color: 'text-primary' },
  { title: 'Delivered', value: '12,100', icon: TrendingUp, color: 'text-green-600' },
  { title: 'Opened', value: '8,520', icon: Eye, color: 'text-accent' },
  { title: 'Clicked', value: '3,960', icon: MousePointerClick, color: 'text-primary' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your campaign performance and insights.</p>
      </div>

      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <motion.div key={m.title} variants={fadeInUp} className="bg-background rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{m.title}</span>
              <m.icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <div className="text-2xl font-bold tracking-tight">{m.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-background rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Open & Click Rate Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockAnalytics.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 5.9%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-elevated)' }} />
              <Line type="monotone" dataKey="opened" stroke="hsl(221.2, 83.2%, 53.3%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicked" stroke="hsl(262.1, 83.3%, 57.8%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-background rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Channel Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={[
              { channel: 'Email', sent: 5200, opened: 3640 },
              { channel: 'SMS', sent: 3800, opened: 3040 },
              { channel: 'WhatsApp', sent: 3450, opened: 3105 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 5.9%, 90%)" />
              <XAxis dataKey="channel" tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-elevated)' }} />
              <Bar dataKey="sent" fill="hsl(221.2, 83.2%, 53.3%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="opened" fill="hsl(262.1, 83.3%, 57.8%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-background rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-6">Campaign History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground">Campaign</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Channel</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Sent</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Open Rate</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Click Rate</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.filter(c => c.stats).map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3 capitalize">{c.channel}</td>
                  <td className="py-3">{c.stats!.sent.toLocaleString()}</td>
                  <td className="py-3">{c.stats!.openRate}%</td>
                  <td className="py-3">{c.stats!.clickRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
