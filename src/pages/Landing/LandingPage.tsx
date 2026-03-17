import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Zap, Users, BarChart3, Palette, ShoppingBag, Coins, 
  Shield, Calendar, Package, Brain, Check, ChevronDown, Star, 
  Smartphone, Globe, TrendingUp, Layers 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating 3D Elements (SVG Particles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
            animate={{ 
              y: [null, '-20px', '20px', '0px'],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-left">
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 backdrop-blur-md px-4 py-1.5 mb-8 shadow-premium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Next-Gen Business Intelligence</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp} 
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-foreground leading-[0.9] perspective-1000"
            >
              The <span className="text-glow">Operating</span><br/>
              Core for <span className="gradient-text">Growth</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed font-bold"
            >
              PoleStar unifies POS, E-commerce, AI Intelligence, and Fintech into a single, high-performance ecosystem. Built for the modern merchant.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="gradient-bg text-primary-foreground border-none font-black text-sm px-10 h-14 rounded-2xl shadow-glow hover:scale-[1.05] active:scale-95 transition-all gap-2">
                  Launch Platform <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="font-bold text-sm px-10 h-14 rounded-2xl border-border bg-muted/30 text-foreground hover:bg-muted/50 backdrop-blur-md transition-all">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Dashboard Preview Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block perspective-1000"
          >
            <div className="relative z-10 glass rounded-[2.5rem] p-4 border border-border shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                 alt="Dashboard Overview" 
                 className="rounded-[2rem] w-full h-auto shadow-2xl brightness-90 grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" 
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100">
                  <Brain className="h-10 w-10 text-cyan-400 animate-pulse" />
               </div>
            </div>
            {/* Floating Orbs behind preview */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-[60px] animate-float" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/30 rounded-full blur-[60px] animate-float" style={{ animationDelay: '1.5s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: ShoppingBag, title: 'Immersive POS', description: 'Mobile-first point-of-sale with one-tap checkout, auto-discounts, and StarCoin integration.', color: 'from-blue-500/80 to-indigo-600/80' },
  { icon: Globe, title: 'Branded Storefront', description: 'Launch a custom online store in minutes. Slug-based URLs with your branding and checkout.', color: 'from-violet-500/80 to-purple-600/80' },
  { icon: Brain, title: 'AI Intelligence', description: 'Margin copilot, demand forecasting, and smart inventory suggestions powered by ML.', color: 'from-rose-500/80 to-pink-600/80' },
  { icon: Coins, title: 'StarCoin Network', description: 'Cross-merchant loyalty currency. Customers earn and redeem across the Polestar ecosystem.', color: 'from-orange-500/80 to-amber-600/80' },
  { icon: Calendar, title: 'Service Bookings', description: 'Appointment slots, job cards, and automated reminders for service-based businesses.', color: 'from-teal-500/80 to-emerald-600/80' },
  { icon: BarChart3, title: 'Finance & Receivables', description: 'GST filing prep, aging analysis, and cash flow intelligence for enterprise-grade operations.', color: 'from-sky-500/80 to-blue-600/80' },
];

function FeaturesSection() {
  return (
    <section className="py-28 bg-background" id="features">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-20">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 mb-6">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Platform</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-5">
            Six pillars of{' '}
            <span className="gradient-text">business excellence</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed for Indian MSMEs. From walk-in sales to digital commerce, Polestar covers your entire operational universe.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div 
              key={f.title} 
              variants={fadeInUp} 
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="group p-8 rounded-[2.5rem] glass hover:bg-muted/10 transition-all duration-500 border border-border relative overflow-hidden perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-lg glow-sm transition-all duration-500 group-hover:glow-accent-sm`}>
                  <f.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display font-black text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  { num: '01', title: 'Create Your Business', desc: 'Enterprise-grade onboarding with KYC, GST verification, and instant storefront setup.' },
  { num: '02', title: 'Add Products & Services', desc: 'Catalog management with variants, pricing rules, and intelligent stock tracking.' },
  { num: '03', title: 'Start Selling Everywhere', desc: 'Walk-in POS, online storefront, and booking calendar — all from one dashboard.' },
  { num: '04', title: 'Grow with Intelligence', desc: 'AI insights, StarCoin rewards, and campaign automation to scale your business.' },
];

function HowItWorksSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-muted/5" />
      <div className="container relative z-10 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
          <motion.h2 variants={fadeInUp} className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-6 text-foreground">
            Scale in <span className="gradient-text">record time</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto font-bold">From setup to your first AI-powered sale in under 10 minutes.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeInUp} className="group text-center relative">
              <div className="relative mb-8 inline-block">
                <div className="text-7xl font-display font-black text-foreground/5 group-hover:text-primary/10 transition-colors duration-500 absolute -top-10 left-1/2 -translate-x-1/2 select-none">{s.num}</div>
                <div className="relative z-10 w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto shadow-glow rotate-3 group-hover:rotate-12 transition-transform duration-500">
                   <div className="text-primary-foreground font-black text-xl">{i + 1}</div>
                </div>
              </div>
              <h3 className="font-display font-bold text-xl mb-4 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-bold px-4">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 w-12 border-t border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const plans = [
  { name: 'Starter', price: '₹999', period: '/mo', contacts: 'Up to 500 products', features: ['POS + Storefront', 'Basic Analytics', '500 StarCoins/mo', 'Email Support', '1 Staff Login'] },
  { name: 'Growth', price: '₹2,999', period: '/mo', contacts: 'Unlimited products', features: ['Everything in Starter', 'AI Intelligence Hub', '5,000 StarCoins/mo', 'Service Bookings', 'Priority Support', '5 Staff Logins'], popular: true },
  { name: 'Enterprise', price: '₹7,999', period: '/mo', contacts: 'Multi-location', features: ['Everything in Growth', 'Unlimited StarCoins', 'White-label Storefront', 'Custom API Access', 'Dedicated Success Manager', '∞ Staff Logins', 'SOC 2 Compliance'] },
];

function PricingSection() {
  return (
    <section className="py-32 bg-background relative" id="pricing">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
          <motion.h2 variants={fadeInUp} className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-6 text-foreground">
            Transparent <span className="gradient-text">Investment</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg font-bold">Predictable pricing for exponential growth.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div 
              key={plan.name} 
              variants={fadeInUp} 
              whileHover={{ y: -10 }}
              className={`relative p-10 rounded-[2.5rem] transition-all duration-500 ${plan.popular ? 'glass border-primary/30 shadow-glow' : 'glass border-border shadow-premium'}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg border border-border/20">
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-black text-2xl mb-2 text-foreground">{plan.name}</h3>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-6">{plan.contacts}</p>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted-foreground font-bold text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-12">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className={`w-full rounded-2xl h-14 font-black transition-all ${plan.popular ? 'gradient-bg text-primary-foreground shadow-glow' : 'bg-muted/30 border-border text-foreground hover:bg-muted/50'}`} variant={plan.popular ? 'default' : 'outline'}>
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Owner, Sharma Electronics', text: 'Polestar replaced three separate tools we were using. POS, inventory, and our online store — all in one beautiful interface.' },
  { name: 'Priya Mehta', role: 'Founder, GlowUp Salon', text: 'The service booking system with job cards and automated WhatsApp reminders reduced our no-shows by 40%.' },
  { name: 'Vikram Patel', role: 'MD, FreshMart Chain', text: 'StarCoin has been a game-changer. Our customers love earning coins at one store and redeeming at another. Retention is up 35%.' },
  { name: 'Aisha Khan', role: 'CEO, Urban Thread', text: 'We launched our branded storefront in 10 minutes. The checkout flow is so smooth our conversion rate jumped to 4.8%.' },
  { name: 'Deepak Joshi', role: 'Partner, JK Auto Workshop', text: 'The AI margin copilot found 45,000 rupees in monthly leakage we were not aware of. This platform pays for itself.' },
];

function TestimonialsSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="container relative z-10 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
          <motion.h2 variants={fadeInUp} className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-6 text-foreground leading-tight">
            The standard for <br/><span className="gradient-text">modern merchants</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp} className="p-10 rounded-[2.5rem] glass border-border shadow-premium hover:bg-muted/10 transition-all duration-500">
              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-muted-foreground text-base leading-relaxed mb-10 font-bold italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-black text-primary-foreground text-sm shadow-glow">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-black text-foreground text-sm">{t.name}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/70">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const faqs = [
  { q: 'What is Polestar?', a: 'Polestar is a 360° operating platform for MSMEs. It combines POS, online storefronts, inventory management, AI analytics, service bookings, and loyalty programs into one unified system.' },
  { q: 'How does StarCoin work?', a: 'StarCoin is an interoperable loyalty currency. Customers earn coins when they shop at any Polestar merchant, and can redeem them across the entire network — driving cross-merchant engagement.' },
  { q: 'Can I sell online and offline?', a: 'Yes! Polestar gives you a branded storefront (/s/your-slug) for online orders, and a mobile-first POS for walk-in customers. Both channels share the same inventory and customer base.' },
  { q: 'Is there a free trial?', a: 'Absolutely. All new merchants get a 14-day free trial of the Growth plan with full access to AI features, POS, and storefront capabilities.' },
];

function FAQSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container px-4 max-w-4xl relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl sm:text-5xl font-black tracking-tight text-center mb-20 text-foreground leading-tight">
          Everything you <br/><span className="gradient-text">need to know</span>
        </motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div variants={fadeInUp} className="rounded-3xl border border-border glass overflow-hidden shadow-premium">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-muted/30 group">
        <span className="font-display font-black text-foreground text-lg group-hover:text-primary transition-colors">{question}</span>
        <div className={`p-2 rounded-xl bg-muted/30 border border-border transition-transform duration-500 ${open ? 'rotate-180 bg-primary/10' : ''}`}>
          <ChevronDown className={`h-5 w-5 text-muted-foreground ${open ? 'text-primary' : ''}`} />
        </div>
      </button>
      <motion.div 
        initial={false} 
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} 
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 pt-2">
          <p className="text-gray-400 font-medium leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-6xl glass rounded-2xl border-border h-16 px-6 flex items-center justify-between shadow-premium backdrop-blur-2xl"
      >
        <Link to="/" className="hover:scale-105 transition-transform">
          <Logo className="h-8" />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">OS Core</a>
          <a href="#pricing" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-bg text-primary-foreground font-black text-xs rounded-xl px-6 h-10 border-none shadow-glow hover:scale-[1.05] transition-all">Get Started</Button>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container relative z-10 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-sm">
            <Logo className="h-9 justify-center lg:justify-start" />
            <p className="text-muted-foreground text-sm font-bold leading-relaxed">
              The high-performance operating system for modern business. Built with intelligence to scale your vision.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
            <div className="space-y-4">
              <h4 className="text-foreground font-black text-xs uppercase tracking-[0.2em]">Platform</h4>
              <ul className="space-y-3">
                {['Features', 'POS', 'Storefront', 'AI Intelligence'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-foreground font-black text-xs uppercase tracking-[0.2em]">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Community', 'Support'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-foreground font-black text-xs uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Privacy Policy', 'Terms of Service', 'Brand Assets'].map(item => (
                  <li key={item}><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">© 2026 PoleStar Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-black uppercase tracking-widest">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
