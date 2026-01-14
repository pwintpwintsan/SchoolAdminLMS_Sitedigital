
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
}

const AddCenterModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full shadow-2xl border-t-[12px] border-[#ec2027] relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
        <X size={20} strokeWidth={3} />
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-[#ec2027] text-white rounded-2xl shadow-xl">
          <Building2 size={28} strokeWidth={3} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Register New Hub</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Expansion Registry</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Center / School Name</label>
          <input type="text" placeholder="e.g. North Point Academy" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#ec2027] transition-all" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / Hub</label>
            <input type="text" placeholder="e.g. London" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#ec2027] transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
            <input type="email" placeholder="admin@hub.ubookstore.com" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#ec2027] transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Staff Quota</label>
            <input type="number" placeholder="10" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#ec2027] transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Quota</label>
            <input type="number" placeholder="200" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#ec2027] transition-all" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button onClick={onClose} className="flex-1 py-4 px-6 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
        <button className="flex-[2] py-4 px-6 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#ec2027] hover:text-white shadow-lg transition-all border-b-4 border-black/10">
          <Save size={18} /> Confirm Registry
        </button>
      </div>
    </div>
  </div>
);

export const MyClassesView: React.FC<MyClassesViewProps> = ({ teacher, classes, activeRole, onEnterClass, onEnterCenter }) => {
  const [filterText, setFilterText] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const [isAddingCenter, setIsAddingCenter] = useState(false);
  
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
    { label: 'Total Branches', value: MOCK_SCHOOLS.length, color: 'text-[#fbee21]' },
    { label: 'Active Licenses', value: MOCK_SCHOOLS.length * 2, color: 'text-[#00a651]' }
  ] : [
    { label: 'Active Classes', value: classes.length, color: 'text-[#fbee21]' },
    { label: 'Total Learners', value: totalLearners, color: 'text-[#00a651]' }
  ];

  return (
    <div className="h-full flex flex-col gap-4 md:gap-6 overflow-hidden">
      {isAddingCenter && <AddCenterModal onClose={() => setIsAddingCenter(false)} />}
      
      <div className="w-full bg-[#292667] rounded-[2rem] md:rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl border-b-[8px] md:border-b-[10px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
           <div className={`p-4 md:p-5 rounded-2xl shadow-xl rotate-3 transition-transform hover:rotate-0 duration-300 ${isAdmin ? 'bg-[#ec2027] text-white' : 'bg-[#fbee21] text-[#292667]'}`}>
             {isAdmin ? <Building2 className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} /> : <Sparkles className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />}
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-none tracking-tight">
               {isAdmin ? 'Hub ' : 'Hello, '}<span className="text-[#fbee21]">{isAdmin ? 'Command' : teacher.firstName + '!'}</span>
             </h2>
             <div className="flex items-center gap-3 mt-2 md:mt-3">
                <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/80">
                  {isAdmin ? 'ADMINISTRATOR' : 'TEACHER PORTAL'}
                </span>
                <span className="text-[11px] font-black text-[#fbee21] uppercase tracking-widest hidden sm:block">
                  {isAdmin ? 'U Book Store Global' : `${teacher.schoolName}`}
                </span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 relative z-10 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-6 md:gap-10 md:px-8 md:border-l-4 border-white/10">
             {headerStats.map((stat, idx) => (
               <React.Fragment key={stat.label}>
                  <div className="text-center group cursor-default">
                    <p className={`text-2xl md:text-4xl lg:text-5xl font-black ${stat.color} group-hover:scale-105 transition-transform leading-none`}>{stat.value}</p>
                    <p className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest mt-1 md:mt-2">{stat.label}</p>
                  </div>
                  {idx === 0 && <div className="w-px h-10 md:h-16 bg-white/10 hidden md:block"></div>}
               </React.Fragment>
             ))}
          </div>
          
          {isAdmin && (
            <button 
              onClick={() => setIsAddingCenter(true)}
              className="px-6 py-4 md:px-8 md:py-6 bg-[#fbee21] text-[#292667] rounded-[1.5rem] font-black text-[10px] md:text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-4 border-b-4 md:border-b-6 border-black/10 shrink-0"
            >
              <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={4} /> Add Branch
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-white p-2.5 md:p-3 rounded-2xl md:rounded-[2rem] shadow-lg border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-3 md:gap-4 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          {isAdmin ? (
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border-2 border-slate-100 min-w-[240px] w-full md:w-auto relative group">
              <div className="p-1.5 bg-[#ec2027] rounded-lg text-white">
                <Building2 size={16} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Hub Filter</p>
                <select 
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="bg-transparent text-[11px] font-black text-[#292667] outline-none w-full cursor-pointer uppercase appearance-none"
                >
                  <option value="all">Global (All Centers)</option>
                  {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          ) : (
             <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border-2 border-slate-100 min-w-[240px] w-full md:w-auto relative group">
                <div className="p-1.5 bg-[#00a651] rounded-lg text-white">
                  <Filter size={16} strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Level View</p>
                  <select 
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-transparent text-[11px] font-black text-[#292667] outline-none w-full cursor-pointer uppercase appearance-none"
                  >
                    <option value="all">All Levels</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <ChevronDown size={16} className="text-slate-400" />
             </div>
          )}

          <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-xl md:rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#ec2027] transition-all">
            <Search size={20} className="text-slate-400" strokeWidth={3} />
            <input 
              type="text" 
              placeholder={isAdmin ? "Search by city, email or keyword..." : "Search your classes..."}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="bg-transparent text-sm md:text-base font-black text-[#292667] outline-none w-full placeholder:text-slate-300 placeholder:font-bold"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-10">
          {isAdmin ? (
            filteredSchools.map((school, idx) => (
              <div 
                key={school.id} 
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className={`p-6 md:p-8 pb-4 md:pb-6 flex justify-between items-start ${idx % 2 === 0 ? 'bg-[#00a651]/5' : 'bg-[#3b82f6]/5'}`}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#3b82f6] text-white'}`}>
                        {school.location} HUB
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#292667] truncate leading-tight tracking-tighter uppercase">{school.name}</h3>
                  </div>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-lg border-4 border-white transition-all group-hover:rotate-6 flex-shrink-0 flex items-center justify-center ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#3b82f6] text-white'}`}>
                    <Building2 size={24} strokeWidth={3} />
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-4 md:pt-6 space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Users size={12} className="text-[#ec2027]" /> Staff Quota
                      </p>
                      <p className="font-black text-[#292667] text-xl tracking-tighter leading-none">
                        {school.currentTeacherCount} / <span className="text-slate-300">{school.teacherQuota}</span>
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <GraduationCap size={12} className="text-[#3b82f6]" /> Student Quota
                      </p>
                      <p className="font-black text-[#292667] text-xl tracking-tighter leading-none">
                        {school.currentStudentCount} / <span className="text-slate-300">{school.studentQuota}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Status</p>
                       <span className="text-[10px] font-black text-[#00a651] uppercase">{Math.round((school.currentStudentCount / school.studentQuota) * 100)}% Used</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-[#00a651] transition-all" style={{ width: `${(school.currentStudentCount / school.studentQuota) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onEnterCenter(school.id)}
                  className="w-full py-5 md:py-7 bg-[#292667] text-[#fbee21] font-black text-xs md:text-sm flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all hover:bg-[#ec2027] hover:text-white border-t-4 border-slate-50 relative overflow-hidden group/btn flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors"></div>
                  See Details
                </button>
              </div>
            ))
          ) : (
            filteredClasses.map((cls, idx) => (
              <div 
                key={cls.id} 
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit animate-in fade-in slide-in-from-bottom-6 duration-500"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className={`p-6 md:p-8 pb-4 md:pb-6 flex justify-between items-start ${idx % 2 === 0 ? 'bg-[#00a651]/5' : 'bg-[#ec2027]/5'}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}>
                        {cls.level}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#292667] truncate leading-tight tracking-tight uppercase">{cls.name}</h3>
                  </div>
                  <button 
                    onClick={() => onEnterClass(cls.id)}
                    className={`p-3 md:p-4 rounded-xl shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95 flex-shrink-0 ml-4 ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}
                  >
                    <Edit3 size={20} md:size={24} strokeWidth={3} />
                  </button>
                </div>

                <div className="p-6 md:p-8 pt-4 md:pt-6 space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100 h-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar size={14} className="text-blue-500" strokeWidth={3} />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Schedule</p>
                      </div>
                      <p className="font-black text-[#292667] text-[11px] md:text-[13px] leading-tight">{cls.schedule}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100 h-full">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Users size={14} className="text-[#ec2027]" strokeWidth={3} />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Learners</p>
                      </div>
                      <p className="font-black text-[#292667] text-[11px] md:text-[13px]">{cls.students.length} Enrolled</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border-b-4 border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-[#00a651]" strokeWidth={3} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Class Progress</p>
                      </div>
                      <p className="font-black text-base text-[#292667] leading-none">{cls.progress}%</p>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner border-2 border-white">
                      <div 
                        className={`h-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} 
                        style={{ width: `${cls.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onEnterClass(cls.id)}
                  className={`w-full py-5 md:py-6 text-white font-black text-sm md:text-lg flex items-center justify-center gap-3 md:gap-4 uppercase tracking-[0.2em] transition-all hover:gap-6 flex-shrink-0 ${idx % 2 === 0 ? 'bg-[#00a651] hover:bg-[#065f46]' : 'bg-[#ec2027] hover:bg-[#991b1b]'}`}
                >
                  Manage Class <Rocket size={20} md:size={24} strokeWidth={3} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
