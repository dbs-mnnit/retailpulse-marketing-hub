import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Sparkles, Image, Type, Layers, Wand2, ArrowRight, Clock, FileImage, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useGenerateBannerMutation, useGenerateCopyMutation, useGenerateABTestsMutation } from '@/app/api/aiApi';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const tools = [
  { icon: Sparkles, title: 'AI Generate', desc: 'Create with Polestar AI using natural language prompts', color: 'from-indigo-500 to-violet-600', action: 'ai-generate' },
  { icon: Upload, title: 'Upload Design', desc: 'Drop your own creative files (PNG, JPG, SVG)', color: 'from-emerald-500 to-teal-600', action: 'upload' },
  { icon: Layers, title: 'Edit Template', desc: 'Customize a pre-built template from the gallery', color: 'from-amber-500 to-orange-600', action: 'template' },
  { icon: Wand2, title: 'Smart Resize', desc: 'Auto-adapt designs for email, SMS, and WhatsApp', color: 'from-pink-500 to-rose-600', action: 'resize' },
];

const recentDesigns = [
  { id: '1', name: 'Diwali Flash Sale Banner', type: 'Email', date: '2 hours ago', status: 'Published' },
  { id: '2', name: 'New Arrivals Carousel', type: 'Storefront', date: '1 day ago', status: 'Draft' },
  { id: '3', name: 'Loyalty Rewards Card', type: 'WhatsApp', date: '3 days ago', status: 'Published' },
  { id: '4', name: 'Summer Clearance Flyer', type: 'SMS', date: '5 days ago', status: 'Draft' },
];

export default function DesignStudioPage() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  const [copyPrompt, setCopyPrompt] = useState('');
  const [copyType, setCopyType] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [copyResult, setCopyResult] = useState('');
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);

  const [generateBanner, { isLoading: bannerLoading }] = useGenerateBannerMutation();
  const [generateCopy, { isLoading: copyLoading }] = useGenerateCopyMutation();
  const [generateABTests, { isLoading: abTestLoading }] = useGenerateABTestsMutation();

  const handleGenerateBanner = async (goal: string) => {
    try {
      const data = await generateBanner(goal).unwrap();
      setAiResult(data);
      toast.success('AI banner generated!');
    } catch {
      toast.error('AI generation failed. Please try again.');
    }
  };

  const handleGenerateCopy = async ({ type, prompt }: { type: string; prompt: string }) => {
    try {
      const data = await generateCopy({ type, prompt }).unwrap();
      setCopyResult(data?.copy || data || '');
      toast.success('Copy generated!');
    } catch {
      toast.error('Copy generation failed.');
    }
  };

  const handleGenerateABTests = async (baseCopy: string) => {
    try {
      const data = await generateABTests(baseCopy).unwrap();
      setCopyResult(prev => prev + '\n\n--- A/B VARIATIONS ---\n' + (typeof data === 'string' ? data : JSON.stringify(data, null, 2)));
      toast.success('A/B test variations generated!');
    } catch {
      toast.error('A/B generation failed.');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Design Studio</h1>
          <p className="text-muted-foreground font-medium mt-1">Create stunning creatives for every channel</p>
        </div>
        <Dialog open={copyDialogOpen} onOpenChange={setCopyDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl gradient-bg text-primary-foreground gap-2 h-12 px-6 font-bold shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4" /> AI Copy Writer
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-lg p-0 overflow-hidden">
            <div className="p-8 bg-gray-950 text-white">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-black">AI Copy Writer</DialogTitle>
                <p className="text-gray-400 text-sm font-medium mt-1">Generate marketing copy for any channel</p>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex gap-2">
                {(['email', 'sms', 'whatsapp'] as const).map((t) => (
                  <Button
                    key={t}
                    variant={copyType === t ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full font-bold capitalize ${copyType === t ? 'gradient-bg text-primary-foreground' : ''}`}
                    onClick={() => setCopyType(t)}
                  >{t}</Button>
                ))}
              </div>
              <Input
                value={copyPrompt}
                onChange={(e) => setCopyPrompt(e.target.value)}
                placeholder="e.g. Announce 30% off on all winter collection"
                className="rounded-xl h-12"
              />
              <Button
                onClick={() => handleGenerateCopy({ type: copyType, prompt: copyPrompt })}
                disabled={!copyPrompt.trim() || copyLoading}
                className="w-full rounded-2xl gradient-bg text-primary-foreground h-12 font-bold"
              >
                {copyLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Copy</>}
              </Button>
              {copyResult && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 max-h-60 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-medium text-gray-800">{copyResult}</pre>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleGenerateABTests(copyResult)}
                    disabled={abTestLoading}
                    className="w-full rounded-xl font-bold gap-2"
                  >
                    {abTestLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    Generate A/B Variations
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Studio Banner */}
      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden bg-gray-950 text-white rounded-3xl p-10 shadow-2xl cursor-pointer" onClick={() => setAiDialogOpen(true)}>
          <div className="absolute top-0 right-0 p-8 opacity-10"><Wand2 className="h-48 w-48" /></div>
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-[60px]" />
          <div className="relative z-10 max-w-xl">
            <Badge className="bg-white/10 text-white border-white/20 rounded-full font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 mb-6">AI Powered</Badge>
            <h2 className="text-3xl font-black mb-3">Generate creatives with a prompt</h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-6">Describe what you need — "A festive Diwali sale banner with gold accents" — and Polestar AI creates it in seconds.</p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl h-12 px-8 font-bold gap-2">
              Try AI Studio <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
        <DialogContent className="rounded-3xl max-w-lg p-0 overflow-hidden">
          <div className="p-8 bg-gray-950 text-white">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black">AI Banner Generator</DialogTitle>
              <p className="text-gray-400 text-sm font-medium mt-1">Describe your banner and AI will create it</p>
            </DialogHeader>
          </div>
          <div className="p-8 space-y-4">
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. A premium Diwali sale banner with gold and deep red"
              className="rounded-xl h-12"
            />
            <Button
              onClick={() => handleGenerateBanner(aiPrompt)}
              disabled={!aiPrompt.trim() || bannerLoading}
              className="w-full rounded-2xl gradient-bg text-primary-foreground h-12 font-bold"
            >
              {bannerLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Banner</>}
            </Button>
            {aiResult && (
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-muted-foreground font-bold mb-2">AI Description:</p>
                <p className="text-sm text-gray-700 leading-relaxed">{aiResult.aiDescription}</p>
                {aiResult.imageUrl && (
                  <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600">🖼️ Asset URL: <span className="font-mono">{aiResult.imageUrl}</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Creation Tools */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((t) => (
          <motion.button
            key={t.title}
            variants={fadeInUp}
            onClick={() => t.action === 'ai-generate' ? setAiDialogOpen(true) : null}
            className="bg-white rounded-3xl p-7 shadow-card hover:shadow-elevated transition-all text-left group hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <t.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Editor Capabilities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-6">Editor Capabilities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Type, label: 'Rich Text Blocks', desc: 'Custom fonts & sizing' },
            { icon: Image, label: 'Image Library', desc: 'Stock + uploads' },
            { icon: Palette, label: 'Brand Kit', desc: 'Auto-apply colors' },
            { icon: Layers, label: 'Logo Watermark', desc: 'Overlay & positioning' },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-sm transition-all">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600"><f.icon className="h-5 w-5" /></div>
              <div>
                <span className="text-sm font-bold text-gray-900">{f.label}</span>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Designs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900">Recent Designs</h3>
          <Button variant="ghost" className="text-indigo-600 font-bold text-sm">View All</Button>
        </div>
        <div className="space-y-3">
          {recentDesigns.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                  <FileImage className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{d.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="rounded-full text-[10px] font-bold">{d.type}</Badge>
                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1"><Clock className="h-3 w-3" /> {d.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`rounded-full text-[10px] font-bold ${d.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>{d.status}</Badge>
                <Button variant="outline" size="sm" className="rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
