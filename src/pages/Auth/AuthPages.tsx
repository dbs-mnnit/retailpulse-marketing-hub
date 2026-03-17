import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams, Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation, useSignupMutation, useGoogleLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } from '@/app/api/authApi';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center gap-1 bg-muted/30 p-1 rounded-full border border-border/50 shadow-soft backdrop-blur-md">
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

function AuthLayout({ children, title, subtitle, footer }: { children: React.ReactNode; title: string; subtitle: string; footer?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-background text-foreground font-sans selection:bg-primary/20 transition-colors duration-500 overflow-x-hidden">
      <ThemeToggle />
      
      {/* Left side: Branded Visuals (Welcoming & Professional) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 xl:p-24 relative overflow-hidden bg-muted/30 border-r">
        {/* Soft Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-10" />
            </Link>
          </motion.div>

          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl xl:text-7xl font-display font-bold leading-tight mb-8 tracking-tight text-foreground"
            >
              The platform to <br/>
              <span className="text-primary italic">grow your business.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg xl:text-xl text-muted-foreground mb-12 leading-relaxed font-bold"
            >
              Join thousands of businesses already using Polestar to streamline their operations, engage customers, and scale globally.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: "Smart POS", desc: "Sell anywhere, anytime." },
                { title: "AI Analytics", desc: "Data insights that matter." },
                { title: "Customer Growth", desc: "Build lasting relationships." },
                { title: "Global Scale", desc: "Grow without boundaries." }
              ].map((item, i) => (
                <div key={item.title} className="p-6 rounded-2xl bg-card border shadow-soft backdrop-blur-md">
                  <h4 className="font-bold text-sm mb-1 text-card-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-xs font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground border-t pt-8">
             <span>v4.0.2 Stable</span>
             <span className="opacity-30">•</span>
             <span>Trusted by 10k+ Merchants</span>
          </div>
        </div>
      </div>

      {/* Right side: Clear & Simple Form */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-8 lg:p-16 xl:p-24 bg-background">
        <div className="w-full max-w-[440px] space-y-12">
          <div className="lg:hidden flex justify-center mb-8">
             <Link to="/" className="hover:opacity-80 transition-opacity">
                <Logo className="h-10" />
             </Link>
          </div>

          <header className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-display font-black tracking-tight text-foreground"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-bold text-lg"
            >
              {subtitle}
            </motion.p>
          </header>

          <div className="w-full space-y-10">
            {children}
            {footer}
          </div>

          <footer className="pt-10 border-t flex items-center justify-between text-[11px] font-medium text-muted-foreground">
             <span>&copy; 2026 Polestar Technologies</span>
             <div className="flex gap-4">
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
             </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
 
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const result = await googleLogin(credentialResponse.credential).unwrap();
      if ((result as any).nextStep) {
        navigate(`/onboarding?step=${(result as any).nextStep}`);
      } else {
        navigate('/dashboard');
      }
      toast.success('Signed in with Google');
    } catch (err) {
      toast.error('Google sign in failed');
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const result = await login(data).unwrap();
      const authData = (result as any).data || result;
      if (authData.nextStep) {
        navigate(`/onboarding?step=${authData.nextStep}`);
      } else {
        navigate('/dashboard');
      }
      toast.success('Welcome back!');
    } catch (err) {
      toast.error((err as any)?.data?.message || 'Invalid email or password');
    }
  };
 
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue."
      footer={
        <p className="text-center text-sm font-medium text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Get started</Link>
        </p>
      }
    >
      <div className="w-full space-y-8">
        <div className="w-full border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm">
           <GoogleLogin
             onSuccess={handleGoogleSuccess}
             onError={() => toast.error('Google login failed')}
             useOneTap
             width="100%"
           />
        </div>
 
        <div className="relative">
          <div className="absolute inset-0 flex items-center px-2"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-background px-4">Or sign in with email</div>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold text-foreground ml-1">Email address</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="name@company.com" 
                className="h-14 pl-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>
 
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <Label htmlFor="password" title="Access Key" className="text-xs font-bold text-foreground">Password</Label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-primary hover:underline">Forgot password?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                id="password" 
                name="password" 
                required 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••••••" 
                className="h-14 pl-12 pr-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background focus:ring-primary/20 transition-all font-medium"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground font-bold">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
 
          <Button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-soft transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
 
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const result = await googleLogin(credentialResponse.credential).unwrap();
      if ((result as any).nextStep) {
        navigate(`/onboarding?step=${(result as any).nextStep}`);
      } else {
        navigate('/dashboard');
      }
      toast.success('Welcome to Polestar!');
    } catch (err) {
      toast.error('Google sign up failed');
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      const result = await signup(data).unwrap();
      const authData = (result as any).data || result;
      if (authData.nextStep) {
        navigate(`/onboarding?step=${authData.nextStep}`);
      } else {
        navigate('/dashboard');
      }
      toast.success('Account created successfully');
    } catch (err) {
      toast.error((err as any)?.data?.message || 'Could not create account');
    }
  };
 
  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Start your 14-day free trial today."
      footer={
        <p className="text-center text-sm font-medium text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      }
    >
      <div className="w-full space-y-8">
        <div className="w-full border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm">
           <GoogleLogin
             onSuccess={handleGoogleSuccess}
             onError={() => toast.error('Google sign up failed')}
             width="100%"
             text="signup_with"
           />
        </div>
 
        <div className="relative">
          <div className="absolute inset-0 flex items-center px-2"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-background px-4">Or sign up with email</div>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold text-foreground ml-1">Full name</Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
              <Input id="name" name="name" required placeholder="John Doe" className="h-14 pl-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" />
            </div>
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold text-foreground ml-1">Email address</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
              <Input id="email" name="email" type="email" required placeholder="name@company.com" className="h-14 pl-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" />
            </div>
          </div>
 
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-foreground ml-1">Code</Label>
              <Input name="countryCode" placeholder="+91" className="h-14 text-center rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" defaultValue="+91" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label className="text-xs font-bold text-foreground ml-1">Phone number</Label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
                <Input id="phone" name="phone" type="tel" required placeholder="00000 00000" className="h-14 pl-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" />
              </div>
            </div>
          </div>
 
          <div className="space-y-2">
            <Label htmlFor="password" title="Access Key" className="text-xs font-bold text-foreground ml-1">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
              <Input 
                id="password" 
                name="password" 
                required 
                type={showPassword ? 'text' : 'password'} 
                placeholder="At least 8 characters" 
                className="h-14 pl-12 pr-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
 
          <div className="pt-4 space-y-6">
            <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-soft transition-all"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            <p className="text-[11px] text-center text-muted-foreground leading-relaxed px-4">
              By creating an account, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    try {
      await forgotPassword({ email }).unwrap();
      setEmailSent(true);
      toast.success('Recovery link sent to your email');
    } catch (err) {
      toast.error((err as any)?.data?.message || 'Failed to send recovery link');
    }
  };

  if (emailSent) {
    return (
      <AuthLayout 
        title="Check your inbox" 
        subtitle="We've sent password reset instructions to your email."
        footer={
          <p className="text-center text-sm font-medium text-muted-foreground">
            Didn't receive it? <button onClick={() => setEmailSent(false)} className="text-primary font-bold hover:underline">Try again</button>
          </p>
        }
      >
        <div className="flex flex-col items-center py-8 space-y-6">
          <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center shadow-inner">
            <Mail className="h-10 w-10 text-primary" />
          </div>
          <Link to="/login" className="w-full pt-4">
            <Button className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground shadow-soft">
              Return to Sign in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot password?" 
      subtitle="No worries, we'll send you reset instructions."
      footer={
        <p className="text-center text-sm font-medium text-muted-foreground">
          Remembered your password? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 pt-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold text-foreground ml-1 text-muted-foreground">Email address</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              id="email"
              name="email"
              type="email" 
              required
              placeholder="name@company.com" 
              className="h-14 pl-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" 
            />
          </div>
        </div>
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-soft transition-all flex items-center justify-center gap-2 group"
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
          {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </form>
    </AuthLayout>
  );
}

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get('password') as string;
    
    try {
      await resetPassword({ token: token!, password }).unwrap();
      toast.success('Password successfully reset');
      navigate('/login');
    } catch (err) {
      toast.error((err as any)?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <AuthLayout 
      title="Set new password" 
      subtitle="Your new password must be different from previous used passwords."
      footer={
        <p className="text-center text-sm font-medium text-muted-foreground">
          Back to <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 pt-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-foreground ml-1">New password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="password" 
              required 
              type={showPassword ? 'text' : 'password'} 
              placeholder="At least 8 characters" 
              className="h-14 pl-12 pr-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-all font-medium" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-soft transition-all flex items-center justify-center gap-2 group"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
          {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </form>
    </AuthLayout>
  );
}
