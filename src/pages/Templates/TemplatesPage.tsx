import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockTemplates } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Eye, Palette, Image } from 'lucide-react';

const categories = ['All', 'Sale', 'Festival', 'Product Launch', 'Announcement'];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? mockTemplates : mockTemplates.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-1">Browse and use pre-designed templates</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <Button key={c} variant={activeCategory === c ? 'default' : 'outline'} size="sm" className={`rounded-full ${activeCategory === c ? 'gradient-bg text-primary-foreground' : ''}`} onClick={() => setActiveCategory(c)}>
            {c}
          </Button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-background rounded-2xl shadow-card overflow-hidden group hover:shadow-elevated transition-all">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Image className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground capitalize">{t.category} · {t.type}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Palette className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
