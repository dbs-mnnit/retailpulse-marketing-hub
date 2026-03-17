import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  MoreVertical, 
  ExternalLink,
  ShoppingBag,
  Zap,
  ChevronRight,
  User,
  MapPin
} from 'lucide-react';
import { 
  useGetOrderQueueQuery, 
  useUpdateOrderStatusMutation 
} from '@/app/api/dataApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { data: responseData, isLoading } = useGetOrderQueueQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = responseData?.orders || [];

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success('Order status updated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };
  
  const filteredOrders = orders.filter((o: any) => {
    const matchesSearch = (o.orderNumber?.toLowerCase() || '').includes(search.toLowerCase()) || 
                         (o.customer?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || o.deliveryStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Order Management</h1>
          <p className="text-muted-foreground font-medium">Manage and fulfill multi-channel orders in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search orders, customers..." 
              className="pl-10 h-11 rounded-xl bg-white border-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Analytics Mini-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Fulfill', value: orders.filter((o: any) => o.deliveryStatus === 'pending').length, color: 'text-amber-600', icon: Clock },
          { label: 'Out for Delivery', value: orders.filter((o: any) => o.deliveryStatus === 'shipped').length, color: 'text-blue-600', icon: Truck },
          { label: 'Delivered Today', value: orders.filter((o: any) => o.deliveryStatus === 'delivered').length, color: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Active Pipeline', value: orders.length, color: 'text-indigo-600', icon: Zap }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.color.replace('text', 'bg').replace('600', '50')}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
              filter === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="h-96 flex flex-col items-center justify-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
           <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
           <p className="text-muted-foreground font-medium">Syncing order queue...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order: any) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                  <div className="flex flex-col lg:flex-row lg:items-center">
                    {/* Header Info */}
                    <div className="p-6 lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{order.orderNumber}</p>
                          <Badge variant="outline" className={`mt-1 font-bold text-[10px] uppercase tracking-widest ${getStatusColor(order.deliveryStatus)}`}>
                            {order.deliveryStatus}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs font-medium text-muted-foreground">
                        <p className="flex items-center gap-2 font-bold"><Clock className="h-3 w-3" /> {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
                        <p className="flex items-center gap-2"><CreditCard className="h-3 w-3" /> {order.paymentStatus?.toUpperCase() || 'PENDING'} • ₹{order.totalAmount || 0}</p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="p-6 lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Customer Details</p>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-sm text-gray-900 truncate">{order.customerDetails.name}</p>
                          <p className="text-xs font-medium text-muted-foreground truncate">{order.customerDetails.phone}</p>
                          <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" /> {order.customerDetails.city || 'Shipment Pending'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 p-6 relative">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Order Items</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item: any, idx: number) => (
                           <div key={idx} className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
                              <span className="text-xs font-black text-gray-900">{item.quantity}x</span>
                              <span className="text-xs font-bold text-gray-600 truncate max-w-[120px]">{item.name}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 lg:border-l border-gray-100 flex items-center justify-end gap-3 bg-gray-50/30 lg:bg-transparent">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 hover:bg-white hover:shadow-sm">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                          <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-widest" onClick={() => handleUpdateStatus(order._id, 'pending')}>
                            Move to Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-widest text-blue-600" onClick={() => handleUpdateStatus(order._id, 'shipped')}>
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-widest text-emerald-600" onClick={() => handleUpdateStatus(order._id, 'delivered')}>
                            Mark as Delivered
                          </DropdownMenuItem>
                          <Separator className="my-2" />
                          <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-widest text-rose-600" onClick={() => handleUpdateStatus(order._id, 'cancelled')}>
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button className="rounded-xl h-12 px-6 font-black bg-gray-900 text-white gap-2 flex items-center">
                        Details <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <div className="h-96 flex flex-col items-center justify-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <div className="p-6 rounded-[2rem] bg-gray-100 mb-4">
                <Package className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-gray-900 font-bold text-xl">No orders found</p>
              <p className="text-muted-foreground font-medium">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CreditCard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
