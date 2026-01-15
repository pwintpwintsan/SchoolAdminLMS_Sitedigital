
import React, { useState, useMemo } from 'react';
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
  Search,
  FilterX,
  Activity
} from 'lucide-react';
import { MOCK_COURSES, MOCK_STUDENTS } from '../../constants.tsx';

interface StudentDashboardViewProps {
  onEnterCourse: (id: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onEnterCourse }) => {
  const student = MOCK_STUDENTS[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Standard Curriculum', 'Robotics', 'Logic'];

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const achievements = [
    { name: 'Fast Learner', icon: Rocket, color: 'bg-blue-500' },
    { name: 'Star Student', icon: Star, color: 'bg-[#fbee21]' },
    { name: 'Logic Master', icon: Target, color: 'bg-[#00a651]' },
    { name: 'Certificate Earned', icon: Trophy, color: 'bg-[#a855f7]' }
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Hero Header Standardized */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="p-1 bg-white rounded-[2.5rem] shadow-2xl relative">
            <img src={`https://picsum.photos/seed/timmy/200`} className="w-32 h-32 rounded-[2.2rem] border-4 border-white object-cover" alt="Student" />
            <div className="absolute -bottom-2 -right-2 bg-[#fbee21] text-[#292667] p-2.5 rounded-xl shadow-lg rotate-12">
              <Sparkles size={20} strokeWidth={3} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tight">HELLO, <span className="text-[#fbee21]">{student.firstName.toUpperCase()}!</span></h2>
            <div className="flex items-center gap-3 mt-4">
               <span className="px-4 py-1.5 bg-white/10 rounded-[1rem] text-[11px] font-black uppercase tracking-widest text-white border-2 border-white/10">Learning Level 3</span>
               <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-widest opacity-60">U Book Store Elite</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8 relative z-10 bg-white/5 p-8 rounded-[2.5rem] border-2 border-white/10 backdrop-blur-md">
           <div className="text-center group cursor-pointer hover:scale-110 transition-transform">
              <p className="text-5xl font-black text-[#fbee21] leading-none mb-2">12</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Earned Stars</p>
           </div>
           <div className="w-px h-16 bg-white/10"></div>
           <div className="text-center group cursor-pointer hover:scale-110 transition-transform">
              <p className="text-5xl font-black text-[#00a651] leading-none mb-2">8</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Completed Tasks</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
        {/* Course Library with Standardized Layout */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] p-8 shadow-xl border-2 border-slate-100 flex flex-col overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 shrink-0">
             <h3 className="text-3xl font-black text-[#292667] uppercase tracking-tighter flex items-center gap-4">
               <div className="p-3 bg-red-50 rounded-2xl text-[#ec2027]"><BookOpen size={32} strokeWidth={3} /></div>
               My U Books
             </h3>
             
             <div className="flex items-center gap-4">
                <div className="bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex items-center gap-4 w-full md:w-auto focus-within:border-[#ec2027] transition-all group shadow-sm">
                   <Search size={22} className="text-slate-300 group-focus-within:text-[#ec2027]" strokeWidth={3} />
                   <input 
                     type="text" 
                     placeholder="Search my library..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="bg-transparent text-sm font-black text-[#292667] outline-none placeholder:text-slate-200 w-full md:w-48" 
                   />
                </div>
             </div>
          </div>

          {/* Category Filter Standardized */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto scrollbar-hide shrink-0 py-1">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-3.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-md border-b-4 active:scale-95 ${
                    activeCategory === cat 
                      ? 'bg-[#ec2027] text-white border-red-900 scale-105' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-5 pr-2">
            {filteredCourses.map((course, idx) => (
              <div key={course.id} onClick={() => onEnterCourse(course.id)} className="bg-slate-50 p-6 rounded-[2.5rem] border-4 border-transparent hover:border-[#fbee21] hover:bg-white transition-all cursor-pointer group flex items-center gap-8 shadow-sm animate-in slide-in-from-bottom-6">
                <div className="w-24 h-24 rounded-[1.8rem] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                   <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white rounded-lg text-[9px] font-black uppercase text-[#292667]/40 tracking-widest border border-slate-100">{course.category}</span>
                    <Sparkles size={12} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-2xl font-black text-[#292667] uppercase tracking-tight truncate group-hover:text-[#ec2027] transition-colors">{course.name}</h4>
                  <div className="mt-4 flex items-center gap-4">
                     <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-inner">
                        <div className={`h-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} style={{ width: `${60 + idx * 5}%` }}></div>
                     </div>
                     <span className="text-[11px] font-black text-[#292667]">{60 + idx * 5}%</span>
                  </div>
                </div>
                <button className="w-16 h-16 rounded-[1.5rem] bg-[#292667] text-white flex items-center justify-center shadow-2xl group-hover:bg-[#00a651] transition-all hover:scale-110 active:scale-90 border-b-6 border-black/10">
                   <Play size={28} className="ml-1.5" fill="currentColor" />
                </button>
              </div>
            ))}
            {filteredCourses.length === 0 && (
               <div className="py-32 flex flex-col items-center justify-center animate-in zoom-in-95">
                  <FilterX size={80} className="text-slate-100 mb-6" strokeWidth={1} />
                  <p className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">No U Books Found</p>
               </div>
            )}
          </div>
        </div>

        {/* Sidebar Stats Standardized */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#292667] rounded-[3rem] p-8 shadow-2xl border-b-[12px] border-[#ec2027] text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                <Medal size={120} />
             </div>
             <h4 className="font-black text-[12px] uppercase tracking-[0.2em] text-[#fbee21] mb-8 flex items-center gap-3">
               <Activity size={18} /> Daily Performance
             </h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 text-center group-hover:bg-white/10 transition-all">
                   <p className="text-3xl font-black">4.5h</p>
                   <p className="text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Study Time</p>
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 text-center group-hover:bg-white/10 transition-all">
                   <p className="text-3xl font-black text-[#00a651]">92%</p>
                   <p className="text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Score Avg</p>
                </div>
             </div>
          </div>
          <div className="bg-white rounded-[3rem] p-8 shadow-xl border-2 border-slate-100 flex-1 flex flex-col overflow-hidden">
            <h4 className="text-xl font-black text-[#292667] uppercase tracking-tighter mb-6 flex items-center gap-3">
               <Trophy size={28} className="text-amber-500" strokeWidth={3} /> Badges Room
            </h4>
            <div className="grid grid-cols-2 gap-4 overflow-y-auto scrollbar-hide pr-1">
               {achievements.map((item) => {
                 const AchievementIcon = item.icon;
                 return (
                   <div key={item.name} className="bg-slate-50 p-6 rounded-[2rem] border-b-6 border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:border-[#fbee21] transition-all shadow-sm">
                      <div className={`${item.color} p-4 rounded-2xl text-white shadow-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                         <AchievementIcon size={32} strokeWidth={3} />
                      </div>
                      <p className="text-[11px] font-black text-[#292667] uppercase tracking-tight leading-tight">{item.name}</p>
                   </div>
                 );
               })}
               <div className="aspect-square bg-slate-50/50 rounded-[2rem] border-4 border-dashed border-slate-100 flex items-center justify-center text-slate-100 hover:text-amber-200 transition-colors">
                  <Sparkles size={40} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
