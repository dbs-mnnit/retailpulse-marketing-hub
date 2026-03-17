import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Play, 
  StopCircle, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Clock,
  User,
  Zap,
  ChevronRight,
  TrendingUp,
  Coins
} from 'lucide-react';
import { 
  useGetCurrentSessionQuery, 
  useGetSessionsQuery, 
  useOpenSessionMutation, 
  useCloseSessionMutation 
} from '@/app/api/dataApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function ShiftManagement() {
  const [openingBalance, setOpeningBalance] = useState('');
  const [closingCash, setClosingCash] = useState('');
  const [reason, setReason] = useState('');

  const { data: currentSession, isLoading: isLoadingCurrent } = useGetCurrentSessionQuery();
  const { data: history = [] } = useGetSessionsQuery();

  const [openSession, { isLoading: isOpening }] = useOpenSessionMutation();
  const [closeSession, { isLoading: isClosing }] = useCloseSessionMutation();

  const handleOpenSession = async () => {
    try {
      await openSession(Number(openingBalance)).unwrap();
      toast.success('Governance Link Established. Shift Active.');
      setOpeningBalance('');
    } catch (err) {
      toast.error('Failed to establish governance link.');
    }
  };

  const handleCloseSession = async () => {
    if (!currentSession?._id) {
      toast.error('No active session found to terminate.');
      return;
    }
    try {
      await closeSession({ 
        id: currentSession._id, 
        cashActual: Number(closingCash), 
        mismatchReason: reason 
      }).unwrap();
      toast.success('Shift Terminated. Reconciliation Matrix Updated.');
      setClosingCash('');
      setReason('');
    } catch (err) {
      toast.error('Termination sequence failed.');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-2 w-2 rounded-full ${currentSession ? 'bg-emerald-500 shadow-glow' : 'bg-rose-500 opacity-50'} animate-pulse`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${currentSession ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currentSession ? 'System Active' : 'System Standby'}
            </span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter">Operational Governance</h1>
          <p className="text-gray-500 font-medium mt-1">POS Session Synchronization & Cash Reconciliation Layer.</p>
        </div>
        {currentSession && (
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Uptime</span>
              <span className="text-sm font-black uppercase">04:22:15</span>
            </div>
            <div className="h-8 w-[1px] bg-white/5 mx-2" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Session ID</span>
              <span className="text-sm font-black uppercase text-cyan-400">{currentSession?._id?.slice(-8).toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Session / Open Shift */}
        <div className="lg:col-span-2 space-y-10">
          {!currentSession ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="glass border-white/5 shadow-premium rounded-[3rem] p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 text-white/5 uppercase tracking-[1em] text-[100px] font-black pointer-events-none select-none">CORE</div>
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-3xl font-display font-black tracking-tight mb-4">Initialize New Shift</h3>
                  <p className="text-gray-500 font-medium mb-10">Establish a secure POS link by synchronizing the initial cash matrix.</p>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Opening Cash Balance</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-700">₹</span>
                        <Input 
                          placeholder="0.00" 
                          value={openingBalance}
                          onChange={(e) => setOpeningBalance(e.target.value)}
                          className="h-24 pl-14 rounded-[1.5rem] bg-white/[0.03] border-white/5 text-4xl font-black focus:ring-primary/20 transition-all placeholder:text-gray-800" 
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleOpenSession}
                      disabled={!openingBalance || isOpening}
                      className="w-full h-20 rounded-[2rem] bg-white text-black hover:bg-cyan-50 font-black text-sm uppercase tracking-[0.3em] gap-4 shadow-glow active:scale-[0.98] transition-all"
                    >
                      {isOpening ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Play className="h-5 w-5" />} 
                      Establish Link
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="glass border-white/5 shadow-premium rounded-[3rem] overflow-hidden">
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-glow">
                      <Clock className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Active Operational Cycle</h3>
                      <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-1">Synchronization established at {currentSession?.openedAt ? new Date(currentSession.openedAt).toLocaleTimeString() : '...'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-10">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Input Matrix</p>
                        <p className="text-xl font-black text-white">₹{currentSession?.openingBalance.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Expected Pool</p>
                        <p className="text-xl font-black text-cyan-400 group-hover:shadow-glow transition-all">₹{currentSession?.cashExpected.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Protocol Lead</p>
                        <div className="flex items-center gap-2">
                           <User className="h-3.5 w-3.5 text-gray-400" />
                           <p className="text-xs font-black uppercase tracking-widest text-white">Manager</p>
                        </div>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.04] transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Neural Velocity</p>
                        <div className="flex items-center gap-2">
                           <Coins className="h-3.5 w-3.5 text-orange-400" />
                           <p className="text-xl font-black text-white tracking-tight">14.5k</p>
                        </div>
                      </div>
                   </div>

                   <div className="h-[1px] bg-white/5 mb-12" />

                   <div className="max-w-md space-y-8">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-2">Termination Protocol</h4>
                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Perform final cash reconciliation to close the cycle.</p>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Actual Cash Liquidity</label>
                          <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-gray-700">₹</span>
                            <Input 
                              placeholder="0.00" 
                              value={closingCash}
                              onChange={(e) => setClosingCash(e.target.value)}
                              className="h-16 pl-14 rounded-2xl bg-white/[0.03] border-white/5 text-2xl font-black focus:ring-primary/20 transition-all placeholder:text-gray-800" 
                            />
                          </div>
                        </div>
                        <AnimatePresence>
                          {closingCash && Number(closingCash) !== currentSession.cashExpected && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 ml-2">Mismatch Justification</label>
                              <Input 
                                placeholder="State discrepancy vectors..." 
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="h-16 rounded-2xl bg-rose-500/5 border-rose-500/10 text-rose-200 text-xs font-black uppercase tracking-widest focus:ring-rose-500/20 placeholder:text-rose-900/40" 
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <Button 
                          onClick={handleCloseSession}
                          disabled={!closingCash || isClosing}
                          className="w-full h-16 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 font-black text-xs uppercase tracking-[0.3em] gap-4 shadow-xl shadow-rose-900/20 active:scale-[0.98] transition-all"
                        >
                          {isClosing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <StopCircle className="h-5 w-5" />} 
                          Terminate Cycle
                        </Button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Operational Intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass border-white/5 rounded-[2rem] p-8 shadow-premium group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20 shadow-glow">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Earning Velocity</h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">₹1,240 / hr <span className="text-gray-700">median throughput</span></p>
                  </div>
                </div>
             </div>
             <div className="glass border-white/5 rounded-[2rem] p-8 shadow-premium group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center border border-accent/20 shadow-glow">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Telemetry Export</h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Auto-generating <span className="text-gray-700">PDF manifest</span></p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* History Stream */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
             <div>
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Historical Logs</h3>
               <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-1">Past Operational Cycles</p>
             </div>
             <Button variant="ghost" className="h-10 px-4 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Archive</Button>
          </div>
          <ScrollArea className="h-[800px] pr-4 no-scrollbar">
            <div className="space-y-6 pb-20">
              {history.map((session: any) => (
                <div key={session._id} className="glass border-white/5 rounded-[2rem] p-6 shadow-premium hover:bg-white/[0.04] transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity">
                    <CheckCircle2 className="h-16 w-16" />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-400">
                      {session.openedAt ? new Date(session.openedAt).toLocaleDateString() : 'N/A'}
                    </div>
                    <CheckCircle2 className={`h-4 w-4 ${session.closedAt ? 'text-emerald-400 shadow-glow' : 'text-orange-400 animate-pulse'}`} />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                     <div>
                       <p className="text-[8px] font-black uppercase tracking-widest text-gray-700 mb-1">Final Pool</p>
                       <p className="text-lg font-black text-white">₹{(session.cashActual || session.openingBalance || 0).toLocaleString()}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-[8px] font-black uppercase tracking-widest text-gray-700 mb-1">Operator</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{session.staffId?.name || 'Manager'}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-700">
                    <Clock className="h-3 w-3" />
                    {session.openedAt ? new Date(session.openedAt).toLocaleTimeString() : '...'} — {session.closedAt ? new Date(session.closedAt).toLocaleTimeString() : 'Active'}
                  </div>
                  {session.closedAt && session.cashActual !== session.cashExpected && (
                     <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-rose-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-rose-400">Deviation: ₹{(Number(session.cashActual || 0) - Number(session.cashExpected || 0)).toFixed(2)}</span>
                     </div>
                  )}
                  <Button variant="ghost" size="sm" className="w-full mt-6 h-10 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-white/10 gap-2 transition-all">
                    Drill-down Analytics <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
