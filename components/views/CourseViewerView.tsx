
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { 
  ChevronLeft, 
  Video, 
  HelpCircle, 
  ClipboardList, 
  Type, 
  Play, 
  CheckCircle2, 
  Lock, 
  Star, 
  Sparkles, 
  BookOpen,
  Clock,
  Target,
  MessageSquare,
  Send,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface CourseViewerViewProps {
  courseId: string;
  onBack: () => void;
}

export const CourseViewerView: React.FC<CourseViewerViewProps> = ({ courseId, onBack }) => {
  const course = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [remark, setRemark] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <Video size={20} strokeWidth={3} />;
      case 'quiz': return <HelpCircle size={20} strokeWidth={3} />;
      case 'assignment': return <ClipboardList size={20} strokeWidth={3} />;
      case 'text': return <Type size={20} strokeWidth={3} />;
      default: return <Play size={20} strokeWidth={3} />;
    }
  };

  const getLessonColor = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return 'bg-indigo-500';
      case 'quiz': return 'bg-amber-500';
      case 'assignment': return 'bg-rose-500';
      case 'text': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const handleSendRemark = () => {
    if (!remark.trim()) return;
    alert(`Remark sent to Teacher & Admin for task: ${activeLesson?.title}`);
    setRemark('');
  };

  const handleFileUpload = () => {
    if (activeLesson?.autoPassOnUpload) {
      setIsSubmitted(true);
      alert("Task Auto-Completed! You've passed this assignment instantly.");
    } else {
      alert("Submission successful! Your teacher will review your work soon.");
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      {/* Header Bar Standardized */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-5 bg-white/10 rounded-[2rem] text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10">
             <ChevronLeft size={42} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">{course.name}</h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-[#00a651] rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">STUDENT VIEW</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">{course.category}</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">65%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Completion</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">2/3</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Modules Done</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
        {/* Left Column: Modules Navigation */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="bg-white rounded-[3rem] p-8 border-2 border-slate-100 shadow-xl flex flex-col overflow-hidden">
            <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter mb-8 flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-2xl text-[#ec2027]"><Target size={28} strokeWidth={3} /></div>
              Journey Map
            </h3>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6 pr-2">
              {course.modules.length > 0 ? (
                course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="relative">
                    {/* Module Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#292667] text-white flex items-center justify-center font-black text-sm shadow-lg z-10">
                        {modIdx + 1}
                      </div>
                      <h4 className="font-black text-[#292667] text-lg uppercase tracking-tight truncate">{mod.title}</h4>
                    </div>

                    {/* Lesson Steps */}
                    <div className="ml-5 pl-8 border-l-4 border-slate-100 space-y-4 pb-4">
                      {mod.lessons.map((lesson, idx) => (
                        <div 
                          key={lesson.id}
                          onClick={() => { setActiveLesson(lesson); setIsSubmitted(false); }}
                          className={`group relative p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer flex items-center gap-4 ${
                            activeLesson?.id === lesson.id 
                              ? 'bg-[#292667] border-[#292667] text-white shadow-xl' 
                              : 'bg-slate-50 border-slate-50 hover:border-[#00a651] hover:bg-white'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:rotate-6 ${
                            activeLesson?.id === lesson.id ? 'bg-white text-[#292667]' : `${getLessonColor(lesson.type)} text-white`
                          }`}>
                            {idx === 0 && modIdx === 0 ? <CheckCircle2 size={20} /> : getLessonIcon(lesson.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-black text-sm uppercase tracking-tight truncate ${activeLesson?.id === lesson.id ? 'text-white' : 'text-[#292667]'}`}>{lesson.title}</p>
                            <div className="flex items-center gap-2">
                               <p className={`text-[9px] font-bold uppercase tracking-widest ${activeLesson?.id === lesson.id ? 'text-white/60' : 'text-slate-400'}`}>{lesson.type}</p>
                               {lesson.autoPassOnUpload && (
                                 <Zap size={8} className="text-amber-400" />
                               )}
                               {lesson.isSample && (
                                 <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[7px] font-black uppercase">
                                   <Globe size={6} /> Published Sample
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-30">
                  <Lock size={64} className="mx-auto mb-4" />
                  <p className="font-black uppercase tracking-widest text-sm">Curriculum Coming Soon</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t-4 border-slate-50">
               <div className="bg-[#fbee21] p-6 rounded-[2rem] flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-[10px] font-black text-[#292667]/40 uppercase tracking-widest mb-1">Final Boss</p>
                    <h4 className="text-xl font-black text-[#292667] uppercase leading-none">THE EXAM</h4>
                  </div>
                  <Lock size={32} className="text-[#292667]/20" />
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content Viewer */}
        <div className="lg:col-span-8 bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl overflow-hidden flex flex-col">
          {activeLesson ? (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
               {/* Content Header */}
               <div className="p-8 border-b-2 border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                     <div className={`p-4 rounded-2xl text-white shadow-xl ${getLessonColor(activeLesson.type)}`}>
                        {getLessonIcon(activeLesson.type)}
                     </div>
                     <div>
                        <div className="flex items-center gap-3">
                           <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">{activeLesson.title}</h3>
                           {activeLesson.isSample && (
                             <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">Sample Task</span>
                           )}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Active Task Content</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     {activeLesson.autoPassOnUpload && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 text-[#00a651]">
                           <Zap size={14} fill="currentColor" />
                           <span className="text-[10px] font-black uppercase">Auto-Pass Mode</span>
                        </div>
                     )}
                     <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <Clock size={14} className="text-[#3b82f6]" />
                        <span className="text-[10px] font-black uppercase text-[#292667]">~15 MINS</span>
                     </div>
                  </div>
               </div>

               {/* Main Viewing Area */}
               <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-12">
                  {activeLesson.type === 'video' && (
                    <div className="space-y-8">
                       <div className="aspect-video w-full bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden border-8 border-slate-100">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10 shadow-2xl">
                             <Play size={40} className="text-white fill-white ml-2" />
                          </div>
                          <img src={`https://picsum.photos/seed/${activeLesson.id}/1280/720`} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Thumbnail" />
                       </div>
                       <div className="prose prose-slate max-w-none">
                          <h4 className="text-3xl font-black text-[#292667] uppercase mb-4 tracking-tight">Lesson Overview</h4>
                          <p className="text-lg text-slate-500 font-bold leading-relaxed">
                             In this video, we explore the foundational concepts of the current module. Follow along closely as Teacher Jane explains the core mechanics and terminology. Remember to take notes for the quiz afterward!
                          </p>
                       </div>
                    </div>
                  )}

                  {activeLesson.type === 'quiz' && (
                    <div className="max-w-3xl mx-auto space-y-10 py-10 text-center">
                       <div className="p-8 bg-amber-50 rounded-[3rem] border-4 border-dashed border-amber-200">
                          <Sparkles size={64} className="text-amber-400 mx-auto mb-6" />
                          <h4 className="text-3xl font-black text-[#292667] uppercase tracking-tighter">Knowledge Check!</h4>
                          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-sm">Ready to test your skills?</p>
                       </div>
                       <div className="space-y-4">
                          <p className="text-2xl font-black text-[#292667] leading-tight">"What is the primary function discussed in the previous video module?"</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                             {['Data Processing', 'Pattern Recognition', 'Logic Building', 'System Design'].map((opt, i) => (
                               <button key={i} className="p-6 bg-slate-50 hover:bg-white border-2 border-slate-100 hover:border-amber-400 rounded-2xl font-black text-[#292667] transition-all text-lg shadow-sm active:scale-95">
                                 {opt}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {activeLesson.type === 'assignment' && (
                    <div className="space-y-8">
                       <div className="p-10 bg-rose-50 rounded-[3rem] border-4 border-dashed border-rose-200 relative overflow-hidden">
                          {isSubmitted && (
                            <div className="absolute inset-0 bg-[#00a651] z-10 flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
                               <CheckCircle2 size={64} strokeWidth={4} className="mb-4" />
                               <h4 className="text-3xl font-black uppercase tracking-tighter">TASK COMPLETED!</h4>
                               <p className="text-lg font-bold opacity-80 uppercase">You've unlocked the next mission.</p>
                            </div>
                          )}
                          <ClipboardList size={64} className="text-rose-500 mb-6" />
                          <h4 className="text-3xl font-black text-[#292667] uppercase tracking-tighter">Hands-on Task</h4>
                          <p className="text-lg text-slate-600 font-bold mt-4 leading-relaxed">
                             {activeLesson.assignmentInstructions || "Please download the attached worksheet and complete the exercises shown. Once finished, snap a photo and upload it here for Teacher review."}
                          </p>
                       </div>
                       <div className="flex flex-col items-center gap-6 py-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 border-dashed">
                          <div className="p-6 bg-white rounded-full shadow-xl">
                             <Target size={40} className="text-rose-500" />
                          </div>
                          <button 
                             onClick={handleFileUpload}
                             className="px-10 py-5 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                          >
                             {isSubmitted ? 'Resubmit' : 'Upload Results'}
                          </button>
                          {activeLesson.autoPassOnUpload && !isSubmitted && (
                             <p className="text-[10px] font-black text-[#00a651] uppercase tracking-[0.2em] flex items-center gap-2">
                                <Zap size={12} fill="currentColor" /> Instant grading active
                             </p>
                          )}
                       </div>
                    </div>
                  )}

                  {activeLesson.type === 'text' && (
                    <div className="max-w-3xl mx-auto space-y-10">
                       <div className="prose prose-indigo max-w-none">
                          <h4 className="text-5xl font-black text-[#292667] uppercase tracking-tighter mb-8 border-b-8 border-emerald-400 inline-block">Study Guide</h4>
                          <p className="text-2xl text-slate-600 font-bold leading-relaxed mb-8">
                             {activeLesson.content || "Welcome to this reading module. This section provides an in-depth look at the logic principles that govern digital systems."}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                             <div className="bg-indigo-50 p-8 rounded-[2.5rem]">
                                <h5 className="font-black text-indigo-600 uppercase tracking-widest text-sm mb-4">Key Term 1</h5>
                                <p className="font-bold text-slate-500">Binary logic systems are the heart of all modern computer processors.</p>
                             </div>
                             <div className="bg-emerald-50 p-8 rounded-[2.5rem]">
                                <h5 className="font-black text-emerald-600 uppercase tracking-widest text-sm mb-4">Key Term 2</h5>
                                <p className="font-bold text-slate-500">Inputs and outputs are combined to create meaningful instructions.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
               </div>

               {/* New Remarks Section for Admin/Teacher Review */}
               <div className="p-8 bg-slate-50 border-t-2 border-slate-100 shrink-0 shadow-inner">
                  <div className="max-w-4xl mx-auto flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="p-2.5 bg-[#292667] text-white rounded-xl shadow-lg">
                              <MessageSquare size={18} strokeWidth={3} />
                           </div>
                           <div>
                              <h4 className="text-[11px] font-black text-[#292667] uppercase tracking-widest leading-none">Post Reflection or Question</h4>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">This will be shared with your Teacher and Administrator</p>
                           </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200">
                           <ShieldCheck size={12} className="text-[#00a651]" />
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Official Channel</span>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex-1">
                           <textarea 
                              value={remark}
                              onChange={(e) => setRemark(e.target.value)}
                              placeholder="Type your notes, questions, or reflections here..."
                              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-[#292667] outline-none focus:border-[#00a651] transition-all resize-none shadow-sm placeholder:text-slate-300 h-20"
                           />
                        </div>
                        <button 
                           onClick={handleSendRemark}
                           className="px-10 bg-[#00a651] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all border-b-6 border-black/10 flex flex-col items-center justify-center gap-2 h-20 active:scale-95"
                        >
                           <Send size={24} />
                           <span>Submit</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center opacity-30">
               <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-12">
                  <BookOpen size={64} className="text-slate-300" />
               </div>
               <h3 className="text-4xl font-black text-[#292667] uppercase tracking-tighter">Ready to Learn?</h3>
               <p className="text-lg font-bold text-slate-400 mt-4 uppercase tracking-[0.2em]">Select a task from the map to begin your adventure</p>
               <div className="mt-12 flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-slate-200 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200 animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};