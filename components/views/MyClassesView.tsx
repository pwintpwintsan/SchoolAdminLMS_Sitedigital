
import React, { useState } from 'react';
import { Teacher, ClassInfo, UserRole, School, Course } from '../../types.ts';
import { 
  Users, 
  Edit3, 
  Rocket, 
  Sparkles, 
  Calendar, 
  Target, 
  Filter, 
  BookOpen, 
  Layout, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ShoppingCart, 
  Search,
  ChevronDown,
  Globe,
  Trophy,
  Plus,
  X,
  Save,
  Clock,
  LayoutGrid,
  GraduationCap
} from 'lucide-react';
import { LEVELS, MOCK_SCHOOLS, MOCK_COURSES } from '../../constants.tsx';

interface MyClassesViewProps { 
  teacher: Teacher;
  classes: ClassInfo[];
  activeRole: UserRole;
  onEnterClass: (id: string) => void;
  onEnterCenter: (id: string) => void;
  onAddBranch: () => void;
}

export const MyClassesView: React.FC<MyClassesViewProps> = ({ teacher, classes, activeRole, onEnterClass, onEnterCenter, onAddBranch }) => {
  const [filterText, setFilterText] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  
  const isAdmin = activeRole === UserRole.MAIN_CENTER;

  const filteredClasses = classes.filter(c => {
    const matchesLevel = levelFilter === 'all' || c.level === levelFilter;
    const matchesSearch = c.name.toLowerCase().includes(filterText.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const filteredSchools = MOCK_SCHOOLS.filter(s => {
    const matchesBranch = selectedBranchId === 'all' || s.id === selectedBranchId;
    const matchesSearch = s.name.toLowerCase().includes(filterText.toLowerCase()) || 
                          s.location.toLowerCase().includes(filterText.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  const totalLearners = classes.reduce((acc, c) => acc + c.students.length, 0);

  const headerStats = isAdmin ? [
    { label: 'Branches', value: MOCK_SCHOOLS.length, color: 'text-[#fbee21]' },
    { label: 'Licenses', value: MOCK_SCHOOLS.length * 2, color: 'text-[#00a651]' }
  ] : [
    { label: 'Active Classes', value: classes.length, color: 'text-[#fbee21]' },
    { label: 'Learners', value: totalLearners, color: 'text-[#00a651]' }
  ];

  return (
    <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden">
      
      {/* Header Bar - Reduced padding and rounding */}
      <div className="w-full bg-[#292667] rounded-xl md:rounded-[1.5rem] p-4 lg:p-6 text-white shadow-2xl border-b-[6px] md:border-b-[8px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex items-center gap-3 md:gap-4 relative z-10">
           <div className={`p-3 md:p-4 rounded-xl shadow-xl rotate-2 transition-transform hover:rotate-0 duration-300 ${isAdmin ? 'bg-[#ec2027] text-white' : 'bg-[#fbee21] text-[#292667]'}`}>
             {isAdmin ? <Building2 className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} /> : <Sparkles className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />}
           </div>
           <div>
             <h2 className="text-xl md:text-2xl lg:text-3xl font-black leading-none tracking-tight">
               {isAdmin ? 'Hub ' : ''}<span className="text-[#fbee21]">{isAdmin ? 'Command' : teacher.firstName + '!'}</span>
             </h2>
             <div className="flex items-center gap-2 mt-1 md:mt-2">
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-black uppercase tracking-widest text-white/80">
                  {isAdmin ? 'ADMIN' : 'TEACHER'}
                </span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 relative z-10 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-4 md:gap-6 md:px-6 md:border-l-2 border-white/10">
             {headerStats.map((stat, idx) => (
               <React.Fragment key={stat.label}>
                  <div className="text-center group cursor-default">
                    <p className={`text-xl md:text-3xl lg:text-4xl font-black ${stat.color} leading-none`}>{stat.value}</p>
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">{stat.label}</p>
                  </div>
                  {idx === 0 && <div className="w-px h-8 md:h-12 bg-white/10 hidden md:block"></div>}
               </React.Fragment>
             ))}
          </div>
          
          {isAdmin && (
            <button 
              onClick={onAddBranch}
              className="px-5 py-3 md:px-7 md:py-4 bg-[#fbee21] text-[#292667] rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 border-b-4 border-black/10 shrink-0"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={4} /> Branch
            </button>
          )}
        </div>
      </div>

      {/* Filter Row - Reduced padding */}
      <div className="w-full bg-white p-2 md:p-2 rounded-xl md:rounded-[1rem] shadow-lg border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-2 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          {isAdmin ? (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border-2 border-slate-100 min-w-[200px] w-full md:w-auto relative group">
              <div className="p-1.5 bg-[#ec2027] rounded-lg text-white">
                <Building2 size={12} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <select 
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="bg-transparent text-[10px] font-black text-[#292667] outline-none w-full cursor-pointer uppercase appearance-none"
                >
                  <option value="all">Global (All)</option>
                  {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          ) : (
             <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border-2 border-slate-100 min-w-[200px] w-full md:w-auto relative group">
                <div className="p-1.5 bg-[#00a651] rounded-lg text-white">
                  <Filter size={12} strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <select 
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-transparent text-[10px] font-black text-[#292667] outline-none w-full cursor-pointer uppercase appearance-none"
                  >
                    <option value="all">All Levels</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
             </div>
          )}

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg md:rounded-[1rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#ec2027] transition-all">
            <Search size={18} className="text-slate-400" strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="bg-transparent text-xs md:text-sm font-black text-[#292667] outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Grid - Reduced spacing */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 pb-4">
          {isAdmin ? (
            filteredSchools.map((school, idx) => (
              <div 
                key={school.id} 
                className="bg-white rounded-xl md:rounded-[1.5rem] shadow-xl border-2 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit"
              >
                <div className={`p-4 md:p-5 flex justify-between items-start ${idx % 2 === 0 ? 'bg-[#00a651]/5' : 'bg-[#3b82f6]/5'}`}>
                  <div className="min-w-0">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#3b82f6] text-white'}`}>
                      {school.location} HUB
                    </span>
                    <h3 className="text-base md:text-lg font-black text-[#292667] truncate leading-tight tracking-tight uppercase mt-1">{school.name}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-xl shadow-lg border-2 border-white transition-all group-hover:rotate-6 flex-shrink-0 flex items-center justify-center ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#3b82f6] text-white'}`}>
                    <Building2 size={18} strokeWidth={3} />
                  </div>
                </div>

                <div className="p-4 md:p-5 pt-3 md:pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border-b-2 border-slate-100 text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Staff</p>
                      <p className="font-black text-[#292667] text-base leading-none">
                        {school.currentTeacherCount} / {school.teacherQuota}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border-b-2 border-slate-100 text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                      <p className="font-black text-[#292667] text-base leading-none">
                        {school.currentStudentCount} / {school.studentQuota}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onEnterCenter(school.id)}
                  className="w-full py-3 bg-[#292667] text-[#fbee21] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-[#ec2027] hover:text-white border-t-2 border-slate-50"
                >
                  See Details
                </button>
              </div>
            ))
          ) : (
            filteredClasses.map((cls, idx) => (
              <div 
                key={cls.id} 
                className="bg-white rounded-xl md:rounded-[1.5rem] shadow-xl border-2 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit"
              >
                <div className={`p-4 md:p-5 flex justify-between items-start ${idx % 2 === 0 ? 'bg-[#00a651]/5' : 'bg-[#ec2027]/5'}`}>
                  <div className="min-w-0 flex-1">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}>
                      {cls.level}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-[#292667] truncate leading-tight tracking-tight uppercase mt-1">{cls.name}</h3>
                  </div>
                  <button 
                    onClick={() => onEnterClass(cls.id)}
                    className={`p-2 rounded-lg shadow-lg border-2 border-white transition-all hover:scale-105 ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}
                  >
                    <Edit3 size={18} strokeWidth={3} />
                  </button>
                </div>

                <div className="p-4 md:p-5 pt-3 md:pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border-b-2 border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Schedule</p>
                      <p className="font-black text-[#292667] text-[10px] leading-tight truncate">{cls.schedule}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border-b-2 border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Learners</p>
                      <p className="font-black text-[#292667] text-[10px] leading-tight">{cls.students.length} Total</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border-b-2 border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Progress</p>
                       <p className="font-black text-[10px] text-[#292667]">{cls.progress}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-white">
                      <div className={`h-full ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onEnterClass(cls.id)}
                  className={`w-full py-4 text-white font-black text-xs uppercase tracking-widest transition-all ${idx % 2 === 0 ? 'bg-[#00a651] hover:bg-[#065f46]' : 'bg-[#ec2027] hover:bg-[#991b1b]'}`}
                >
                  Manage Class <Rocket size={16} className="inline ml-2" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
