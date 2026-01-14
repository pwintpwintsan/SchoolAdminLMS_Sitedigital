
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
    <div className="h-full flex flex-col gap-3 md:gap-4 overflow-hidden animate-in fade-in duration-500">
      <div className="w-full bg-[#292667] rounded-xl md:rounded-[1.5rem] p-4 md:p-6 text-white shadow-2xl border-b-[8px] border-[#f43f5e] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex items-center gap-3 md:gap-4 relative z-10">
           <div className="p-3 bg-[#f43f5e] rounded-xl text-white shadow-xl rotate-3">
             <UserPlus size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-xl md:text-2xl font-black leading-none tracking-tight uppercase">Staff Hub</h2>
             <div className="flex items-center gap-2 mt-1 md:mt-2">
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-black uppercase tracking-[0.1em] text-white">PROVISIONING</span>
             </div>
           </div>
        </div>
        <div className="flex bg-white/10 p-1.5 rounded-xl relative z-10 backdrop-blur-md shrink-0">
           <button 
             onClick={() => setActiveTab('manage')}
             className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             Manage
           </button>
           <button 
             onClick={() => setActiveTab('create')}
             className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'create' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             New
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'manage' ? (
          <div className="flex-1 bg-white rounded-xl md:rounded-[1.5rem] border-2 border-slate-100 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b-2 border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-center">
               <div className="flex-1 flex items-center gap-3 bg-white px-5 py-3 rounded-xl border-2 border-slate-200 w-full focus-within:border-[#f43f5e] transition-all shadow-sm">
                 <Search size={20} className="text-slate-300" />
                 <input placeholder="Search members..." className="bg-transparent outline-none w-full font-black text-[#292667] text-base placeholder:text-slate-300" />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white border-b-2 border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] z-20">
                  <tr>
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Master</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-indigo-50 border-2 border-white shadow-md flex items-center justify-center font-black text-indigo-500 text-sm overflow-hidden">
                             <img src={`https://picsum.photos/seed/${staff.id}/80`} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                             <p className="font-black text-[#292667] text-sm uppercase leading-none mb-1">{staff.name}</p>
                             <p className="text-[9px] font-bold text-slate-300 font-mono truncate max-w-[120px]">{staff.email}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2 text-[11px] font-black text-[#292667] uppercase">
                           <Building2 size={12} className="text-[#3b82f6]" />
                           <span className="truncate max-w-[100px]">{staff.branch}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                            staff.role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20' : 
                            staff.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-indigo-500/20' : 
                            'bg-red-50 text-red-600 border-red-500/20'
                         }`}>
                           {staff.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 bg-white text-slate-400 hover:text-[#292667] rounded-lg border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Edit size={16} /></button>
                           <button onClick={() => removeAccount(staff.id)} className="p-2 bg-white text-slate-400 hover:text-[#f43f5e] rounded-lg border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Trash2 size={16} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-2">
            <div className="max-w-3xl w-full bg-white rounded-xl md:rounded-[2rem] shadow-2xl border-2 border-slate-100 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 relative overflow-hidden">
               {isSuccess && (
                 <div className="absolute inset-0 bg-[#00a651] z-50 flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-500">
                    <CheckCircle2 size={64} strokeWidth={4} className="mb-4 animate-bounce" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Account Ready!</h3>
                 </div>
               )}

               <div className="md:w-1/3 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-slate-50 pb-6 md:pb-0 md:pr-10">
                  <div className="mb-4">
                     <div className="p-3 bg-red-50 text-[#f43f5e] rounded-xl w-fit mb-4 shadow-sm"><ShieldAlert size={32} strokeWidth={3} /></div>
                     <h3 className="text-xl font-black text-[#292667] leading-tight uppercase tracking-tighter">Access Control</h3>
                     <p className="text-slate-400 font-bold text-sm mt-2 leading-relaxed">Determine what this user can view or edit in the hub.</p>
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="flex-1 space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">First Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder=" Mike" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Last Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder=" Jones" />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input required type="email" className="w-full bg-slate-50 pl-12 pr-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder="staff@ubook.com" />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Branch Name</label>
                     <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input required type="text" className="w-full bg-slate-50 pl-12 pr-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder=" Downtown Branch" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Job Title</label>
                       <input required type="text" className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base text-[#292667] shadow-inner transition-all" placeholder=" Senior Educator" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">User Role</label>
                       <div className="relative">
                          <select className="w-full bg-slate-50 px-5 py-3 rounded-xl border-2 border-slate-100 outline-none font-black text-[10px] uppercase text-[#292667] shadow-inner cursor-pointer appearance-none">
                             <option>Student</option>
                             <option>Teacher</option>
                             <option>School Admin</option>
                             <option>LMS Content Editor</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={16} />
                       </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 px-6 bg-[#292667] text-white rounded-xl md:rounded-[1.5rem] font-black text-lg uppercase tracking-widest shadow-xl hover:bg-[#f43f5e] transition-all border-b-6 border-black/10 active:scale-95 transform translate-y-1">
                     Provision Account
                  </button>
               </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
