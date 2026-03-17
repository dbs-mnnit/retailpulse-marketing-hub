import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  ArrowRight,
  Star,
  Instagram,
  Facebook,
  Phone
} from 'lucide-react';
import { useGetStorefrontQuery, useGetStorefrontProductsQuery } from '@/app/api/storefrontApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';

export default function StorefrontPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: storefront, isLoading: storeLoading } = useGetStorefrontQuery(slug || '', { skip: !slug });
  const { data: products, isLoading: productsLoading } = useGetStorefrontProductsQuery(slug || '', { skip: !slug });
  
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Inject Merchant Branding
  useEffect(() => {
    if (storefront?.branding) {
      document.documentElement.style.setProperty('--merchant-primary', storefront.branding.primaryColor || '#4F46E5');
      document.documentElement.style.setProperty('--merchant-secondary', storefront.branding.secondaryColor || '#818CF8');
    }
  }, [storefront]);

  if (storeLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin shadow-glow" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Initializing Merchant Storefront</p>
        </div>
      </div>
    );
  }

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} Added to Bag`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-foreground">
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-2xl border-b border-border px-8 py-5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {storefront?.branding?.logoUrl ? (
              <img src={storefront.branding.logoUrl} alt={storefront.businessId.name} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-2xl font-display font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--merchant-primary)' }}>{storefront?.businessId?.name}</span>
            )}
            <div className="h-4 w-[1px] bg-border mx-2" />
            <Badge variant="outline" className="border-border text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-muted/30 px-3">Official Merchant</Badge>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-10 mr-10">
              {['COLLECTIONS', 'NEW ARRIVALS', 'ABOUT', 'JOURNAL'].map(item => (
                <button key={item} className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all hover:translate-y-[-1px]">{item}</button>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group h-12 w-12 rounded-2xl glass border-border transition-all hover:bg-muted"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[9px] font-black flex items-center justify-center shadow-glow">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {storefront?.branding?.bannerUrl ? (
            <>
              <img src={storefront.branding.bannerUrl} alt="Banner" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-primary/[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(var(--primary), 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-border" />
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground">Premium Retail Layer</span>
               <div className="h-[1px] w-12 bg-border" />
            </div>
            <h1 className="text-7xl md:text-9xl font-display font-black mb-8 tracking-[-0.04em] uppercase text-foreground leading-[0.85] italic">
              {storefront?.businessId?.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-bold leading-relaxed mb-12">
              {storefront?.seo?.description || 'Curating high-performance assets for the modern digital landscape. Powered by Polestar Infrastructure.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button className="h-16 px-12 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.4em] text-[10px] shadow-glow hover:opacity-90 active:scale-95 transition-all">
                Explore Universe
              </Button>
              <Button variant="ghost" className="h-16 px-12 rounded-2xl glass border-border text-foreground font-black uppercase tracking-[0.4em] text-[10px] hover:bg-muted transition-all flex items-center gap-4 group">
                Watch Film <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Matrix */}
      <main className="max-w-[1440px] mx-auto px-8 pb-40">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-2 w-2 rounded-full bg-primary shadow-glow" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Inventory Sync</span>
            </div>
            <h2 className="text-5xl font-display font-black text-foreground tracking-tighter uppercase leading-none mb-6">Matrix Catalog</h2>
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-2 px-4 py-2 glass border-border rounded-xl text-primary bg-primary/10 shadow-glow-sm">
                 <Star className="h-4 w-4 fill-primary" />
                 <span className="text-[10px] font-black tracking-widest uppercase">4.9 TOP RATED</span>
               </div>
               <div className="h-10 w-[1px] bg-border hidden sm:block" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                 {products?.length || 0} ASSETS DEPLOYED
               </p>
            </div>
          </div>
          
          <div className="relative w-full xl:w-[460px] group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input 
              placeholder="Query Inventory Matrix..." 
              className="pl-16 h-20 rounded-[1.5rem] glass border-border text-[11px] font-black uppercase tracking-[0.3em] focus:ring-primary/10 placeholder:text-muted-foreground transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {products?.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product: any) => (
            <motion.div 
              key={product._id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-[3rem] bg-muted/30 mb-8 overflow-hidden relative border border-border shadow-premium hover:shadow-glow transition-all duration-700">
                <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275339647-6b7991b19839?auto=format&fit=crop&q=80&w=400'} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" alt={product.name} />
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button 
                    onClick={() => addToCart(product)}
                    className="h-20 w-20 rounded-[2.5rem] bg-primary text-primary-foreground flex items-center justify-center shadow-glow transform translate-y-12 group-hover:translate-y-0 transition-all duration-500 active:scale-90"
                  >
                    <Plus className="h-8 w-8" />
                  </button>
                </div>
                <div className="absolute top-8 left-8">
                  <Badge className="bg-background/60 backdrop-blur-md text-foreground border-border px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] shadow-lg">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <div className="px-4">
                <h3 className="font-display font-black text-xl text-foreground uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Price Unit</span>
                    <span className="text-3xl font-display font-black text-foreground tracking-tighter">₹{product.price.toLocaleString()}</span>
                  </div>
                  {product.stock <= 5 && (
                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-glow-sm">
                      <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em]">{product.stock} LIMITED</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Cart Navigation Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-xl z-[60]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-background z-[70] shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-12 border-b border-border flex items-center justify-between bg-muted/30">
                <div>
                  <h2 className="text-3xl font-display font-black text-foreground tracking-tighter uppercase leading-none">Procurement Bag</h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] mt-3">Active Data Sync</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="rounded-2xl glass border-border h-14 w-14 hover:bg-muted group">
                  <X className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-12">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <div className="h-32 w-32 rounded-[3.5rem] border border-border flex items-center justify-center mb-10 shadow-inner">
                      <ShoppingBag className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-muted-foreground">Payload Null</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {cart.map(item => (
                      <div key={item._id} className="flex gap-8 group">
                        <div className="h-32 w-24 rounded-3xl overflow-hidden glass border-border relative group-hover:scale-110 transition-transform shadow-premium">
                           <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275339647-6b7991b19839?auto=format&fit=crop&q=80&w=100'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-black text-xl text-foreground uppercase tracking-tight mb-1 truncate">{item.name}</h4>
                          <p className="text-2xl font-display font-black text-primary mb-6 tracking-tighter">₹{item.price.toLocaleString()}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 glass border-border rounded-2xl p-2 w-fit">
                              <button onClick={() => updateQuantity(item._id, -1)} className="h-10 w-10 flex items-center justify-center hover:bg-muted rounded-xl transition-colors"><Minus className="h-4 w-4" /></button>
                              <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item._id, 1)} className="h-10 w-10 flex items-center justify-center hover:bg-muted rounded-xl transition-colors"><Plus className="h-4 w-4" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-[10px] font-black text-muted-foreground hover:text-rose-500 uppercase tracking-widest underline underline-offset-8 decoration-border hover:decoration-rose-500 transition-all">DISCARD</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="p-12 bg-muted/10 border-t border-border space-y-10">
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Baseline Total</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Deployment Protocol</span>
                    <span className="text-primary">ENCRYPTION PENDING</span>
                  </div>
                  <div className="h-[1px] bg-border" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground mb-2">Authenticated Total</span>
                       <span className="text-5xl font-display font-black text-foreground tracking-tighter leading-none">₹{subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  disabled={cart.length === 0}
                  onClick={() => navigate(`/s/${slug}/checkout`, { state: { cart } })}
                  className="w-full h-24 rounded-[2.5rem] bg-primary text-primary-foreground font-black uppercase tracking-[0.5em] text-[11px] shadow-glow hover:opacity-90 transition-all flex items-center justify-center gap-4 group"
                >
                  Authorize Checkout <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Style Injection */}
      <style>{`
        .gradient-merchant {
          background: linear-gradient(135deg, var(--merchant-primary), var(--merchant-secondary));
        }
        :root {
          --merchant-primary: #4F46E5;
          --merchant-secondary: #818CF8;
        }
      `}</style>

      {/* Architectural Footer */}
      <footer className="bg-background border-t border-border py-40 px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="space-y-10 col-span-1 md:col-span-2">
             <h3 className="text-4xl font-display font-black tracking-tighter uppercase" style={{ color: 'var(--merchant-primary)' }}>{storefront?.businessId?.name}</h3>
             <p className="text-muted-foreground font-bold text-xl leading-relaxed max-w-lg">{storefront?.seo?.description || 'Architecting premium retail experiences for the decentralized commerce era. Powered by Polestar Infrastructure.'}</p>
             <div className="flex gap-6">
                {[[Instagram, 'INSTA'], [Facebook, 'FB'], [Phone, 'UPLINK']].map(([Icon, label]: any) => (
                  <Button key={label} variant="outline" className="h-16 px-8 rounded-2xl glass border-border text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground hover:bg-muted gap-3">
                    <Icon className="h-4 w-4" /> {label}
                  </Button>
                ))}
             </div>
          </div>
          
          <div className="space-y-10">
             <h4 className="text-[11px] font-black text-foreground uppercase tracking-[0.5em]">Protocol</h4>
             <ul className="space-y-5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-[1px] bg-border" /> Logistics Deployment</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-[1px] bg-border" /> Return Infrastructure</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-[1px] bg-border" /> Security Manifest</li>
                <li className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-[1px] bg-border" /> Data Sovereignty</li>
             </ul>
          </div>

          <div className="space-y-10">
             <h4 className="text-[11px] font-black text-foreground uppercase tracking-[0.5em]">Command Core</h4>
             <div className="glass border-border p-10 rounded-[2.5rem] shadow-premium bg-muted/10">
                <p className="text-muted-foreground mb-2 text-[10px] font-black uppercase tracking-widest">Inquiry Uplink</p>
                <p className="text-foreground font-display font-black text-xl lowercase truncate">support@{slug || 'merchant'}.eth</p>
                <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-glow animate-pulse" />
                   <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Systems Nominal</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto mt-40 pt-16 border-t border-border flex flex-col lg:flex-row items-center justify-between gap-12">
           <div className="flex items-center gap-6 group cursor-pointer opacity-40 hover:opacity-100 transition-all">
              <Logo showText={true} className="h-6" />
              <div className="h-6 w-[1px] bg-border" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground">Infrastructure v4.0.2</span>
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">Deep Obsidian Engine</span>
              </div>
           </div>
           
           <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {['Terms', 'Privacy', 'Security', 'Compliance'].map(item => (
                <span key={item} className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary cursor-pointer transition-colors">{item}</span>
              ))}
           </div>
           
           <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.5em] text-center lg:text-right">
             © 2026 POLESTAR ARCHITECTURES. ALL DATA ENCRYPTED.
           </p>
        </div>
      </footer>
    </div>
  );
}
