
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_CLASSES, MOCK_COURSES } from '../../constants';
import { Student, Teacher, UserRole } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Users as UsersIcon, 
  Trash2, 
  UserPlus, 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  AlertCircle, 
  Info, 
  Layers, 
  X, 
  Save, 
  Sparkles,
  Eye,
  FileCheck,
  Search,
  BookMarked,
  CheckCircle2
} from 'lucide-react';

interface ClassDetailViewProps {
  classId: string;
  onStudentClick: (id: string) => void;
  onBack: () => void;
  onEnterCourse: (id: string) => void;
}

const UpgradePopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-b-8 border-[#ec2027] text-center animate-in zoom-in-95 duration-300">
      <div className="w-16 h-16 bg-[#fbee21] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl">
         <Mail size={30} className="text-[#292667]" />
      </div>
      <h3 className="text-2xl font-black text-[#292667] mb-3">Upgrade Your Plan</h3>
      <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed">
        To add more classes, buy new courses, or upgrade your student limits, please contact the <span className="text-[#ec2027]">Main Center</span> administrator.
      </p>
      <div className="space-y-4">
        <a href="mailto:admin@ubookstore.com" className="block w-full py-5 px-8 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-lg hover:bg-[#ec2027] hover:text-white transition-all uppercase tracking-tighter shadow-md border-b-4 border-black/10 text-center">
          Email Main Center
        </a>
        <button onClick={onClose} className="w-full text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-[#292667] transition-all">
          Close Window
        </button>
      </div>
    </div>
  </div>
);

const AddMemberModal = ({ type, onClose, onSave }: { type: 'student' | 'teacher', onClose: () => void, onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idCode: '',
    role: type === 'teacher' ? 'Educator' : '',
    level: type === 'student' ? 'Digital Kids Starter V2' : ''
  });

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#292667]/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 max-md w-full shadow-2xl border-t-[12px] border-[#fbee21] relative animate-in slide-in-from-bottom-8 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#ec2027] transition-colors bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-4 mb-8">
           <div className={`p-4 rounded-2xl text-white shadow-lg ${type === 'student' ? 'bg-[#ec2027]' : 'bg-[#00a651]'}`}>
              {type === 'student' ? <UserPlus size={24} /> : <UserCheck size={24} />}
           </div>
           <div>
              <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight">Add New {type}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registering for U Book Store</p>
           </div>
        </div>

        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                 <input 
                   type="text" 
                   value={formData.firstName}
                   onChange={e => setFormData({...formData, firstName: e.target.value})}
                   placeholder="e.g. Timmy"
                   className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] focus:border-[#fbee21] focus:bg-white outline-none transition-all"
                 />
              </div>
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                 <input 
                   type="text" 
                   value={formData.lastName}
                   onChange={e => setFormData({...formData, lastName: e.target.value})}
                   placeholder="e.g. Lee"
                   className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] focus:border-[#fbee21] focus:bg-white outline-none transition-all"
                 />
              </div>
           </div>

           <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                 {type === 'student' ? 'Student ID Code' : 'Teacher Code'}
              </label>
              <input 
                type="text" 
                value={formData.idCode}
                onChange={e => setFormData({...formData, idCode: e.target.value})}
                placeholder={type === 'student' ? "7 Digits" : "UB-XXXX"}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-mono font-black text-[#ec2027] focus:border-[#fbee21] focus:bg-white outline-none transition-all"
              />
           </div>

           {type === 'teacher' ? (
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Role / Position</label>
                 <select 
                   value={formData.role}
                   onChange={e => setFormData({...formData, role: e.target.value})}
                   className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] outline-none"
                 >
                    <option>Educator</option>
                    <option>Assistant</option>
                    <option>Guest Speaker</option>
                 </select>
              </div>
           ) : (
              <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Learning Level</label>
                 <select 
                   value={formData.level}
                   onChange={e => setFormData({...formData, level: e.target.value})}
                   className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-[#292667] outline-none"
                 >
                    <option>Digital Kids Starter V2</option>
                    <option>Level 1 Core</option>
                    <option>Advanced AI</option>
                 </select>
              </div>
           )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
           <button onClick={onClose} className="flex-1 py-4 px-6 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
              Cancel
           </button>
           <button 
             onClick={() => onSave(formData)}
             className={`flex-[1.5] py-4 px-6 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border-b-4 border-black/10 ${type === 'student' ? 'bg-[#ec2027] shadow-red-100' : 'bg-[#00a651] shadow-green-100'}`}
           >
              <Save size={18} /> Save {type}
           </button>
        </div>
      </div>
    </div>
  );
};

export const ClassDetailView: React.FC<ClassDetailViewProps> = ({ classId, onStudentClick, onBack, onEnterCourse }) => {
  const cls = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [activeModal, setActiveModal] = useState<'student' | 'teacher' | null>(null);
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [isBrowseDropdownOpen, setIsBrowseDropdownOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrowseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddMember = (data: any) => {
    console.log(`Adding ${activeModal}:`, data);
    setActiveModal(null);
  };

  const registeredCourses = MOCK_COURSES.filter(c => 
    c.isPurchased && (courseSearch === '' || c.name.toLowerCase().includes(courseSearch.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      {showUpgrade && <UpgradePopup onClose={() => setShowUpgrade(false)} />}
      
      {activeModal && (
        <AddMemberModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          onSave={handleAddMember} 
        />
      )}
      
      {/* Standard Full-Width Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#fbee21] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
           <button onClick={onBack} className="p-5 bg-white/10 rounded-[2rem] text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90">
             <ChevronLeft size={42} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">{cls.name} <span className="text-[#fbee21]">Dashboard</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-[#00a651] rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">{cls.level}</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">{cls.schedule}</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">{cls.students.length}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Students</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <button 
             onClick={() => setShowUpgrade(true)}
             className="flex flex-col items-center bg-[#fbee21] text-[#292667] px-8 py-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 border-black/10 group"
           >
              <AlertCircle size={28} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest mt-1">Upgrade</p>
           </button>
        </div>
      </div>

      {/* Split Page View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
        
        {/* Left Column: Course Names & Info */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="bg-white rounded-[3rem] p-8 border-2 border-slate-100 shadow-xl flex flex-col overflow-hidden relative">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-2xl text-[#ec2027]">
                  <Layers size={32} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#292667]">Course Names</h3>
              </div>
              <div className="p-2 bg-[#fbee21]/20 rounded-xl">
                 <Sparkles size={20} className="text-[#292667]" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-2">
              {MOCK_COURSES.slice(0, 3).map(course => (
                <div 
                  key={course.id}
                  onClick={() => course.isPurchased && onEnterCourse(course.id)}
                  className={`relative rounded-[2rem] p-6 border-2 transition-all flex items-center justify-between overflow-hidden cursor-pointer ${
                    course.isPurchased 
                      ? 'bg-white border-slate-100 shadow-sm group hover:border-[#00a651] hover:shadow-xl' 
                      : 'bg-slate-50 border-slate-100 grayscale opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="relative z-10 min-w-0">
                    <h4 className={`font-black text-[#292667] text-lg truncate uppercase ${course.isPurchased ? 'group-hover:text-[#00a651]' : ''}`}>
                      {course.name}
                    </h4>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mt-2 ${course.isPurchased ? 'bg-[#00a651]/10 text-[#00a651]' : 'bg-slate-200 text-slate-400'}`}>
                      {course.isPurchased ? 'Active Registration' : 'Locked Asset'}
                    </span>
                  </div>
                  {course.isPurchased && (
                    <div className="w-10 h-10 bg-[#00a651] text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ChevronRight size={24} strokeWidth={4} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* DROPDOWN CONTAINER FOR BROWSE MORE COURSES */}
            <div className="relative mt-6" ref={dropdownRef}>
              <button 
                onClick={() => setIsBrowseDropdownOpen(!isBrowseDropdownOpen)}
                className={`w-full py-5 px-8 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all border-b-6 border-black/10 flex items-center justify-center gap-3 ${
                  isBrowseDropdownOpen ? 'bg-[#ec2027] text-white border-red-900 shadow-red-100' : 'bg-[#292667] text-[#fbee21] hover:bg-[#ec2027] hover:text-white'
                }`}
              >
                {isBrowseDropdownOpen ? <X size={20} /> : <BookMarked size={20} />}
                {isBrowseDropdownOpen ? 'Close Library' : 'Browse More Courses'}
              </button>

              {isBrowseDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-4 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-4 border-[#292667] overflow-hidden z-[120] animate-in slide-in-from-bottom-10 fade-in duration-300">
                  <div className="p-6 bg-[#292667] text-white flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <BookMarked size={20} className="text-[#fbee21]" />
                        <h4 className="font-black text-sm uppercase tracking-widest">Your Registered U Books</h4>
                     </div>
                     <span className="text-[10px] font-black text-[#fbee21] px-2 py-1 bg-white/10 rounded-lg">{registeredCourses.length} TOTAL</span>
                  </div>
                  <div className="p-4 bg-slate-50 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-slate-200 focus-within:border-[#00a651] transition-all">
                      <Search size={16} className="text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Quick filter books..." 
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        className="bg-transparent text-xs font-bold text-[#292667] outline-none w-full"
                      />
                    </div>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto scrollbar-hide p-3 space-y-2">
                    {registeredCourses.length > 0 ? (
                      registeredCourses.map(course => (
                        <button 
                          key={course.id}
                          onClick={() => {
                            onEnterCourse(course.id);
                            setIsBrowseDropdownOpen(false);
                          }}
                          className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-between group border-2 border-transparent hover:border-[#00a651]"
                        >
                          <div className="min-w-0">
                            <p className="font-black text-[#292667] text-xs uppercase tracking-tight truncate group-hover:text-[#00a651]">{course.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Difficulty: {course.level || 'Intermediate'}</p>
                          </div>
                          <div className="p-2 bg-green-50 text-[#00a651] rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <CheckCircle2 size={16} strokeWidth={3} />
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                         <Search size={32} className="mx-auto text-slate-200 mb-3" />
                         <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">No books found in your library</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Member Management (Tabs) */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center border-b-4 border-slate-100">
             <button 
               onClick={() => setActiveTab('students')}
               className={`flex-1 flex flex-col items-center justify-center py-6 font-black text-sm uppercase transition-all border-b-8 gap-1 ${activeTab === 'students' ? 'border-[#ec2027] text-[#292667] bg-red-50/20' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
             >
               <GraduationCap size={28} strokeWidth={3} /> 
               <span>Learner Roster</span>
             </button>
             <button 
               onClick={() => setActiveTab('teachers')}
               className={`flex-1 flex flex-col items-center justify-center py-6 font-black text-sm uppercase transition-all border-b-8 gap-1 ${activeTab === 'teachers' ? 'border-[#00a651] text-[#292667] bg-green-50/20' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
             >
               <UsersIcon size={28} strokeWidth={3} />
               <span>Teacher Portal</span>
             </button>
          </div>

          <div className="p-6 bg-slate-50 flex items-center justify-between border-b-2 border-slate-100">
             <div className="flex items-center gap-3">
                <Sparkles size={24} className="text-amber-500" />
                <p className="text-xs font-black text-[#292667] uppercase tracking-widest">Authorized Members Only</p>
             </div>
             <button 
               onClick={() => setActiveModal(activeTab === 'students' ? 'student' : 'teacher')}
               className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-white font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all border-b-4 border-black/10 ${activeTab === 'students' ? 'bg-[#ec2027]' : 'bg-[#00a651]'}`}
             >
                {activeTab === 'students' ? <UserPlus size={20} /> : <UserCheck size={20} />}
                Add New {activeTab}
             </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white shadow-sm text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] z-10">
                <tr>
                  <th className="px-10 py-5">IDENTIFIER</th>
                  <th className="px-10 py-5">FULL NAME</th>
                  {activeTab === 'students' && (
                    <>
                      <th className="px-10 py-5">PROGRESS</th>
                      <th className="px-10 py-5">SUBMISSION RECORDS</th>
                    </>
                  )}
                  <th className="px-10 py-5 text-right">CONTROLS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {activeTab === 'students' ? (
                  cls.students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-10 py-6 font-mono text-sm font-black text-[#ec2027] cursor-pointer" onClick={() => onStudentClick(s.id)}>
                        {s.username}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <img src={`https://picsum.photos/seed/${s.id}/40`} className="w-10 h-10 rounded-xl" alt="" />
                          <span className="font-black text-[#292667] text-lg uppercase tracking-tight">{s.firstName} {s.lastName}</span>
                        </div>
                      </td>
                      {activeTab === 'students' && (
                        <>
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-3 min-w-[120px]">
                              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                <div 
                                  className={`h-full transition-all duration-1000 ${s.taskCompletion >= 90 ? 'bg-[#00a651]' : 'bg-[#3b82f6]'}`} 
                                  style={{ width: `${s.taskCompletion}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] font-black text-[#292667]">{s.taskCompletion}%</span>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <button 
                              onClick={() => onStudentClick(s.id)}
                              className="p-2.5 bg-slate-100 text-slate-400 hover:bg-[#292667] hover:text-white rounded-xl transition-all shadow-sm group/btn"
                              title="View Submission Records"
                            >
                              <Eye size={18} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                          </td>
                        </>
                      )}
                      <td className="px-10 py-6 text-right">
                        <button className="p-3 bg-white text-slate-300 hover:text-red-500 rounded-2xl border-2 border-slate-100 transition-all hover:scale-110"><Trash2 size={20} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  cls.teachers.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-10 py-6">
                        <span className="font-mono text-sm font-black text-[#00a651] uppercase tracking-widest">Active Staff</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <img src={`https://picsum.photos/seed/${t.id}/40`} className="w-10 h-10 rounded-xl" alt="" />
                          <span className="font-black text-[#292667] text-lg uppercase tracking-tight">{t.firstName} {t.lastName}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-[#00a651]/20">Authorized</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
