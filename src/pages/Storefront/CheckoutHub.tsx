import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  ChevronRight,
  Coins,
  CheckCircle2,
  Box,
  Truck,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';

export default function CheckoutHub() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      toast.success('Procurement Protocol Successfully Finalized.');
    }, 2500);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 selection:bg-white selection:text-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center space-y-12"
        >
          <div className="relative flex justify-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-glow"
            >
              <CheckCircle2 className="h-16 w-16 text-black" />
            </motion.div>
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10" />
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-8 bg-emerald-500 shadow-glow" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Transaction Finalized</span>
              <div className="h-1 w-8 bg-emerald-500 shadow-glow" />
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black text-white tracking-tighter uppercase mb-4 leading-none italic">Order Confirmed</h1>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Your procurement request has been successfully synchronized. Dispatch protocol initiates within 24 hours.</p>
          </div>

          <div className="glass border-white/5 rounded-[3rem] p-10 text-left shadow-premium space-y-8 bg-white/[0.01]">
             <div className="flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 mb-1">Deployment ID</p>
                   <p className="text-lg font-display font-black text-white uppercase tracking-tight">#PS-829104-ALPHA</p>
                </div>
                <div className="p-4 glass border-white/10 rounded-2xl">
                   <Box className="h-6 w-6 text-gray-600" />
                </div>
             </div>
             
             <div className="h-[1px] bg-white/5" />
             
             <div className="space-y-4">
                {cart.map((item: any) => (
                  <div key={item._id} className="flex justify-between items-center group">
                    <span className="text-sm font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{item.name} <span className="text-[10px] text-gray-800 ml-2">x{item.quantity}</span></span>
                    <span className="font-display font-black text-lg text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
             </div>

             <div className="h-[1px] bg-white/5" />

             <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 mb-1">Final Settlement</p>
                  <p className="text-4xl font-display font-black text-white tracking-tighter">₹{total.toLocaleString()}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.3em] shadow-glow-sm">AUTHENTICATED</Badge>
             </div>
          </div>

          <Button 
            className="w-full h-20 rounded-[2.5rem] bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] shadow-glow hover:bg-white/90 transition-all flex items-center justify-center gap-4 group"
            onClick={() => navigate(`/s/${slug}`)}
          >
            Return to Matrix <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <div className="opacity-20 flex items-center justify-center gap-4">
             <Logo showText={true} className="h-4 filter brightness-0 invert" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row selection:bg-white selection:text-black">
      {/* Left Pane - Procurement Form */}
      <div className="flex-1 p-8 lg:p-24 order-2 lg:order-1 flex flex-col items-center">
        <div className="max-w-2xl w-full translate-y-[-20px]">
          {/* Progress Architecture */}
          <div className="flex items-center justify-between mb-20">
            <button 
              onClick={() => step > 1 ? handleBack() : navigate(`/s/${slug}`)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-all group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" /> {step === 1 ? 'Abort Session' : 'Previous Logic'}
            </button>
            <div className="flex items-center gap-3">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-12 bg-white shadow-glow' : step > s ? 'w-4 bg-emerald-500 opacity-50' : 'w-2 bg-white/10'}`} />
              ))}
            </div>
          </div>

          <main className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-1 w-6 bg-cyan-400 shadow-glow" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Section 01</span>
                    </div>
                    <h2 className="text-5xl font-display font-black text-white tracking-tighter uppercase leading-none italic">Identity Layer</h2>
                    <p className="text-gray-500 font-medium mt-4">Initialize customer authorization parameters.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">Full Identity Manifest</Label>
                      <Input 
                        placeholder="ALEX MERCER" 
                        className="h-20 rounded-[1.5rem] glass border-white/5 text-[11px] font-black uppercase tracking-[0.3em] focus:ring-cyan-500/10 placeholder:text-gray-900 transition-all bg-white/[0.01]"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">Communication Uplink</Label>
                        <Input type="email" placeholder="ALEX@MATRIX.ETH" className="h-20 rounded-[1.5rem] glass border-white/5 bg-white/[0.01] text-[11px] font-black uppercase tracking-[0.3em]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">Secure Signal</Label>
                        <Input placeholder="+91 XXX XXX XXXX" className="h-20 rounded-[1.5rem] glass border-white/5 bg-white/[0.01] text-[11px] font-black uppercase tracking-[0.3em]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-20 rounded-[2.5rem] bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-glow flex items-center justify-center gap-4 group mt-10" onClick={handleNext}>
                    Next Protocol <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-1 w-6 bg-indigo-500 shadow-glow" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Section 02</span>
                    </div>
                    <h2 className="text-5xl font-display font-black text-white tracking-tighter uppercase leading-none italic">Logistics Matrix</h2>
                    <p className="text-gray-500 font-medium mt-4">Define geospatial coordinates for material deployment.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">Target Address</Label>
                      <Input placeholder="STREET 101, SECTOR ALPHA" className="h-20 rounded-[1.5rem] glass border-white/5 bg-white/[0.01] text-[11px] font-black uppercase tracking-[0.3em]" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">City Node</Label>
                        <Input placeholder="NEO DELHI" className="h-20 rounded-[1.5rem] glass border-white/5 bg-white/[0.01] text-[11px] font-black uppercase tracking-[0.3em]" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 ml-2">Zone Code</Label>
                        <Input placeholder="110 001" className="h-20 rounded-[1.5rem] glass border-white/5 bg-white/[0.01] text-[11px] font-black uppercase tracking-[0.3em]" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-20 rounded-[2.5rem] bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-glow flex items-center justify-center gap-4 group mt-10" onClick={handleNext}>
                    Proceed to Settlement <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-1 w-6 bg-rose-500 shadow-glow" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-500">Section 03</span>
                    </div>
                    <h2 className="text-5xl font-display font-black text-white tracking-tighter uppercase leading-none italic">Clearance Layer</h2>
                    <p className="text-gray-500 font-medium mt-4">Authorized encrypted transaction pathways.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-8 rounded-[2rem] border-2 border-white bg-white flex items-center justify-between cursor-pointer transition-all shadow-glow">
                      <div className="flex items-center gap-6">
                         <div className="p-4 bg-black rounded-2xl">
                            <CreditCard className="h-6 w-6 text-white" />
                         </div>
                         <div>
                            <p className="font-black text-black text-sm uppercase tracking-widest leading-none mb-1">Universal Payment</p>
                            <p className="text-[10px] text-gray-900 font-bold uppercase tracking-tight opacity-50">CARD / UPI / NET-ARCH</p>
                         </div>
                      </div>
                      <div className="h-6 w-6 rounded-full border-4 border-black" />
                    </div>
                    
                    {/* StarCoin Neural Wallet */}
                    <div className="p-8 rounded-[2rem] border border-orange-500/20 bg-orange-500/[0.02] flex items-center justify-between group cursor-pointer hover:bg-orange-500/[0.05] transition-all relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20" />
                      <div className="flex items-center gap-6">
                         <div className="p-4 bg-orange-500 rounded-2xl shadow-glow">
                            <Coins className="h-6 w-6 text-black" />
                         </div>
                         <div>
                            <p className="font-black text-white text-sm uppercase tracking-widest leading-none mb-2">Neural Wallet</p>
                            <p className="text-[10px] text-orange-400 font-black uppercase tracking-[0.2em]">1,450 TOKENS AVAILABLE</p>
                         </div>
                      </div>
                      <Button variant="ghost" className="rounded-xl border border-orange-500/30 text-orange-500 font-black text-[9px] h-10 px-6 uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all">
                         SYNCHRONIZE
                      </Button>
                    </div>
                  </div>

                  <div className="glass border-white/5 p-8 rounded-[2rem] bg-indigo-500/[0.02] flex items-center gap-6">
                     <div className="h-10 w-10 min-w-[40px] rounded-xl glass border-white/10 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-indigo-400" />
                     </div>
                     <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest leading-loose">
                       Protocols enforced by <span className="text-white">Polestar Security Shield v4.0</span>. End-to-end SHA-256 encryption active.
                     </p>
                  </div>

                  <Button 
                    disabled={isProcessing}
                    className="w-full h-24 rounded-[2.5rem] bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-glow flex items-center justify-center gap-4 group mt-10" 
                    onClick={handleSubmit}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Initializing Clearance...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-6 w-6" /> PAY ₹{total.toLocaleString()}
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Right Pane - Order Manifest */}
      <div className="w-full lg:w-[500px] bg-black border-l border-white/5 p-8 lg:p-24 order-1 lg:order-2">
         <div className="space-y-12 lg:sticky lg:top-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-1 w-4 bg-gray-800" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">Payload Overview</span>
              </div>
              <h3 className="text-3xl font-display font-black text-white tracking-tighter uppercase italic leading-none">Order Manifest</h3>
            </div>

            <div className="space-y-10">
               {cart.map((item: any) => (
                 <div key={item._id} className="flex gap-8 group">
                    <div className="relative">
                      <img src={item.images?.[0]} className="w-24 h-32 rounded-[2rem] object-cover glass border border-white/5 group-hover:scale-105 transition-transform" />
                      <div className="absolute -top-3 -right-3 h-8 w-8 rounded-xl bg-white text-black flex items-center justify-center text-[10px] font-black shadow-glow">
                         {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                       <h4 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2 truncate group-hover:text-cyan-400 transition-colors">{item.name}</h4>
                       <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-4">Category: {item.category || 'Asset'}</p>
                       <p className="font-display font-black text-2xl text-white tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="space-y-4">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-800">
                  <span>Gross Value</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-800">
                  <span>Logistics Protocol</span>
                  <span className="text-emerald-500 flex items-center gap-2"><Truck className="h-3 w-3" /> COMPLIMENTARY</span>
               </div>
               <div className="pt-8 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-800 leading-none block mb-2">Final Settlement</span>
                    <span className="text-5xl font-display font-black text-white tracking-tighter leading-none">₹{total.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            <div className="pt-20 flex items-center justify-center gap-8 opacity-10">
               <Smartphone className="h-6 w-6" />
               <div className="h-6 w-[1px] bg-white" />
               <CreditCard className="h-6 w-6" />
               <div className="h-6 w-[1px] bg-white" />
               <ShieldCheck className="h-6 w-6" />
            </div>
         </div>
      </div>
    </div>
  );
}
