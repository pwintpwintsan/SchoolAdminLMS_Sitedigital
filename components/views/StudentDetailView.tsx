
import React from 'react';
import { MOCK_STUDENTS } from '../../constants';
import { ChevronLeft, Calendar, BookOpen, Star, ShieldCheck, Mail, MapPin, Target, Clock, Sparkles } from 'lucide-react';

interface StudentDetailViewProps {
  studentId: string;
  onClassClick: (id: string) => void;
  onBack: () => void;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({ studentId, onClassClick, onBack }) => {
  const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      
      {/* Consistent Full-Width Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-5 bg-white/10 rounded-[2rem] text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90">
             <ChevronLeft size={42} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">{student.firstName} <span className="text-[#fbee21]">{student.lastName}</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white ${student.status === 'active' ? 'bg-[#00a651]' : 'bg-slate-500'}`}>
                  {student.status === 'active' ? 'ACTIVE LEARNER' : 'INACTIVE'}
                </span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">ID: {student.username}</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">{student.finalGrade}%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Final Score</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">{student.attendance}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Attendance</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
        {/* Profile Details & Bio */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
           <div className="bg-white rounded-[3rem] p-8 shadow-xl border-2 border-slate-100 text-center relative overflow-hidden flex-shrink-0">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#fbee21] rounded-full -ml-16 -mt-16 opacity-5"></div>
             <img src={`https://picsum.photos/seed/${student.id}/300`} className="w-48 h-48 mx-auto rounded-[3rem] border-8 border-white shadow-2xl mb-6 object-cover hover:scale-105 transition-transform" alt="Profile" />
             <h3 className="text-2xl font-black text-[#292667] leading-none mb-3 uppercase tracking-tight">{student.firstName} {student.lastName}</h3>
             <div className="bg-slate-50 px-6 py-2 rounded-2xl inline-block">
                <p className="text-[#ec2027] font-black text-[11px] uppercase tracking-[0.2em]">Validated Student Account</p>
             </div>
           </div>

           <div className="bg-[#292667] text-white rounded-[3rem] p-8 shadow-2xl border-b-8 border-[#ec2027] flex-1 flex flex-col overflow-hidden">
             <h4 className="font-black text-[12px] uppercase tracking-[0.2em] text-[#fbee21] mb-8 flex items-center gap-3">
               <Star size={20} strokeWidth={3} className="fill-current" /> PERFORMANCE ANALYSIS
             </h4>
             <div className="space-y-8 flex-1 overflow-y-auto scrollbar-hide pr-2">
               <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-black text-white/40 uppercase tracking-widest">Global Academic Average</span>
                    <span className="text-3xl font-black text-[#fbee21]">{student.finalGrade}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border-2 border-white/10 p-0.5 shadow-inner">
                    <div className="bg-[#fbee21] h-full rounded-full transition-all duration-1000" style={{ width: `${student.finalGrade}%` }}></div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3 opacity-40 mb-3">
                      <Target size={18} strokeWidth={3} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Progress</p>
                   </div>
                   <p className="text-2xl font-black">{student.attendance} Units</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3 opacity-40 mb-3">
                      <Clock size={18} strokeWidth={3} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Engagement</p>
                   </div>
                   <p className="text-2xl font-black">{Math.floor(student.studyTime / 60)} Hrs</p>
                 </div>
               </div>

               <div className="p-6 bg-white/5 rounded-[2rem] border-2 border-white/5">
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">Active Curriculum Level</p>
                 <p className="text-lg font-black text-[#fbee21] uppercase tracking-tight">{student.level}</p>
               </div>
             </div>
           </div>
        </div>

        {/* Informational Sections */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          {/* Metadata Grid */}
          <div className="bg-white rounded-[3rem] p-8 shadow-xl border-2 border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="flex items-center gap-5">
                 <div className="p-4 bg-slate-50 rounded-[1.5rem] text-[#3b82f6] shadow-sm"><Calendar size={28} strokeWidth={3} /></div>
                 <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Enrolled On</p>
                   <p className="text-lg font-black text-[#292667]">{student.activationDate || '2023-01-01'}</p>
                 </div>
               </div>
               <div className="flex items-center gap-5">
                 <div className="p-4 bg-slate-50 rounded-[1.5rem] text-[#00a651] shadow-sm"><MapPin size={28} strokeWidth={3} /></div>
                 <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Center</p>
                   <p className="text-lg font-black text-[#292667] uppercase">U Book Store HQ</p>
                 </div>
               </div>
               <div className="flex items-center gap-5">
                 <div className="p-4 bg-slate-50 rounded-[1.5rem] text-[#ec2027] shadow-sm"><Mail size={28} strokeWidth={3} /></div>
                 <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Guardian Link</p>
                   <p className="text-lg font-black text-[#292667]">VERIFIED</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Enrolled Classes with Larger Cards */}
          <div className="flex-1 bg-white rounded-[3rem] p-10 shadow-2xl border-2 border-slate-100 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-10 flex-shrink-0">
               <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-4">
                 <div className="p-3 bg-green-50 rounded-2xl text-[#00a651]"><BookOpen size={32} strokeWidth={3} /></div> 
                 Registered Programs
               </h3>
               <span className="px-5 py-2 bg-[#fbee21] text-[#292667] rounded-full text-xs font-black uppercase tracking-widest shadow-md">Total: {student.registeredClasses?.length || 0}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.registeredClasses?.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => onClassClick(c.id)}
                    className="group relative p-8 bg-slate-50 rounded-[2.5rem] border-4 border-transparent hover:border-[#ec2027] hover:bg-white transition-all text-left shadow-lg flex items-center gap-6 overflow-hidden"
                  >
                    <div className="w-16 h-16 bg-[#ec2027]/10 rounded-[1.5rem] flex items-center justify-center text-[#ec2027] group-hover:rotate-12 transition-transform flex-shrink-0 shadow-sm">
                      <BookOpen size={28} strokeWidth={3} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-black text-[#292667] text-xl leading-tight truncate uppercase tracking-tight group-hover:text-[#ec2027] transition-colors">{c.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Launch Courseware</span>
                        <Sparkles size={14} className="text-amber-400" />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <Star size={100} className="fill-[#292667]" />
                    </div>
                  </button>
                )) || (
                  <div className="col-span-2 flex flex-col items-center justify-center p-20 border-4 border-dashed border-slate-100 rounded-[3rem]">
                     <ShieldCheck size={64} className="text-slate-100 mb-4" />
                     <p className="text-slate-300 font-black uppercase tracking-[0.2em]">No Class History Found</p>
                  </div>
                )}
              </div>
            </div>
            
            <button className="w-full py-6 mt-8 bg-[#ec2027] text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-red-100 hover:bg-[#292667] transition-all border-b-6 border-black/20">
              Assign to New Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
