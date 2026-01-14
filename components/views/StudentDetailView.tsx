
import React from 'react';
import { MOCK_STUDENTS, MOCK_COURSES } from '../../constants';
// Add missing ClipboardList and Eye imports
import { 
  ChevronLeft, 
  Calendar, 
  BookOpen, 
  Star, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Target, 
  Clock, 
  Sparkles, 
  History, 
  CheckCircle2, 
  FileText, 
  Video, 
  Trophy, 
  ArrowUpRight, 
  MessageSquare, 
  ClipboardList, 
  Eye 
} from 'lucide-react';

interface StudentDetailViewProps {
  studentId: string;
  onClassClick: (id: string) => void;
  onBack: () => void;
  onEnterCourse: (id: string) => void;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({ studentId, onClassClick, onBack, onEnterCourse }) => {
  const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];
  const matchingCourse = MOCK_COURSES.find(c => c.name === student.level);

  const mockSubmissions = [
    { type: 'Quiz', title: 'Binary Logic Basics', score: '92%', date: '3 days ago', status: 'Passed', course: student.level, courseType: 'Logic' },
    { type: 'Assignment', title: 'Logic Circuit Diagram', score: 'A-', date: '1 week ago', status: 'Graded', course: student.level, courseType: 'Engineering' },
    { type: 'Paper', title: 'Module 1 Reflection', score: 'B+', date: '2 weeks ago', status: 'Graded', course: 'General Robotics', courseType: 'Theory' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-right duration-500">
      
      {/* Consistent Full-Width Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-5 bg-white/10 rounded-[2rem] text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10">
             <ChevronLeft size={42} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">{student.firstName} <span className="text-[#fbee21]">{student.lastName}</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white ${student.status === 'active' ? 'bg-[#00a651]' : 'bg-slate-500'}`}>
                  {student.status === 'active' ? 'ACTIVE LEARNER' : 'INACTIVE'}
                </span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">ID: {student.username}</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">{student.finalGrade}%</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Final Score</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">{student.attendance}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Attendance</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
           <div className="bg-white rounded-[3rem] p-8 shadow-xl border-2 border-slate-100 text-center relative overflow-hidden flex-shrink-0">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#fbee21] rounded-full -ml-16 -mt-16 opacity-5"></div>
             <img src={`https://picsum.photos/seed/${student.id}/300`} className="w-48 h-48 mx-auto rounded-[3rem] border-8 border-white shadow-2xl mb-6 object-cover hover:scale-105 transition-transform" alt="Profile" />
             <h3 className="text-2xl font-black text-[#292667] leading-none mb-3 uppercase tracking-tight">{student.firstName} {student.lastName}</h3>
             <div className="bg-slate-50 px-6 py-2 rounded-2xl inline-block">
                <p className="text-[#ec2027] font-black text-[11px] uppercase tracking-[0.2em]">Verified Hub Account</p>
             </div>
           </div>

           <div className="bg-[#292667] text-white rounded-[3rem] p-8 shadow-2xl border-b-8 border-[#ec2027] flex-1 flex flex-col overflow-hidden">
             <h4 className="font-black text-[12px] uppercase tracking-[0.2em] text-[#fbee21] mb-8 flex items-center gap-3">
               <Star size={20} strokeWidth={3} className="fill-current" /> PERFORMANCE ANALYSIS
             </h4>
             <div className="space-y-8 flex-1 overflow-y-auto scrollbar-hide pr-2">
               <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[12px] font-black text-white/40 uppercase tracking-widest">Academic Mastery</span>
                    <span className="text-3xl font-black text-[#fbee21]">{student.finalGrade}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border-2 border-white/10 p-0.5 shadow-inner">
                    <div className="bg-[#fbee21] h-full rounded-full transition-all duration-1000" style={{ width: `${student.finalGrade}%` }}></div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3 opacity-40 mb-3">
                      <Target size={18} strokeWidth={3} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Tasks</p>
                   </div>
                   <p className="text-2xl font-black">{student.taskCompletion}% Done</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-[2rem] border-2 border-white/5 group hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3 opacity-40 mb-3">
                      <Clock size={18} strokeWidth={3} />
                      <p className="text-[10px] font-black uppercase tracking-widest">Focus</p>
                   </div>
                   <p className="text-2xl font-black">{Math.floor(student.studyTime / 60)} Hrs</p>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Right Column: Detailed Portfolio */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          {/* Submission Records Section */}
          <div className="flex-1 bg-white rounded-[3.5rem] p-8 md:p-10 shadow-2xl border-2 border-slate-100 flex flex-col overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 flex-shrink-0">
               <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-4">
                 <div className="p-3 bg-red-50 rounded-2xl text-[#ec2027]"><History size={32} strokeWidth={3} /></div> 
                 Submission Records
               </h3>
               <div className="flex items-center gap-2">
                 <button className="px-4 py-2 bg-slate-50 text-slate-400 hover:text-[#292667] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Filter: Latest First</button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-1">
              {mockSubmissions.map((sub, i) => (
                <div key={i} className="group p-6 bg-slate-50 hover:bg-white rounded-[2.5rem] border-4 border-transparent hover:border-[#fbee21] transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-xl animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-center gap-6 flex-1 w-full">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${sub.type === 'Quiz' ? 'bg-indigo-500 text-white' : sub.type === 'Assignment' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                      {sub.type === 'Quiz' ? <Video size={24} /> : sub.type === 'Assignment' ? <ClipboardList size={24} /> : <FileText size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{sub.type}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#fbee21] bg-[#292667] px-1.5 rounded">{sub.status}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span className="text-[8px] font-black uppercase bg-[#00a651]/10 text-[#00a651] px-2 py-0.5 rounded-md border border-[#00a651]/20">Program: {sub.course}</span>
                      </div>
                      <h4 className="font-black text-[#292667] text-lg uppercase tracking-tight leading-tight">{sub.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{sub.date} • {sub.courseType} module</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Result</p>
                       <p className="text-2xl font-black text-[#292667]">{sub.score}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                    <button className="p-4 bg-white text-slate-400 hover:text-[#00a651] rounded-2xl shadow-md border border-slate-100 transition-all hover:scale-110 active:scale-95 group/eye">
                       <Eye size={24} strokeWidth={3} className="group-hover/eye:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-5 bg-[#292667] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-[#ec2027] transition-all">
                <ArrowUpRight size={20} /> Export Academic Transcript
              </button>
              <button className="flex-1 py-5 bg-[#00a651] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-[#292667] transition-all">
                 <CheckCircle2 size={20} /> Verify All Credentials
              </button>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Certs</p>
                <p className="text-xl font-black text-[#292667]">04</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Exams</p>
                <p className="text-xl font-black text-[#292667]">12</p>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Badges</p>
                <p className="text-xl font-black text-[#292667]">08</p>
             </div>
             <div className="p-4 bg-[#fbee21] rounded-2xl text-center">
                <p className="text-[8px] font-black text-[#292667]/40 uppercase tracking-widest mb-1">Level</p>
                <p className="text-xl font-black text-[#292667]">Elite</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
