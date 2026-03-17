import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, Users, Trophy, Target, Smile, Frown, MessageSquare,
  ThumbsUp, TrendingUp, Send, Loader2, ArrowUpRight, AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetReviewsQuery, useGetReviewStatsQuery, useReplyToReviewMutation } from '@/app/api/intelligenceApi';
import { useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';

const sentimentColors = { positive: 'hsl(142, 71%, 45%)', neutral: 'hsl(35, 92%, 50%)', negative: 'hsl(0, 84.2%, 60.2%)' };

const fallbackReviews = [
  { _id: '1', customerName: 'Anita Desai', rating: 5, text: 'Excellent service! Will definitely come back.', sentiment: 'positive', reply: null, createdAt: '2026-03-15' },
  { _id: '2', customerName: 'Rohit Verma', rating: 4, text: 'Good products but delivery was slightly delayed.', sentiment: 'neutral', reply: null, createdAt: '2026-03-14' },
  { _id: '3', customerName: 'Meera Shah', rating: 2, text: 'Product quality was not as expected. Disappointed.', sentiment: 'negative', reply: 'We apologize for the experience. Please reach out for a replacement.', createdAt: '2026-03-12' },
  { _id: '4', customerName: 'Karan Patel', rating: 5, text: 'Best shop in the area! Amazing staff.', sentiment: 'positive', reply: null, createdAt: '2026-03-10' },
  { _id: '5', customerName: 'Deepika Singh', rating: 3, text: 'Average experience. Nothing special.', sentiment: 'neutral', reply: null, createdAt: '2026-03-08' },
];

export default function ReviewsPage() {
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const businessId = useAppSelector((state) => state.business.currentId) || '';
  const { data: apiReviews, isLoading } = useGetReviewsQuery(businessId, { skip: !businessId });
  const { data: apiStats } = useGetReviewStatsQuery(businessId, { skip: !businessId });
  const [replyToReview, { isLoading: isReplying }] = useReplyToReviewMutation();

  const reviews = apiReviews?.length ? apiReviews : fallbackReviews;
  const stats = apiStats || {
    total: reviews.length,
    avgRating: +(reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1),
    sentimentBreakdown: {
      positive: reviews.filter((r: any) => r.sentiment === 'positive').length,
      neutral: reviews.filter((r: any) => r.sentiment === 'neutral').length,
      negative: reviews.filter((r: any) => r.sentiment === 'negative').length,
    },
    nps: 60,
    responseRate: Math.round((reviews.filter((r: any) => r.reply).length / reviews.length) * 100),
  };

  const sentimentData = [
    { name: 'Positive', value: stats.sentimentBreakdown?.positive || 0, color: '#10b981' },
    { name: 'Neutral', value: stats.sentimentBreakdown?.neutral || 0, color: '#f59e0b' },
    { name: 'Negative', value: stats.sentimentBreakdown?.negative || 0, color: '#f43f5e' },
  ];

  const ratingDist = [5, 4, 3, 2, 1].map(r => ({ stars: r, count: reviews.filter((rv: any) => rv.rating === r).length }));

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return toast.error('Reply cannot be empty');
    try {
      await replyToReview({ id: reviewId, reply: replyText }).unwrap();
      toast.success('Reputation protocol updated. Reply transmitted.');
      setReplyingId(null);
      setReplyText('');
    } catch { toast.error('Uplink failed. Reply not transmitted.'); }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-amber-400 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Reputation Layer</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-white">Sentiment Hub</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time customer feedback orchestration and sentiment analysis.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
             Export Analysis
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'AVERAGE INDEX', value: `${stats.avgRating}★`, sub: `${stats.total} SAMPLES`, icon: Star, color: 'text-amber-400' },
          { label: 'NPS MAGNITUDE', value: stats.nps, sub: 'PROMOTER COEFFICIENT', icon: TrendingUp, color: 'text-indigo-400' },
          { label: 'RESPONSE VELOCITY', value: `${stats.responseRate}%`, sub: 'UPLINK FREQUENCY', icon: MessageSquare, color: 'text-cyan-400' },
          { label: 'SATISFACTION DENSITY', value: `${stats.total > 0 ? Math.round(((stats.sentimentBreakdown?.positive || 0) / stats.total) * 100) : 0}%`, sub: 'OPTIMAL NODES', icon: ThumbsUp, color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="p-8 rounded-[2rem] glass border-white/5 bg-white/[0.01] shadow-premium group hover:bg-white/[0.03] transition-all">
            <div className="flex items-center justify-between mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{s.label}</span>
               <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
               </div>
            </div>
            {isLoading ? <div className="h-10 w-24 bg-white/5 animate-spin-slow rounded-lg" /> : <div className="text-3xl font-display font-black text-white tracking-tight">{s.value}</div>}
            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mt-2">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-10">Rating Distribution</h3>
          <div className="space-y-6">
            {ratingDist.map((r) => (
              <div key={r.stars} className="flex items-center gap-6 group">
                <span className="text-[10px] font-black text-gray-500 w-8 group-hover:text-amber-400 transition-colors uppercase tracking-widest">{r.stars}★</span>
                <div className="flex-1 h-2 bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${reviews.length > 0 ? (r.count / reviews.length) * 100 : 0}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-amber-400 shadow-glow" />
                </div>
                <span className="text-[10px] font-black text-gray-700 w-10 text-right uppercase tracking-widest">{r.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass border-white/5 rounded-[2.5rem] p-10 shadow-premium flex flex-col items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><MessageSquare className="h-24 w-24" /></div>
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white self-start mb-8">AI Cognitive Sentiment</h3>
          <div className="relative h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={84} dataKey="value" stroke="none" paddingAngle={4}>
                  {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.8} />)}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.9)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <Smile className="h-6 w-6 text-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-10 w-full">
            {sentimentData.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full shadow-glow" style={{ backgroundColor: s.color }} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{s.name}</span>
                </div>
                <span className="text-xs font-display font-black text-white">{s.value} UNIT</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass border-indigo-500/10 rounded-[2.5rem] p-10 bg-indigo-500/[0.02] space-y-8 group">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Tactical Actions</h3>
          <div className="space-y-4">
            <Button variant="ghost" className="w-full h-16 justify-between rounded-2xl glass border-white/5 bg-white/[0.01] hover:bg-white/[0.05] group/btn transition-all">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/btn:text-white transition-colors">
                  <Smile className="h-4 w-4 text-emerald-400 shadow-glow" /> Optimize Positives
               </div>
               <ArrowUpRight className="h-4 w-4 text-gray-700" />
            </Button>
            <Button variant="ghost" className="w-full h-16 justify-between rounded-2xl glass border-white/5 bg-white/[0.01] hover:bg-white/[0.05] group/btn transition-all">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/btn:text-white transition-colors">
                  <Frown className="h-4 w-4 text-rose-500 shadow-glow" /> Neutralize Negatives
               </div>
               <AlertCircle className="h-4 w-4 text-gray-700" />
            </Button>
            <Button variant="ghost" className="w-full h-16 justify-between rounded-2xl glass border-white/5 bg-white/[0.01] hover:bg-white/[0.05] group/btn transition-all">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/btn:text-white transition-colors">
                  <Target className="h-4 w-4 text-cyan-400 shadow-glow" /> Expand Sample Size
               </div>
               <TrendingUp className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass border-white/5 rounded-[3rem] p-4 shadow-premium">
        <div className="p-8 border-b border-white/5">
           <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-1">Reputation Feed</h3>
           <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Chronological stream of incoming feedback nodes.</p>
        </div>
        <div className="divide-y divide-white/[0.02]">
          {isLoading ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-10 space-y-4">
              <div className="h-4 w-48 bg-white/5 animate-pulse rounded" />
              <div className="h-10 w-full bg-white/5 animate-pulse rounded-xl" />
            </div>
          )) : reviews.map((review: any) => (
            <div key={review._id} className="p-10 hover:bg-white/[0.01] transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl glass border-white/10 bg-white/5 flex items-center justify-center font-display font-black text-white text-xl shadow-glow-sm">
                    {review.customerName[0]}
                  </div>
                  <div>
                    <p className="font-display font-black text-lg uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors uppercase">{review.customerName}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400 shadow-glow' : 'text-gray-800'}`} />)}</div>
                      <Badge className={`rounded-lg py-1 px-3 border-none text-[8px] font-black uppercase tracking-widest ${
                        review.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 
                        review.sentiment === 'negative' ? 'bg-rose-500/10 text-rose-400' : 
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                         {review.sentiment} PROTOCOL
                      </Badge>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-800">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</span>
              </div>
              
              {review.text && (
                <div className="p-8 rounded-3xl glass border-white/5 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors relative overflow-hidden mb-6">
                   <div className={`absolute top-0 left-0 w-1 h-full ${
                     review.sentiment === 'positive' ? 'bg-emerald-500/20' : 
                     review.sentiment === 'negative' ? 'bg-rose-500/20' : 
                     'bg-amber-500/20'
                   }`} />
                   <p className="text-gray-400 font-medium leading-relaxed max-w-4xl">{review.text}</p>
                </div>
              )}

              {review.reply && (
                <div className="ml-12 p-8 rounded-[2rem] glass border-cyan-500/10 bg-cyan-500/[0.02] relative group/reply">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20 group-hover/reply:bg-cyan-500 transition-all" />
                  <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <MessageSquare className="h-3 w-3" /> Outbound Transmission
                  </p>
                  <p className="text-sm font-medium text-gray-300 leading-relaxed">{review.reply}</p>
                </div>
              )}
              
              {!review.reply && (
                <div className="mt-8 ml-12">
                  {replyingId === review._id ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 max-w-2xl">
                      <Input 
                         placeholder="Synchronize outbound feedback..." 
                         value={replyText} 
                         onChange={(e) => setReplyText(e.target.value)} 
                         className="h-16 rounded-2xl glass border-white/10 bg-white/5 text-sm font-medium focus:ring-cyan-500/20 placeholder:text-gray-700" 
                      />
                      <div className="flex gap-4">
                        <Button className="h-12 px-8 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] shadow-glow flex items-center gap-3" onClick={() => handleReply(review._id)} disabled={isReplying}>
                          {isReplying ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />} Transmit
                        </Button>
                        <Button variant="ghost" className="h-12 px-6 rounded-xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500" onClick={() => { setReplyingId(null); setReplyText(''); }}>Abort</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <Button variant="ghost" className="h-12 px-6 rounded-xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all gap-4" onClick={() => setReplyingId(review._id)}>
                      <MessageSquare className="h-4 w-4" /> Open Uplink
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
