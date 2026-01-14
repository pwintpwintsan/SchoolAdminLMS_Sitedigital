
import React, { useState } from 'react';
import { MOCK_STUDENTS, LEVELS, LANGUAGES } from '../../constants';
import { Award, Printer, Download, RefreshCw, Sparkles, User, Globe, Calendar } from 'lucide-react';

const BrandLogo = () => (
  <div className="flex flex-col items-center">
    <svg width="80" height="50" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 5)">
        <path d="M25 25c0-10 8-15 15-15s15 5 15 15-8 15-15 15-15-5-15-15z" fill="#FFE0BD" />
        <circle cx="33" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <circle cx="47" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <path d="M25 45h30l6 18H19l6-18z" fill="#ec2027" />
        <path d="M30 45h20v18H30V45z" fill="#00a651" />
        <path d="M15 55l25 12 25-12v15l-25 12-25-12z" fill="#fbee21" stroke="#000" strokeWidth="1" />
      </g>
      <g transform="translate(85, 10)">
        <path d="M15 20c0-10 8-15 15-15s15 5 15 15-8 15-15 15-15-5-15-15z" fill="#FFE0BD" />
        <circle cx="23" cy="20" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <circle cx="37" cy="20" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <path d="M15 40h30l6 14H9l6-14z" fill="#00a651" />
        <path d="M20 40h20v14H20V40z" fill="#ec2027" />
      </g>
    </svg>
    <div className="flex items-center -mt-2">
      <span className="text-xl font-black text-[#ec2027] pr-1">U</span>
      <span className="text-base font-black text-[#292667] tracking-tight">Book Store</span>
    </div>
  </div>
);

export const CertificatesView: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);
  const [certData, setCertData] = useState({
    language: LANGUAGES[0],
    date: new Date().toISOString().split('T')[0],
    studentCode: 'UC-' + Math.floor(1000 + Math.random() * 9000),
    level: LEVELS[0]
  });

  const handleUpdate = (field: string, val: string) => {
    setCertData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#a855f7] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#a855f7] rounded-[2rem] text-white shadow-xl rotate-3">
             <Award size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Award <span className="text-[#fbee21]">Generator</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">RECOGNITION HUB</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">U Book Store Official Degrees</span>
             </div>
           </div>
        </div>
        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">12</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Certs Issued</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#00a651]">0</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Pending</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden pb-4">
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-100 shadow-xl flex-1 flex flex-col overflow-hidden">
            <h3 className="font-black text-[#292667] text-lg uppercase tracking-tight mb-8 flex items-center gap-3">
              <Sparkles className="text-amber-500" /> Certificate Config
            </h3>
            
            <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide pr-2">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Learner Select</label>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#a855f7]">
                  <User size={20} className="text-slate-400" strokeWidth={3} />
                  <select 
                    className="w-full bg-transparent font-black text-[#292667] outline-none uppercase text-sm"
                    onChange={(e) => setSelectedStudent(MOCK_STUDENTS.find(s => s.id === e.target.value) || MOCK_STUDENTS[0])}
                  >
                    {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Award Language</label>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#a855f7]">
                  <Globe size={20} className="text-slate-400" strokeWidth={3} />
                  <select 
                    className="w-full bg-transparent font-black text-[#292667] outline-none uppercase text-sm"
                    value={certData.language}
                    onChange={(e) => handleUpdate('language', e.target.value)}
                  >
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Issue Date</label>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 group focus-within:border-[#a855f7]">
                  <Calendar size={20} className="text-slate-400" strokeWidth={3} />
                  <input 
                    type="date"
                    className="w-full bg-transparent font-black text-[#292667] outline-none uppercase text-sm"
                    value={certData.date}
                    onChange={(e) => handleUpdate('date', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-6 mt-6 bg-[#ec2027] text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.15em] flex items-center justify-center gap-4 hover:bg-[#292667] transition-all shadow-2xl shadow-red-100 border-b-6 border-black/20 active:scale-95">
              <RefreshCw size={24} strokeWidth={3} /> Generate Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 bg-white rounded-[3rem] border-[12px] border-double border-amber-200 p-8 md:p-12 text-center relative shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-amber-400 rounded-tl-[2rem] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-amber-400 rounded-br-[2rem] opacity-20"></div>

            <div className="mb-6 flex flex-col items-center">
              <div className="p-4 bg-white rounded-3xl border-2 border-slate-100 shadow-xl mb-4 transform hover:scale-105 transition-transform">
                <BrandLogo />
              </div>
              <h1 className="text-3xl font-serif text-slate-800 mb-2 tracking-tight">Certificate of Completion</h1>
              <p className="text-slate-400 font-bold italic text-base">This is proudly presented to</p>
            </div>

            <div className="mb-8">
              <h2 className="text-5xl font-black text-[#292667] mb-4 uppercase tracking-tight leading-none">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
              <div className="h-1 w-64 bg-[#fbee21] mx-auto mb-4 rounded-full"></div>
              <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
                For successfully completing the <span className="font-black text-[#ec2027] uppercase">{certData.level}</span> program in <span className="font-black text-[#00a651] uppercase">{certData.language}</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 w-full max-w-lg mt-4">
              <div className="space-y-1">
                <p className="font-black text-xl text-[#292667] uppercase tracking-tighter">Teacher Jane</p>
                <div className="h-0.5 bg-slate-200 w-full mb-1"></div>
                <p className="text-slate-400 uppercase tracking-[0.2em] font-black text-[9px]">Head Educator</p>
              </div>
              <div className="space-y-1">
                <p className="font-mono font-black text-xl text-[#292667]">{certData.date}</p>
                <div className="h-0.5 bg-slate-200 w-full mb-1"></div>
                <p className="text-slate-400 uppercase tracking-[0.2em] font-black text-[9px]">Issue Date</p>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 text-[9px] text-slate-300 font-black font-mono tracking-widest">
              ID: {certData.studentCode}
            </div>
          </div>

          <div className="flex justify-center gap-6 shrink-0">
            <button className="flex items-center gap-4 px-10 py-5 bg-[#292667] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
              <Download size={22} strokeWidth={3} /> Download
            </button>
            <button className="flex items-center gap-4 px-10 py-5 bg-[#00a651] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
              <Printer size={22} strokeWidth={3} /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
