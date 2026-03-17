import React from 'react';
import { motion } from 'framer-motion';
import {
  Package, Truck, Star, AlertTriangle, Plus, Search, Send,
  ArrowUpRight, Clock, CheckCircle2, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const vendors = [
  { id: 1, name: 'Shree Textiles', category: 'Fabrics', rating: 4.8, leadTime: '3 days', orders: 24, phone: '+91 98111 22233' },
  { id: 2, name: 'Agro Fresh Supplies', category: 'Raw Materials', rating: 4.5, leadTime: '2 days', orders: 42, phone: '+91 87222 33344' },
  { id: 3, name: 'Metro Packaging', category: 'Packaging', rating: 4.2, leadTime: '5 days', orders: 18, phone: '+91 76333 44455' },
  { id: 4, name: 'Bharat Electronics', category: 'Electronics', rating: 4.9, leadTime: '7 days', orders: 8, phone: '+91 65444 55566' },
];

const purchaseOrders = [
  { id: 'PO-2025-041', vendor: 'Shree Textiles', items: 5, total: '₹28,500', status: 'draft', date: '2025-03-15' },
  { id: 'PO-2025-040', vendor: 'Agro Fresh Supplies', items: 12, total: '₹15,200', status: 'sent', date: '2025-03-14' },
  { id: 'PO-2025-039', vendor: 'Metro Packaging', items: 3, total: '₹8,900', status: 'received', date: '2025-03-10' },
  { id: 'PO-2025-038', vendor: 'Bharat Electronics', items: 2, total: '₹1,45,000', status: 'sent', date: '2025-03-08' },
];

const lowStockAlerts = [
  { product: 'Cotton Roll - White', current: 5, reorder: 20, vendor: 'Shree Textiles' },
  { product: 'Bubble Wrap 12"', current: 2, reorder: 15, vendor: 'Metro Packaging' },
  { product: 'Organic Flour 10kg', current: 8, reorder: 25, vendor: 'Agro Fresh Supplies' },
];

const statusColor: Record<string, string> = {
  draft: 'bg-slate-500/10 text-slate-600',
  sent: 'bg-blue-500/10 text-blue-600',
  received: 'bg-green-500/10 text-green-600',
  cancelled: 'bg-red-500/10 text-red-500',
};

export default function ProcurementPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Procurement Hub</h1>
          <p className="text-muted-foreground mt-1 text-base">Manage vendors, purchase orders, and supply chain.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2"><Truck className="h-4 w-4" /> Check Rates</Button>
          <Button className="rounded-xl gradient-bg text-primary-foreground gap-2"><Plus className="h-4 w-4" /> Create PO</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Vendors</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{vendors.length}</div><p className="text-xs text-muted-foreground mt-1">Avg rating: 4.6★</p></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Open POs</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{purchaseOrders.filter(p => p.status !== 'received').length}</div><p className="text-xs text-muted-foreground mt-1">₹1,89,700 pending</p></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-amber-600">{lowStockAlerts.length}</div><p className="text-xs text-amber-600 mt-1">Need reorder</p></CardContent>
        </Card>
        <Card className="bg-background border-border shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Lead Time</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">4.2 days</div><p className="text-xs text-green-600 mt-1">↓ 0.8 days faster</p></CardContent>
        </Card>
      </div>

      {lowStockAlerts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl p-6 border border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold">AI Reorder Suggestions</h3>
            <Button size="sm" className="ml-auto rounded-xl gradient-bg text-primary-foreground gap-1 text-xs"><Send className="h-3 w-3" /> Auto-Generate POs</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lowStockAlerts.map((alert, i) => (
              <div key={i} className="p-4 rounded-2xl bg-background border border-border">
                <p className="font-bold text-sm">{alert.product}</p>
                <p className="text-xs text-muted-foreground mt-1">Stock: <span className="text-red-500 font-bold">{alert.current}</span> / {alert.reorder}</p>
                <p className="text-xs text-muted-foreground">Vendor: {alert.vendor}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Purchase Orders</h3>
          </div>
          <div className="divide-y divide-border">
            {purchaseOrders.map((po) => (
              <div key={po.id} className="p-4 hover:bg-muted/20 transition-colors flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">{po.id}</p>
                  <p className="text-xs text-muted-foreground">{po.vendor} · {po.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{po.total}</p>
                  <Badge className={`rounded-lg text-xs mt-1 ${statusColor[po.status]}`}>{po.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background rounded-3xl border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2"><Package className="h-5 w-5 text-violet-500" /> Vendor Directory</h3>
            <Button variant="outline" size="sm" className="rounded-lg gap-2"><Plus className="h-3 w-3" /> Add</Button>
          </div>
          <div className="divide-y divide-border">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="p-4 hover:bg-muted/20 transition-colors flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">{vendor.name}</p>
                  <p className="text-xs text-muted-foreground">{vendor.category} · {vendor.orders} orders</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold">{vendor.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5"><Clock className="h-3 w-3 inline" /> {vendor.leadTime}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
