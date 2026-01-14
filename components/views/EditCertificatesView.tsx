
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Award, Palette, Layout, Save, Star, Sparkles, RefreshCw, BookOpen, User, Hash, Calendar, Type, CheckCircle2 } from 'lucide-react';

const BrandLogo = () => (
  <div className="flex flex-col items-center">
    <svg width="60" height="40" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <div className="flex items-center -mt-1.5">
      <span className="text-[12px] font-black text-[#ec2027] pr-0.5">U</span>
      <span className="text-[10px] font-black text-[#292667] tracking-tight">Book Store</span>
    </div>
  </div>
);

export const EditCertificatesView: React.FC = () => {
  const initialConfig = {
    primaryColor: '#292667',
    secondaryColor: '#fbee21',
    accentColor: '#ec2027',
    borderStyle: 'double',
    fontFamily: 'Serif',
    studentName: 'TIMMY LEE',
    courseName: MOCK_COURSES[0].name,
    studentCode: 'UC-9421',
    issueDate: new Date().toISOString().split('T')[0]
  };

  const [selectedCourseId, setSelectedCourseId] = useState(MOCK_COURSES[0].id);
  const [config, setConfig] = useState(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleCourseChange = (id: string) => {
    const course = MOCK_COURSES.find(c => c.id === id);
    if (course) {
      setSelectedCourseId(id);
      setConfig(prev => ({ ...prev, courseName: course.name }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset template to defaults?")) {
      setConfig(initialConfig);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#a855f7] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#a855f7] rounded-[2rem] text-white shadow-xl rotate-3">
             <Award size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Branding <span className="text-[#fbee21]">Hub</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">TEMPLATE STYLES</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Global Award Designer</span>
             </div>
           </div>
        </div>
        <button 
           onClick={handleReset}
           className="px-8 py-3 bg-white/10 text-white border-2 border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#ec2027] hover:border-transparent transition-all z-10"
        >
          Reset to Default
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden pb-4">
        {/* Sidebar Customizer */}
        <div className="lg:col-span-4 bg-white rounded-[3rem] p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
           <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight mb-8">Asset Customizer</h3>
           
           <div className="space-y-6 flex-1 pr-2">
              <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={14} /> Link to Program</label>
                 <select 
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[11px] uppercase outline-none focus:border-[#a855f7] transition-all"
                    value={selectedCourseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                  >
                    {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Student Name</label>
                 <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase outline-none focus:border-[#a855f7] transition-all"
                      value={config.studentName}
                      onChange={(e) => setConfig({...config, studentName: e.target.value})}
                      placeholder="ENTER NAME"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Star size={14} /> Course Title Override</label>
                 <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase outline-none focus:border-[#a855f7] transition-all"
                      value={config.courseName}
                      onChange={(e) => setConfig({...config, courseName: e.target.value})}
                      placeholder="COURSE NAME"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Hash size={14} /> Student Code</label>
                   <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase outline-none focus:border-[#a855f7] transition-all"
                      value={config.studentCode}
                      onChange={(e) => setConfig({...config, studentCode: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14} /> Issue Date</label>
                   <input 
                      type="date" 
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase outline-none focus:border-[#a855f7] transition-all"
                      value={config.issueDate}
                      onChange={(e) => setConfig({...config, issueDate: e.target.value})}
                    />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Palette size={14} /> Palette Control</label>
                 <div className="grid grid-cols-3 gap-3">
                    {[
                      { l: 'Brand', v: config.primaryColor, k: 'primaryColor' },
                      { l: 'Accent', v: config.secondaryColor, k: 'secondaryColor' },
                      { l: 'Highlight', v: config.accentColor, k: 'accentColor' }
                    ].map(item => (
                      <div key={item.k} className="flex flex-col gap-2">
                        <input 
                          type="color" 
                          value={item.v}
                          onChange={(e) => setConfig({...config, [item.k]: e.target.value})}
                          className="w-full h-12 rounded-xl cursor-pointer border-2 border-slate-100 shadow-inner" 
                        />
                        <span className="text-[8px] font-black uppercase text-center text-slate-400">{item.l}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={14} /> Border Finish</label>
                 <select 
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xs uppercase outline-none focus:border-[#a855f7] transition-all"
                    value={config.borderStyle}
                    onChange={(e) => setConfig({...config, borderStyle: e.target.value})}
                  >
                    <option value="solid">SOLID FRAME</option>
                    <option value="double">DOUBLE FRAME</option>
                    <option value="dashed">DASHED FRAME</option>
                    <option value="none">NO FRAME</option>
                 </select>
              </div>
           </div>

           <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`w-full py-6 mt-8 rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 transition-all border-b-8 border-black/10 active:scale-95 ${
                isSaving ? 'bg-[#00a651] text-white' : 'bg-[#292667] text-white hover:bg-[#a855f7]'
              }`}
           >
              {isSaving ? <CheckCircle2 size={24} /> : <Save size={24} strokeWidth={3} />}
              {isSaving ? 'Branding Saved' : 'Save Template'}
           </button>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
           <div className="bg-slate-200/50 p-8 md:p-12 rounded-[4rem] flex-1 flex items-center justify-center overflow-hidden">
              <div 
                className="w-full max-w-2xl aspect-[1.4/1] bg-white p-12 text-center relative shadow-2xl flex flex-col items-center justify-center overflow-hidden animate-in zoom-in-95"
                style={{ 
                  border: `12px ${config.borderStyle} ${config.secondaryColor}`,
                  borderRadius: '2.5rem'
                }}
              >
                <div className="mb-6 flex flex-col items-center">
                  <div className="p-4 bg-white rounded-3xl border-2 border-slate-50 shadow-xl mb-4 transform scale-125 inline-block" style={{ boxShadow: `0 20px 25px -5px ${config.primaryColor}20` }}>
                    <BrandLogo />
                  </div>
                  <h1 className="text-2xl font-serif text-slate-800 mb-2 tracking-tight">Certification of Achievement</h1>
                  <p className="text-slate-400 font-bold italic text-sm">This is proudly presented to</p>
                </div>

                <div className="mb-8 w-full">
                  <h2 className="text-5xl font-black mb-4 uppercase tracking-tight leading-none truncate px-4" style={{ color: config.primaryColor }}>
                    {config.studentName || 'LEARNER NAME'}
                  </h2>
                  <div className="h-1 w-64 mx-auto mb-4 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
                  <p className="text-base text-slate-400 italic">For successfully completing the program</p>
                  <p className="text-2xl font-black uppercase mt-2 tracking-tight" style={{ color: config.accentColor }}>
                    {config.courseName || 'COURSE NAME'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-lg mt-4">
                  <div className="space-y-1">
                    <div className="border-t-2 border-slate-100 pt-2 font-black uppercase text-[9px] tracking-[0.2em] text-slate-400">Main Center HQ</div>
                    <div className="h-1 w-12 bg-slate-100 mx-auto rounded-full mt-1"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="border-t-2 border-slate-100 pt-2 font-black uppercase text-[9px] tracking-[0.2em] text-slate-400">Date: {config.issueDate}</div>
                    <div className="font-mono text-[8px] text-slate-300 mt-1 uppercase">CODE: {config.studentCode}</div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.05]" style={{ color: config.accentColor }}><Sparkles size={200} /></div>
              </div>
           </div>
           
           <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg border-2 border-slate-100">
                 <div className="w-3 h-3 rounded-full animate-pulse bg-emerald-500"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#292667]">Live Preview Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
