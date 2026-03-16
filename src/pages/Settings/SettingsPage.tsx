import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, Palette, Plug } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and integrations</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted rounded-xl p-1">
          <TabsTrigger value="profile" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="business" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Building2 className="h-4 w-4" /> Business</TabsTrigger>
          <TabsTrigger value="brand" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Palette className="h-4 w-4" /> Brand</TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Plug className="h-4 w-4" /> Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background rounded-2xl p-6 shadow-card space-y-4">
            <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="John Doe" className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 555-000-0000" className="rounded-xl" /></div>
            <Button className="rounded-xl gradient-bg text-primary-foreground">Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="business">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background rounded-2xl p-6 shadow-card space-y-4">
            <div className="space-y-2"><Label>Business Name</Label><Input defaultValue="Acme Retail Co." className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Website</Label><Input defaultValue="https://acmeretail.com" className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Address</Label><Input defaultValue="123 Main St, New York" className="rounded-xl" /></div>
            <Button className="rounded-xl gradient-bg text-primary-foreground">Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="brand">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background rounded-2xl p-6 shadow-card space-y-4">
            <div className="space-y-2"><Label>Brand Color</Label><div className="flex gap-3"><Input defaultValue="#3B82F6" className="rounded-xl flex-1" /><div className="w-11 h-11 rounded-xl bg-primary" /></div></div>
            <div className="space-y-2"><Label>Logo</Label><div className="border-2 border-dashed border-border rounded-xl p-8 text-center"><p className="text-sm text-muted-foreground">Drag & drop or click to upload</p></div></div>
            <Button className="rounded-xl gradient-bg text-primary-foreground">Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="integrations">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {['Email Provider (SendGrid)', 'SMS Provider (Twilio)', 'WhatsApp Business API'].map((name) => (
              <div key={name} className="bg-background rounded-2xl p-5 shadow-card flex items-center justify-between">
                <div><h3 className="font-semibold">{name}</h3><p className="text-sm text-muted-foreground">Not connected</p></div>
                <Button variant="outline" className="rounded-xl">Connect</Button>
              </div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
