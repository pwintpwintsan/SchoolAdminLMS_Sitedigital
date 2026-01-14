
import React, { useState } from 'react';
import { MOCK_STUDENTS, LEVELS, MOCK_CLASSES } from '../../constants.tsx';
import { Save, GraduationCap, Sparkles, BookOpen, Target, CheckCircle2, Info, Star } from 'lucide-react';

export const GradesView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0].id);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0]);
  const [studentGrades, setStudentGrades] = useState(MOCK_STUDENTS);

  const getGradeInfo = (score: number) => {
    if (score >= 95) return { label: 'A+', text: 'Star Scholar', color: 'text-[#00a651]', bg: 'bg-[#00a651]/10' };
    if (score >= 90) return { label: 'A', text: 'Excellent', color: 'text-[#00a651]', bg: 'bg-[#00a651]/10' };
    if (score >= 80) return { label: 'B', text: 'Good Job', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (score >= 70) return { label: 'C', text: 'Satisfactory', color: 'text-amber-500', bg: 'bg-amber-50' };
    if (score >= 60) return { label: 'D', text: 'Improving', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { label: 'F', text: 'Needs Help', color: 'text-[#ec2027]', bg: 'bg-red-50' };
  };

  const handleGradeChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setStudentGrades(prev => prev.map(s => s.id === id ? { ...s, finalGrade: Math.min(100, Math.max(0, num)) } : s));
  };

  const avgGrade = Math.round(studentGrades.reduce((a, b) => a + b.finalGrade, 0) / studentGrades.length);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Consistent Full-Width Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#fbee21] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#fbee21] rounded-[2rem] text-[#292667] shadow-xl rotate-3">
             <GraduationCap size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Grade <span className="text-[#fbee21]">Portal</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">ASSESSMENT MODE</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Official Grade Entry</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">{avgGrade}%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Class Average</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">{studentGrades.length}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Forms Ready</p>
           </div>
        </div>
      </div>

      {/* Row 2: Filtering Controls */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex flex-1 items-center gap-4 w-full">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#292667]">
            <BookOpen size={24} className="text-[#ec2027]" strokeWidth={3} />
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)}
              className="bg-transparent text-lg font-black text-[#292667] outline-none w-full uppercase"
            >
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#292667]">
            <Target size={24} className="text-blue-500" strokeWidth={3} />
            <select 
              value={selectedLevel} 
              onChange={e => setSelectedLevel(e.target.value)}
              className="bg-transparent text-lg font-black text-[#292667] outline-none w-full uppercase"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <button className="flex items-center gap-4 px-10 py-5 bg-[#ec2027] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] shadow-2xl shadow-red-100 hover:bg-[#292667] transition-all active:scale-95 border-b-6 border-black/20 shrink-0">
          <Save size={24} strokeWidth={3} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Grade Entry List */}
      <div className="flex-1 bg-white rounded-[3rem] border-2 border-slate-100 overflow-hidden shadow-xl flex flex-col">
        <div className="px-10 py-6 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Info size={18} className="text-[#292667]" />
             <h3 className="font-black text-[#292667] text-xl uppercase tracking-tight">Grade Entry Worksheet</h3>
          </div>
          <div className="hidden lg:flex items-center gap-6">
             {[
               { l: 'A+', c: 'text-[#00a651]' },
               { l: 'B', c: 'text-blue-500' },
               { l: 'C', c: 'text-amber-500' },
               { l: 'F', c: 'text-[#ec2027]' }
             ].map(item => (
               <div key={item.l} className="flex items-center gap-2">
                 <span className={`w-3 h-3 rounded-full bg-current ${item.c}`}></span>
                 <span className={`text-[10px] font-black uppercase tracking-widest ${item.c}`}>{item.l} Scale</span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide divide-y-2 divide-slate-50">
          {studentGrades.map((student) => {
            const grade = getGradeInfo(student.finalGrade);
            return (
              <div key={student.id} className="px-10 py-8 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors group gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative">
                    <img src={`https://picsum.photos/seed/${student.id}/100`} className="w-20 h-20 rounded-[1.5rem] border-4 border-white shadow-lg object-cover group-hover:rotate-6 transition-transform" alt="" />
                    <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-xl shadow-md flex items-center justify-center font-black text-white text-lg ${grade.bg.replace('/10', '')} bg-opacity-100`}>
                      {grade.label}
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-[#292667] text-2xl uppercase tracking-tight leading-none mb-2">{student.firstName} {student.lastName}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black text-[#ec2027] font-mono tracking-widest uppercase">ID: {student.username}</p>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${grade.bg} ${grade.color}`}>
                        {grade.text}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 bg-slate-50/50 p-4 rounded-3xl border-2 border-dashed border-slate-100 group-hover:border-[#fbee21] transition-all">
                  <div className="text-center sm:text-right">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Academic Score (%)</p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={student.finalGrade}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          className={`w-32 px-6 py-4 text-center bg-white border-4 border-slate-200 focus:border-[#ec2027] rounded-[1.5rem] font-black text-3xl text-[#292667] outline-none transition-all shadow-inner`}
                        />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-100 rounded-full"></div>
                      </div>
                      <span className="text-4xl font-black text-slate-200">%</span>
                    </div>
                  </div>
                  <div className={`p-5 rounded-[1.5rem] transition-all shadow-xl ${grade.bg} ${grade.color} group-hover:scale-110 active:scale-95 cursor-pointer`}>
                     {student.finalGrade >= 90 ? <Star size={40} strokeWidth={3} className="fill-current" /> : <CheckCircle2 size={40} strokeWidth={3} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};