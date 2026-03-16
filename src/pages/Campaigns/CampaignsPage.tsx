import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Mail, MessageSquare, Phone, Users, Palette, Calendar, ArrowRight, ArrowLeft, Rocket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockCampaigns, mockCustomers } from '@/services/mockData';
import { Link } from 'react-router-dom';

const stepTitles = ['Channel', 'Audience', 'Creative', 'Schedule', 'Review'];

function CampaignList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">{mockCampaigns.length} total campaigns</p>
        </div>
        <Link to="/dashboard/campaigns/create">
          <Button className="rounded-xl gradient-bg text-primary-foreground gap-2"><Plus className="h-4 w-4" /> New Campaign</Button>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4">
        {mockCampaigns.map((c) => (
          <div key={c.id} className="bg-background rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.channel === 'email' ? 'bg-primary/10 text-primary' : c.channel === 'sms' ? 'bg-accent/10 text-accent' : 'bg-green-100 text-green-600'}`}>
                {c.channel === 'email' ? <Mail className="h-5 w-5" /> : c.channel === 'sms' ? <MessageSquare className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{c.channel} · {c.audienceCount.toLocaleString()} recipients</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                c.status === 'completed' ? 'bg-green-100 text-green-700' :
                c.status === 'sent' ? 'bg-primary/10 text-primary' :
                c.status === 'scheduled' ? 'bg-accent/10 text-accent' :
                'bg-muted text-muted-foreground'
              }`}>{c.status}</span>
              <span className="text-sm text-muted-foreground">{c.creditsUsed.toLocaleString()} credits</span>
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

  const channels = [
    { id: 'email', label: 'Email', icon: Mail, cost: '1 credit', color: 'border-primary bg-primary/5' },
    { id: 'sms', label: 'SMS', icon: MessageSquare, cost: '2 credits', color: 'border-accent bg-accent/5' },
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone, cost: '3 credits', color: 'border-green-500 bg-green-50' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Create Campaign</h1>
        <p className="text-muted-foreground mt-1">Launch a multi-channel retail blast in minutes.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {stepTitles.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 text-sm font-medium ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? 'gradient-bg text-primary-foreground' : i === step ? 'border-2 border-primary text-primary' : 'border border-border'}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < stepTitles.length - 1 && <div className="flex-1 h-px bg-border" />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="bg-background rounded-2xl p-6 shadow-card min-h-[300px]">
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Campaign Name</Label><Input placeholder="e.g. Summer Sale Blast" className="rounded-xl" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
              <Label>Select Channel</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {channels.map((ch) => (
                  <button key={ch.id} onClick={() => setFormData({...formData, channel: ch.id})} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.channel === ch.id ? ch.color : 'border-border hover:border-muted-foreground/30'}`}>
                    <ch.icon className="h-6 w-6 mb-2" />
                    <div className="font-semibold">{ch.label}</div>
                    <div className="text-xs text-muted-foreground">{ch.cost} per message</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Select Audience</h3>
              <p className="text-sm text-muted-foreground">{mockCustomers.length} customers available</p>
              <div className="space-y-2">
                {mockCustomers.slice(0, 5).map((c) => (
                  <label key={c.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.email}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Choose Creative</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Upload Design', 'AI Generate', 'Use Template', 'Create New'].map((opt) => (
                  <button key={opt} className="p-6 rounded-xl border-2 border-border hover:border-primary transition-all text-center">
                    <Palette className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-medium text-sm">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Schedule</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setFormData({...formData, schedule: 'now'})} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.schedule === 'now' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <Rocket className="h-5 w-5 mb-2" /><div className="font-semibold">Send Now</div><div className="text-xs text-muted-foreground">Launch immediately</div>
                </button>
                <button onClick={() => setFormData({...formData, schedule: 'later'})} className={`p-4 rounded-xl border-2 text-left transition-all ${formData.schedule === 'later' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <Calendar className="h-5 w-5 mb-2" /><div className="font-semibold">Schedule</div><div className="text-xs text-muted-foreground">Pick date & time</div>
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Review Campaign</h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-xl bg-muted/50"><span className="text-muted-foreground">Name</span><span className="font-medium">{formData.name || 'Untitled Campaign'}</span></div>
                <div className="flex justify-between p-3 rounded-xl bg-muted/50"><span className="text-muted-foreground">Channel</span><span className="font-medium capitalize">{formData.channel}</span></div>
                <div className="flex justify-between p-3 rounded-xl bg-muted/50"><span className="text-muted-foreground">Audience</span><span className="font-medium">5 customers</span></div>
                <div className="flex justify-between p-3 rounded-xl bg-muted/50"><span className="text-muted-foreground">Credits Required</span><span className="font-bold text-primary">{formData.channel === 'email' ? 5 : formData.channel === 'sms' ? 10 : 15}</span></div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button variant="outline" className="rounded-xl gap-2" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < 4 ? (
          <Button className="rounded-xl gradient-bg text-primary-foreground gap-2" onClick={() => setStep(step + 1)}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link to="/dashboard/campaigns">
            <Button className="rounded-xl gradient-bg text-primary-foreground gap-2">
              <Rocket className="h-4 w-4" /> Launch Campaign
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CampaignList;
