
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Award, Palette, Layout, Save, Star, Sparkles, Image as ImageIcon, BookOpen } from 'lucide-react';

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
  const [selectedCourseId, setSelectedCourseId] = useState(MOCK_COURSES[0].id);
  const [config, setConfig] = useState({
    primaryColor: '#292667',
    secondaryColor: '#fbee21',
    accentColor: '#ec2027',
    borderStyle: 'double',
    fontFamily: 'Serif'
  });

  const activeCourse = MOCK_COURSES.find(c => c.id === selectedCourseId) || MOCK_COURSES[0];

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
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden pb-4">
        <div className="lg:col-span-4 bg-white rounded-[3rem] p-8 border-2 border-slate-100 shadow-xl overflow-y-auto scrollbar-hide flex flex-col">
           <h3 className="text-lg font-black text-[#292667] uppercase tracking-tight mb-8">Asset Customizer</h3>
           
           <div className="space-y-8 flex-1">
              <div className="space-y-3">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={14} /> Link to Program</label>
                 <select 
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[11px] uppercase outline-none"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
              </div>

              <div className="space-y-3">
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
                          className="w-full h-12 rounded-xl cursor-pointer border-2 border-slate-100" 
                        />
                        <span className="text-[9px] font-black uppercase text-center text-slate-400">{item.l}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={14} /> Border Finish</label>
                 <select 
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-sm uppercase outline-none"
                    value={config.borderStyle}
                    onChange={(e) => setConfig({...config, borderStyle: e.target.value})}
                  >
                    <option>solid</option>
                    <option>double</option>
                    <option>dashed</option>
                    <option>none</option>
                 </select>
              </div>
           </div>

           <button className="w-full py-6 mt-8 bg-[#292667] text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:bg-[#a855f7] transition-all border-b-8 border-black/10">
              <Save size={24} strokeWidth={3} /> Save Template
           </button>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
           <div className="bg-slate-200/50 p-12 rounded-[4rem] flex-1 flex items-center justify-center">
              <div 
                className="w-full max-w-2xl aspect-[1.4/1] bg-white p-12 text-center relative shadow-2xl flex flex-col items-center justify-center overflow-hidden"
                style={{ 
                  border: `12px ${config.borderStyle} ${config.secondaryColor}`,
                  borderRadius: '2rem'
                }}
              >
                <div className="mb-6">
                  <div className="p-4 bg-white rounded-3xl border-2 border-slate-50 shadow-xl mb-4 transform scale-125 inline-block" style={{ boxShadow: `0 20px 25px -5px ${config.primaryColor}20` }}>
                    <BrandLogo />
                  </div>
                  <h1 className="text-3xl font-serif text-slate-800 mb-2 tracking-tight">Certification of Achievement</h1>
                </div>

                <div className="mb-8">
                  <h2 className="text-5xl font-black mb-4 uppercase tracking-tight" style={{ color: config.primaryColor }}>Timmy Lee</h2>
                  <div className="h-1 w-64 mx-auto mb-4 rounded-full" style={{ backgroundColor: config.secondaryColor }}></div>
                  <p className="text-lg text-slate-400 italic">For successfully completing the</p>
                  <p className="text-2xl font-black uppercase mt-2" style={{ color: config.accentColor }}>{activeCourse.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-lg mt-4 opacity-40">
                  <div className="border-t-2 border-slate-200 pt-2 font-black uppercase text-[10px] tracking-widest">Main Center HQ</div>
                  <div className="border-t-2 border-slate-200 pt-2 font-black uppercase text-[10px] tracking-widest">Global Accreditation</div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.05]" style={{ color: config.accentColor }}><Sparkles size={200} /></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
