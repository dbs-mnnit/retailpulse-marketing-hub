import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  MinusCircle, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'react-router-dom';
import { useChatWithSupportMutation } from '@/app/api/supportApi';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Digital Core established. I am your PoleStar Intelligence Matrix. How can I optimize your ecosystem today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [chatWithSupport] = useChatWithSupportMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithSupport({ 
        message: input, 
        context: { 
          currentPath: location.pathname,
          context: "Merchant Dashboard Assistant"
        }
      }).unwrap();

      const aiText = typeof response === 'string' 
        ? response 
        : response?.reply || response?.data || 'I received your message but had trouble generating a response.';

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       toast.error("Failed to sync with AI Assistant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Revolutionary Floating Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 h-20 w-20 rounded-[2rem] glass border-border shadow-glow flex items-center justify-center z-50 p-4 transition-all duration-500 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Logo showText={false} className="h-full relative z-10" />
        </motion.button>
      )}

      {/* Intelligence Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed bottom-10 right-10 w-[440px] h-[700px] glass border-border shadow-premium rounded-[3rem] flex flex-col z-50 overflow-hidden"
          >
            {/* Immersive Header */}
            <div className="p-8 border-b border-border relative overflow-hidden bg-muted/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground p-2 shadow-glow">
                    <Logo showText={false} className="h-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Neural Matrix</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-glow" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-primary">Core Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted" onClick={() => setIsOpen(false)}>
                    <MinusCircle className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted font-bold" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Matrix Data Stream */}
            <ScrollArea className="flex-1 px-8 py-4 no-scrollbar">
              <div ref={scrollRef} className="space-y-8 pb-8 overflow-y-auto pr-2 no-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[90%] p-6 rounded-[2rem] text-xs font-bold leading-relaxed shadow-premium ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground font-black uppercase tracking-widest' 
                        : 'glass border-border text-foreground bg-muted/30'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass border-border p-6 rounded-[2rem] flex items-center gap-3 bg-muted/20">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-glow" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Synchronizing...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Command Input Area */}
            <div className="p-8 border-t border-border bg-muted/10">
              <div className="relative flex items-center gap-4">
                <div className="flex-1 relative group">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter command or query..."
                    className="rounded-[1.5rem] h-14 pr-14 bg-muted/30 border-border text-xs font-black uppercase tracking-widest focus:ring-primary/20 transition-all placeholder:text-muted-foreground font-sans"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button 
                      size="icon" 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-glow hover:opacity-90 active:scale-95 transition-all outline-none"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 opacity-20 group">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-foreground" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">Deep Intelligence activated</p>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-foreground" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
