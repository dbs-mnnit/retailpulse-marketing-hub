import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Scissors,
  Wrench,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const bookings = [
  { id: 1, customer: "Aarav Sharma", service: "Full Service", time: "10:00 AM", status: "confirmed", staff: "Rahul" },
  { id: 2, customer: "Ishani Gupta", service: "Oil Change", time: "11:30 AM", status: "requested", staff: "Amit" },
  { id: 3, customer: "Vikram Singh", service: "Brake Diagnostic", time: "02:00 PM", status: "confirmed", staff: "Rahul" },
  { id: 4, customer: "Maya Patel", service: "Tyre Rotation", time: "04:30 PM", status: "in_progress", staff: "Deepak" },
];

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Scheduling Layer</span>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase text-white">Capacity Center</h1>
          <p className="text-gray-500 font-medium mt-1">Operational throughput and appointment orchestration matrix.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-xs shadow-glow transition-all flex items-center gap-3 hover:bg-cyan-50">
          <Plus className="h-4 w-4" /> Initialize Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Calendar & Stats Sidebar */}
        <div className="space-y-8">
          <div className="glass border-white/5 rounded-[2.5rem] p-8 shadow-premium bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">March 2024</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl glass border-white/5 hover:bg-white/10"><ChevronLeft className="h-4 w-4 text-gray-500" /></Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl glass border-white/5 hover:bg-white/10"><ChevronRight className="h-4 w-4 text-gray-500" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[8px] font-black text-gray-700 mb-4 uppercase tracking-widest">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "h-10 w-10 rounded-xl text-[10px] font-black transition-all mb-1 uppercase tracking-tighter",
                    i + 1 === 16 ? "bg-white text-black shadow-glow" : "text-gray-500 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="glass border-white/5 rounded-[2.5rem] p-8 shadow-premium bg-white/[0.01] space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Node Availability</h3>
            <div className="space-y-6">
              <StaffStatus name="Rahul V." role="Technician" status="available" />
              <StaffStatus name="Amit K." role="Mechanic" status="busy" />
              <StaffStatus name="Deepak S." role="Electrical" status="available" />
            </div>
          </div>
        </div>

        {/* Bookings Timeline */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex p-1.5 glass border-white/5 rounded-[1.5rem] w-fit">
            {['ListView', 'CalendarView', 'StaffView'].map(view => (
              <button
                key={view}
                className={cn(
                  "px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] transition-all",
                  view === 'ListView' ? "bg-white text-black shadow-glow" : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                {view.replace('View', ' View')}
              </button>
            ))}
          </div>

          <div className="space-y-6 pb-20">
            {bookings.map((booking) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass border-white/5 rounded-[3rem] p-8 shadow-premium hover:bg-white/[0.01] transition-all flex flex-col xl:flex-row items-center justify-between gap-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400/20 group-hover:bg-cyan-400 transition-all shadow-glow" />
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <div className="w-20 h-20 rounded-[2rem] glass border-white/10 bg-white/5 flex flex-col items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{booking.time.split(' ')[1]}</p>
                    <p className="text-2xl font-display font-black text-white">{booking.time.split(' ')[0]}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h4 className="font-display font-black text-xl uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">{booking.customer}</h4>
                      <Badge className={cn(
                        "rounded-lg px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] border-none shadow-glow-sm",
                        booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                        booking.status === 'in_progress' ? 'bg-indigo-500/10 text-indigo-400' :
                        'bg-amber-500/10 text-amber-400'
                      )}>
                        {booking.status.replace('_', ' ')} PROTOCOL
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-600">
                      <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-cyan-400 opacity-30" /> {booking.service}</span>
                      <span className="flex items-center gap-2"><User className="h-4 w-4 text-indigo-400 opacity-30" /> STAFF: {booking.staff}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full xl:w-auto">
                  <Button variant="ghost" className="flex-1 xl:flex-none h-14 px-8 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-all gap-3">
                    <Phone className="h-4 w-4" /> UPLINK
                  </Button>
                  <Button className="flex-1 xl:flex-none h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-glow hover:bg-cyan-50 transition-all">
                    SYNCHRONIZE
                  </Button>
                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl glass border-white/5 text-gray-700 hover:text-white"><MoreVertical className="h-5 w-5" /></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffStatus({ name, role, status }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl glass border-white/10 bg-white/5 flex items-center justify-center p-0.5 group-hover:border-cyan-400/50 transition-all overflow-hidden shadow-inner">
           <Avatar className="h-full w-full rounded-xl">
             <AvatarFallback className="bg-transparent text-[10px] font-black text-gray-500">{name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
           </Avatar>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-white group-hover:text-cyan-400 transition-colors">{name}</p>
          <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.2em] mt-1">{role}</p>
        </div>
      </div>
      <div className={cn("w-2 h-2 rounded-full shadow-glow animate-pulse", status === 'available' ? 'bg-emerald-400' : 'bg-rose-500')} />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
