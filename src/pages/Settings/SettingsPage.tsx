import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, Palette, Plug, Coins, Mail, MessageSquare, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';
import { baseApi } from '@/app/api/baseApi';

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) || { name: '', email: '' };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate('/login');
  };

  return (
    <div className="space-y-12 max-w-4xl pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Configuration</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-foreground transition-colors duration-500">Core Settings</h1>
          <p className="text-muted-foreground font-bold mt-1">Orchestrate your global workspace and protocols.</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-10">
        <TabsList className="h-16 bg-muted/30 border border-border p-1.5 rounded-[1.25rem] gap-2">
          <TabsTrigger value="profile" className="rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <User className="h-4 w-4" /> Identity
          </TabsTrigger>
          <TabsTrigger value="business" className="rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Building2 className="h-4 w-4" /> Node
          </TabsTrigger>
          <TabsTrigger value="brand" className="rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Palette className="h-4 w-4" /> Aesthetics
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Coins className="h-4 w-4" /> Rewards
          </TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            <Plug className="h-4 w-4" /> Neural Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass border-border rounded-[2.5rem] p-10 shadow-premium space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity Designation</Label>
                <Input defaultValue={user.name || "UNIDENTIFIED_OPERATOR"} className="h-14 rounded-2xl bg-muted/20 border-border font-black uppercase tracking-widest focus:ring-primary/20 transition-all" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Communication Channel</Label>
                <Input defaultValue={user.email || "NULL@DATA.LINK"} className="h-14 rounded-2xl bg-muted/20 border-border font-black uppercase tracking-widest focus:ring-primary/20 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mobile Interface</Label>
              <Input defaultValue="+1 000-000-0000" className="h-14 rounded-2xl bg-muted/20 border-border font-black focus:ring-primary/20 transition-all" />
            </div>
            <div className="pt-4">
              <Button className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all active:scale-95">
                Update Identity
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="business" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass border-border rounded-[2.5rem] p-10 shadow-premium space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Organizational Name</Label>
                <Input defaultValue="POLESTAR_CORE_SYSTEMS" className="h-14 rounded-2xl bg-muted/20 border-border font-black uppercase tracking-widest focus:ring-primary/20 transition-all" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Network Endpoint</Label>
                <Input defaultValue="HTTP://POLESTAR.CORE" className="h-14 rounded-2xl bg-muted/20 border-border font-black uppercase tracking-widest focus:ring-primary/20 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Physical Node Coordinates</Label>
              <Input defaultValue="GRID_DELTA_7, SECTOR_ONE" className="h-14 rounded-2xl bg-muted/20 border-border font-black uppercase tracking-widest focus:ring-primary/20 transition-all" />
            </div>
            <div className="pt-4">
              <Button className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all active:scale-95">
                Sync Node Data
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="brand" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass border-border rounded-[2.5rem] p-10 shadow-premium space-y-8">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Spectrum Protocol</Label>
              <div className="flex gap-4 p-2 bg-muted/10 border border-border rounded-2xl">
                <Input defaultValue="#3B82F6" className="h-14 rounded-xl bg-transparent border-none font-black uppercase tracking-widest flex-1 focus:ring-0" />
                <div className="w-14 h-14 rounded-xl bg-primary shadow-glow" />
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Visual Logotype</Label>
              <div className="border border-dashed border-border rounded-[2rem] p-12 text-center group hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Palette className="h-6 w-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Inject SVG Manifest</p>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30 mt-2 font-bold">Maximum resolution: 512px matrix</p>
              </div>
            </div>
            <div className="pt-4">
              <Button className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all active:scale-95">
                Deploy Aesthetics
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="loyalty" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass border-border rounded-[2.5rem] p-10 shadow-premium space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display font-black tracking-tight uppercase text-foreground">Loyalty Forge</h3>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Configure retention protocols and reward matrices.</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black tracking-widest text-emerald-500 shadow-glow">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> PROTOCOL_ACTIVE
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Accrual Velocity (Points / ₹1)</Label>
                  <Input type="number" defaultValue="1" className="h-14 rounded-2xl bg-muted/20 border-border font-black focus:ring-primary/20 transition-all font-bold" />
                  <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest ml-1 font-bold">Standard mission accumulation rate</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Redemption Threshold (Min. Points)</Label>
                  <Input type="number" defaultValue="100" className="h-14 rounded-2xl bg-muted/20 border-border font-black focus:ring-primary/20 transition-all font-bold" />
                  <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest ml-1 font-bold">Minimum node balance to initialize payout</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-1">Tier Orchestration</h4>
                <div className="space-y-4">
                  {[
                    { tier: 'Alpha', points: '1,000', multiplier: '1.2x', color: 'border-slate-500/20 bg-slate-500/5 text-slate-500' },
                    { tier: 'Gold', points: '5,000', multiplier: '1.5x', color: 'border-amber-500/20 bg-amber-500/5 text-amber-500' },
                    { tier: 'Platinum', points: '15,000', multiplier: '2.0x', color: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-500' },
                  ].map((t) => (
                    <div key={t.tier} className="flex items-center justify-between p-6 rounded-[1.5rem] glass border-border group hover:bg-muted/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all font-bold ${t.color}`}>
                          {t.tier}
                        </div>
                        <div>
                          <p className="text-lg font-black tracking-tight text-foreground mb-0.5">{t.points} <span className="text-[10px] text-muted-foreground opacity-30 font-bold">PTS</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t.multiplier} THROUGHPUT</span>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                           <Plug className="h-4 w-4 text-muted-foreground rotate-45" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full h-16 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all active:scale-95">
                Deploy Tier Matrix Updates
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {[
              { name: 'Email Protocol', vendor: 'SendGrid', status: 'Disconnected', icon: Mail },
              { name: 'SMS Interface', vendor: 'Twilio', status: 'Disconnected', icon: MessageSquare },
              { name: 'Neural WhatsApp', vendor: 'Meta Core', status: 'Disconnected', icon: Phone }
            ].map((int) => (
              <div key={int.name} className="glass border-border rounded-[2rem] p-8 flex items-center justify-between group hover:bg-muted/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-muted border border-border rounded-2xl flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all">
                    <int.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg tracking-tight uppercase text-foreground">{int.name}</h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 font-bold">{int.vendor} // {int.status}</p>
                  </div>
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-xl glass border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  Initialize Link
                </Button>
              </div>
            ))}
            
            <div className="glass border-rose-500/20 rounded-[2rem] p-8 flex items-center justify-between mt-12 bg-rose-500/[0.02]">
              <div>
                <h3 className="font-display font-black text-lg tracking-tight uppercase text-rose-500">Terminate Session</h3>
                <p className="text-[10px] font-black text-rose-500/40 uppercase tracking-widest mt-1 font-bold">Disconnect current node from core network.</p>
              </div>
              <Button variant="ghost" className="h-14 px-8 rounded-xl border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all" onClick={handleLogout}>
                Sign Out Matrix
              </Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
