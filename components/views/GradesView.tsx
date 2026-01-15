
import React, { useState, useMemo } from 'react';
import { MOCK_STUDENTS, LEVELS, MOCK_CLASSES } from '../../constants.tsx';
import { Student } from '../../types.ts';
import { 
  Save, 
  GraduationCap, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Info, 
  Star, 
  Percent, 
  TrendingUp, 
  Download, 
  Search, 
  FileText, 
  Eye, 
  ChevronRight,
  Sparkles,
  X,
  FileCheck,
  ClipboardList,
  Video,
  FileBadge,
  AlertCircle,
  Trophy,
  History,
  MessageSquare,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const AnswerDetailModal = ({ student, onClose }: { student: Student, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'quizzes' | 'assignments'>('all');

  const quizResults = [
    { id: 'q1', title: 'Logic Basics 101', score: 95, date: '2024-03-05', status: 'Passed', course: student.level },
    { id: 'q2', title: 'Binary Calculations', score: 88, date: '2024-03-12', status: 'Passed', course: student.level },
    { id: 'q3', title: 'Hardware Components', score: 45, date: '2024-03-18', status: 'Failed', course: 'Robotics Intro' },
  ];

  const assignmentResults = [
    { id: 'a1', title: 'Binary Pattern Sorting', grade: 'A', feedback: 'Perfect logic execution!', type: 'Paper', course: student.level },
    { id: 'a2', title: 'Robot Assembly Photo', grade: 'B+', feedback: 'Great build, watch the wiring.', type: 'Image Upload', course: 'Robotics Intro' },
    { id: 'a3', title: 'Logic Gates Worksheet', grade: 'A-', feedback: 'Excellent grasp of OR gates.', type: 'PDF Submission', course: student.level },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#292667]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3.5rem] max-w-4xl w-full shadow-2xl border-t-[15px] border-[#00a651] relative animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-8 md:p-10 bg-slate-50 border-b-2 border-slate-100 shrink-0">
          <button onClick={onClose} className="absolute top-10 right-10 p-3 text-slate-300 hover:text-[#ec2027] transition-all bg-white shadow-sm rounded-2xl border border-slate-100 z-20">
            <X size={28} strokeWidth={3} />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden group">
                 <img src={`https://picsum.photos/seed/${student.id}/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#fbee21] text-[#292667] p-2 rounded-xl shadow-lg border-2 border-white rotate-12">
                 <Trophy size={20} strokeWidth={3} />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 min-w-0">
              <div className="flex wrap justify-center md:justify-start items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-[#00a651]/10 text-[#00a651] rounded-lg text-[10px] font-black uppercase tracking-widest">Global Rank #4</span>
                 <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ID: {student.username}</span>
              </div>
              <h3 className="text-4xl font-black text-[#292667] uppercase tracking-tighter leading-none mb-4">{student.firstName} {student.lastName}</h3>
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit mx-auto md:mx-0">
                 {[
                   { id: 'all', label: 'Submission Records', icon: History },
                   { id: 'quizzes', label: 'Quizzes', icon: Video },
                   { id: 'assignments', label: 'Assignments', icon: ClipboardList }
                 ].map(tab => {
                   const TabIcon = tab.icon;
                   return (
                     <button 
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as any)}
                       className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-[#292667] shadow-md' : 'text-slate-500 hover:text-[#292667]'}`}
                     >
                       <TabIcon size={14} /> {tab.label}
                     </button>
                   );
                 })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Main Listing */}
            <div className="md:col-span-8 space-y-6">
               {(activeTab === 'all' || activeTab === 'quizzes') && (
                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Video size={16} className="text-indigo-500" /> Automated Quiz Results
                    </h4>
                    {quizResults.map(quiz => (
                      <div key={quiz.id} className="p-6 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-indigo-400 transition-all group flex items-center justify-between shadow-sm">
                         <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white shadow-xl ${quiz.score >= 80 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`}>
                               {quiz.score}%
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[8px] font-black uppercase bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-md border border-indigo-100">{quiz.course}</span>
                               </div>
                               <p className="font-black text-[#292667] text-lg uppercase leading-none mb-1.5">{quiz.title}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{quiz.date} • {quiz.status}</p>
                            </div>
                         </div>
                         <button className="p-3 bg-slate-50 text-slate-300 hover:text-[#292667] rounded-xl transition-all"><ChevronRight size={20} /></button>
                      </div>
                    ))}
                 </div>
               )}

               {(activeTab === 'all' || activeTab === 'assignments') && (
                 <div className="space-y-4 pt-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <ClipboardList size={16} className="text-[#ec2027]" /> Hands-on Submissions
                    </h4>
                    {assignmentResults.map(asgn => (
                      <div key={asgn.id} className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-[#ec2027] transition-all shadow-sm group">
                         <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-red-50 text-[#ec2027] rounded-2xl">
                                  <FileText size={24} strokeWidth={3} />
                               </div>
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="text-[8px] font-black uppercase bg-rose-50 text-rose-500 px-2 py-0.5 rounded-md border border-rose-100">{asgn.course}</span>
                                  </div>
                                  <h5 className="font-black text-[#292667] text-xl uppercase tracking-tight">{asgn.title}</h5>
                                  <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest">{asgn.type}</span>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Teacher Grade</p>
                               <p className="text-3xl font-black text-[#00a651]">{asgn.grade}</p>
                            </div>
                         </div>
                         <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                            <MessageSquare size={16} className="text-[#3b82f6] shrink-0 mt-1" />
                            <p className="text-xs font-bold text-slate-600 leading-relaxed italic">"{asgn.feedback}"</p>
                         </div>
                         <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-3 bg-[#292667] text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                               <Eye size={14} /> Open Original Submission
                            </button>
                            <button className="px-5 py-3 bg-slate-100 text-slate-400 rounded-xl hover:text-[#292667] transition-colors active:scale-95">
                               <Download size={16} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* Sidebar Meta */}
            <div className="md:col-span-4 space-y-6">
               <div className="bg-[#292667] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border-b-[8px] border-[#fbee21]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                  <h4 className="text-[10px] font-black text-[#fbee21] uppercase tracking-[0.2em] mb-6">Course Stats</h4>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Attendance</span>
                        <span className="text-lg font-black">{student.attendance} / 30</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Study Time</span>
                        <span className="text-lg font-black">{Math.floor(student.studyTime / 60)} hrs</span>
                     </div>
                     <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Syllabus Progress</span>
                           <span className="text-sm font-black text-[#fbee21]">{student.taskCompletion}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
                           <div className="h-full bg-[#fbee21] transition-all duration-1000" style={{ width: `${student.taskCompletion}%` }}></div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Target size={16} className="text-[#ec2027]" /> Educator Actions
                  </h4>
                  <div className="space-y-3">
                     <button className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-[10px] text-[#292667] uppercase tracking-widest hover:border-[#ec2027] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
                        <ArrowUpRight size={16} className="text-[#ec2027]" /> Generate Report Card
                     </button>
                     <button className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-[10px] text-[#292667] uppercase tracking-widest hover:border-[#3b82f6] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm">
                        <ExternalLink size={16} className="text-[#3b82f6]" /> Contact Guardian
                     </button>
                  </div>
               </div>

               <div className="p-8 bg-green-50 rounded-[2.5rem] border-2 border-green-100 text-center">
                  <Sparkles size={32} className="text-[#00a651] mx-auto mb-4" />
                  <p className="text-[10px] font-black text-[#00a651] uppercase tracking-widest leading-relaxed">
                    Student has unlocked 3 Bonus Modules this week!
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t-2 border-slate-100 bg-white shrink-0">
          <button onClick={onClose} className="w-full py-6 bg-[#292667] text-[#fbee21] rounded-3xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-[#ec2027] hover:text-white transition-all border-b-8 border-black/10 active:scale-95">
             Return to Roster
          </button>
        </div>
      </div>
    </div>
  );
};

export const GradesView: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [classPassingRate, setClassPassingRate] = useState(80);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentGrades, setStudentGrades] = useState(MOCK_STUDENTS);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);

  // Derive the active class
  const activeClass = MOCK_CLASSES.find(c => c.id === selectedClassId) || MOCK_CLASSES[0];

  // Filtering Logic
  const filteredStudents = useMemo(() => {
    return studentGrades.filter(s => {
      const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || s.username.includes(searchTerm);
      return matchesSearch;
    });
  }, [studentGrades, searchTerm, selectedClassId]);

  const handleGradeChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    setStudentGrades(prev => prev.map(s => s.id === id ? { ...s, finalGrade: Math.min(100, Math.max(0, num)) } : s));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleDownload = () => {
    alert(`Generating detailed grade sheet PDF for ${activeClass.name}...`);
  };

  const avgGrade = Math.round(filteredStudents.reduce((a, b) => a + b.finalGrade, 0) / (filteredStudents.length || 1));

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      
      {selectedStudentDetail && (
        <AnswerDetailModal 
          student={selectedStudentDetail} 
          onClose={() => setSelectedStudentDetail(null)} 
        />
      )}

      {/* Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#fbee21] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#fbee21] rounded-[2rem] text-[#292667] shadow-xl rotate-3">
             <GraduationCap size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Exam <span className="text-[#fbee21]">Results</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">TEACHER PORTAL</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">{activeClass.name} • Class Avg: {avgGrade}%</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
           <button 
              onClick={handleDownload}
              className="flex flex-col items-center justify-center p-5 bg-white/10 hover:bg-white/20 rounded-[2rem] transition-all border-2 border-white/10 active:scale-95 group"
           >
              <Download size={28} className="text-[#fbee21] group-hover:animate-bounce" />
              <p className="text-[9px] font-black uppercase tracking-widest mt-2">Get PDF Sheet</p>
           </button>
        </div>
      </div>

      {/* Controls & Filter Panel */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex flex-1 items-center gap-4 w-full flex-wrap xl:flex-nowrap">
          {/* Class Switcher */}
          <div className="flex-1 min-w-[200px] flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#292667]">
            <BookOpen size={22} className="text-[#ec2027]" strokeWidth={3} />
            <select 
              value={selectedClassId} 
              onChange={e => setSelectedClassId(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full uppercase cursor-pointer"
            >
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name} • {c.level}</option>)}
            </select>
          </div>

          {/* Search Box */}
          <div className="flex-[1.5] min-w-[250px] flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#00a651] transition-all shadow-sm">
            <Search size={22} className="text-slate-400" group-focus-within:text-[#00a651]" strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Search by learner name or student code..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-base font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
            />
          </div>

          {/* Class-wide Passing Rate Setting */}
          <div className="min-w-[200px] bg-[#292667] text-white px-6 py-4 rounded-[1.5rem] flex items-center justify-between border-b-6 border-black/20 shadow-lg group">
             <div className="flex flex-col">
                <p className="text-[9px] font-black text-[#fbee21] uppercase tracking-widest leading-none mb-1">Set Pass Rate</p>
                <div className="flex items-center gap-1">
                   <Percent size={14} className="text-[#fbee21]" />
                   <input 
                     type="number" 
                     value={classPassingRate} 
                     onChange={(e) => setClassPassingRate(parseInt(e.target.value) || 0)}
                     className="bg-transparent font-black text-2xl w-12 outline-none"
                   />
                </div>
             </div>
             <Target size={24} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-3 px-10 py-5 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] shadow-2xl transition-all active:scale-95 border-b-6 border-black/10 shrink-0 ${
            isSaving ? 'bg-[#00a651] scale-95' : 'bg-[#ec2027] hover:bg-[#292667]'
          }`}
        >
          {isSaving ? <CheckCircle2 size={24} strokeWidth={3} /> : <Save size={24} strokeWidth={3} />}
          <span>{isSaving ? 'Changes Saved' : 'Save All Grades'}</span>
        </button>
      </div>

      {/* Grade Worksheet */}
      <div className="flex-1 bg-white rounded-[3rem] border-2 border-slate-100 overflow-hidden shadow-2xl flex flex-col relative">
        <div className="px-10 py-6 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 text-[#292667] rounded-lg">
                <FileText size={18} strokeWidth={3} />
             </div>
             <h3 className="font-black text-[#292667] text-xl uppercase tracking-tight">Learner Evaluation Table</h3>
          </div>
          <div className="hidden lg:flex items-center gap-10">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-[#00a651] text-white flex items-center justify-center font-black text-sm shadow-sm border-b-4 border-black/10">P</div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#00a651]">Passing (≥ {classPassingRate}%)</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-[#ec2027] text-white flex items-center justify-center font-black text-sm shadow-sm border-b-4 border-black/10">F</div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#ec2027]">Failing</span>
             </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide divide-y-2 divide-slate-50">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const isPassing = student.finalGrade >= classPassingRate;
              return (
                <div key={student.id} className="px-10 py-6 flex flex-col lg:flex-row items-center justify-between hover:bg-slate-50 transition-all group gap-8 border-l-[10px] border-transparent hover:border-[#fbee21]">
                  
                  {/* Left: Profile & Basic Info */}
                  <div className="flex items-center gap-6 flex-1 w-full min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform group-hover:rotate-3">
                        <img src={`https://picsum.photos/seed/${student.id}/150`} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-[#292667] text-2xl uppercase tracking-tight leading-none mb-1.5 truncate">{student.firstName} {student.lastName}</p>
                      <div className="flex wrap items-center gap-3">
                        <p className="text-[10px] font-black text-[#ec2027] font-mono tracking-widest uppercase shrink-0">#{student.username}</p>
                        <span className="px-2.5 py-0.5 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">{student.level}</span>
                      </div>
                      
                      {/* Task Progress Bar */}
                      <div className="mt-4 max-w-[200px]">
                         <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                               <FileBadge size={10} className="text-[#3b82f6]" /> Tasks Completed
                            </span>
                            <span className="text-[10px] font-black text-[#292667]">{student.taskCompletion}%</span>
                         </div>
                         <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-white shadow-inner">
                            <div 
                               className={`h-full transition-all duration-1000 ${student.taskCompletion >= 90 ? 'bg-[#00a651]' : 'bg-[#3b82f6]'}`} 
                               style={{ width: `${student.taskCompletion}%` }}
                            ></div>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Actions & Input */}
                  <div className="flex items-center gap-6 bg-white p-5 rounded-[2.5rem] border-2 border-slate-100 shadow-sm group-hover:shadow-md transition-all w-full lg:w-auto justify-between lg:justify-end">
                    
                    {/* Status P/F Indicator (Large Box) */}
                    <div className="flex items-center gap-4">
                       <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-3xl shadow-xl transition-all border-b-6 border-black/10 group-hover:scale-110 active:scale-95 ${
                         isPassing ? 'bg-[#00a651] text-white shadow-green-100' : 'bg-[#ec2027] text-white shadow-red-100'
                       }`}>
                         {isPassing ? 'P' : 'F'}
                       </div>
                    </div>

                    <div className="w-px h-12 bg-slate-100 mx-1 hidden sm:block"></div>

                    {/* Final Grade Editable Input */}
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Final Score</p>
                        <p className={`text-xs font-black uppercase ${isPassing ? 'text-[#00a651]' : 'text-[#ec2027]'}`}>
                           {isPassing ? 'Passing' : 'Failing'}
                        </p>
                      </div>
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={student.finalGrade}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          className={`w-28 px-4 py-3.5 text-center bg-slate-50 border-4 ${isPassing ? 'border-green-100 focus:border-[#00a651]' : 'border-red-100 focus:border-[#ec2027]'} rounded-[1.2rem] font-black text-2xl text-[#292667] outline-none transition-all shadow-inner`}
                        />
                        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-xl font-black text-slate-200">%</span>
                      </div>
                    </div>

                    <div className="w-px h-12 bg-slate-100 mx-1 hidden sm:block"></div>

                    {/* View Results Action: Eye icon leads to the submission detailed modal */}
                    <button 
                      onClick={() => setSelectedStudentDetail(student)}
                      className="p-4 bg-[#292667] text-white rounded-[1.5rem] shadow-xl hover:bg-[#00a651] transition-all hover:scale-110 active:scale-95 group/btn relative"
                      title="View Submission Results & Answers"
                    >
                       <Eye size={28} strokeWidth={3} className="group-hover/btn:rotate-12 transition-transform" />
                       <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#fbee21] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <Sparkles size={10} className="text-[#292667]" />
                       </div>
                    </button>

                    <div className="hidden xl:block ml-2">
                       <ChevronRight className="text-slate-200" size={28} strokeWidth={4} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-32 flex flex-col items-center justify-center opacity-30 text-center animate-in zoom-in-95">
               <div className="p-10 bg-slate-50 rounded-full mb-8">
                  <Search size={80} className="text-slate-200" strokeWidth={1} />
               </div>
               <h4 className="text-3xl font-black text-[#292667] uppercase tracking-tighter">Learner Not Found</h4>
               <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Try a different name, ID, or class filter.</p>
            </div>
          )}
        </div>

        {/* Status Indicator Floating */}
        <div className="absolute bottom-10 right-10 pointer-events-none group">
           <div className="bg-[#292667] text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border-4 border-white translate-y-0 group-hover:-translate-y-2 transition-transform">
              <div className="p-2.5 bg-[#fbee21] rounded-2xl shadow-lg rotate-6">
                <Target className="text-[#292667]" size={28} />
              </div>
              <div className="flex flex-col">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 text-white/50">Admin Center</p>
                 <p className="text-sm font-black text-[#fbee21] uppercase tracking-tight">Grade Verification Active</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
