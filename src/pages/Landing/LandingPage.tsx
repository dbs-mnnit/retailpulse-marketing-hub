import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, BarChart3, Palette, Mail, MessageSquare, Phone, Check, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-subtle-bg opacity-50" />
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative z-10 text-center px-4 py-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Marketing Automation</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Your retail reach,{' '}
            <span className="gradient-text">amplified by AI</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Launch targeted campaigns across Email, SMS, and WhatsApp. Design stunning creatives with AI. Track everything in real-time.
          </motion.p>
          
          <motion.div variants={fadeInUp} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-bg text-primary-foreground font-semibold text-base px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="font-semibold text-base px-8 h-12 rounded-xl">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { icon: Users, title: 'Customer Management', description: 'Import, segment, and manage your customer database with powerful filtering.' },
  { icon: Palette, title: 'AI Creative Studio', description: 'Generate stunning marketing creatives with AI or choose from 100+ templates.' },
  { icon: Mail, title: 'Multi-Channel Campaigns', description: 'Reach customers via Email, SMS, and WhatsApp from a single platform.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Track opens, clicks, and conversions with detailed campaign analytics.' },
];

function FeaturesSection() {
  return (
    <section className="py-24 bg-surface" id="features">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to grow
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
            One platform to manage customers, create campaigns, and analyze results.
          </motion.p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeInUp} transition={{ duration: 0.5 }} className="group p-6 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  { num: '01', title: 'Upload Customers', desc: 'Import your customer list via CSV or add them manually.' },
  { num: '02', title: 'Design Creative', desc: 'Use AI to generate or pick from premium templates.' },
  { num: '03', title: 'Send Campaigns', desc: 'Launch across Email, SMS, and WhatsApp instantly.' },
  { num: '04', title: 'Track Analytics', desc: 'Monitor opens, clicks, and conversions in real-time.' },
];

function HowItWorksSection() {
  return (
    <section className="py-24" id="how-it-works">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
          <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">How it works</motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">Four simple steps to launch your campaign</motion.p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeInUp} className="text-center relative">
              <div className="text-5xl font-display font-extrabold gradient-text mb-4">{s.num}</div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
              {i < steps.length - 1 && <div className="hidden md:block absolute top-8 -right-4 w-8 border-t-2 border-dashed border-border" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const plans = [
  { name: 'Starter', price: 29, contacts: '1,000', features: ['1,000 contacts', 'Basic analytics', '10 templates', 'Email campaigns', '500 credits/mo'] },
  { name: 'Growth', price: 99, contacts: '10,000', features: ['10,000 contacts', 'Advanced analytics', 'Unlimited templates', 'AI design studio', '5,000 credits/mo', 'SMS & WhatsApp'], popular: true },
  { name: 'Enterprise', price: 299, contacts: 'Unlimited', features: ['Unlimited contacts', 'Custom analytics', 'White-label', 'Dedicated support', '20,000 credits/mo', 'API access', 'Priority support'] },
];

function PricingSection() {
  return (
    <section className="py-24 bg-surface" id="pricing">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
          <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">Start free, scale as you grow</motion.p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={fadeInUp} className={`relative p-8 rounded-2xl bg-background transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'shadow-elevated ring-2 ring-primary' : 'shadow-card'}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className={`w-full rounded-xl h-11 font-semibold ${plan.popular ? 'gradient-bg text-primary-foreground' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                  Get Started
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
  { name: 'Rachel Kim', role: 'Owner, StyleHaus Boutique', text: 'RetailPulse tripled our email open rates. The AI-generated creatives are stunning and our customers love them.' },
  { name: 'Marcus Thompson', role: 'Marketing Director, FreshMart', text: 'We launched our first WhatsApp campaign in under 5 minutes. The ROI has been incredible for our grocery chain.' },
  { name: 'Aisha Patel', role: 'CEO, Luxe Home Decor', text: 'The analytics dashboard gives us insights we never had before. It\'s like having a marketing team built into software.' },
];

function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
          <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Loved by retailers</motion.h2>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp} className="p-6 rounded-2xl bg-surface shadow-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-sm leading-relaxed mb-6 text-muted-foreground">"{t.text}"</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const faqs = [
  { q: 'What channels does RetailPulse support?', a: 'RetailPulse supports Email, SMS, and WhatsApp campaigns. You can reach your customers on the channel they prefer.' },
  { q: 'How do credits work?', a: 'Credits are used to send messages. Email costs 1 credit, SMS costs 2 credits, and WhatsApp costs 3 credits. You can purchase credit packs or get monthly credits with your subscription.' },
  { q: 'Can I import my existing customer list?', a: 'Yes! You can import customers via CSV upload or add them individually. We support bulk imports with automatic duplicate detection.' },
  { q: 'Is there a free trial?', a: 'Yes, all new accounts start with a 14-day free trial of the Growth plan, including 500 free credits.' },
];

function FAQSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="container px-4 max-w-3xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">
          Frequently asked questions
        </motion.h2>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
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
    <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-background overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium">{question}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display font-bold text-xl">
          <span className="gradient-text">Retail</span>Pulse
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="font-medium">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-bg text-primary-foreground font-medium rounded-lg">Start Free Trial</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-lg">
            <span className="gradient-text">Retail</span>Pulse
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 RetailPulse. All rights reserved.</p>
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
