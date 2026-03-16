import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Sparkles, Image, Type, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  { icon: Upload, title: 'Upload Design', desc: 'Upload your own creative file' },
  { icon: Sparkles, title: 'AI Generate', desc: 'Create with AI using Gemini' },
  { icon: Layers, title: 'Edit Template', desc: 'Customize a pre-built template' },
  { icon: Image, title: 'Canva Integration', desc: 'Import from Canva' },
];

const recentDesigns = [
  { id: '1', name: 'Summer Sale Banner', type: 'Email', date: '2024-04-10' },
  { id: '2', name: 'Flash Deal Card', type: 'Instagram', date: '2024-04-08' },
  { id: '3', name: 'Welcome Message', type: 'WhatsApp', date: '2024-04-05' },
];

export default function DesignStudioPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Design Studio</h1>
        <p className="text-muted-foreground mt-1">Create stunning marketing creatives</p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((t, i) => (
          <motion.button key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-background rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all text-left group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <t.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-1">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-background rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Editor Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Type, label: 'Text Blocks' },
            { icon: Image, label: 'Images' },
            { icon: Palette, label: 'Brand Colors' },
            { icon: Layers, label: 'Logo Overlay' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <f.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-background rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Recent Designs</h3>
        <div className="space-y-3">
          {recentDesigns.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Image className="h-5 w-5 text-muted-foreground" /></div>
                <div><div className="font-medium text-sm">{d.name}</div><div className="text-xs text-muted-foreground">{d.type} · {d.date}</div></div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
