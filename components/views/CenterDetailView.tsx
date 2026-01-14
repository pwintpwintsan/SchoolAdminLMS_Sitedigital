
import React, { useState } from 'react';
import { MOCK_SCHOOLS, MOCK_COURSES } from '../../constants.tsx';
import { 
  ChevronLeft, 
  Building2, 
  MapPin, 
  Mail, 
  Users, 
  ShoppingCart, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  X, 
  Save, 
  Plus, 
  Settings2,
  BookOpen,
  LayoutGrid,
  FileText,
  GraduationCap,
  Lock,
  ShoppingBag,
  ClipboardList,
  Eye
} from 'lucide-react';

interface CenterDetailViewProps {
  centerId: string;
  onBack: () => void;
  onManageCourse: (courseId: string) => void;
  onPreviewCourse: (courseId: string) => void;
}

const OrderRequiredModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#292667]/90 backdrop-blur-xl animate-in fade-in duration-300">
    <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#ec2027] text-center animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
         <ClipboardList size={40} className="text-[#ec2027]" strokeWidth={3} />
      </div>
      <h3 className="text-3xl font-black text-[#292667] mb-4 uppercase tracking-tight leading-none">Order Required</h3>
      <p className="text-slate-500 font-bold mb-10 text-base leading-relaxed">
        This program is not yet unlocked in your global library. To add this course to your hubs, please <span className="text-[#ec2027]">make an order</span> or contact our support team.
      </p>
      <div className="flex flex-col gap-4">
        <button className="w-full py-5 px-8 bg-[#292667] text-[#fbee21] rounded-[1.5rem] font-black text-lg uppercase tracking-widest hover:bg-[#ec2027] hover:text-white transition-all shadow-xl active:scale-95 border-b-4 border-black/10">
          Order Now
        </button>
        <button onClick={onClose} className="w-full py-4 px-8 bg-slate-50 text-slate-400 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>
);

const CourseSelectionModal = ({ onClose, onAdd }: { onClose: () => void, onAdd: (course: any) => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border-t-[12px] border-[#00a651] relative animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
        <X size={20} strokeWidth={3} />
      </button>

      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="p-4 bg-[#00a651] text-white rounded-2xl shadow-xl">
          <PlusCircle size={28} strokeWidth={3} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Add Courses</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Library Access</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {MOCK_COURSES.map(course => (
          <div key={course.id} className="p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] flex items-center justify-between hover:border-[#00a651] hover:bg-white transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#292667]/5 rounded-2xl flex items-center justify-center text-[#292667]">
                {course.isPurchased ? <BookOpen size={24} /> : <Lock size={24} className="text-slate-300" />}
              </div>
              <div className="min-w-0">
                <p className={`font-black uppercase text-sm leading-tight truncate ${course.isPurchased ? 'text-[#292667]' : 'text-slate-400'}`}>
                  {course.name}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{course.category}</p>
              </div>
            </div>
            <button 
              onClick={() => onAdd(course)}
              className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border-b-2 border-black/10 flex-shrink-0 ${
                course.isPurchased 
                  ? 'bg-[#292667] text-[#fbee21] hover:bg-[#00a651] hover:text-white' 
                  : 'bg-slate-200 text-slate-400 hover:bg-[#ec2027] hover:text-white'
              }`}
            >
              {course.isPurchased ? 'Add' : 'Order'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 shrink-0">
        <button onClick={onClose} className="w-full py-4 px-8 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
          Close
        </button>
      </div>
    </div>
  </div>
);

const HubSettingsModal = ({ school, onClose }: { school: any, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-xl w-full shadow-2xl border-t-[12px] border-[#3b82f6] relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
        <X size={20} strokeWidth={3} />
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-[#3b82f6] text-white rounded-2xl shadow-xl">
          <Settings2 size={28} strokeWidth={3} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Hub Settings</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage Center Profiles</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Center / Branch Name</label>
          <input type="text" defaultValue={school.name} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#3b82f6] transition-all" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / District</label>
            <input type="text" defaultValue={school.location} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#3b82f6] transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
            <input type="email" defaultValue={school.adminEmail} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#3b82f6] transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Staff Quota</label>
            <input type="number" defaultValue={school.teacherQuota} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#3b82f6] transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Quota</label>
            <input type="number" defaultValue={school.studentQuota} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#292667] outline-none focus:border-[#3b82f6] transition-all" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button onClick={onClose} className="flex-1 py-4 px-8 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
        <button onClick={onClose} className="flex-[2] py-4 px-8 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3b82f6] hover:text-white shadow-lg transition-all border-b-4 border-black/10 active:scale-95">
          <Save size={20} /> Apply Changes
        </button>
      </div>
    </div>
  </div>
);

export const CenterDetailView: React.FC<CenterDetailViewProps> = ({ centerId, onBack, onManageCourse, onPreviewCourse }) => {
  const school = MOCK_SCHOOLS.find(s => s.id === centerId) || MOCK_SCHOOLS[0];
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingHub, setIsEditingHub] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const handleAddCourse = (course: any) => {
    if (!course.isPurchased) {
      setShowOrderPopup(true);
    } else {
      alert(`${course.name} added successfully!`);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 md:gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      {isAddingCourse && <CourseSelectionModal onClose={() => setIsAddingCourse(false)} onAdd={handleAddCourse} />}
      {isEditingHub && <HubSettingsModal school={school} onClose={() => setIsEditingHub(false)} />}
      {showOrderPopup && <OrderRequiredModal onClose={() => setShowOrderPopup(false)} />}

      {/* Header Bar */}
      <div className="w-full bg-[#292667] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 lg:p-8 text-white shadow-2xl border-b-[8px] md:border-b-[10px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 md:gap-6 relative z-10">
           <button onClick={onBack} className="p-3 md:p-5 bg-white/10 rounded-2xl text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10 flex-shrink-0">
             <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-xl md:text-3xl lg:text-4xl font-black leading-none tracking-tight uppercase truncate max-w-[300px] md:max-w-none">{school.name} <span className="text-[#fbee21]">Hub</span></h2>
             <div className="flex items-center gap-3 mt-2 md:mt-3">
                <span className="px-2.5 py-1 bg-[#3b82f6] rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">OVERVIEW</span>
                <span className="text-[10px] md:text-[12px] font-black text-[#fbee21] uppercase tracking-widest hidden sm:block">{school.location} Division</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10 px-4 md:px-8 md:border-l-4 border-white/10 relative z-10 w-full md:w-auto justify-between md:justify-end">
           <div className="text-center group cursor-default">
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-[#fbee21] leading-none">{school.currentTeacherCount}</p>
              <p className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest mt-1 md:mt-2">Active Staff</p>
           </div>
           <div className="w-px h-10 md:h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-[#00a651] leading-none">{school.currentStudentCount}</p>
              <p className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-widest mt-1 md:mt-2">Total Students</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 overflow-hidden pb-2">
        {/* Hub Side Info */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-6 overflow-hidden">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border-2 border-slate-100 flex flex-col h-full overflow-hidden">
            <h3 className="text-lg md:text-xl font-black text-[#292667] uppercase tracking-tight mb-4 md:mb-6 flex items-center gap-3 flex-shrink-0">
               <ShieldCheck className="text-[#3b82f6]" size={22} /> Hub Management
            </h3>
            
            <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto scrollbar-hide pr-1">
              <div className="p-4 bg-slate-50 rounded-2xl border-b-4 border-slate-100 group hover:border-[#3b82f6] transition-colors">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                   <MapPin size={10} className="text-[#ec2027]" /> Physical Hub
                </p>
                <p className="text-base md:text-lg font-black text-[#292667] uppercase leading-tight">{school.location} Area</p>
              </div>

              {/* Staff Quota Status */}
              <div className="p-4 bg-[#292667] rounded-2xl text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8 blur-lg"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#ec2027] rounded-xl shadow-lg">
                      <Users size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-[#fbee21] uppercase tracking-[0.2em] mb-0.5 leading-none">Staff Quota</h4>
                      <p className="text-xl font-black leading-none">{school.currentTeacherCount} <span className="text-white/30 text-xs">/ {school.teacherQuota}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">Status</p>
                    <p className="text-[10px] font-black text-[#00a651] uppercase leading-none">
                      {school.currentTeacherCount >= school.teacherQuota ? 'FULL' : `${school.teacherQuota - school.currentTeacherCount} OPEN`}
                    </p>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden shadow-inner">
                  <div className="h-full bg-[#fbee21] rounded-full transition-all duration-1000" style={{ width: `${(school.currentTeacherCount / school.teacherQuota) * 100}%` }}></div>
                </div>
              </div>

              {/* Student Quota Status */}
              <div className="p-4 bg-[#292667] rounded-2xl text-white shadow-lg relative overflow-hidden group border-b-4 border-[#3b82f6]">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8 blur-lg"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#3b82f6] rounded-xl shadow-lg">
                      <GraduationCap size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black text-[#fbee21] uppercase tracking-[0.2em] mb-0.5 leading-none">Student Quota</h4>
                      <p className="text-xl font-black leading-none">{school.currentStudentCount} <span className="text-white/30 text-xs">/ {school.studentQuota}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">Status</p>
                    <p className="text-[10px] font-black text-[#00a651] uppercase leading-none">
                      {school.currentStudentCount >= school.studentQuota ? 'FULL' : `${school.studentQuota - school.currentStudentCount} OPEN`}
                    </p>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden shadow-inner">
                  <div className="h-full bg-[#00a651] rounded-full transition-all duration-1000" style={{ width: `${(school.currentStudentCount / school.studentQuota) * 100}%` }}></div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEditingHub(true)}
              className="w-full py-4 px-6 md:py-5 md:px-8 mt-4 md:mt-6 bg-[#292667] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#3b82f6] transition-all active:scale-95 border-b-4 border-black/20 flex-shrink-0 flex items-center justify-center gap-3"
            >
              <Settings2 size={16} /> Modify Hub Settings
            </button>
          </div>
        </div>

        {/* Courses Inventory */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-6 md:p-10 border-2 border-slate-100 shadow-2xl overflow-hidden flex flex-col">
           <div className="flex items-center justify-between mb-6 md:mb-10 flex-shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                 <div className="p-3 md:p-4 bg-red-50 text-[#ec2027] rounded-2xl shadow-sm">
                   <BookOpen size={24} strokeWidth={3} />
                 </div>
                 <div className="min-w-0">
                    <h3 className="text-lg md:text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none truncate">Ordered Courses</h3>
                    <p className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 md:mt-2 truncate">Active curriculum library for this hub</p>
                 </div>
              </div>
              <button 
                onClick={() => setIsAddingCourse(true)}
                className="px-5 py-3 md:px-8 md:py-4 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#00a651] hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2 md:gap-3 border-b-4 border-black/10 flex-shrink-0"
              >
                 <PlusCircle size={16} /> <span className="hidden sm:inline">Add Courses</span>
              </button>
           </div>

           <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pb-4">
                 {MOCK_COURSES.filter(c => c.isPurchased).map((course, idx) => (
                   <div key={course.id} className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border-2 border-transparent hover:border-[#00a651] hover:bg-white transition-all group flex flex-col shadow-lg overflow-hidden animate-in slide-in-from-bottom-8 h-full" style={{ animationDelay: `${idx * 80}ms` }}>
                      <div className="flex items-start justify-between mb-4 md:mb-6 flex-shrink-0">
                         <div 
                           onClick={() => onPreviewCourse(course.id)}
                           className="w-14 h-14 md:w-16 md:h-16 bg-[#292667] text-[#fbee21] rounded-2xl shadow-xl flex items-center justify-center group-hover:rotate-6 transition-transform flex-shrink-0 cursor-pointer"
                         >
                           <LayoutGrid size={28} strokeWidth={2.5} />
                         </div>
                         <div className="p-2 md:p-2.5 bg-white text-[#00a651] rounded-xl shadow-md group-hover:bg-[#00a651] group-hover:text-white transition-all">
                           <CheckCircle2 size={18} strokeWidth={3} />
                         </div>
                      </div>
                      
                      <div className="mb-6 md:mb-8 flex-1">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-1 bg-[#00a651]/10 text-[#00a651] text-[9px] font-black uppercase tracking-widest rounded-lg">LICENSE ACTIVE</span>
                            <Sparkles size={12} className="text-amber-400" />
                         </div>
                         <h4 
                           onClick={() => onPreviewCourse(course.id)}
                           className="text-xl md:text-2xl font-black text-[#292667] uppercase tracking-tight leading-tight mb-2 md:mb-3 group-hover:text-[#00a651] transition-colors line-clamp-2 cursor-pointer"
                         >
                           {course.name}
                         </h4>
                         <p className="text-[10px] md:text-xs text-slate-400 font-bold leading-relaxed line-clamp-3">{course.description}</p>
                      </div>

                      <div className="mt-auto grid grid-cols-2 gap-3 md:gap-4 flex-shrink-0">
                         <button 
                            onClick={() => onPreviewCourse(course.id)}
                            className="p-3 md:p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-center gap-2 md:gap-3 group-hover:bg-slate-50 transition-colors"
                          >
                            <Eye size={16} className="text-[#3b82f6]" />
                            <span className="text-[9px] md:text-[10px] font-black text-[#292667] uppercase tracking-widest leading-none">Preview</span>
                         </button>
                         <button 
                            onClick={() => onManageCourse(course.id)}
                            className="p-3 md:p-4 bg-[#292667] text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#ec2027] transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 border-b-4 border-black/10"
                          >
                            Manage <ArrowRight size={14} />
                         </button>
                      </div>
                   </div>
                 ))}
                 
                 <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4 md:gap-6 opacity-60 hover:opacity-100 transition-opacity h-full group cursor-pointer" onClick={() => setIsAddingCourse(true)}>
                    <Trophy size={48} className="text-slate-200 group-hover:text-amber-400 transition-colors" />
                    <div>
                       <h4 className="text-lg md:text-xl font-black text-slate-300 uppercase tracking-widest leading-none mb-2">Order More?</h4>
                       <p className="text-[10px] md:text-xs font-bold text-slate-300 uppercase max-w-[160px] mx-auto">Explore our premium library of AI and Robotics courses.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
