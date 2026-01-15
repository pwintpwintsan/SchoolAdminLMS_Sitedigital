
import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { UserPlus, ShieldAlert, Mail, Lock, User, UserCheck, CheckCircle2, AlertCircle, Search, Filter, Trash2, Edit, Building2, MoreHorizontal, ShieldCheck, Plus, GraduationCap, Briefcase, ChevronDown } from 'lucide-react';

export const AccountCreationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('manage');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Teacher',
    jobTitle: '',
    branchName: '',
    password: '',
  });

  const [mockStaff, setMockStaff] = useState([
    { id: 's1', name: 'Alice Teacher', role: 'Teacher', branch: 'Downtown Branch', email: 'alice@ubook.com', status: 'Active' },
    { id: 's2', name: 'Bob Admin', role: 'School Admin', branch: 'Westside Academy', email: 'bob@ubook.com', status: 'Active' },
    { id: 's3', name: 'Charlie Editor', role: 'LMS Editor', branch: 'Main Center', email: 'charlie@ubook.com', status: 'Active' },
    { id: 's4', name: 'David Smith', role: 'Student', branch: 'Global Park Center', email: 'david@ubook.com', status: 'Active' },
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab('manage');
    }, 2000);
  };

  const removeAccount = (id: string) => {
    if (confirm('Are you sure you want to remove this account?')) {
      setMockStaff(mockStaff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Standardized Larger Header Bar */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#f43f5e] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#f43f5e] rounded-[2rem] text-white shadow-xl rotate-3">
             <UserPlus size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Staff <span className="text-[#fbee21]">Hub</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">PROVISIONING CENTER</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Global Account Manager</span>
             </div>
           </div>
        </div>
        <div className="flex bg-white/10 p-2 rounded-[1.5rem] relative z-10 backdrop-blur-md shrink-0 border-2 border-white/10">
           <button 
             onClick={() => setActiveTab('manage')}
             className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             Manage Access
           </button>
           <button 
             onClick={() => setActiveTab('create')}
             className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'create' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             Create New
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'manage' ? (
          <div className="flex-1 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b-2 border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-center">
               <div className="flex-1 flex items-center gap-4 bg-white px-6 py-4 rounded-[1.5rem] border-2 border-slate-200 w-full focus-within:border-[#f43f5e] transition-all shadow-sm">
                 <Search size={24} className="text-slate-300" strokeWidth={3} />
                 <input placeholder="Search by name, email or branch..." className="bg-transparent outline-none w-full font-black text-[#292667] text-lg placeholder:text-slate-300" />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-[#292667] text-white text-[10px] font-black uppercase tracking-[0.2em] z-20">
                  <tr>
                    <th className="px-10 py-6">IDENTIFIER / NAME</th>
                    <th className="px-10 py-6">BRANCH HUB</th>
                    <th className="px-10 py-6">USER ROLE</th>
                    <th className="px-10 py-6 text-right">CONTROLS</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-6">
                           <div className="w-14 h-14 rounded-[1.2rem] bg-indigo-50 border-4 border-white shadow-md flex items-center justify-center font-black text-indigo-500 text-sm overflow-hidden group-hover:rotate-6 transition-transform">
                             <img src={`https://picsum.photos/seed/${staff.id}/120`} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                             <p className="font-black text-[#292667] text-xl uppercase leading-none mb-1.5">{staff.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 font-mono tracking-widest truncate">{staff.email}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-3 text-[12px] font-black text-[#292667] uppercase tracking-tight">
                           <Building2 size={16} className="text-[#3b82f6]" />
                           <span className="truncate">{staff.branch}</span>
                         </div>
                      </td>
                      <td className="px-10 py-6">
                         <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 ${
                            staff.role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/10' : 
                            staff.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-indigo-500/10' : 
                            'bg-red-50 text-red-600 border-red-500/10'
                         }`}>
                           {staff.role}
                         </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-3 bg-white text-slate-400 hover:text-[#292667] rounded-xl border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Edit size={20} strokeWidth={3} /></button>
                           <button onClick={() => removeAccount(staff.id)} className="p-3 bg-white text-slate-400 hover:text-[#f43f5e] rounded-xl border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Trash2 size={20} strokeWidth={3} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl border-2 border-slate-100 p-10 flex flex-col md:flex-row gap-10 relative overflow-hidden">
               {isSuccess && (
                 <div className="absolute inset-0 bg-[#00a651] z-50 flex flex-col items-center justify-center text-white p-10 animate-in fade-in duration-500">
                    <CheckCircle2 size={80} strokeWidth={4} className="mb-6 animate-bounce" />
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Account Provisioned!</h3>
                    <p className="text-lg font-bold opacity-80 uppercase tracking-widest">User has been added to the hub</p>
                 </div>
               )}

               <div className="md:w-1/3 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-slate-50 pb-10 md:pb-0 md:pr-10">
                  <div className="mb-8">
                     <div className="p-5 bg-red-50 text-[#f43f5e] rounded-[1.5rem] w-fit mb-6 shadow-sm"><ShieldAlert size={42} strokeWidth={3} /></div>
                     <h3 className="text-3xl font-black text-[#292667] leading-tight uppercase tracking-tighter">Access Provisioning</h3>
                     <p className="text-slate-400 font-bold text-sm mt-4 leading-relaxed uppercase tracking-tight">Define permissions and link this account to a verified physical Hub location.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#00a651]" /> Secure Protocol
                     </p>
                     <p className="text-[11px] font-bold text-[#292667] leading-tight">Passwords are automatically hashed and encrypted at rest.</p>
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Legal First Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-lg text-[#292667] shadow-inner transition-all" placeholder="John" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Legal Last Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-lg text-[#292667] shadow-inner transition-all" placeholder="Doe" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Corporate Email</label>
                     <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                        <input required type="email" className="w-full bg-slate-50 pl-14 pr-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-lg text-[#292667] shadow-inner transition-all" placeholder="staff@ubookstore.com" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Primary Hub Assignment</label>
                     <div className="relative">
                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                        <select className="w-full bg-slate-50 pl-14 pr-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-lg text-[#292667] shadow-inner cursor-pointer appearance-none uppercase">
                           {MOCK_SCHOOLS.map(s => <option key={s.id}>{s.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Professional Title</label>
                       <input required type="text" className="w-full bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder="Senior Educator" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Authorization Role</label>
                       <div className="relative">
                          <select className="w-full bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 outline-none font-black text-sm uppercase text-[#292667] shadow-inner cursor-pointer appearance-none">
                             <option>Student Account</option>
                             <option>Teacher / Educator</option>
                             <option>Hub Administrator</option>
                             <option>Main Center Editor</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                       </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-6 px-8 bg-[#292667] text-white rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-[#f43f5e] transition-all border-b-8 border-black/10 active:scale-95 transform translate-y-1">
                     Create
                  </button>
               </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
