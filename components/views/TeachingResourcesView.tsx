
import React, { useState } from 'react';
import { LANGUAGES } from '../../constants';
import { FileText, PlayCircle, Download, ExternalLink, Filter, Search, FileSearch, Sparkles, BookOpen, Plus, FileUp } from 'lucide-react';

export const TeachingResourcesView: React.FC = () => {
  const [filter, setFilter] = useState({ book: 'all', lang: 'all', section: 'all' });

  const resources = [
    { id: 1, title: 'Teacher Guide: Introduction to Logic', type: 'PDF', size: '2.4 MB', lang: 'English', book: 'Digital Kids V2' },
    { id: 2, title: 'Animated Module 1: Binary Concepts', type: 'Video', size: '45 MB', lang: 'English', book: 'Digital Kids V1' },
    { id: 3, title: 'Worksheet: Pattern Recognition', type: 'DOCX', size: '1.1 MB', lang: 'Spanish', book: 'Digital Kids V2' },
    { id: 4, title: 'Classroom Activity: Card Sorting', type: 'PDF', size: '3.8 MB', lang: 'Portuguese', book: 'Digital Kids V3' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#6366f1] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#6366f1] rounded-[2rem] text-white shadow-xl rotate-3">
             <FileSearch size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Teaching <span className="text-[#fbee21]">Library</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">RESOURCES ACTIVE</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Official Global Assets</span>
             </div>
           </div>
        </div>
        <button className="flex items-center gap-4 px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-6 border-black/10 relative z-10">
          <FileUp size={28} strokeWidth={3} />
          <span>Upload New Asset</span>
        </button>
      </div>

      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col xl:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#6366f1]">
          <Search size={24} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by book title or topic..." 
            className="bg-transparent text-lg font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex-1 min-w-[150px] flex items-center gap-3 bg-slate-50 px-5 py-3.5 rounded-[1.5rem] border-2 border-slate-100">
            <BookOpen size={18} className="text-[#ec2027]" strokeWidth={3} />
            <select className="bg-transparent text-[11px] font-black text-[#292667] outline-none w-full uppercase">
              <option>All Series</option>
              <option>Digital Kids V1</option>
              <option>Digital Kids V2</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px] flex items-center gap-3 bg-slate-50 px-5 py-3.5 rounded-[1.5rem] border-2 border-slate-100">
            <Filter size={18} className="text-[#00a651]" strokeWidth={3} />
            <select className="bg-transparent text-[11px] font-black text-[#292667] outline-none w-full uppercase">
              <option>All Sections</option>
              <option>Curriculum</option>
              <option>Assessments</option>
            </select>
          </div>
          <button className="p-4 bg-[#6366f1] text-white rounded-[1.5rem] shadow-xl hover:bg-[#292667] transition-all active:scale-95 border-b-4 border-black/20">
             <Filter size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          {resources.map((res) => (
            <div key={res.id} className="bg-white rounded-[3rem] p-8 border-2 border-slate-100 hover:border-[#6366f1] transition-all group shadow-lg flex items-start gap-6 relative overflow-hidden">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 shadow-md ${res.type === 'Video' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-[#ec2027]'}`}>
                {res.type === 'Video' ? <PlayCircle size={32} strokeWidth={2.5} /> : <FileText size={32} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ec2027] bg-red-50 px-2.5 py-1 rounded-full">{res.type}</span>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{res.size}</span>
                </div>
                <h4 className="text-lg font-black text-[#292667] uppercase tracking-tight leading-snug group-hover:text-[#6366f1] transition-colors">{res.title}</h4>
                <div className="flex gap-2 mt-3">
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg uppercase">{res.lang}</span>
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg uppercase">{res.book}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-3 bg-[#292667] text-white rounded-xl shadow-xl hover:bg-[#ec2027] transition-all active:scale-95 shadow-red-100">
                  <Download size={20} strokeWidth={3} />
                </button>
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-[#292667] transition-all">
                  <ExternalLink size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="absolute -bottom-6 -right-6 opacity-[0.03] text-[#292667]">
                <Sparkles size={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
