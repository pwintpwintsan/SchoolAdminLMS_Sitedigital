
import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Users, 
  GraduationCap, 
  Upload, 
  Save, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  Sparkles,
  User,
  Hash
} from 'lucide-react';

interface BranchRegistrationViewProps {
  onBack: () => void;
}

export const BranchRegistrationView: React.FC<BranchRegistrationViewProps> = ({ onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    branchId: '',
    adminEmail: '',
    contactPerson: '',
    teacherQuota: 10,
    studentQuota: 200,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden animate-in slide-in-from-bottom duration-500">
      {/* Header Bar - Reduced padding and rounding */}
      <div className="w-full bg-[#292667] rounded-[1.5rem] p-4 md:p-6 text-white shadow-2xl border-b-[8px] border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <button onClick={onBack} className="p-3 bg-white/10 rounded-xl text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10">
            <ChevronLeft size={32} strokeWidth={4} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Registry <span className="text-[#fbee21]">Hub</span></h2>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <span className="px-2 py-0.5 bg-[#ec2027] rounded text-[9px] font-black uppercase tracking-[0.1em] text-white">Enrollment</span>
              <span className="text-[10px] font-black text-[#fbee21] uppercase tracking-[0.1em]">Global Expansion</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <div className="p-3 bg-white/10 rounded-xl border-2 border-dashed border-white/20 flex items-center gap-3">
              <Building2 size={24} className="text-[#fbee21]" />
              <div className="hidden sm:block">
                 <p className="text-[8px] font-black uppercase text-white/40 tracking-widest leading-none">Security Status</p>
                 <p className="text-xs font-black text-white uppercase mt-1 tracking-tight">ENCRYPTED</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Registration Form - Reduced grid gap and card padding */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-6">
          
          {isSuccess && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#292667]/90 backdrop-blur-xl animate-in fade-in duration-300 p-6 text-center">
              <div className="animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-[#00a651] text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                  <CheckCircle2 size={48} strokeWidth={4} />
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Hub Registered!</h3>
                <p className="text-lg font-bold text-[#fbee21] opacity-90">Branch details saved successfully.</p>
              </div>
            </div>
          )}

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
            <div className="bg-white rounded-[1.5rem] p-6 shadow-xl border-2 border-slate-100 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-red-50 text-[#ec2027] rounded-lg shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight">Branch Identity</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Branch Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. North Point Excellence Academy" 
                    className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#ec2027] outline-none font-black text-lg text-[#292667] shadow-inner transition-all placeholder:text-slate-200"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. West District" 
                        className="w-full bg-slate-50 pl-12 pr-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#ec2027] outline-none font-black text-base text-[#292667] shadow-inner transition-all"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Branch ID</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="UB-XXXX" 
                        className="w-full bg-slate-50 pl-12 pr-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#ec2027] outline-none font-black text-base text-[#ec2027] shadow-inner transition-all uppercase"
                        value={formData.branchId}
                        onChange={e => setFormData({...formData, branchId: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Description</label>
                  <textarea 
                    placeholder="Brief description..." 
                    rows={3}
                    className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#ec2027] outline-none font-bold text-base text-[#292667] shadow-inner transition-all resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-6 shadow-xl border-2 border-slate-100 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-blue-50 text-[#3b82f6] rounded-lg shadow-sm">
                  <Mail size={20} />
                </div>
                <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight">Operations</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Admin Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="admin@branch.ubook.com" 
                    className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-base text-[#292667] shadow-inner transition-all"
                    value={formData.adminEmail}
                    onChange={e => setFormData({...formData, adminEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contact Person</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. John Doe" 
                      className="w-full bg-slate-50 pl-12 pr-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-base text-[#292667] shadow-inner transition-all"
                      value={formData.contactPerson}
                      onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            <div className="bg-[#292667] rounded-[1.5rem] p-6 shadow-2xl border-b-[8px] border-[#fbee21] text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#fbee21] text-[#292667] rounded-lg shadow-lg rotate-3">
                  <Sparkles size={20} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Capacities</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border-2 border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="text-[#ec2027]" size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Staff</span>
                    </div>
                    <input 
                      type="number" 
                      value={formData.teacherQuota}
                      onChange={e => setFormData({...formData, teacherQuota: parseInt(e.target.value) || 0})}
                      className="w-20 bg-white/10 border-2 border-white/20 rounded-lg px-3 py-1.5 text-center font-black text-lg outline-none focus:border-[#fbee21]"
                    />
                </div>

                <div className="bg-white/5 p-4 rounded-xl border-2 border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="text-[#3b82f6]" size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Learner</span>
                    </div>
                    <input 
                      type="number" 
                      value={formData.studentQuota}
                      onChange={e => setFormData({...formData, studentQuota: parseInt(e.target.value) || 0})}
                      className="w-20 bg-white/10 border-2 border-white/20 rounded-lg px-3 py-1.5 text-center font-black text-lg outline-none focus:border-[#fbee21]"
                    />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-6 shadow-xl border-2 border-slate-100">
              <h3 className="text-base font-black text-[#292667] uppercase tracking-tight mb-4 flex items-center gap-2">
                 <div className="p-1.5 bg-emerald-50 text-[#00a651] rounded-lg"><Sparkles size={14} /></div>
                 Branch Logo
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-slate-50 rounded-xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-[#ec2027] transition-all relative overflow-hidden shadow-inner flex-shrink-0">
                  <Upload size={24} className="text-slate-200 group-hover:text-[#ec2027]" />
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center px-2">Logo</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                   <p className="text-[10px] font-bold text-amber-800 leading-tight">
                     PNG under 2MB recommended for better performance.
                   </p>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-5 bg-[#292667] text-[#fbee21] rounded-2xl font-black text-lg uppercase tracking-[0.1em] shadow-xl hover:bg-[#00a651] hover:text-white transition-all active:scale-95 transform border-b-[8px] border-black/10 group overflow-hidden relative">
               <span className="relative z-10 flex items-center justify-center gap-3">
                  <Save size={24} /> Confirm Hub
               </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
