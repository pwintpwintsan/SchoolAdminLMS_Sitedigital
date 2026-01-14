
import React, { useState } from 'react';
import { LANGUAGES, LEVELS, MODULES, MOCK_CLASSES } from '../../constants';
import { CheckCircle2, XCircle, Play, SlidersHorizontal, ClipboardCheck, Sparkles, Search } from 'lucide-react';

const SwitchToggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-inner overflow-hidden ${active ? 'bg-[#00a651]' : 'bg-slate-200'}`}
  >
    <div 
      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${active ? 'translate-x-8' : 'translate-x-0'}`}
    >
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#00a651]' : 'bg-slate-300'}`}></div>
    </div>
  </button>
);

export const TestsView: React.FC = () => {
  const [activeTests, setActiveTests] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': false,
    'module-3': true,
    'module-4': false
  });

  const toggleTest = (id: string) => {
    setActiveTests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setAll = (state: boolean) => {
    const newState: Record<string, boolean> = {};
    for (let i = 1; i <= MODULES.length; i++) newState[`module-${i}`] = state;
    setActiveTests(newState);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="bg-[#292667] rounded-[2.5rem] p-6 text-white border-b-8 border-[#fbee21] shadow-2xl flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-[#ec2027] rounded-[1.5rem] shadow-xl rotate-3">
            <ClipboardCheck size={28} className="text-white" strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight leading-none uppercase">Test Hub</h2>
            <p className="text-[11px] font-black text-[#fbee21] uppercase tracking-[0.2em] mt-1">Global Exam Management</p>
          </div>
        </div>
        <div className="flex items-center gap-6 px-6 border-l-4 border-white/10">
           <div className="text-right">
              <p className="text-3xl font-black text-[#fbee21] leading-none">{Object.values(activeTests).filter(v => v).length} / {MODULES.length}</p>
              <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mt-1">Modules Live</p>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex-1 bg-white p-3 rounded-[2rem] border-2 border-slate-100 shadow-xl flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-[1.5rem] border-2 border-slate-100 flex-1 group focus-within:border-[#ec2027]">
            <Search size={20} className="text-slate-400" strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Search specific modules..." 
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
            />
          </div>
        </div>
        <button className="flex items-center gap-4 px-10 py-5 bg-[#ec2027] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-red-100 hover:bg-[#292667] transition-all active:scale-95 border-b-6 border-black/20">
          <SlidersHorizontal size={24} strokeWidth={3} />
          <span>ADVANCED FILTERS</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-4">
          {MODULES.map((module, i) => {
            const id = `module-${i+1}`;
            const isActive = activeTests[id];
            return (
              <div 
                key={id} 
                className={`relative group bg-white rounded-[2.5rem] p-6 border-b-8 shadow-lg transition-all hover:shadow-2xl flex items-center gap-6 overflow-hidden ${isActive ? 'border-[#00a651]/20' : 'border-slate-100'}`}
              >
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-3 shadow-md ${
                  isActive ? 'bg-[#00a651] text-white' : 'bg-slate-100 text-slate-300'
                }`}>
                  {isActive ? <CheckCircle2 size={32} strokeWidth={3.5} /> : <XCircle size={32} strokeWidth={3.5} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-[0.1em] ${
                      isActive ? 'bg-[#00a651]/10 text-[#00a651]' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isActive ? 'LIVE' : 'LOCKED'}
                    </span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">CHAPTER {i+1}</span>
                  </div>
                  <h4 className="text-xl font-black text-[#292667] truncate leading-tight uppercase tracking-tight">{module}</h4>
                  <p className="text-xs font-bold text-slate-400 truncate mt-1">
                    {isActive ? 'Available for students' : 'Inactive'}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Status</p>
                  <SwitchToggle active={isActive} onClick={() => toggleTest(id)} />
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#fbee21] hover:text-[#292667] transition-all">
                    <Play size={18} fill="currentColor" strokeWidth={0} />
                  </button>
                </div>
                
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-[#292667] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                   <Sparkles size={100} />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-[#292667] p-6 rounded-[2.5rem] mt-4 flex items-center justify-between shadow-xl border-b-8 border-[#fbee21]">
           <div className="flex flex-col">
              <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Master Configuration</p>
              <p className="text-lg font-black text-white">BULK ACTIONS</p>
           </div>
           <div className="flex gap-4">
             <button onClick={() => setAll(true)} className="px-8 py-3 bg-[#00a651] text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Enable All</button>
             <button onClick={() => setAll(false)} className="px-8 py-3 bg-[#ec2027] text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Lock All</button>
           </div>
        </div>
      </div>
    </div>
  );
};
