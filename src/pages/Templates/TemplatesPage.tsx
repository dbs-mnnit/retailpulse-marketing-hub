import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetTemplatesQuery } from '@/app/api/dataApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Palette, Image, Search, LayoutGrid, List, Sparkles, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

const categories = ['All', 'Sale', 'Festival', 'Product Launch', 'Announcement', 'Loyalty', 'Storefront'];

const gradientMap: Record<string, string> = {
  Sale: 'from-rose-500 to-pink-600',
  Festival: 'from-amber-500 to-orange-600',
  'Product Launch': 'from-indigo-500 to-violet-600',
  Announcement: 'from-emerald-500 to-teal-600',
  Loyalty: 'from-yellow-500 to-amber-600',
  Storefront: 'from-blue-500 to-cyan-600',
};

export default function TemplatesPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: templates, isLoading, error } = useGetTemplatesQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center gap-3 text-muted-foreground"><div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> Loading templates...</div>
    </div>
  );
  if (error) return <div className="p-8 text-center text-destructive">Error loading templates.</div>;

  const filtered = (templates || []).filter((t: any) => 
    (category === 'All' || t.category === category) &&
    (!search || t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Template Gallery</h1>
          <p className="text-muted-foreground font-medium mt-1">Pre-designed creatives for every campaign need</p>
        </div>
        <Button className="rounded-2xl gradient-bg text-primary-foreground gap-2 h-12 px-6 font-bold shadow-lg">
          <Sparkles className="h-4 w-4" /> Generate with AI
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Button 
              key={c} 
              variant={category === c ? 'default' : 'outline'} 
              size="sm" 
              className={`rounded-full font-bold ${category === c ? 'gradient-bg text-primary-foreground shadow-md' : 'border-gray-200'}`} 
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl h-10 w-60 bg-white border-gray-200" 
            />
          </div>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filtered.map((t: any, i: number) => (
          <motion.div 
            key={t.id} 
            variants={fadeInUp}
            className={`bg-white rounded-3xl shadow-card overflow-hidden group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${viewMode === 'list' ? 'flex items-center' : ''}`}
          >
            <div className={`${viewMode === 'grid' ? 'h-52' : 'h-20 w-20 flex-shrink-0'} bg-gradient-to-br ${gradientMap[t.category] || 'from-indigo-500 to-violet-600'} flex items-center justify-center relative overflow-hidden`}>
              <Image className={`${viewMode === 'grid' ? 'h-16 w-16' : 'h-8 w-8'} text-white/30`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button size="icon" className="h-10 w-10 rounded-xl bg-white/90 text-gray-900 hover:bg-white"><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" className="h-10 w-10 rounded-xl bg-white/90 text-gray-900 hover:bg-white"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
            <div className={`${viewMode === 'grid' ? 'p-6' : 'p-4 flex-1 flex items-center justify-between'}`}>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-widest">{t.category}</Badge>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.type}</span>
                </div>
              </div>
              {viewMode === 'list' && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl font-bold gap-1"><Eye className="h-3 w-3" /> Preview</Button>
                  <Button size="sm" className="rounded-xl gradient-bg text-primary-foreground font-bold gap-1"><Palette className="h-3 w-3" /> Use</Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
