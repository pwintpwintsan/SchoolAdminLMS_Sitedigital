
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { MOCK_STUDENTS, MOCK_CLASSES, MONTHS } from '../../constants';
import { Clock, TrendingUp, Users, Calendar, Filter, Download, BarChart3, Sparkles } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [selectedMonth, setSelectedMonth] = useState('March');

  const filteredData = useMemo(() => {
    const classSpecific = selectedClassId === 'c1' 
      ? MOCK_STUDENTS 
      : MOCK_STUDENTS.slice(0, 2);

    return classSpecific.map(s => ({
      name: `${s.firstName} ${s.lastName[0]}.`,
      performance: s.finalGrade,
      attendance: s.attendance,
      studyTime: Math.floor(s.studyTime / 60)
    }));
  }, [selectedClassId]);

  const COLORS = ['#ec2027', '#00a651', '#3b82f6', '#fbee21', '#a855f7'];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Consistent Full-Width Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#3b82f6] rounded-[2rem] text-white shadow-xl rotate-3">
             <BarChart3 size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Data <span className="text-[#fbee21]">Insights</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">LIVE ANALYTICS</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">U Book Store Performance</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">94%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Attendance</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#ec2027]">88%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Avg Performance</p>
           </div>
        </div>
      </div>

      {/* Row 2: Filtering Controls */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex flex-1 items-center gap-4 w-full">
          <div className="flex-1 flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#3b82f6]">
            <Filter size={20} className="text-slate-400" strokeWidth={3} />
            <select 
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full uppercase"
            >
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#3b82f6]">
            <Calendar size={20} className="text-slate-400" strokeWidth={3} />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full uppercase"
            >
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <button className="flex items-center gap-4 px-10 py-5 bg-[#292667] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] shadow-2xl hover:bg-[#ec2027] transition-all active:scale-95 border-b-6 border-black/20 shrink-0">
          <Download size={24} strokeWidth={3} />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Charts Grid - More Robust */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden pb-4">
        <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-xl flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-3">
                 <div className="w-3 h-3 bg-[#00a651] rounded-full animate-pulse"></div> 
                 Learner Attendance
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Days Present / 31</p>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} domain={[0, 31]} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 900 }} />
                <Bar dataKey="attendance" radius={[12, 12, 0, 0]} barSize={40}>
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-xl flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-3">
                 <div className="w-3 h-3 bg-[#ec2027] rounded-full animate-pulse"></div> 
                 Academic Score
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Percentage Performance</p>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 900 }} />
                <Bar dataKey="performance" radius={[0, 12, 12, 0]} barSize={32}>
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
