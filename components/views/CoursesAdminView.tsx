
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
      <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden animate-in fade-in slide-in-from-right duration-500">
        <div className="w-full bg-[#292667] rounded-xl md:rounded-[1.5rem] p-4 md:p-6 text-white shadow-2xl border-b-[6px] md:border-b-[8px] border-[#00a651] flex items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/5 pointer-events-none"></div>
          <div className="flex items-center gap-3 md:gap-4 relative z-10">
            <button onClick={handleCloseEditor} className="p-2 md:p-3 bg-white/10 rounded-lg hover:bg-[#ec2027] transition-all border-2 border-white/20">
              <ChevronLeft size={24} strokeWidth={4} />
            </button>
            <div>
              <h2 className="text-xl md:text-2xl font-black leading-none tracking-tight uppercase">Designer</h2>
              <p className="text-[8px] md:text-[10px] font-black text-[#fbee21] uppercase tracking-[0.1em] mt-1 truncate max-w-[200px] md:max-w-none">Editing: {editingCourse.name}</p>
            </div>
          </div>
          <button onClick={handleCloseEditor} className="px-5 py-3 md:px-7 md:py-4 bg-[#fbee21] text-[#292667] rounded-xl md:rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 border-black/10">
            <Save size={18} className="inline mr-2" /> <span>Publish</span>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 overflow-hidden pb-2">
          <div className="col-span-12 lg:col-span-4 bg-white rounded-xl md:rounded-[1.5rem] p-4 md:p-6 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-black text-[#292667] uppercase tracking-tight">Modules</h3>
              <button onClick={handleAddModule} className="p-2 bg-[#00a651] text-white rounded-lg hover:bg-[#292667] transition-all shadow-md">
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
            <div className="space-y-2 flex-1">
              {editingCourse.modules.map((mod, idx) => (
                <div 
                  key={mod.id} 
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer group ${activeModuleIndex === idx ? 'border-[#00a651] bg-[#00a651]/5 shadow-inner' : 'border-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-center">
                    <input 
                      value={mod.title}
                      onChange={(e) => {
                        const newMods = [...editingCourse.modules];
                        newMods[idx].title = e.target.value;
                        setEditingCourse({...editingCourse, modules: newMods});
                      }}
                      className="bg-transparent font-black text-[#292667] text-xs md:text-sm uppercase outline-none flex-1 mr-2 focus:text-[#00a651] truncate"
                    />
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} className="text-slate-300 hover:text-[#ec2027]" />
                    </div>
                  </div>
                  <p className="text-[8px] font-black text-slate-400 mt-1 uppercase tracking-widest">{mod.lessons.length} TASKS</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl md:rounded-[1.5rem] p-4 md:p-6 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide">
            {activeModuleIndex !== null ? (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-end justify-between border-b-2 border-slate-50 pb-3">
                  <div className="min-w-0">
                    <p className="text-[8px] font-black text-[#00a651] uppercase tracking-[0.1em] mb-1">Module Contents</p>
                    <h3 className="text-lg md:text-xl font-black text-[#292667] uppercase tracking-tighter truncate">
                      {editingCourse.modules[activeModuleIndex].title}
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
                  {[
                    { type: 'video', label: 'Video', icon: Video, color: 'indigo', bg: 'bg-indigo-500' },
                    { type: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'amber', bg: 'bg-amber-500' },
                    { type: 'assignment', label: 'Task', icon: ClipboardList, color: 'rose', bg: 'bg-rose-500' },
                    { type: 'text', label: 'Doc', icon: Type, color: 'emerald', bg: 'bg-emerald-500' }
                  ].map((btn) => (
                    <button 
                      key={btn.type}
                      onClick={() => handleAddLesson(activeModuleIndex!, btn.type as Lesson['type'])} 
                      className={`flex flex-col items-center justify-center gap-1 md:gap-2 p-3 bg-${btn.color}-50 text-${btn.color}-600 rounded-xl border-2 border-transparent hover:border-${btn.color}-500 hover:bg-white transition-all shadow-sm group active:scale-95`}
                    >
                       <div className={`${btn.bg} text-white p-2 rounded-lg shadow-md group-hover:scale-105 transition-transform`}>
                         <btn.icon size={18} strokeWidth={2.5} />
                       </div>
                       <span className="font-black text-[8px] uppercase tracking-widest">{btn.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pb-6">
                  {editingCourse.modules[activeModuleIndex].lessons.map((lesson, lessonIdx) => (
                    <div key={lesson.id} className="bg-slate-50 p-3 rounded-xl border-2 border-slate-100 relative group animate-in slide-in-from-bottom-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <div className={`p-1.5 rounded shadow-sm text-white flex-shrink-0 ${
                            lesson.type === 'video' ? 'bg-indigo-500' : 
                            lesson.type === 'quiz' ? 'bg-amber-500' : 
                            lesson.type === 'assignment' ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}>
                            {lesson.type === 'video' ? <Video size={12} /> : lesson.type === 'quiz' ? <HelpCircle size={12} /> : lesson.type === 'assignment' ? <ClipboardList size={12} /> : <Type size={12} />}
                          </div>
                          <input 
                            value={lesson.title}
                            className="text-xs md:text-sm font-black text-[#292667] bg-transparent outline-none w-full uppercase tracking-tight truncate leading-none"
                            onChange={(e) => {
                              const newMods = [...editingCourse.modules];
                              newMods[activeModuleIndex!].lessons[lessonIdx].title = e.target.value;
                              setEditingCourse({...editingCourse, modules: newMods});
                            }}
                          />
                        </div>
                        <button className="p-1 text-slate-300 hover:text-[#ec2027]"><Trash2 size={14} /></button>
                      </div>
                      
                      <div className="bg-white p-2 md:p-3 rounded-lg border-2 border-slate-100 shadow-inner">
                         {lesson.type === 'video' && (
                           <div className="flex gap-2">
                             <input placeholder="URL" className="flex-1 px-3 py-1.5 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-[10px] text-[#292667] outline-none" />
                             <button className="px-3 py-1.5 bg-[#292667] text-white rounded-lg font-black text-[8px] uppercase tracking-widest">Upload</button>
                           </div>
                         )}
                         {lesson.type === 'assignment' && (
                           <textarea placeholder="Task details..." className="w-full px-3 py-2 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-[10px] text-[#292667] min-h-[40px] resize-none outline-none" />
                         )}
                         {lesson.type === 'text' && (
                           <textarea placeholder="Type content..." className="w-full px-3 py-2 bg-slate-50 rounded-lg border-2 border-slate-100 font-bold text-[10px] text-[#292667] min-h-[50px] resize-none outline-none" />
                         )}
                         {lesson.type === 'quiz' && (
                           <button className="w-full py-1.5 bg-amber-500 text-white rounded-lg font-black text-[8px] uppercase tracking-widest">+ Add Question</button>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-6">
                <BookOpen size={48} className="text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-[#292667] uppercase">Content Studio</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Select a module to edit</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-xl md:rounded-[1.5rem] p-4 md:p-6 text-white shadow-2xl border-b-[8px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex items-center gap-3 md:gap-4 relative z-10">
           <div className="p-3 bg-[#00a651] rounded-xl text-white shadow-xl">
             <BookOpen size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Master <span className="text-[#fbee21]">Hub</span></h2>
             <div className="flex items-center gap-2 mt-1 md:mt-2">
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-black uppercase tracking-[0.1em] text-white">CURRICULUM</span>
                <span className="text-[10px] font-black text-[#fbee21] uppercase tracking-[0.1em]">Control Center</span>
             </div>
           </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#fbee21] text-[#292667] rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 border-b-4 border-black/10">
           <Plus size={18} strokeWidth={4} /> Add Course
        </button>
      </div>

      <div className="w-full bg-white p-2 rounded-xl md:rounded-[1.2rem] shadow-xl border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-lg md:rounded-[1rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#00a651] transition-all">
          <Search size={20} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search programs..." 
            className="bg-transparent text-sm font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 pb-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl md:rounded-[1.5rem] p-4 border-2 border-slate-100 shadow-xl flex flex-col md:flex-row gap-4 relative overflow-hidden group hover:border-[#00a651] transition-all">
               <div className="w-24 md:w-28 h-24 md:h-28 rounded-xl overflow-hidden relative shadow-lg flex-shrink-0 border-2 border-slate-50 bg-slate-100">
                  <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               </div>

               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] font-black uppercase bg-[#00a651]/10 text-[#00a651] px-2 py-0.5 rounded tracking-widest">{course.category}</span>
                        <h3 className="text-lg font-black text-[#292667] uppercase mt-1 tracking-tighter leading-none truncate">{course.name}</h3>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-2">
                         <button onClick={() => setEditingCourse(course)} className="p-1.5 bg-slate-50 text-slate-400 hover:text-[#292667] rounded-lg shadow-sm"><Edit size={14} /></button>
                         <button className="p-1.5 bg-slate-50 text-slate-400 hover:text-white hover:bg-[#ec2027] rounded-lg shadow-sm"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mb-3 line-clamp-1 leading-snug">{course.description}</p>
                  </div>
                  
                  <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="flex-1 py-2 px-4 bg-[#292667] text-white rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00a651] transition-all shadow-md active:scale-95 border-b-2 border-black/10"
                      >
                        <Edit size={12} strokeWidth={3} /> Manage
                      </button>
                      <button className="p-2 bg-white border-2 border-slate-100 text-slate-400 rounded-lg hover:border-[#292667] hover:text-[#292667] transition-all shadow-sm">
                        <Sparkles size={14} className="text-amber-400" strokeWidth={3} />
                      </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
