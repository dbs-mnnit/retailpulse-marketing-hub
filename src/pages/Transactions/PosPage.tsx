import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Coins, 
  Tag, 
  User, 
  ChevronRight,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const products = [
  { id: 1, name: 'Cotton T-Shirt', price: 1200, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Denim Jeans', price: 2500, category: 'Apparel', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Leather Belt', price: 800, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200' },
  { id: 4, name: 'Running Shoes', price: 4500, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
  { id: 5, name: 'Silk Scarf', price: 1500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=200' },
  { id: 6, name: 'Canvas Backpack', price: 3200, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200' },
];

export default function PosPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [starCoinUsed, setStarCoinUsed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} synchronized to cart matrix`);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0;
  const starCoinBenefit = starCoinUsed ? 200 : 0;
  const total = subtotal - discount - starCoinBenefit;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCart([]);
      setStarCoinUsed(false);
      toast.success('Transaction Finalized. Infrastructure Updated.');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-10 pb-10">
      {/* Revolutionary Product Grid */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
          <div className="relative flex-1 max-w-xl group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-700 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <Input 
              placeholder="Query Inventory Matrix..." 
              className="pl-14 h-16 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-[0.3em] focus:ring-primary/20 placeholder:text-gray-800 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyan-400/20 animate-pulse" />
          </div>
          <div className="flex gap-2 p-2 glass border-white/5 rounded-[1.5rem] overflow-x-auto no-scrollbar">
            {['All', 'Apparel', 'Accessories', 'Footwear'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'bg-white text-black shadow-glow' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 pr-6 no-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.filter(p => activeCategory === 'All' || p.category === activeCategory).map(product => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="glass border-white/5 rounded-[2.5rem] p-5 cursor-pointer shadow-premium hover:shadow-glow transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="aspect-square rounded-[2rem] bg-white/[0.01] mb-6 overflow-hidden relative border border-white/5 shadow-inner">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <div className="h-14 w-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-glow transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <Plus className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 w-1 rounded-full bg-cyan-400 shadow-glow" />
                    <p className="font-black text-[9px] uppercase tracking-[0.3em] text-gray-500">{product.category}</p>
                  </div>
                  <p className="font-display font-black text-sm uppercase tracking-tight mb-3 truncate text-white group-hover:text-cyan-400 transition-colors">{product.name}</p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xl font-display font-black tracking-tight text-white">₹{product.price.toLocaleString()}</span>
                    <Badge variant="outline" className="border-white/5 bg-white/[0.02] text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 text-gray-500">OPTIMAL</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* High-Performance Checkout Section */}
      <div className="w-full lg:w-[460px] flex flex-col h-full">
        <div className="glass border-white/5 shadow-premium rounded-[3rem] flex-1 flex flex-col overflow-hidden">
          <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-glow">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-black text-xs uppercase tracking-[0.3em] text-white">Active Matrix</h2>
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Transaction Queue</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-black leading-none">{cart.length}</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">Nodes</span>
            </div>
          </div>

          <ScrollArea className="flex-1 px-10 py-6">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center pt-24 opacity-20">
                  <div className="h-24 w-24 rounded-[2rem] border border-white/10 flex items-center justify-center mb-6">
                    <Smartphone className="h-10 w-10" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Awaiting Input Signal</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-6 group bg-white/[0.02] border border-white/5 p-4 rounded-[1.5rem] hover:bg-white/[0.04] transition-all"
                    >
                      <div className="h-14 w-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/5">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest truncate mb-1">{item.name}</p>
                        <p className="text-xs font-black text-gray-500">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-1.5 border border-white/5">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded-lg transition-colors"><Minus className="h-3 w-3" /></button>
                        <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded-lg transition-colors"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-700 hover:text-rose-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <div className="p-10 bg-white/[0.02] border-t border-white/5 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 rounded-2xl bg-white/[0.03] border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <User className="h-3.5 w-3.5 mr-2 opacity-50" />
                Generic Proxy
              </Button>
              <Button 
                variant={starCoinUsed ? 'default' : 'outline'} 
                onClick={() => setStarCoinUsed(!starCoinUsed)}
                className={`h-12 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  starCoinUsed ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-glow' : 'bg-white/[0.03] border-white/5 text-gray-400'
                }`}
              >
                <Coins className={`h-3.5 w-3.5 mr-2 ${starCoinUsed ? 'text-orange-400 animate-pulse' : 'text-gray-600'}`} />
                Neural Coin {starCoinUsed ? 'Active' : 'Sync'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-700">
                <span>Gross Payload</span>
                <span className="text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <span className="flex items-center gap-2"><Tag className="h-3 w-3" /> Auto Optimization</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              {starCoinUsed && (
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-orange-400">
                  <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> Neural Benefit</span>
                  <span>-₹{starCoinBenefit.toLocaleString()}</span>
                </div>
              )}
              <div className="h-[1px] bg-white/5" />
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">Final Total</span>
                  <span className="text-4xl font-black tracking-tight text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <CreditCard className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </div>

            <Button 
              disabled={cart.length === 0 || isProcessing}
              onClick={handleCheckout}
              className="w-full h-20 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.3em] text-sm shadow-glow hover:bg-cyan-50 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Stabilizing...</span>
                </div>
              ) : (
                <>
                  Execute Transaction
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
