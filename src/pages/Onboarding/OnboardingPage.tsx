import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot, 
  InputOTPSeparator 
} from "@/components/ui/input-otp";
import { 
  Building2, CheckCircle2, Mail, ShieldCheck,
  ArrowRight, ShoppingBag, UtensilsCrossed, Scissors, Heart,
  Dumbbell, GraduationCap, Briefcase, Car, Wrench, Calendar,
  Hotel, MoreHorizontal, MapPin, Phone, Globe,
  Sun, Moon, Laptop
} from 'lucide-react';
import { useCompleteOnboardingStepMutation, useVerifyEmailMutation, useSendVerificationMutation } from '@/app/api/onboardingApi';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

const businessTypes = [
  { id: 'retail', label: 'Retail', icon: ShoppingBag },
  { id: 'food_beverage', label: 'Food & Drink', icon: UtensilsCrossed },
  { id: 'salon_spa', label: 'Beauty & Wellness', icon: Scissors },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'professional_services', label: 'Services', icon: Briefcase },
  { id: 'automotive', label: 'Automotive', icon: Car },
  { id: 'home_services', label: 'Home Services', icon: Wrench },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'hospitality', label: 'Hospitality', icon: Hotel },
  { id: 'other', label: 'Something Else', icon: MoreHorizontal },
];

const containerVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } }
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-8 right-8 z-50 flex items-center gap-1 bg-muted/30 p-1 rounded-full border border-border/50 shadow-soft backdrop-blur-md">
      <button 
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-background text-primary shadow-sm border border-border/10' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button 
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-background text-primary shadow-sm border border-border/10' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Moon className="h-4 w-4" />
      </button>
      <button 
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition-all ${theme === 'system' ? 'bg-background text-primary shadow-sm border border-border/10' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stepParam = searchParams.get('step') || 'VERIFY_EMAIL';
  
  const [otp, setOtp] = useState("");
  const [selectedType, setSelectedType] = useState('');
  const [verifyEmailFn, { isLoading: verifyLoading }] = useVerifyEmailMutation();
  const [sendVerificationFn, { isLoading: sendLoading }] = useSendVerificationMutation();
  const [completeStepFn, { isLoading: stepLoading }] = useCompleteOnboardingStepMutation();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyEmailFn(otp).unwrap();
      toast.success('Identity authorization successful.');
      navigate('/onboarding?step=PROFILE');
    } catch (err) {
      toast.error('The code you entered is invalid.');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData.entries()),
      businessType: selectedType,
    };
    try {
      const result = await completeStepFn({ step: 'PROFILE', data }).unwrap();
      toast.success('Matrix profile calibration complete.');
      const onboardResult = (result as any).data || result;
      if (onboardResult.onboardingStatus === 'PROFILE_COMPLETE') navigate('/onboarding?step=KYC');
      if (onboardResult.onboardingStatus === 'COMPLETED') navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to update business parameters.');
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const result = await completeStepFn({ step: 'KYC', data }).unwrap();
      toast.success('Onboarding complete! Neutral link established.');
      const onboardResult = (result as any).data || result;
      if (onboardResult.onboardingStatus === 'COMPLETED') navigate('/dashboard');
    } catch (err) {
      toast.error('Matrix uplink failed. Retry synchronization.');
    }
  };

  const steps = [
    { id: 'VERIFY_EMAIL', label: 'Verify Identification' },
    { id: 'PROFILE', label: 'Business Profile' },
    { id: 'KYC', label: 'Compliance Index' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === stepParam);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center selection:bg-primary/20 relative overflow-x-hidden font-sans transition-colors duration-500">
      <ThemeToggle />
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-[120px] pointer-events-none opacity-50" />

      <div className="w-full max-w-6xl relative z-10 p-12 lg:p-24 flex flex-col items-center">
        {/* Simple Header */}
        <div className="w-full flex flex-col items-center mb-20 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-16"
          >
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-10" showText={false} />
            </Link>
          </motion.div>
          
          {/* Progress Indicators */}
          <div className="w-full max-w-2xl flex items-center justify-between relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0" />
            
            {steps.map((s, i) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: i <= currentStepIndex ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                    borderColor: i <= currentStepIndex ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                    color: i <= currentStepIndex ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                    scale: i === currentStepIndex ? 1.2 : 1,
                    boxShadow: i === currentStepIndex ? '0 0 20px rgba(var(--primary), 0.3)' : 'none'
                  }}
                  className="h-12 w-12 rounded-2xl border-2 flex items-center justify-center font-black text-sm transition-all duration-700 font-display"
                >
                  {i < currentStepIndex ? <CheckCircle2 className="h-6 w-6 stroke-[3px]" /> : (i + 1)}
                </motion.div>
                <span className={`absolute top-16 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${i <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                   {s.label}
                </span>
              </div>
            ))}
            
            <motion.div 
               className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-5 shadow-glow"
               initial={{ width: "0%" }}
               animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
               transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={stepParam}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-5xl bg-card/30 glass border-border rounded-[3rem] p-10 lg:p-24 shadow-premium relative overflow-hidden transition-all duration-500"
          >
            {stepParam === 'VERIFY_EMAIL' && (
              <div className="flex flex-col items-center">
                <header className="text-center mb-16 space-y-4">
                  <h2 className="text-5xl font-display font-black tracking-tight text-foreground uppercase italic">Verify Identity</h2>
                  <p className="text-muted-foreground font-bold max-w-sm mx-auto text-lg">We've dispatched an authorization code to your secure email matrix.</p>
                </header>
                
                <form onSubmit={handleVerify} className="w-full max-w-sm flex flex-col items-center gap-16">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-4">
                      {[0, 1, 2].map(i => (
                        <InputOTPSlot key={i} index={i} className="h-16 w-14 lg:h-24 lg:w-20 text-3xl font-black border-2 rounded-2xl bg-muted/20 border-border/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-display text-primary" />
                      ))}
                      <InputOTPSeparator className="text-muted-foreground/30" />
                      {[3, 4, 5].map(i => (
                        <InputOTPSlot key={i} index={i} className="h-16 w-14 lg:h-24 lg:w-20 text-3xl font-black border-2 rounded-2xl bg-muted/20 border-border/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-display text-primary" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                  <div className="w-full space-y-8">
                    <Button 
                      type="submit" 
                      disabled={otp.length !== 6 || verifyLoading}
                      className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] shadow-glow hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 text-xs"
                    >
                      {verifyLoading ? 'Authorizing...' : 'Authorize Access'}
                    </Button>
                    <button 
                      type="button" 
                      className="w-full text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group"
                      onClick={() => {
                        sendVerificationFn();
                        toast.info('Verification protocol resent.');
                      }}
                      disabled={sendLoading}
                    >
                      <span className="w-8 h-[1px] bg-muted-foreground/20 group-hover:bg-primary/40 transition-colors" />
                      Resend Protocol Code
                      <span className="w-8 h-[1px] bg-muted-foreground/20 group-hover:bg-primary/40 transition-colors" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {stepParam === 'PROFILE' && (
              <div className="space-y-20">
                <header className="space-y-4">
                  <h2 className="text-5xl font-display font-black tracking-tight text-foreground uppercase italic leading-tight">Business <br/>Calibration</h2>
                  <p className="text-muted-foreground font-bold text-xl max-w-2xl">Classify your organizational sector to synchronize optimal operational presets.</p>
                </header>

                <div className="space-y-16">
                  <div className="space-y-8">
                    <Label className="text-[10px] font-black text-muted-foreground/50 ml-2 uppercase tracking-[0.4em]">Sector Selection</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {businessTypes.map((bt) => (
                        <motion.button
                          key={bt.id}
                          type="button"
                          whileHover={{ y: -8, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedType(bt.id)}
                          className={`relative flex flex-col items-center gap-5 p-8 rounded-[2rem] border-2 transition-all duration-500 overflow-hidden group ${
                            selectedType === bt.id 
                              ? 'border-primary bg-primary/5 shadow-glow-sm' 
                              : 'border-border/40 bg-muted/5 hover:bg-muted/10'
                          }`}
                        >
                          <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                            selectedType === bt.id ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-muted-foreground group-hover:bg-muted/20'
                          }`}>
                            <bt.icon className="h-8 w-8" />
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest leading-tight line-clamp-1 transition-colors duration-500 ${selectedType === bt.id ? 'text-primary' : 'text-muted-foreground'}`}>{bt.label}</span>
                          
                          {selectedType === bt.id && (
                            <motion.div layoutId="onboard-check" className="absolute top-4 right-4 text-primary">
                               <CheckCircle2 className="h-5 w-5 stroke-[3px]" />
                            </motion.div>
                          )}
                          
                          <div className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-700 ${selectedType === bt.id ? 'bg-primary' : 'bg-transparent'}`} />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                   <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-16 border-t border-border/50">
                    <div className="space-y-3 lg:col-span-2">
                       <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Universal Designation</Label>
                       <div className="relative group">
                         <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                         <Input name="name" required placeholder="Organization Identity" className="h-16 pl-14 rounded-2xl bg-muted/20 border-border/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-black uppercase tracking-widest text-xs" />
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Communication Relay</Label>
                       <div className="relative group">
                         <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                         <Input name="phone" type="tel" placeholder="Relay Number" className="h-16 pl-14 rounded-2xl bg-muted/20 border-border/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-black uppercase tracking-widest text-xs" />
                       </div>
                    </div>
 
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Geospatial Sector</Label>
                       <div className="relative group">
                         <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                         <Input name="city" required placeholder="Operations Base" className="h-16 pl-14 rounded-2xl bg-muted/20 border-border/50 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-black uppercase tracking-widest text-xs" />
                       </div>
                    </div>

                    <div className="lg:col-span-2 pt-10">
                      <Button 
                        type="submit" 
                        disabled={stepLoading || !selectedType}
                        className="w-full h-20 rounded-[1.5rem] bg-primary text-primary-foreground font-black uppercase tracking-[0.4em] shadow-glow hover:opacity-95 flex items-center justify-center gap-6 transition-all text-sm group"
                      >
                        {stepLoading ? 'Synchronizing...' : 'Advance Protocol'}
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {stepParam === 'KYC' && (
              <div className="flex flex-col items-center">
                <header className="text-center mb-16 space-y-6">
                  <div className="w-28 h-28 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 shadow-premium relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-700 opacity-50" />
                    <ShieldCheck className="h-14 w-14 text-primary relative z-10" />
                  </div>
                  <h2 className="text-5xl font-display font-black tracking-tight text-foreground uppercase italic">Compliance Protocol</h2>
                  <p className="text-muted-foreground font-bold max-w-lg mx-auto text-xl">Instate your regulatory identifiers to enable full matrix functionality.</p>
                </header>
 
                <form onSubmit={handleKycSubmit} className="w-full max-w-2xl space-y-10">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">National Tax Registry (PAN)</Label>
                       <Input name="pan" required placeholder="ABCDE1234F" className="h-20 rounded-2xl bg-muted/20 border-border/50 focus:bg-background text-center text-3xl font-black tracking-[0.3em] uppercase transition-all font-display text-primary focus:ring-8 focus:ring-primary/5 shadow-glow-sm" />
                    </div>
                    
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">Enterprise Transaction ID (GSTIN)</Label>
                       <Input name="gstin" placeholder="Enterprise ID" className="h-20 rounded-2xl bg-muted/20 border-border/50 focus:bg-background text-center text-3xl font-black tracking-[0.3em] uppercase transition-all font-display text-muted-foreground/50 focus:text-primary focus:ring-8 focus:ring-primary/5 shadow-glow-sm" />
                    </div>
 
                  <div className="pt-16 flex flex-col lg:flex-row gap-8">
                    <Button type="button" variant="ghost" className="lg:flex-1 h-16 rounded-[1.25rem] text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-all" onClick={() => navigate('/dashboard')}>Bypass Configuration</Button>
                    <Button 
                      type="submit" 
                      disabled={stepLoading}
                      className="lg:flex-[2] h-20 rounded-[1.5rem] bg-primary text-primary-foreground font-black uppercase tracking-[0.4em] shadow-glow hover:opacity-95 transition-all text-sm group"
                    >
                      {stepLoading ? 'Establishing Link...' : 'Activate Neural Key'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Brand Footer */}
        <div className="mt-24 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700 group">
          <Logo className="h-6 grayscale group-hover:grayscale-0 transition-all duration-700" showText={false} />
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.5em] text-center">
            &copy; 2026 PoleStar Technologies Inc // Deep Encryption Active
          </p>
        </div>
      </div>
    </div>
  );
}
