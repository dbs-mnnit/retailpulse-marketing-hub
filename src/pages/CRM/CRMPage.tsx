import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Phone, Mail, Plus, Search, Filter, ArrowRight,
  Clock, CheckCircle2, XCircle, ChevronRight, Building2, CalendarDays, Loader2, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetLeadsQuery, useAddLeadMutation, useUpdateLeadStageMutation } from '@/app/api/crmApi';
import { useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';

const stages = ['New', 'Contacted', 'Negotiation', 'Won', 'Lost'];
const stageColors: Record<string, string> = { New: 'bg-blue-500', Contacted: 'bg-amber-500', Negotiation: 'bg-violet-500', Won: 'bg-green-500', Lost: 'bg-red-500' };
const stageIconMap: Record<string, any> = { New: Clock, Contacted: Phone, Negotiation: Briefcase, Won: CheckCircle2, Lost: XCircle };

const fallbackLeads = [
  { _id: '1', name: 'Rahul Mehta', company: 'TechCorp Solutions', stage: 'New', phone: '+91 98765 43210', email: 'rahul@techcorp.in', estimatedValue: 120000, createdAt: '2026-03-10', source: 'Google Ads' },
  { _id: '2', name: 'Priya Sharma', company: 'Design Hub', stage: 'Contacted', phone: '+91 87654 32109', email: 'priya@designhub.co', estimatedValue: 85000, createdAt: '2026-03-08', source: 'WhatsApp' },
  { _id: '3', name: 'Anil Kumar', company: 'BuildRight Infra', stage: 'Negotiation', phone: '+91 76543 21098', email: 'anil@buildright.in', estimatedValue: 250000, createdAt: '2026-03-05', source: 'Referral' },
  { _id: '4', name: 'Sneha Patel', company: 'FoodChain Pvt Ltd', stage: 'Won', phone: '+91 65432 10987', email: 'sneha@foodchain.in', estimatedValue: 175000, createdAt: '2026-03-01', source: 'Cold Call' },
  { _id: '5', name: 'Vikram Joshi', company: 'QuickServ', stage: 'Lost', phone: '+91 54321 09876', email: 'vikram@quickserv.com', estimatedValue: 60000, createdAt: '2026-02-28', source: 'Website' },
];

export default function CRMPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [showAdd, setShowAdd] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', phone: '', source: 'Google Ads', estimatedValue: '' });

  const businessId = useAppSelector((state) => state.business.currentId) || '';
  const { data: apiLeads, isLoading } = useGetLeadsQuery(businessId, { skip: !businessId });
  const [addLeadMutation, { isLoading: isAdding }] = useAddLeadMutation();
  const [updateStageMutation] = useUpdateLeadStageMutation();

  const leads = apiLeads?.length ? apiLeads : fallbackLeads;

  const handleAddLead = async () => {
    if (!newLead.name) return toast.error('Lead name is required');
    try {
      await addLeadMutation({ businessId, name: newLead.name, company: newLead.company, phone: newLead.phone, source: newLead.source, estimatedValue: Number(newLead.estimatedValue) || 0 }).unwrap();
      toast.success('Lead added!');
      setNewLead({ name: '', company: '', phone: '', source: 'Google Ads', estimatedValue: '' });
      setShowAdd(false);
    } catch { toast.error('Failed to add lead'); }
  };

  const handleStageChange = async (leadId: string, newStage: string) => {
    try {
      await updateStageMutation({ id: leadId, stage: newStage }).unwrap();
      toast.success(`Lead moved to ${newStage}`);
    } catch { toast.error('Failed to update stage'); }
  };

  const totalPipeline = leads.reduce((s: number, l: any) => l.stage !== 'Lost' && l.stage !== 'Won' ? s + (l.estimatedValue || 0) : s, 0);
  const wonDeals = leads.filter((l: any) => l.stage === 'Won');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3"><Users className="h-8 w-8 text-primary" /> CRM Pipeline</h1>
          <p className="text-muted-foreground mt-1 text-base">Track leads from first contact to closed deal.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-xl p-1">
            <Button size="sm" variant={view === 'kanban' ? 'default' : 'ghost'} className="rounded-lg text-xs" onClick={() => setView('kanban')}>Kanban</Button>
            <Button size="sm" variant={view === 'list' ? 'default' : 'ghost'} className="rounded-lg text-xs" onClick={() => setView('list')}>List</Button>
          </div>
          <Button className="rounded-xl gradient-bg text-primary-foreground gap-2" onClick={() => setShowAdd(!showAdd)}><Plus className="h-4 w-4" /> Add Lead</Button>
        </div>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-background rounded-3xl p-6 border border-border shadow-card space-y-4">
          <h3 className="font-bold">New Lead</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input placeholder="Contact Name *" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} className="rounded-xl" />
            <Input placeholder="Company" value={newLead.company} onChange={(e) => setNewLead({ ...newLead, company: e.target.value })} className="rounded-xl" />
            <Input placeholder="Phone" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} className="rounded-xl" />
            <select value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
              {['Google Ads', 'WhatsApp', 'Referral', 'Cold Call', 'Website', 'Walk-in'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Input type="number" placeholder="Est Value (₹)" value={newLead.estimatedValue} onChange={(e) => setNewLead({ ...newLead, estimatedValue: e.target.value })} className="rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Button className="rounded-xl gradient-bg text-primary-foreground" onClick={handleAddLead} disabled={isAdding}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Lead
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle></CardHeader>
          <CardContent>{isLoading ? <div className="h-8 w-24 bg-muted animate-pulse rounded-lg" /> : <div className="text-3xl font-bold">₹{totalPipeline.toLocaleString('en-IN')}</div>}</CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle></CardHeader>
          <CardContent>{isLoading ? <div className="h-8 w-12 bg-muted animate-pulse rounded-lg" /> : <div className="text-3xl font-bold">{leads.length}</div>}</CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Won This Month</CardTitle></CardHeader>
          <CardContent>{isLoading ? <div className="h-8 w-12 bg-muted animate-pulse rounded-lg" /> : <div className="text-3xl font-bold text-green-600">{wonDeals.length}</div>}</CardContent>
        </Card>
      </div>

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
          {stages.map((stage) => {
            const stageLeads = leads.filter((l: any) => l.stage === stage);
            const Icon = stageIconMap[stage];
            return (
              <motion.div key={stage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-muted/20 rounded-2xl p-4 min-h-[300px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`h-2.5 w-2.5 rounded-full ${stageColors[stage]}`} />
                  <span className="font-semibold text-sm">{stage}</span>
                  <Badge variant="outline" className="ml-auto text-[10px] rounded-md">{stageLeads.length}</Badge>
                </div>
                <div className="space-y-3">
                  {stageLeads.map((lead: any) => (
                    <motion.div key={lead._id} whileHover={{ scale: 1.02 }} className="bg-background rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow group">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm">{lead.name}</p>
                        <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {lead.company && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Building2 className="h-3 w-3" /> {lead.company}</p>}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">{lead.source}</span>
                        {lead.estimatedValue > 0 && <span className="text-xs font-bold">₹{(lead.estimatedValue / 1000).toFixed(0)}K</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">Name</th>
                  <th className="text-left py-4 px-6 font-semibold">Company</th>
                  <th className="text-left py-4 px-6 font-semibold">Stage</th>
                  <th className="text-left py-4 px-6 font-semibold">Source</th>
                  <th className="text-right py-4 px-6 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead: any) => (
                  <tr key={lead._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-medium">{lead.name}</td>
                    <td className="py-4 px-6 text-muted-foreground">{lead.company || '-'}</td>
                    <td className="py-4 px-6">
                      <select value={lead.stage} onChange={(e) => handleStageChange(lead._id, e.target.value)}
                        className="text-xs h-7 rounded-lg border border-border bg-background px-2">
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{lead.source}</td>
                    <td className="py-4 px-6 text-right font-bold">₹{(lead.estimatedValue || 0).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
