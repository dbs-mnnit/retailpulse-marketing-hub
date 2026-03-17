import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Upload, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetCustomersQuery } from '@/app/api/dataApi';
import type { Customer } from '@/types';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const { data: customersResponse, isLoading, error } = useGetCustomersQuery();

  const customers = customersResponse || [];

  if (isLoading) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 opacity-50">
        <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Customer Matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center space-y-4 text-rose-500">
        <div className="h-16 w-16 border border-rose-500/20 rounded-full flex items-center justify-center bg-rose-500/5">
          <Trash2 className="h-8 w-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Matrix Link Severed</p>
      </div>
    );
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Identity Registry</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter">Customer Intelligence</h1>
          <p className="text-muted-foreground font-bold mt-1">Manage and orchestrate your global customer network.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl glass border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-muted/50 gap-2 transition-all">
            <Upload className="h-4 w-4" /> Import Manifest
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-black text-[10px] uppercase tracking-widest gap-2 shadow-glow active:scale-[0.98] transition-all">
                <Plus className="h-4 w-4" /> Add Identity
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-border bg-card shadow-premium rounded-[2.5rem] p-10 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-black tracking-tight uppercase">Identity Ingest</DialogTitle>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2 text-left">Synchronize new personnel to the neural matrix.</p>
              </DialogHeader>
              <div className="space-y-6 pt-10">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Identity</Label>
                  <Input placeholder="DESIGNATION" className="h-14 rounded-2xl bg-muted/30 border-border font-black uppercase tracking-widest focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Communication Endpoint</Label>
                  <Input type="email" placeholder="EMAIL@NETWORK.CORE" className="h-14 rounded-2xl bg-white/[0.03] border-white/5 font-black uppercase tracking-widest focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Vector</Label>
                    <Input placeholder="+1" className="h-14 rounded-2xl bg-muted/30 border-border font-black focus:ring-primary/20" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mobile Interface</Label>
                    <Input placeholder="000-000-0000" className="h-14 rounded-2xl bg-muted/30 border-border font-black focus:ring-primary/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Gender Class</Label>
                  <Select>
                    <SelectTrigger className="h-14 rounded-2xl bg-white/[0.03] border-white/5 font-black uppercase tracking-widest focus:ring-primary/20">
                      <SelectValue placeholder="AUTO" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10 rounded-2xl">
                      <SelectItem value="male" className="font-black uppercase tracking-widest text-[10px]">Alpha</SelectItem>
                      <SelectItem value="female" className="font-black uppercase tracking-widest text-[10px]">Beta</SelectItem>
                      <SelectItem value="other" className="font-black uppercase tracking-widest text-[10px]">Non-Binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-16 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all mt-4">
                  Finalize Ingest
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Query Identities..." 
            className="pl-14 h-14 rounded-2xl glass border-border text-xs font-black uppercase tracking-widest focus:ring-primary/20 placeholder:text-muted-foreground" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white gap-3 transition-all">
          <Filter className="h-4 w-4" /> Refine
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass border-border bg-card rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.01] border-b border-white/5">
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Identity Designation</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Endpoint</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Mobile</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Class</th>
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sync Status</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filtered.map((c) => (
                <tr key={c.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-[10px] text-primary">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-display font-black text-sm tracking-tight text-foreground group-hover:text-primary transition-colors uppercase">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-black text-gray-500 tracking-widest">{c.email.toUpperCase()}</td>
                  <td className="p-6 text-xs font-black text-gray-500 tracking-widest">{c.countryCode} {c.phone}</td>
                  <td className="p-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 group-hover:text-gray-400 transition-colors capitalize">{c.gender}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <div className={`h-1.5 w-1.5 rounded-full ${c.status === 'active' ? 'bg-emerald-500 shadow-glow' : 'bg-muted-foreground/30'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${c.status === 'active' ? 'text-emerald-500' : 'text-muted-foreground'}`}>{c.status}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-rose-500/10 text-gray-400 hover:text-rose-400"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
