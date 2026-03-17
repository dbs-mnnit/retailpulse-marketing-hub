import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Mail, 
  MessageSquare, 
  Phone, 
  Users, 
  Palette, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Rocket, 
  Check,
  Upload,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetCampaignsQuery, useGetCustomersQuery } from '@/app/api/dataApi';
import { Link } from 'react-router-dom';

const stepTitles = ['Channel', 'Audience', 'Creative', 'Schedule', 'Review'];

function CampaignList() {
  const { data: campaigns, isLoading, error } = useGetCampaignsQuery();

  if (isLoading) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 opacity-50">
        <div className="w-12 h-12 border-2 border-white/10 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Campaign Matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 text-rose-500">
        <div className="h-16 w-16 border border-rose-500/20 rounded-full flex items-center justify-center bg-rose-500/5">
          <Rocket className="h-8 w-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Propulsion Link Severed</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Orchestration Layer</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter">Campaign Matrix</h1>
          <p className="text-gray-500 font-medium mt-1">Deploy and monitor high-velocity market broadcasts.</p>
        </div>
        <Link to="/dashboard/campaigns/create">
          <Button className="h-12 rounded-xl bg-white text-black hover:bg-cyan-50 font-black text-[10px] uppercase tracking-widest gap-3 shadow-glow active:scale-[0.98] transition-all">
            <Plus className="h-4 w-4" /> Initialize Campaign
          </Button>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
        {(campaigns || []).map((c: any) => (
          <div key={c.id} className="glass border-white/5 rounded-[2rem] p-8 shadow-premium hover:bg-white/[0.04] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 group">
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-glow transition-all ${
                c.channel === 'email' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 
                c.channel === 'sms' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 
                'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                {c.channel === 'email' ? <Mail className="h-6 w-6" /> : c.channel === 'sms' ? <MessageSquare className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-display font-black text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors uppercase">{c.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">{c.channel.toUpperCase()} VECTOR</span>
                  <div className="h-1 w-1 rounded-full bg-gray-800" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{c.audienceCount.toLocaleString()} NODES TARGETED</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-700 mb-1">Status Protocol</span>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                  c.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-glow' :
                  c.status === 'sent' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-glow' :
                  c.status === 'scheduled' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                  'bg-white/5 text-gray-500 border-white/10'
                }`}>{c.status}</span>
              </div>
              <div className="flex flex-col items-end min-w-[120px]">
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-700 mb-1">Energy Consumed</span>
                <span className="text-sm font-black text-white">{c.creditsUsed.toLocaleString()} <span className="text-[10px] text-gray-700 uppercase">Credits</span></span>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 opacity-20 group-hover:opacity-100 transition-all">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function CreateCampaignPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', channel: 'email', schedule: 'now' });
  const { data: customersResponse } = useGetCustomersQuery();
  const customers = customersResponse || [];

  const channels = [
    { id: 'email', label: 'Email Matrix', icon: Mail, cost: '1 credit', color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400', glow: 'shadow-cyan-500/20' },
    { id: 'sms', label: 'SMS Interface', icon: MessageSquare, cost: '2 credits', color: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400', glow: 'shadow-indigo-500/20' },
    { id: 'whatsapp', label: 'Neural Link', icon: Phone, cost: '3 credits', color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400', glow: 'shadow-emerald-500/20' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Mission Configuration</span>
        </div>
        <h1 className="text-5xl font-display font-black tracking-tighter">Initialize Campaign</h1>
        <p className="text-gray-500 font-medium mt-2">Configure high-throughput broadcast parameters.</p>
      </div>

      {/* Stepper Evolution */}
      <div className="flex items-center justify-between px-10">
        {stepTitles.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${i <= step ? 'opacity-100' : 'opacity-20'}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all border duration-500 ${
                i < step ? 'bg-white text-black border-transparent shadow-glow' : 
                i === step ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-glow' : 
                'bg-white/5 text-gray-500 border-white/10'
              }`}>
                {i < step ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{s}</span>
            </div>
            {i < stepTitles.length - 1 && (
              <div className="flex-1 px-4 mb-6">
                <div className={`h-[1px] transition-all duration-1000 ${i < step ? 'bg-cyan-400 shadow-glow' : 'bg-white/5'}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }} 
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
          className="glass border-white/5 rounded-[3rem] p-12 shadow-premium min-h-[500px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 text-white/5 uppercase tracking-[1em] text-[80px] font-black pointer-events-none select-none">
            {stepTitles[step]}
          </div>

          <div className="relative z-10">
            {step === 0 && (
              <div className="space-y-10 max-w-2xl">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Designation</Label>
                  <Input 
                    placeholder="E.G. SUMMER_SALE_ORCHESTRATION" 
                    className="h-16 rounded-2xl bg-white/[0.03] border-white/5 text-2xl font-black uppercase tracking-tight focus:ring-primary/20 transition-all placeholder:text-gray-800"
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                <div className="space-y-6">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Propulsion Vector</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {channels.map((ch) => (
                      <button 
                        key={ch.id} 
                        onClick={() => setFormData({ ...formData, channel: ch.id })} 
                        className={`p-8 rounded-[2rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${
                          formData.channel === ch.id ? `${ch.color} ${ch.glow}` : 'border-white/5 hover:border-white/20 bg-white/[0.01]'
                        }`}
                      >
                        <ch.icon className="h-8 w-8 mb-6" />
                        <div className="font-black text-xs uppercase tracking-widest mb-1">{ch.label}</div>
                        <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{ch.cost} / UNIT</div>
                        {formData.channel === ch.id && (
                          <motion.div layoutId="vector-active" className="absolute top-4 right-4 h-2 w-2 rounded-full bg-current shadow-glow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-display font-black tracking-tighter uppercase mb-2">Audience Segmentation</h3>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{customers.length} NODES IDENTIFIED IN RECENT SCAN</p>
                </div>
                <ScrollArea className="h-[350px] pr-6 no-scrollbar">
                  <div className="space-y-4 pb-10">
                    {customers.slice(0, 8).map((c: any) => (
                      <label key={c.id} className="flex items-center gap-6 p-6 rounded-[1.5rem] glass border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer group">
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="peer opacity-0 absolute inset-0" />
                          <div className="h-6 w-6 rounded-lg border-2 border-white/10 peer-checked:border-cyan-400 peer-checked:bg-cyan-400 transition-all flex items-center justify-center text-black">
                            <Check className="h-4 w-4 scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-black text-[10px] text-gray-400 group-hover:text-cyan-400 transition-colors">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-sm uppercase tracking-tight text-white mb-0.5">{c.name}</div>
                          <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{c.email.toUpperCase()}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase mb-2">Asset Synthesis</h3>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Ingest Manifest', icon: Upload, desc: 'Upload custom designs' },
                    { label: 'Neural Forge', icon: Rocket, desc: 'AI-generated creative' },
                    { label: 'Matrix Blueprint', icon: Palette, desc: 'Use premium templates' },
                    { label: 'Manual Origin', icon: Edit, desc: 'Create from absolute zero' }
                  ].map((opt) => (
                    <button key={opt.label} className="p-10 rounded-[2.5rem] border-2 border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all text-left group">
                      <opt.icon className="h-10 w-10 mb-6 text-gray-700 group-hover:text-cyan-400 transition-colors" />
                      <div className="font-black text-sm uppercase tracking-widest text-white mb-2">{opt.label}</div>
                      <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase mb-2">Temporal Alignment</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <button onClick={() => setFormData({ ...formData, schedule: 'now' })} className={`p-10 rounded-[2.5rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${formData.schedule === 'now' ? 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400 shadow-glow' : 'border-white/5 hover:border-white/20'}`}>
                    <Rocket className="h-10 w-10 mb-6" />
                    <div className="font-black text-sm uppercase tracking-widest mb-1">Instant Propulsion</div>
                    <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Execute immediately</div>
                  </button>
                  <button onClick={() => setFormData({ ...formData, schedule: 'later' })} className={`p-10 rounded-[2.5rem] border-2 text-left transition-all duration-500 group relative overflow-hidden ${formData.schedule === 'later' ? 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400 shadow-glow' : 'border-white/5 hover:border-white/20'}`}>
                    <Calendar className="h-10 w-10 mb-6" />
                    <div className="font-black text-sm uppercase tracking-widest mb-1">Chronos Sync</div>
                    <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Align temporal vectors</div>
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <h3 className="text-3xl font-display font-black tracking-tighter uppercase mb-2">Mission Integrity Review</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-8 rounded-[2rem] glass border-white/5 group hover:bg-white/[0.04] transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">System Designation</span>
                    <span className="font-black text-lg tracking-tight uppercase">{formData.name || 'ANONYMOUS_MISSION'}</span>
                  </div>
                  <div className="flex justify-between items-center p-8 rounded-[2rem] glass border-white/5 group hover:bg-white/[0.04] transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Propulsion Vector</span>
                    <span className="font-black text-lg tracking-tight uppercase text-cyan-400">{formData.channel} LINK</span>
                  </div>
                  <div className="flex justify-between items-center p-8 rounded-[2rem] glass border-white/5 group hover:bg-white/[0.04] transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Inbound Nodes</span>
                    <span className="font-black text-lg tracking-tight uppercase">5 Identities</span>
                  </div>
                  <div className="flex justify-between items-end p-8 rounded-[2rem] glass border-white/5 group hover:bg-white/[0.04] transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Calculated Energy Required</span>
                    <div className="text-right">
                      <span className="text-4xl font-black tracking-tighter text-white shadow-glow">
                        {formData.channel === 'email' ? 5 : formData.channel === 'sms' ? 10 : 15}
                      </span>
                      <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-gray-500">Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between px-6">
        <Button variant="ghost" className="h-16 px-10 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-all gap-4" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" /> Vector Back
        </Button>
        {step < 4 ? (
          <Button className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-cyan-50 font-black text-[10px] uppercase tracking-[0.4em] gap-4 shadow-glow active:scale-[0.98] transition-all" onClick={() => setStep(step + 1)}>
            Next Phase <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link to="/dashboard/campaigns">
            <Button className="h-20 px-16 rounded-[2rem] bg-white text-black hover:bg-cyan-50 font-black text-xs uppercase tracking-[0.4em] gap-6 shadow-glow active:scale-[0.95] transition-all group">
              <Rocket className="h-6 w-6 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" /> 
              Execute Mission
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CampaignList;
