
import React, { useState, useEffect } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { BookOpen, Upload, Plus, Edit, Trash2, Layers, Search, FileText, Globe, Sparkles, ChevronLeft, Video, ClipboardList, HelpCircle, Save, X, Image as ImageIcon, FileUp, Type } from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
}

export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ initialCourseId, onExitEdit }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialCourseId) {
      const course = courses.find(c => c.id === initialCourseId);
      if (course) {
        setEditingCourse(course);
        if (course.modules.length > 0) setActiveModuleIndex(0);
      }
    }
  }, [initialCourseId, courses]);

  const handleAddModule = () => {
    if (!editingCourse) return;
    const newModule: Module = {
      id: 'm' + Date.now(),
      title: 'New Module',
      lessons: []
    };
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newModule]
    });
  };

  const handleAddLesson = (moduleIdx: number, type: Lesson['type']) => {
    if (!editingCourse) return;
    const taskNumber = editingCourse.modules[moduleIdx].lessons.length + 1;
    const newLesson: Lesson = {
      id: 'l' + Date.now(),
      title: 'Task ' + taskNumber + ': New ' + type.charAt(0).toUpperCase() + type.slice(1),
      type: type,
      content: ''
    };
    const updatedModules = [...editingCourse.modules];
    updatedModules[moduleIdx].lessons.push(newLesson);
    setEditingCourse({ ...editingCourse, modules: updatedModules });
  };

  const handleCloseEditor = () => {
    setEditingCourse(null);
    onExitEdit?.();
  };

  if (editingCourse) {
    return (
      <div className="h-full flex flex-col gap-4 md:gap-6 overflow-hidden animate-in fade-in slide-in-from-right duration-500">
        <div className="w-full bg-[#292667] rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl border-b-[8px] md:border-b-[10px] border-[#00a651] flex items-center justify-between gap-6 md:gap-8 flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/5 pointer-events-none"></div>
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <button onClick={handleCloseEditor} className="p-3 md:p-4 bg-white/10 rounded-xl hover:bg-[#ec2027] transition-all border-2 border-white/20">
              <ChevronLeft size={24} md:size={32} strokeWidth={4} />
            </button>
            <div>
              <h2 className="text-2xl md:text-4xl font-black leading-none tracking-tight uppercase">Course <span className="text-[#fbee21]">Designer</span></h2>
              <p className="text-[10px] md:text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em] mt-1 md:mt-2 truncate max-w-[200px] md:max-w-none">Editing: {editingCourse.name}</p>
            </div>
          </div>
          <button onClick={handleCloseEditor} className="px-6 py-4 md:px-10 md:py-5 bg-[#fbee21] text-[#292667] rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.15em] shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 md:border-b-6 border-black/10">
            <Save size={20} md:size={24} className="inline mr-2" /> <span className="hidden sm:inline">Publish Content</span><span className="sm:hidden text-[10px]">SAVE</span>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 overflow-hidden pb-4">
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] p-6 md:p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-[#292667] uppercase tracking-tight">Modules</h3>
              <button onClick={handleAddModule} className="p-2.5 bg-[#00a651] text-white rounded-xl hover:bg-[#292667] transition-all shadow-md active:scale-90">
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
            <div className="space-y-3 flex-1">
              {editingCourse.modules.map((mod, idx) => (
                <div 
                  key={mod.id} 
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border-4 transition-all cursor-pointer group ${activeModuleIndex === idx ? 'border-[#00a651] bg-[#00a651]/5 shadow-inner' : 'border-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <input 
                      value={mod.title}
                      onChange={(e) => {
                        const newMods = [...editingCourse.modules];
                        newMods[idx].title = e.target.value;
                        setEditingCourse({...editingCourse, modules: newMods});
                      }}
                      className="bg-transparent font-black text-[#292667] text-sm md:text-base uppercase outline-none flex-1 mr-4 focus:text-[#00a651] truncate"
                    />
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} className="text-slate-300 hover:text-[#ec2027]" />
                    </div>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 mt-1 md:mt-2 uppercase tracking-[0.2em]">{mod.lessons.length} ACTIVE TASKS</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-6 md:p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide">
            {activeModuleIndex !== null ? (
              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-end justify-between mb-4 md:mb-6 border-b-2 border-slate-50 pb-4">
                    <div className="min-w-0">
                       <p className="text-[9px] md:text-[10px] font-black text-[#00a651] uppercase tracking-[0.2em] mb-1">Module Contents</p>
                       <h3 className="text-xl md:text-3xl font-black text-[#292667] uppercase tracking-tighter truncate">
                          {editingCourse.modules[activeModuleIndex].title}
                       </h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                    {[
                      { type: 'video', label: 'Video', icon: Video, color: 'indigo', bg: 'bg-indigo-500' },
                      { type: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'amber', bg: 'bg-amber-500' },
                      { type: 'assignment', label: 'Task', icon: ClipboardList, color: 'rose', bg: 'bg-rose-500' },
                      { type: 'text', label: 'Doc', icon: Type, color: 'emerald', bg: 'bg-emerald-500' }
                    ].map((btn) => (
                      <button 
                        key={btn.type}
                        onClick={() => handleAddLesson(activeModuleIndex!, btn.type as Lesson['type'])} 
                        className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-5 bg-${btn.color}-50 text-${btn.color}-600 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-transparent hover:border-${btn.color}-500 hover:bg-white transition-all shadow-md group active:scale-95`}
                      >
                         <div className={`${btn.bg} text-white p-3 md:p-4 rounded-xl md:rounded-[1.5rem] shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                           <btn.icon size={24} md:size={28} strokeWidth={2.5} />
                         </div>
                         <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-center">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pb-10">
                  {editingCourse.modules[activeModuleIndex].lessons.length === 0 ? (
                    <div className="py-12 md:py-20 text-center bg-slate-50 rounded-[2rem] md:rounded-[3rem] border-4 border-dashed border-slate-100">
                      <Sparkles size={48} md:size={64} className="mx-auto text-slate-200 mb-4" />
                      <p className="font-black text-slate-300 uppercase tracking-widest text-sm md:text-lg">Add your first task above</p>
                    </div>
                  ) : (
                    editingCourse.modules[activeModuleIndex].lessons.map((lesson, lessonIdx) => (
                      <div key={lesson.id} className="bg-slate-50 p-4 md:p-5 rounded-2xl border-2 border-slate-100 relative group animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            <div className={`p-2 rounded-lg shadow-md text-white flex-shrink-0 ${
                              lesson.type === 'video' ? 'bg-indigo-500' : 
                              lesson.type === 'quiz' ? 'bg-amber-500' : 
                              lesson.type === 'assignment' ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}>
                              {lesson.type === 'video' ? <Video size={14} md:size={16} /> : lesson.type === 'quiz' ? <HelpCircle size={14} md:size={16} /> : lesson.type === 'assignment' ? <ClipboardList size={14} md:size={16} /> : <Type size={14} md:size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <input 
                                value={lesson.title}
                                className="text-sm md:text-base font-black text-[#292667] bg-transparent outline-none w-full uppercase tracking-tight truncate leading-none"
                                onChange={(e) => {
                                  const newMods = [...editingCourse.modules];
                                  newMods[activeModuleIndex!].lessons[lessonIdx].title = e.target.value;
                                  setEditingCourse({...editingCourse, modules: newMods});
                                }}
                              />
                            </div>
                          </div>
                          <button className="p-1.5 text-slate-300 hover:text-[#ec2027] hover:bg-white rounded-lg transition-all active:scale-90 flex-shrink-0 ml-1"><Trash2 size={16} md:size={18} /></button>
                        </div>
                        
                        <div className="bg-white p-3 md:p-4 rounded-xl border-2 border-slate-100 shadow-inner">
                           {lesson.type === 'video' && (
                             <div className="space-y-3">
                               <div className="flex flex-col md:flex-row items-stretch gap-2">
                                 <input placeholder="Paste Video URL" className="flex-1 px-4 py-2.5 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-xs text-[#292667] outline-none focus:border-indigo-500 transition-all" />
                                 <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#292667] text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 shadow-lg transition-all">
                                   <FileUp size={14} /> <span className="hidden sm:inline">Upload</span>
                                 </button>
                               </div>
                             </div>
                           )}
                           {lesson.type === 'quiz' && (
                             <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-100 rounded-lg gap-2">
                               <HelpCircle size={24} className="text-amber-200" />
                               <button className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#292667] shadow-lg transition-all active:scale-95">
                                 <Plus size={14} strokeWidth={4} /> Add Question
                               </button>
                             </div>
                           )}
                           {lesson.type === 'assignment' && (
                             <div className="space-y-3">
                                <textarea placeholder="Task details..." className="w-full px-4 py-3 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-xs text-[#292667] min-h-[60px] resize-none focus:border-rose-500 outline-none transition-all" />
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-black text-[8px] uppercase tracking-widest hover:bg-rose-100 transition-all"><FileUp size={12} /> Add Sheet</button>
                                   <div className="flex items-center gap-2">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Points:</span>
                                      <input type="number" defaultValue="10" className="w-12 px-1.5 py-1 border-2 border-slate-100 rounded-lg font-black text-center text-xs text-[#292667]" />
                                   </div>
                                </div>
                             </div>
                           )}
                           {lesson.type === 'text' && (
                             <div className="space-y-3">
                                <div className="flex gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-100 w-fit">
                                   <button className="p-1.5 bg-white shadow-sm rounded-md hover:bg-emerald-500 hover:text-white transition-all"><ImageIcon size={12} /></button>
                                   <button className="p-1.5 bg-white shadow-sm rounded-md hover:bg-emerald-500 hover:text-white transition-all font-black text-[10px]">B</button>
                                   <button className="p-1.5 bg-white shadow-sm rounded-md hover:bg-emerald-500 hover:text-white transition-all font-black italic text-[10px]">I</button>
                                </div>
                                <textarea placeholder="Type content..." className="w-full px-4 py-3 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-xs text-[#292667] min-h-[80px] resize-none focus:border-emerald-500 outline-none transition-all" />
                             </div>
                           )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-[3rem] md:rounded-[4rem] flex items-center justify-center mb-6 md:mb-10 rotate-12 shadow-inner border-4 border-slate-100">
                   <BookOpen size={64} md:size={100} className="text-slate-200" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-[#292667] uppercase tracking-tighter">Content Studio</h3>
                <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 md:mt-4 max-w-sm mx-auto">Select a module to manage its tasks, videos, and documentation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#00a651] rounded-[2rem] text-white shadow-xl rotate-3">
             <BookOpen size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Master <span className="text-[#fbee21]">Hub</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">GLOBAL CURRICULUM</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Admin Control Center</span>
             </div>
           </div>
        </div>
        <button className="flex items-center gap-3 px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 border-b-6 border-black/10">
           <Plus size={24} strokeWidth={4} /> Add New Course
        </button>
      </div>

      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4 bg-slate-50 px-8 py-5 rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#00a651] transition-all">
          <Search size={28} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search programs by name or category..." 
            className="bg-transparent text-xl font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[3rem] p-6 border-2 border-slate-100 shadow-xl flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-[#00a651] transition-all">
               {/* Smaller Image Upload Section */}
               <div className="w-full md:w-40 h-40 rounded-[2rem] overflow-hidden relative shadow-lg flex-shrink-0 border-4 border-slate-50 bg-slate-100">
                  <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-3 bg-white text-[#292667] rounded-xl shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                       <Upload size={24} strokeWidth={3} />
                    </button>
                  </div>
               </div>

               {/* Expanded Text/Content Section */}
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-black uppercase bg-[#00a651]/10 text-[#00a651] px-3 py-1 rounded-lg tracking-widest">{course.category}</span>
                        <h3 className="text-xl md:text-2xl font-black text-[#292667] uppercase mt-2 tracking-tighter leading-none truncate">{course.name}</h3>
                      </div>
                      <div className="flex gap-1.5 shrink-0 ml-4">
                         <button onClick={() => setEditingCourse(course)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#292667] hover:bg-[#fbee21] rounded-xl transition-all shadow-sm"><Edit size={18} /></button>
                         <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-[#ec2027] rounded-xl transition-all shadow-sm"><Trash2 size={18} /></button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-bold mb-4 line-clamp-2 leading-snug">{course.description}</p>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border-b-4 border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all">
                         <div className="p-1.5 bg-white rounded-lg shadow-sm"><Layers size={16} className="text-[#00a651]" /></div>
                         <div>
                           <p className="text-[8px] font-black uppercase text-slate-400 leading-none mb-1">Modules</p>
                           <p className="text-sm font-black text-[#292667]">{course.modules.length} Items</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border-b-4 border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                         <div className="p-1.5 bg-white rounded-lg shadow-sm"><Globe size={16} className="text-[#3b82f6]" /></div>
                         <div>
                           <p className="text-[8px] font-black uppercase text-slate-400 leading-none mb-1">Visibility</p>
                           <p className="text-sm font-black text-[#292667]">GLOBAL</p>
                         </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="flex-1 py-3.5 px-6 bg-[#292667] text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00a651] transition-all shadow-lg active:scale-95 border-b-4 border-black/10"
                      >
                        <Edit size={16} strokeWidth={3} /> Manage Content
                      </button>
                      <button className="p-3.5 bg-white border-4 border-slate-100 text-slate-400 rounded-[1.2rem] hover:border-[#292667] hover:text-[#292667] transition-all shadow-sm active:rotate-6">
                        <Sparkles size={20} className="text-amber-400" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
