
import React, { useState, useMemo } from 'react';
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
  Search,
  ChevronDown,
  Plus,
  Navigation,
  Activity,
  ArrowUpDown,
  Eye,
  Globe
} from 'lucide-react';
import { LEVELS, MOCK_SCHOOLS, MOCK_COURSES, REGIONS } from '../../constants.tsx';

interface MyClassesViewProps { 
  teacher: Teacher;
  classes: ClassInfo[];
  activeRole: UserRole;
  onEnterClass: (id: string) => void;
  onEnterCenter: (id: string) => void;
  onEnterCourse: (id: string) => void;
  onAddBranch: () => void;
}

export const MyClassesView: React.FC<MyClassesViewProps> = ({ teacher, classes, activeRole, onEnterClass, onEnterCenter, onEnterCourse, onAddBranch }) => {
  const [filterText, setFilterText] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  
  const isAdmin = activeRole === UserRole.MAIN_CENTER;

  const filteredSchools = useMemo(() => {
    if (!isAdmin) return [];

    return MOCK_SCHOOLS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(filterText.toLowerCase()) || 
                            s.location.toLowerCase().includes(filterText.toLowerCase());
      const matchesType = typeFilter === 'all' || s.type === typeFilter;
      const matchesRegion = regionFilter === 'all' || s.region === regionFilter;
      return matchesSearch && matchesType && matchesRegion;
    });
  }, [filterText, typeFilter, regionFilter, isAdmin]);

  const filteredClasses = useMemo(() => {
    if (isAdmin) return [];
    return classes.filter(c => {
      const matchesLevel = levelFilter === 'all' || c.level === levelFilter;
      const matchesSearch = c.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesCourse = courseFilter === 'all' || c.courseId === courseFilter;
      return matchesLevel && matchesSearch && matchesCourse;
    });
  }, [classes, levelFilter, filterText, courseFilter, isAdmin]);

  const totalLearners = classes.reduce((acc, c) => acc + c.students.length, 0);

  const headerStats = isAdmin ? [
    { label: 'Active Hubs', value: MOCK_SCHOOLS.length, color: 'text-[#fbee21]' },
    { label: 'Total Capacity', value: MOCK_SCHOOLS.reduce((a, b) => a + b.studentQuota, 0), color: 'text-[#00a651]' }
  ] : [
    { label: 'My Classes', value: classes.length, color: 'text-[#fbee21]' },
    { label: 'Total Learners', value: totalLearners, color: 'text-[#00a651]' }
  ];

  return (
    <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden">
      
      {/* Dynamic Header */}
      <div className="w-full bg-[#292667] rounded-2xl md:rounded-[2.5rem] p-5 lg:p-8 text-white shadow-2xl border-b-[10px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
           <div className={`p-4 md:p-6 rounded-3xl shadow-xl transition-transform hover:scale-105 duration-300 ${isAdmin ? 'bg-[#ec2027]' : 'bg-[#fbee21] text-[#292667]'}`}>
             {isAdmin ? <Building2 className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} /> : <Sparkles className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />}
           </div>
           <div>
             <h2 className="text-2xl md:text-4xl font-black leading-none tracking-tight">
               {isAdmin ? 'Hubs' : 'Welcome,'} <span className="text-[#fbee21]">{isAdmin ? 'Manager' : teacher.firstName}</span>
             </h2>
             <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/5">
                  {isAdmin ? 'Main Control' : 'Educator Panel'}
                </span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 relative z-10 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-8 md:gap-12 md:px-10 md:border-l-2 border-white/10">
             {headerStats.map((stat, idx) => (
               <React.Fragment key={stat.label}>
                  <div className="text-center group cursor-default">
                    <p className={`text-3xl md:text-5xl font-black ${stat.color} leading-none mb-1`}>{stat.value}</p>
                    <p className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest">{stat.label}</p>
                  </div>
                  {idx === 0 && <div className="w-px h-12 md:h-16 bg-white/10 hidden md:block"></div>}
               </React.Fragment>
             ))}
          </div>
          
          {isAdmin && (
            <button 
              onClick={onAddBranch}
              className="p-4 md:p-6 bg-[#fbee21] text-[#292667] rounded-3xl font-black shadow-2xl hover:scale-110 active:scale-95 transition-all border-b-4 border-black/10 shrink-0"
              title="Add New Hub"
            >
              <Plus className="w-6 h-6 md:w-8 md:h-8" strokeWidth={4} />
            </button>
          )}
        </div>
      </div>

      {/* Unified Search & Multi-Filter Bar */}
      <div className="w-full bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl border-2 border-slate-100 flex flex-col lg:flex-row items-stretch gap-3 flex-shrink-0 animate-in fade-in slide-in-from-top-4">
        
        {/* Main Search */}
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 group focus-within:border-[#ec2027] transition-all">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#ec2027]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder={isAdmin ? "Search by hub name or area..." : "Search classes..."}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="bg-transparent text-sm md:text-base font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-1 flex-wrap items-center gap-3">
          
          {/* Region Filter (Admin Only) - Replaced Nearby */}
          {isAdmin && (
            <div className="flex-1 min-w-[140px] relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#292667] transition-colors pointer-events-none z-10">
                <Globe size={16} strokeWidth={3} />
              </div>
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full bg-slate-50 pl-11 pr-8 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[11px] text-[#292667] uppercase appearance-none cursor-pointer hover:border-slate-200 transition-all shadow-sm"
              >
                <option value="all">All Regions</option>
                {REGIONS.map(r => <option key={r} value={r}>{r} Region</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          )}

          {/* Type/Level Filter */}
          <div className="flex-1 min-w-[140px] relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#292667] transition-colors pointer-events-none z-10">
              <Activity size={16} strokeWidth={3} />
            </div>
            <select 
              value={isAdmin ? typeFilter : levelFilter}
              onChange={(e) => isAdmin ? setTypeFilter(e.target.value) : setLevelFilter(e.target.value)}
              className="w-full bg-slate-50 pl-11 pr-8 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[11px] text-[#292667] uppercase appearance-none cursor-pointer hover:border-slate-200 transition-all shadow-sm"
            >
              <option value="all">{isAdmin ? 'All Hub Types' : 'All Difficulty Levels'}</option>
              {isAdmin ? (
                <>
                  <option value="HQ">Corporate HQ</option>
                  <option value="Regional">Regional Hub</option>
                  <option value="Satellite">Satellite Branch</option>
                  <option value="Franchise">Franchise Center</option>
                </>
              ) : (
                LEVELS.map(l => <option key={l} value={l}>{l}</option>)
              )}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Course Name Filter (Teacher Only) */}
          {!isAdmin && (
            <div className="flex-1 min-w-[140px] relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                <BookOpen size={16} strokeWidth={3} />
              </div>
              <select 
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full bg-slate-50 pl-11 pr-8 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[11px] text-[#292667] uppercase appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="all">Any Book / Course</option>
                {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* Grid Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pb-6">
          {isAdmin ? (
            filteredSchools.map((school: any, idx) => (
              <div 
                key={school.id} 
                onClick={() => onEnterCenter(school.id)}
                className="bg-white rounded-[2rem] shadow-xl border-4 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit relative cursor-pointer"
              >
                <div className={`p-6 md:p-8 flex justify-between items-start ${school.type === 'HQ' ? 'bg-[#ec2027]/5' : school.type === 'Regional' ? 'bg-[#3b82f6]/5' : 'bg-[#00a651]/5'}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white ${school.type === 'HQ' ? 'bg-[#ec2027]' : school.type === 'Regional' ? 'bg-[#3b82f6]' : 'bg-[#00a651]'}`}>
                        {school.type} HUB
                      </span>
                      <span className="px-3 py-1 bg-[#292667]/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#292667]">
                        {school.region}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#292667] leading-tight tracking-tight uppercase group-hover:text-[#ec2027] transition-colors">{school.name}</h3>
                    <p className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      <MapPin size={14} /> {school.location}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-2 md:pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Users size={12}/> Staffing</p>
                      <p className="font-black text-[#292667] text-lg leading-none">
                        {school.currentTeacherCount} / {school.teacherQuota}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Target size={12}/> Capacity</p>
                      <p className="font-black text-[#292667] text-lg leading-none">
                        {school.currentStudentCount} / {school.studentQuota}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full py-4 bg-[#292667] text-white font-black text-[11px] uppercase tracking-[0.2em] text-center border-t border-slate-50 group-hover:bg-[#ec2027] group-hover:text-white transition-all">
                  Manage Hub Hub
                </div>
              </div>
            ))
          ) : (
            filteredClasses.map((cls, idx) => (
              <div 
                key={cls.id} 
                onClick={() => onEnterClass(cls.id)}
                className="bg-white rounded-[2rem] shadow-xl border-4 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit cursor-pointer"
              >
                <div className={`p-6 md:p-8 flex justify-between items-start ${idx % 2 === 0 ? 'bg-[#00a651]/5' : 'bg-[#ec2027]/5'}`}>
                  <div className="min-w-0 flex-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEnterCourse(cls.courseId); }}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:scale-110 flex items-center gap-1.5 shadow-md ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}
                      title="View Course Curriculum"
                    >
                      <Eye size={10} /> {cls.level}
                    </button>
                    <h3 className="text-xl md:text-2xl font-black text-[#292667] truncate leading-tight tracking-tight uppercase mt-2">{cls.name}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl shadow-lg border-2 border-white transition-all group-hover:scale-110 ${idx % 2 === 0 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'}`}>
                    <Edit3 size={20} strokeWidth={3} />
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-2 md:pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Calendar size={12}/> Time</p>
                      <p className="font-black text-[#292667] text-[11px] leading-tight truncate">{cls.schedule}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Users size={12}/> Group</p>
                      <p className="font-black text-[#292667] text-[11px] leading-tight">{cls.students.length} Learners</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border-b-4 border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Syllabus Progress</p>
                       <p className="font-black text-xs text-[#292667]">{cls.progress}%</p>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-inner">
                      <div className={`h-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className={`w-full py-5 text-white font-black text-[11px] uppercase tracking-[0.2em] text-center transition-all ${idx % 2 === 0 ? 'bg-[#00a651] group-hover:bg-[#065f46]' : 'bg-[#ec2027] group-hover:bg-[#991b1b]'}`}>
                  Open Virtual Hub <Rocket size={18} className="inline ml-2" />
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Empty States */}
        {((isAdmin && filteredSchools.length === 0) || (!isAdmin && filteredClasses.length === 0)) && (
          <div className="w-full py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
             <div className="p-10 bg-slate-50 rounded-full text-slate-200 mb-6">
                <Search size={80} strokeWidth={1} />
             </div>
             <h4 className="text-3xl font-black text-[#292667] uppercase tracking-tighter">No Hubs Found</h4>
             <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
             <button 
               onClick={() => { setFilterText(''); setLevelFilter('all'); setTypeFilter('all'); setCourseFilter('all'); setRegionFilter('all'); }}
               className="mt-10 px-10 py-5 bg-[#292667] text-[#fbee21] rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#ec2027] hover:text-white transition-all shadow-xl active:scale-95"
             >
               Clear All Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};