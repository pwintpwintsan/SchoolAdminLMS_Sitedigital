
import React from 'react';
import { 
  Sparkles, 
  Rocket, 
  Trophy, 
  Clock, 
  BookOpen, 
  Star, 
  Play, 
  Medal,
  Target,
  BarChart3
} from 'lucide-react';
import { MOCK_COURSES, MOCK_STUDENTS } from '../../constants.tsx';

interface StudentDashboardViewProps {
  onEnterCourse: (id: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onEnterCourse }) => {
  const student = MOCK_STUDENTS[0];
  
  const achievements = [
    { name: 'Fast Learner', icon: Rocket, color: 'bg-blue-500' },
    { name: 'Star Student', icon: Star, color: 'bg-[#fbee21]' },
    { name: 'Logic Master', icon: Target, color: 'bg-[#00a651]' },
    { name: 'Certificate Earned', icon: Trophy, color: 'bg-[#a855f7]' }
  ];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-3xl p-6 md:p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <img src={`https://picsum.photos/seed/timmy/200`} className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-4 border-white shadow-2xl" alt="Student" />
          <div>
            <h2 className="text-3xl md:text-5xl font-black leading-none tracking-tight">Hello, <span className="text-[#fbee21]">{student.firstName}!</span></h2>
            <div className="flex items-center gap-3 mt-3">
               <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-widest text-white border border-white/20">Learning Level 3</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 relative z-10 bg-white/5 p-6 rounded-[2rem] border-2 border-white/10 backdrop-blur-sm">
           <div className="text-center">
              <p className="text-4xl font-black text-[#fbee21] leading-none mb-1">12</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Stars</p>
           </div>
           <div className="w-px h-12 bg-white/10"></div>
           <div className="text-center">
              <p className="text-4xl font-black text-[#00a651] leading-none mb-1">8</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Tasks</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden pb-4">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-100 flex flex-col overflow-hidden">
          <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-3 mb-6">
            <BookOpen className="text-[#ec2027]" size={28} strokeWidth={3} /> My U Books
          </h3>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
            {MOCK_COURSES.map((course, idx) => (
              <div key={course.id} onClick={() => onEnterCourse(course.id)} className="bg-slate-50 p-5 rounded-[2rem] border-4 border-transparent hover:border-[#fbee21] hover:bg-white transition-all cursor-pointer group flex items-center gap-6 shadow-sm">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
                   <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-black text-[#292667] uppercase tracking-tight truncate">{course.name}</h4>
                  <div className="mt-3">
                     <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-white">
                        <div className={`h-full ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} style={{ width: '65%' }}></div>
                     </div>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-[#292667] text-white flex items-center justify-center shadow-lg group-hover:bg-[#00a651] transition-all">
                   <Play size={20} className="ml-1" fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#292667] rounded-3xl p-6 shadow-2xl border-b-[8px] border-[#ec2027] text-white">
             <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-[#fbee21] mb-6 flex items-center gap-2">
               <Medal size={16} /> Activity
             </h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border-2 border-white/5 text-center">
                   <p className="text-2xl font-black">4.5h</p>
                   <p className="text-[8px] font-black uppercase text-white/30 tracking-widest mt-1">Study</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border-2 border-white/5 text-center">
                   <p className="text-2xl font-black">92%</p>
                   <p className="text-[8px] font-black uppercase text-white/30 tracking-widest mt-1">Score</p>
                </div>
             </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-100 flex-1 flex flex-col overflow-hidden">
            <h4 className="text-lg font-black text-[#292667] uppercase tracking-tight mb-4 flex items-center gap-2">
               <Trophy size={20} className="text-amber-500" /> Badges
            </h4>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-hide">
               {achievements.map((item) => (
                 <div key={item.name} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 flex flex-col items-center text-center">
                    <div className={`${item.color} p-3 rounded-xl text-white shadow-lg mb-2`}>
                       <item.icon size={24} strokeWidth={3} />
                    </div>
                    <p className="text-[10px] font-black text-[#292667] uppercase tracking-tight">{item.name}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
