
import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { UserPlus, ShieldAlert, Mail, Lock, User, UserCheck, CheckCircle2, AlertCircle, Search, Filter, Trash2, Edit, Building2, MoreHorizontal, ShieldCheck, Plus, GraduationCap } from 'lucide-react';

export const AccountCreationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('manage');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Teacher',
    branchId: MOCK_SCHOOLS[0].id,
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
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#f43f5e] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#f43f5e] rounded-[2rem] text-white shadow-xl rotate-3">
             <UserPlus size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Staff & <span className="text-[#fbee21]">Members</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">ACCOUNT PROVISIONING</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Official Enrollment Hub</span>
             </div>
           </div>
        </div>
        <div className="flex bg-white/10 p-2 rounded-[1.5rem] relative z-10 backdrop-blur-md shrink-0">
           <button 
             onClick={() => setActiveTab('manage')}
             className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             Manage All
           </button>
           <button 
             onClick={() => setActiveTab('create')}
             className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'create' ? 'bg-[#fbee21] text-[#292667] shadow-lg' : 'text-white/60 hover:text-white'}`}
           >
             Create New
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'manage' ? (
          <div className="flex-1 bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-8 border-b-2 border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-6 items-center">
               <div className="flex-1 flex items-center gap-4 bg-white px-8 py-4 rounded-[1.5rem] border-2 border-slate-200 w-full focus-within:border-[#f43f5e] transition-all shadow-sm">
                 <Search size={24} className="text-slate-300" />
                 <input placeholder="Search members by name, role or hub..." className="bg-transparent outline-none w-full font-black text-[#292667] text-lg placeholder:text-slate-300 placeholder:font-bold" />
               </div>
               <div className="flex gap-4 w-full sm:w-auto">
                 <select className="bg-white border-2 border-slate-200 px-6 py-4 rounded-[1.5rem] font-black text-[11px] uppercase outline-none shadow-sm cursor-pointer">
                   <option>All Center Branches</option>
                   {MOCK_SCHOOLS.map(s => <option key={s.id}>{s.name}</option>)}
                 </select>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white border-b-4 border-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] z-20">
                  <tr>
                    <th className="px-10 py-6">Member Identity</th>
                    <th className="px-10 py-6">Branch Hub</th>
                    <th className="px-10 py-6">Role Privilege</th>
                    <th className="px-10 py-6 text-right">Master Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-10 py-7">
                         <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 border-4 border-white shadow-xl flex items-center justify-center font-black text-indigo-500 text-xl overflow-hidden">
                             <img src={`https://picsum.photos/seed/${staff.id}/80`} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                             <p className="font-black text-[#292667] text-xl uppercase tracking-tighter leading-none mb-2">{staff.name}</p>
                             <p className="text-[10px] font-bold text-slate-300 font-mono">{staff.email}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-10 py-7">
                         <div className="flex items-center gap-3 text-[12px] font-black text-[#292667] uppercase tracking-tight">
                           <Building2 size={16} className="text-[#3b82f6]" />
                           {staff.branch}
                         </div>
                      </td>
                      <td className="px-10 py-7">
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                            staff.role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20' : 
                            staff.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-indigo-500/20' : 
                            'bg-red-50 text-red-600 border-red-500/20'
                         }`}>
                           {staff.role}
                         </span>
                      </td>
                      <td className="px-10 py-7 text-right">
                         <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-4 bg-white text-slate-400 hover:text-[#292667] rounded-2xl border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Edit size={22} /></button>
                           <button onClick={() => removeAccount(staff.id)} className="p-4 bg-white text-slate-400 hover:text-[#f43f5e] rounded-2xl border-2 border-slate-100 shadow-sm transition-all active:scale-90"><Trash2 size={22} /></button>
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
            <div className="max-w-4xl w-full bg-white rounded-[4rem] shadow-2xl border-2 border-slate-100 p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 relative overflow-hidden">
               {isSuccess && (
                 <div className="absolute inset-0 bg-[#00a651] z-50 flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-500">
                    <div className="p-10 bg-white/20 rounded-[3rem] mb-8 animate-bounce">
                      <CheckCircle2 size={100} strokeWidth={4} />
                    </div>
                    <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 text-center">Account Ready!</h3>
                    <p className="text-xl font-bold opacity-80 text-center">Access has been successfully provisioned.</p>
                 </div>
               )}

               <div className="md:w-1/3 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-slate-50 pb-8 md:pb-0 md:pr-16">
                  <div className="mb-6 md:mb-10">
                     <div className="p-5 bg-red-50 text-[#f43f5e] rounded-[2rem] w-fit mb-6 shadow-sm"><ShieldAlert size={48} strokeWidth={3} /></div>
                     <h3 className="text-3xl font-black text-[#292667] leading-tight uppercase tracking-tighter">Member Access</h3>
                     <p className="text-slate-400 font-bold text-base mt-4 leading-relaxed">Assign the correct role to determine what this user can view or edit in the system.</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { l: 'Custom Permissions', icon: Lock, c: 'text-indigo-500' },
                      { l: 'Branch Affiliation', icon: Building2, c: 'text-[#3b82f6]' },
                      { l: 'Member Security', icon: ShieldCheck, c: 'text-[#00a651]' }
                    ].map(feat => (
                      <div key={feat.l} className="flex items-center gap-3">
                        <feat.icon size={18} className={feat.c} strokeWidth={3} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{feat.l}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="flex-1 space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">First Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-6 py-4 md:px-8 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base md:text-lg text-[#292667] shadow-inner transition-all" placeholder="e.g. Mike" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Last Name</label>
                        <input required type="text" className="w-full bg-slate-50 px-6 py-4 md:px-8 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base md:text-lg text-[#292667] shadow-inner transition-all" placeholder="e.g. Jones" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                        <input required type="email" className="w-full bg-slate-50 pl-16 md:pl-20 pr-6 md:pr-8 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 focus:border-[#f43f5e] outline-none font-black text-base md:text-lg text-[#292667] shadow-inner transition-all" placeholder="staff@ubook.com" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Branch Assignment</label>
                       <select className="w-full bg-slate-50 px-6 py-4 md:px-8 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 outline-none font-black text-[11px] md:text-[12px] uppercase text-[#292667] shadow-inner cursor-pointer appearance-none">
                          {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          <option value="main">MASTER CENTER HQ</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">User Role</label>
                       <select className="w-full bg-slate-50 px-6 py-4 md:px-8 md:py-5 rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-100 outline-none font-black text-[11px] md:text-[12px] uppercase text-[#292667] shadow-inner cursor-pointer appearance-none">
                          <option>Student</option>
                          <option>Teacher</option>
                          <option>School Admin</option>
                          <option>LMS Content Editor</option>
                       </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-6 md:py-8 px-8 bg-[#292667] text-white rounded-[2rem] md:rounded-[2.5rem] font-black text-lg md:text-xl uppercase tracking-[0.2em] shadow-2xl hover:bg-[#f43f5e] transition-all border-b-8 border-black/10 active:scale-95 transform translate-y-1">
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
