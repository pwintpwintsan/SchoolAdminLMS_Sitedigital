
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_COURSES, MOCK_SCHOOLS } from '../../constants.tsx';
import { Course, Module, Lesson, QuizQuestion } from '../../types.ts';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ChevronLeft, 
  Video, 
  ClipboardList, 
  HelpCircle, 
  Save, 
  Type, 
  Filter, 
  FilterX, 
  Sparkles,
  Layers,
  X,
  Clock,
  BarChart3,
  Rocket,
  Eye,
  CheckCircle2,
  ALargeSmall,
  Hash,
  ToggleRight,
  Zap,
  Lock,
  Globe,
  Building2
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const NewCourseModal = ({ onClose, onProceed }: { onClose: () => void, onProceed: (data: Partial<Course>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    level: 'Starter',
    duration: '',
    description: '',
    category: 'Standard Curriculum'
  });

  const isValid = formData.name && formData.duration && formData.description;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-xl w-full shadow-2xl border-t-[15px] border-[#00a651] relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-6 mb-8">
          <div className="p-5 bg-[#00a651] text-white rounded-[2rem] shadow-xl rotate-3">
            <Plus size={42} strokeWidth={4} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#292667] uppercase tracking-tighter leading-none">New Courses</h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">Initialize Curriculum Data</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Program Name</label>
            <input 
              type="text" 
              placeholder="e.g. AI Explorers: Level 1" 
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-black text-xl text-[#292667] outline-none focus:border-[#00a651] transition-all placeholder:text-slate-200"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <BarChart3 size={14} /> Difficulty Level
              </label>
              <select 
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-black text-sm text-[#292667] outline-none focus:border-[#00a651] transition-all uppercase appearance-none cursor-pointer"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
              >
                <option>Starter</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Master Class</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Clock size={14} /> Estimated Duration
              </label>
              <input 
                type="text" 
                placeholder="e.g. 12 Hours" 
                className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-black text-sm text-[#292667] outline-none focus:border-[#00a651] transition-all placeholder:text-slate-200"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
            <textarea 
              placeholder="What will the learners discover in this U Book?" 
              rows={3}
              className="w-full bg-slate-50 px-6 py-5 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#00a651] outline-none font-bold text-base text-[#292667] shadow-inner transition-all resize-none placeholder:text-slate-200"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button onClick={onClose} className="flex-1 py-6 px-8 bg-slate-100 text-slate-400 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button 
            disabled={!isValid}
            onClick={() => onProceed(formData)}
            className={`flex-[2] py-6 px-8 rounded-[1.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all border-b-6 border-black/10 active:scale-95 ${
              isValid ? 'bg-[#292667] text-[#fbee21] hover:bg-[#00a651] hover:text-white shadow-xl' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Rocket size={24} /> Proceed to Creation
          </button>
        </div>
      </div>
    </div>
  );
};

export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ initialCourseId, onExitEdit, onPreviewCourse, checkPermission }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  
  // Permission Checks
  const canEdit = checkPermission?.('courses', 'edit') ?? true;
  const canDelete = checkPermission?.('courses', 'delete') ?? true;

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    if (initialCourseId) {
      const course = courses.find(c => c.id === initialCourseId);
      if (course) {
        setEditingCourse(course);
        if (course.modules.length > 0) setActiveModuleIndex(0);
      }
    }
  }, [initialCourseId, courses]);

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchTerm, categoryFilter, levelFilter]);

  const handleStartNewCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: 'course_' + Date.now(),
      name: data.name || 'Untitled Course',
      category: data.category || 'Standard Curriculum',
      description: data.description || '',
      level: data.level || 'Starter',
      duration: data.duration || '10 Hours',
      isPurchased: true,
      thumbnail: `https://picsum.photos/seed/${Date.now()}/400/300`,
      modules: [],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setCourses([newCourse, ...courses]);
    setIsAddingCourse(false);
    setEditingCourse(newCourse);
  };

  const handleAddModule = () => {
    if (!editingCourse || !canEdit) return;
    const newModule: Module = {
      id: 'm' + Date.now(),
      title: 'New Module',
      lessons: []
    };
    const updated = {
      ...editingCourse,
      modules: [...editingCourse.modules, newModule]
    };
    setEditingCourse(updated);
    setCourses(courses.map(c => c.id === updated.id ? updated : c));
    setActiveModuleIndex(updated.modules.length - 1);
  };

  const handleAddLesson = (moduleIdx: number, type: Lesson['type']) => {
    if (!editingCourse || !canEdit) return;
    const taskNumber = editingCourse.modules[moduleIdx].lessons.length + 1;
    const newLesson: Lesson = {
      id: 'l' + Date.now(),
      title: 'Task ' + taskNumber + ': New ' + type.charAt(0).toUpperCase() + type.slice(1),
      type: type,
      content: '',
      quiz: type === 'quiz' ? [] : undefined,
      characterLimit: (type === 'assignment' || type === 'text') ? 500 : undefined,
      autoPassOnUpload: (type === 'assignment' || type === 'text') ? false : undefined,
      isPublished: true,
      isSample: false
    };
    const updatedModules = [...editingCourse.modules];
    updatedModules[moduleIdx].lessons.push(newLesson);
    const updated = { ...editingCourse, modules: updatedModules };
    setEditingCourse(updated);
    setCourses(courses.map(c => c.id === updated.id ? updated : c));
  };

  const handleAddQuizQuestion = (moduleIdx: number, lessonIdx: number) => {
    if (!editingCourse || !canEdit) return;
    const newQuestion: QuizQuestion = {
      id: 'q' + Date.now(),
      question: 'New Multiple Choice Question',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0
    };
    const newModules = [...editingCourse.modules];
    if (!newModules[moduleIdx].lessons[lessonIdx].quiz) {
      newModules[moduleIdx].lessons[lessonIdx].quiz = [];
    }
    newModules[moduleIdx].lessons[lessonIdx].quiz!.push(newQuestion);
    const updated = { ...editingCourse, modules: newModules };
    setEditingCourse(updated);
  };

  const handleCloseEditor = () => {
    setEditingCourse(null);
    onExitEdit?.();
  };

  if (editingCourse) {
    return (
      <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in slide-in-from-right duration-500">
        <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/5 pointer-events-none"></div>
          <div className="flex items-center gap-6 relative z-10">
            <button onClick={handleCloseEditor} className="p-4 bg-white/10 rounded-[1.5rem] hover:bg-[#ec2027] transition-all border-2 border-white/20">
              <ChevronLeft size={32} strokeWidth={4} />
            </button>
            <div>
              <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Designer Hub</h2>
              <p className="text-[11px] font-black text-[#fbee21] uppercase tracking-[0.1em] mt-2 truncate max-w-[300px]">Current: {editingCourse.name}</p>
            </div>
          </div>
          {canEdit ? (
            <button onClick={handleCloseEditor} className="px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-6 border-black/10">
              <Save size={24} className="inline mr-2" /> <span>Save Changes</span>
            </button>
          ) : (
            <div className="px-10 py-5 bg-slate-100 text-slate-400 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-3">
              <Lock size={20} /> View Only
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight">Modules</h3>
              {canEdit && (
                <button onClick={handleAddModule} className="p-3 bg-[#00a651] text-white rounded-xl hover:bg-[#292667] transition-all shadow-md">
                  <Plus size={20} strokeWidth={3} />
                </button>
              )}
            </div>
            <div className="space-y-3 flex-1">
              {editingCourse.modules.map((mod, idx) => (
                <div 
                  key={mod.id} 
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer group ${activeModuleIndex === idx ? 'border-[#00a651] bg-[#00a651]/5 shadow-inner' : 'border-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <input 
                      disabled={!canEdit}
                      value={mod.title}
                      onChange={(e) => {
                        const newMods = [...editingCourse.modules];
                        newMods[idx].title = e.target.value;
                        const updated = {...editingCourse, modules: newMods};
                        setEditingCourse(updated);
                        setCourses(courses.map(c => c.id === updated.id ? updated : c));
                      }}
                      className={`bg-transparent font-black text-[#292667] text-sm uppercase outline-none flex-1 mr-2 focus:text-[#00a651] truncate ${!canEdit && 'cursor-pointer'}`}
                    />
                    {canEdit && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} className="text-slate-300 hover:text-[#ec2027]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{mod.lessons.length} TASKS</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide">
            {activeModuleIndex !== null && editingCourse.modules[activeModuleIndex] ? (
              <div className="space-y-8">
                <div className="flex items-end justify-between border-b-4 border-slate-50 pb-5">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-[#00a651] uppercase tracking-[0.1em] mb-2">Module Contents</p>
                    <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter truncate">
                      {editingCourse.modules[activeModuleIndex].title}
                    </h3>
                  </div>
                </div>
                
                {canEdit && (
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { type: 'video', label: 'Video', icon: Video, color: 'indigo', bg: 'bg-indigo-500' },
                      { type: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'amber', bg: 'bg-amber-500' },
                      { type: 'assignment', label: 'Task', icon: ClipboardList, color: 'rose', bg: 'bg-rose-500' },
                      { type: 'text', label: 'Doc', icon: Type, color: 'emerald', bg: 'bg-emerald-500' }
                    ].map((btn) => {
                      const BtnIcon = btn.icon;
                      return (
                        <button 
                          key={btn.type}
                          onClick={() => handleAddLesson(activeModuleIndex!, btn.type as Lesson['type'])} 
                          className={`flex flex-col items-center justify-center gap-3 p-5 bg-${btn.color}-50 text-${btn.color}-600 rounded-[1.5rem] border-2 border-transparent hover:border-${btn.color}-500 hover:bg-white transition-all shadow-sm group active:scale-95`}
                        >
                           <div className={`${btn.bg} text-white p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform`}>
                             <BtnIcon size={24} strokeWidth={2.5} />
                           </div>
                           <span className="font-black text-[10px] uppercase tracking-widest">{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-6 pb-10">
                  {editingCourse.modules[activeModuleIndex].lessons.map((lesson, lessonIdx) => (
                    <div key={lesson.id} className="bg-slate-50 p-6 md:p-8 rounded-[2.5rem] border-2 border-slate-100 relative group animate-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`p-3 rounded-2xl shadow-sm text-white flex-shrink-0 ${
                            lesson.type === 'video' ? 'bg-indigo-500' : 
                            lesson.type === 'quiz' ? 'bg-amber-500' : 
                            lesson.type === 'assignment' ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}>
                            {lesson.type === 'video' ? <Video size={20} /> : lesson.type === 'quiz' ? <HelpCircle size={20} /> : lesson.type === 'assignment' ? <ClipboardList size={20} /> : <Type size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input 
                              disabled={!canEdit}
                              value={lesson.title}
                              className={`text-xl font-black text-[#292667] bg-transparent outline-none w-full uppercase tracking-tight truncate leading-none ${!canEdit && 'cursor-default'}`}
                              onChange={(e) => {
                                const newMods = [...editingCourse.modules];
                                newMods[activeModuleIndex!].lessons[lessonIdx].title = e.target.value;
                                const updated = {...editingCourse, modules: newMods};
                                setEditingCourse(updated);
                              }}
                            />
                            <div className="flex items-center gap-3 mt-2">
                               {lesson.autoPassOnUpload && (
                                 <div className="flex items-center gap-1 text-[#00a651]">
                                   <Zap size={10} fill="currentColor" />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Auto-Pass</span>
                                 </div>
                               )}
                               {lesson.isSample && (
                                 <div className="flex items-center gap-1 text-[#3b82f6]">
                                   <Globe size={10} strokeWidth={3} />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Published Sample</span>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                        {canEdit && (
                          <button className="p-2 text-slate-300 hover:text-[#ec2027] transition-colors"><Trash2 size={24} /></button>
                        )}
                      </div>
                      
                      <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-inner space-y-6">
                         {/* Status Toggles: Published and Sample */}
                         {canEdit && (
                           <div className="flex flex-wrap items-center gap-4 border-b border-slate-50 pb-6">
                              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                 <span className="text-[9px] font-black text-[#292667] uppercase tracking-widest">Visibility</span>
                                 <button 
                                   onClick={() => {
                                      const newMods = [...editingCourse.modules];
                                      newMods[activeModuleIndex!].lessons[lessonIdx].isPublished = !lesson.isPublished;
                                      setEditingCourse({...editingCourse, modules: newMods});
                                   }}
                                   className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${lesson.isPublished ? 'bg-[#00a651] text-white' : 'bg-slate-200 text-slate-400'}`}
                                 >
                                    {lesson.isPublished ? 'Published' : 'Hidden'}
                                 </button>
                              </div>
                              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                 <span className="text-[9px] font-black text-[#292667] uppercase tracking-widest">Sample Access</span>
                                 <button 
                                   onClick={() => {
                                      const newMods = [...editingCourse.modules];
                                      newMods[activeModuleIndex!].lessons[lessonIdx].isSample = !lesson.isSample;
                                      setEditingCourse({...editingCourse, modules: newMods});
                                   }}
                                   className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${lesson.isSample ? 'bg-[#3b82f6] text-white' : 'bg-slate-200 text-slate-400'}`}
                                 >
                                    {lesson.isSample ? 'Sample Content' : 'Premium Only'}
                                 </button>
                              </div>
                           </div>
                         )}

                         {/* Auto-Pass Toggle */}
                         {(lesson.type === 'assignment' || lesson.type === 'text') && (
                           <div className={`flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100 group/auto ${!canEdit && 'opacity-60'}`}>
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover/auto:scale-110 transition-transform">
                                   <Zap size={20} className="text-[#00a651]" strokeWidth={3} />
                                </div>
                                <div>
                                   <p className="text-xs font-black text-[#292667] uppercase tracking-widest">Auto-Pass Activation</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase">Learner passes automatically after submitting their work</p>
                                </div>
                             </div>
                             <button 
                               disabled={!canEdit}
                               onClick={() => {
                                 const newMods = [...editingCourse.modules];
                                 newMods[activeModuleIndex!].lessons[lessonIdx].autoPassOnUpload = !lesson.autoPassOnUpload;
                                 setEditingCourse({...editingCourse, modules: newMods});
                               }}
                               className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner overflow-hidden ${lesson.autoPassOnUpload ? 'bg-[#00a651]' : 'bg-slate-200'} ${!canEdit && 'cursor-default'}`}
                             >
                                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${lesson.autoPassOnUpload ? 'translate-x-6' : 'translate-x-0'}`} />
                             </button>
                           </div>
                         )}

                         {/* Content Fields */}
                         {(lesson.type === 'text' || lesson.type === 'assignment') && (
                           <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                 <ALargeSmall size={14} /> Task Description / Instructions
                               </label>
                               <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                 <Hash size={12} className="text-slate-400" />
                                 <span className="text-[10px] font-black text-slate-400 uppercase">Limit:</span>
                                 <input 
                                   disabled={!canEdit}
                                   type="number"
                                   className={`w-16 bg-transparent outline-none text-[10px] font-black text-[#292667] ${!canEdit && 'cursor-default'}`}
                                   value={lesson.characterLimit || 500}
                                   onChange={(e) => {
                                      const newMods = [...editingCourse.modules];
                                      newMods[activeModuleIndex!].lessons[lessonIdx].characterLimit = parseInt(e.target.value);
                                      setEditingCourse({...editingCourse, modules: newMods});
                                   }}
                                 />
                               </div>
                             </div>
                             <textarea 
                               disabled={!canEdit}
                               placeholder={lesson.type === 'assignment' ? "What should the student do?" : "Type your learning content here..."} 
                               rows={4} 
                               className={`w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold text-sm text-[#292667] resize-none outline-none focus:border-[#00a651] transition-all ${!canEdit && 'cursor-default'}`}
                               value={lesson.type === 'assignment' ? lesson.assignmentInstructions : lesson.content}
                               onChange={(e) => {
                                  const newMods = [...editingCourse.modules];
                                  if (lesson.type === 'assignment') newMods[activeModuleIndex!].lessons[lessonIdx].assignmentInstructions = e.target.value;
                                  else newMods[activeModuleIndex!].lessons[lessonIdx].content = e.target.value;
                                  setEditingCourse({...editingCourse, modules: newMods});
                               }}
                             />
                           </div>
                         )}

                         {lesson.type === 'video' && (
                           <div className="space-y-4">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Video Endpoint</label>
                             <div className="flex gap-4">
                               <input 
                                 disabled={!canEdit}
                                 placeholder="Paste YouTube or Vimeo URL here..." 
                                 className={`flex-1 px-5 py-3.5 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold text-sm text-[#292667] outline-none focus:border-indigo-400 ${!canEdit && 'cursor-default'}`} 
                               />
                               {canEdit && <button className="px-8 py-3.5 bg-[#292667] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-md">Connect</button>}
                             </div>
                           </div>
                         )}

                         {/* Quiz Editor */}
                         {lesson.type === 'quiz' && (
                           <div className="space-y-6">
                             <div className="flex items-center justify-between">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multiple Choice Questions</label>
                               {canEdit && (
                                 <button 
                                   onClick={() => handleAddQuizQuestion(activeModuleIndex!, lessonIdx)}
                                   className="px-4 py-2 bg-[#00a651] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#292667] transition-all flex items-center gap-2"
                                 >
                                   <Plus size={14} strokeWidth={3} /> Add Question
                                 </button>
                               )}
                             </div>
                             
                             <div className="space-y-6">
                               {lesson.quiz?.map((q, qIdx) => (
                                 <div key={q.id} className="p-6 bg-slate-50 rounded-[1.5rem] border-2 border-slate-100 space-y-4">
                                   <div className="flex items-center gap-4">
                                      <div className="w-8 h-8 rounded-full bg-[#292667] text-white flex items-center justify-center text-xs font-black">
                                        {qIdx + 1}
                                      </div>
                                      <input 
                                        disabled={!canEdit}
                                        className={`flex-1 bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-[#292667] outline-none focus:border-amber-400 ${!canEdit && 'cursor-default'}`}
                                        value={q.question}
                                        onChange={(e) => {
                                           const newMods = [...editingCourse.modules];
                                           newMods[activeModuleIndex!].lessons[lessonIdx].quiz![qIdx].question = e.target.value;
                                           setEditingCourse({...editingCourse, modules: newMods});
                                        }}
                                      />
                                      {canEdit && <button className="p-2 text-slate-300 hover:text-red-500"><X size={18} /></button>}
                                   </div>
                                   
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                                      {q.options.map((opt, optIdx) => (
                                        <div key={optIdx} className="flex items-center gap-3">
                                           <button 
                                              disabled={!canEdit}
                                              onClick={() => {
                                                const newMods = [...editingCourse.modules];
                                                newMods[activeModuleIndex!].lessons[lessonIdx].quiz![qIdx].correctAnswer = optIdx;
                                                setEditingCourse({...editingCourse, modules: newMods});
                                              }}
                                              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                                                q.correctAnswer === optIdx ? 'bg-[#00a651] border-[#00a651] text-white' : 'bg-white border-slate-200 text-transparent'
                                              } ${!canEdit && 'cursor-default'}`}
                                              title="Set as Model Answer"
                                           >
                                              <CheckCircle2 size={14} strokeWidth={4} />
                                           </button>
                                           <input 
                                             disabled={!canEdit}
                                             className={`flex-1 bg-white border-2 border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-[#292667] outline-none focus:border-amber-400 ${!canEdit && 'cursor-default'}`}
                                             value={opt}
                                             onChange={(e) => {
                                                const newMods = [...editingCourse.modules];
                                                newMods[activeModuleIndex!].lessons[lessonIdx].quiz![qIdx].options[optIdx] = e.target.value;
                                                setEditingCourse({...editingCourse, modules: newMods});
                                             }}
                                           />
                                        </div>
                                      ))}
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                <BookOpen size={80} className="text-slate-200 mb-6" />
                <h3 className="text-3xl font-black text-[#292667] uppercase">Design Studio</h3>
                <p className="text-sm font-bold text-slate-400 uppercase mt-4 tracking-widest">Select a module to build your lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Final view for when not in editing mode (shows course list)
  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {isAddingCourse && <NewCourseModal onClose={() => setIsAddingCourse(false)} onProceed={handleStartNewCourse} />}
      
      {/* Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 bg-[#00a651] rounded-[2rem] text-white shadow-xl rotate-3">
            <BookOpen size={42} strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Course <span className="text-[#fbee21]">Library</span></h2>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">CURRICULUM MANAGER</span>
              <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Official U Book Content</span>
            </div>
          </div>
        </div>
        {canEdit && (
          <button 
            onClick={() => setIsAddingCourse(true)}
            className="flex items-center gap-4 px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-6 border-black/10 relative z-10"
          >
            <Plus size={28} strokeWidth={3} />
            <span>Create New Course</span>
          </button>
        )}
      </div>

      {/* Search & Filters */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#00a651]">
          <Search size={24} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-lg font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 min-w-[180px]">
            <Layers size={20} className="text-[#ec2027]" strokeWidth={3} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full cursor-pointer uppercase"
            >
              <option value="all">All Categories</option>
              <option value="Standard Curriculum">Standard</option>
              <option value="Robotics">Robotics</option>
            </select>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 min-w-[180px]">
            <Filter size={20} className="text-[#3b82f6]" strokeWidth={3} />
            <select 
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full cursor-pointer uppercase"
            >
              <option value="all">All Levels</option>
              <option value="Starter">Starter</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2.5rem] shadow-xl border-4 border-transparent hover:border-[#fbee21] transition-all group flex flex-col overflow-hidden h-fit relative">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-[#292667] text-[#fbee21] rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-white text-[#292667] rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight mb-3 line-clamp-1">{course.name}</h3>
                <p className="text-sm text-slate-400 font-bold mb-6 line-clamp-2 h-10">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-slate-50 p-3 rounded-xl border-b-2 border-slate-100 flex items-center gap-3">
                      <Layers size={16} className="text-[#ec2027]" />
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Lessons</span>
                        <span className="text-[10px] font-black text-[#292667] uppercase">{course.modules.length} Modules</span>
                      </div>
                   </div>
                   <div className="bg-indigo-50 p-3 rounded-xl border-b-2 border-indigo-100 flex items-center gap-3">
                      <Clock size={16} className="text-indigo-600" />
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-indigo-300 uppercase tracking-widest">Duration</span>
                        <span className="text-[10px] font-black text-indigo-900 uppercase">{course.duration || '10 Hours'}</span>
                      </div>
                   </div>
                </div>

                {/* Registered Schools Display - OBVIOUS STYLE */}
                <div className="mb-8 pt-4 border-t-2 border-slate-50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-black text-[#292667] uppercase tracking-widest flex items-center gap-2">
                      <Building2 size={14} className="text-[#ec2027]" /> Registered Hubs
                    </p>
                    <span className="text-[8px] font-black px-2 py-0.5 bg-green-100 text-green-700 rounded-full">ACTIVE LIBRARIES</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {MOCK_SCHOOLS.slice(0, 3).map((school, sIdx) => {
                      const initials = school.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                      const colors = [
                        'bg-[#ec2027] border-red-200 text-white shadow-red-100', 
                        'bg-[#3b82f6] border-blue-200 text-white shadow-blue-100', 
                        'bg-[#00a651] border-green-200 text-white shadow-green-100'
                      ];
                      return (
                        <div key={school.id} className="group/school relative">
                          <div className={`w-10 h-10 rounded-2xl ${colors[sIdx % colors.length]} flex items-center justify-center text-white font-black text-xs border-2 shadow-lg hover:scale-110 transition-all cursor-pointer ring-4 ring-white`}>
                            {initials}
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-[#292667] text-white text-[9px] font-black uppercase rounded-xl shadow-2xl opacity-0 group-hover/school:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 border-2 border-white/20 backdrop-blur-sm">
                            {school.name}
                          </div>
                        </div>
                      )
                    })}
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[10px] border-2 border-dashed border-slate-200 ring-4 ring-white shadow-sm">
                      +2
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                   <button 
                     onClick={() => onPreviewCourse?.(course.id)}
                     className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-[#292667] rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-b-4 border-slate-100 hover:border-slate-200"
                   >
                     <Eye size={16} /> Preview
                   </button>
                   <button 
                     onClick={() => setEditingCourse(course)}
                     className="flex-1 py-4 bg-[#292667] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#00a651] transition-all flex items-center justify-center gap-2 border-b-4 border-black/10"
                   >
                     <Edit size={16} /> Edit Design
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center opacity-30">
            <FilterX size={80} className="text-slate-200 mb-6" />
            <h4 className="text-3xl font-black text-[#292667] uppercase">No Match Found</h4>
            <p className="text-sm font-bold text-slate-400 uppercase mt-2">Try different search terms or categories</p>
          </div>
        )}
      </div>
    </div>
  );
};
