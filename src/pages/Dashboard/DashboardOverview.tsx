import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Coins, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockAnalytics, mockCampaigns } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const statCards = [
  { title: 'Total Customers', value: '8,420', trend: '+12.5%', up: true, icon: Users, color: 'text-primary' },
  { title: 'Campaigns Sent', value: '24', trend: '+8.3%', up: true, icon: Megaphone, color: 'text-accent' },
  { title: 'Credits Remaining', value: '4,250', trend: '-18.2%', up: false, icon: Coins, color: 'text-primary' },
  { title: 'Success Rate', value: '94.5%', trend: '+2.1%', up: true, icon: TrendingUp, color: 'text-accent' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your marketing overview.</p>
      </div>

      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <motion.div key={card.title} variants={fadeInUp} transition={{ duration: 0.4 }} className="bg-background rounded-2xl p-5 shadow-card hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{card.title}</span>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold tracking-tight">{card.value}</div>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${card.up ? 'text-green-600' : 'text-destructive'}`}>
              {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {card.trend} from last month
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-background rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockAnalytics.chartData}>
              <defs>
                <linearGradient id="gradSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262.1, 83.3%, 57.8%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(262.1, 83.3%, 57.8%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 5.9%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(240, 3.8%, 46.1%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-elevated)' }} />
              <Area type="monotone" dataKey="sent" stroke="hsl(221.2, 83.2%, 53.3%)" fill="url(#gradSent)" strokeWidth={2} />
              <Area type="monotone" dataKey="opened" stroke="hsl(262.1, 83.3%, 57.8%)" fill="url(#gradOpened)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-background rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockAnalytics.channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {mockAnalytics.channelData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-4">
            {mockAnalytics.channelData.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span>{ch.name}</span>
                </div>
                <span className="font-medium">{ch.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-background rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Campaigns</h3>
          <Link to="/dashboard/campaigns">
            <Button variant="ghost" size="sm" className="text-primary font-medium">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Channel</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Audience</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Credits</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.slice(0, 4).map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">{c.channel}</span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      c.status === 'completed' ? 'bg-green-100 text-green-700' :
                      c.status === 'sent' ? 'bg-primary/10 text-primary' :
                      c.status === 'scheduled' ? 'bg-accent/10 text-accent' :
                      'bg-muted text-muted-foreground'
                    }`}>{c.status}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.audienceCount.toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">{c.creditsUsed.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
