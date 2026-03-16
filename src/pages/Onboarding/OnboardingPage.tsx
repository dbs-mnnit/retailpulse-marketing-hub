import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Upload } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-lg bg-background rounded-2xl shadow-elevated p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Set up your business</h1>
            <p className="text-sm text-muted-foreground">Step {step} of 2</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'gradient-bg' : 'bg-muted'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'gradient-bg' : 'bg-muted'}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input placeholder="Acme Retail Co." className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="fashion">
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="food">Food & Grocery</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Decor</SelectItem>
                    <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Business Email</Label>
                <Input type="email" placeholder="hello@acmeretail.com" className="h-11 rounded-xl" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Business Phone</Label>
                <Input placeholder="+1 555-000-0000" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="123 Main St, City" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Website (optional)</Label>
                <Input placeholder="https://acmeretail.com" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Logo (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
            </>
          )}
          <div className="flex gap-3 pt-2">
            {step > 1 && <Button type="button" variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setStep(1)}>Back</Button>}
            <Button type="submit" className="flex-1 h-11 rounded-xl gradient-bg text-primary-foreground font-semibold">
              {step === 2 ? 'Launch Dashboard' : 'Continue'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
