
import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { School, UserPermissions } from '../../types.ts';
import { 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Edit, 
  Save, 
  Plus, 
  ArrowUpRight, 
  BookOpen, 
  Award, 
  FileSearch, 
  UserPlus, 
  Check, 
  X,
  Settings2,
  ChevronDown,
  Users,
  GraduationCap
} from 'lucide-react';

interface RolesPermissionsViewProps {
  onRegisterBranch: () => void;
  rolePerms: Record<string, UserPermissions>;
  setRolePerms: React.Dispatch<React.SetStateAction<Record<string, UserPermissions>>>;
}

export const RolesPermissionsView: React.FC<RolesPermissionsViewProps> = ({ onRegisterBranch, rolePerms, setRolePerms }) => {
  const [schools, setSchools] = useState<School[]>(MOCK_SCHOOLS);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(MOCK_SCHOOLS[0].id);
  const [isEditingQuota, setIsEditingQuota] = useState(false);

  const roles = ['Student', 'Teacher', 'School Admin'];
  const selectedSchool = schools.find(s => s.id === selectedSchoolId) || schools[0];

  const togglePerm = (role: string, category: keyof UserPermissions, action: string) => {
    const updatedRolePerms = { ...rolePerms[role] };
    // @ts-ignore
    updatedRolePerms[category][action] = !updatedRolePerms[category][action];
    setRolePerms({ ...rolePerms, [role]: updatedRolePerms });
  };

  const handleUpdateQuota = (field: 'teacherQuota' | 'studentQuota', val: number) => {
    setSchools(schools.map(s => s.id === selectedSchoolId ? { ...s, [field]: val } : s));
  };

  const permissionCategories = [
    { 
      id: 'courses' as keyof UserPermissions, 
      label: 'Course Management', 
      icon: BookOpen, 
      color: '#00a651',
      actions: [
        { id: 'view', label: 'View Catalog' },
        { id: 'edit', label: 'Edit Content' },
        { id: 'delete', label: 'Delete Courses' }
      ]
    },
    { 
      id: 'certificates' as keyof UserPermissions, 
      label: 'Award Certificates', 
      icon: Award, 
      color: '#a855f7',
      actions: [
        { id: 'view', label: 'View Awards' },
        { id: 'edit', label: 'Editor of Templates' }
      ]
    },
    { 
      id: 'accounts' as keyof UserPermissions, 
      label: 'Staff & Members', 
      icon: UserPlus, 
      color: '#f43f5e',
      actions: [
        { id: 'view', label: 'View Roster' },
        { id: 'create', label: 'Editor of Creating Acc' },
        { id: 'edit', label: 'Edit Details' },
        { id: 'delete', label: 'Delete Members' }
      ]
    },
    { 
      id: 'resources' as keyof UserPermissions, 
      label: 'Teaching Library', 
      icon: FileSearch, 
      color: '#3b82f6',
      actions: [
        { id: 'view', label: 'Access Library' },
        { id: 'upload', label: 'Editor of Resources' },
        { id: 'delete', label: 'Clear Assets' }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#3b82f6] rounded-[2rem] text-white shadow-xl rotate-3">
             <ShieldCheck size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Governance <span className="text-[#fbee21]">& Control</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">CENTRAL COMMAND</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">Global Access Management</span>
             </div>
           </div>
        </div>
        <button 
          onClick={onRegisterBranch}
          className="flex items-center gap-4 px-10 py-5 bg-[#fbee21] text-[#292667] rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 border-b-6 border-black/10"
        >
           <Plus size={28} strokeWidth={4} /> Register Branch
        </button>
      </div>

      {/* Branch Selector Filter Style Bar */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col md:flex-row items-center gap-6 flex-shrink-0">
        <div className="flex flex-1 items-center gap-4 w-full">
          <div className="relative flex-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#3b82f6] transition-colors">
              <Building2 size={24} strokeWidth={3} />
            </div>
            <select 
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="w-full bg-slate-50 pl-16 pr-8 py-5 rounded-[1.8rem] border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-[#292667] text-lg uppercase appearance-none cursor-pointer transition-all"
            >
              {schools.map(s => <option key={s.id} value={s.id}>{s.name} - {s.location}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown size={24} strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 px-8 py-2 border-l-4 border-slate-100 h-full">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setIsEditingQuota(true)}>
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Staff / Students Quota</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Users size={14} className="text-[#ec2027]" />
                      <p className="text-sm font-black text-[#292667]">
                        {selectedSchool.currentTeacherCount} / {selectedSchool.teacherQuota}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <GraduationCap size={14} className="text-[#3b82f6]" />
                      <p className="text-sm font-black text-[#292667]">
                        {selectedSchool.currentStudentCount} / {selectedSchool.studentQuota}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl text-slate-300 group-hover:text-[#3b82f6] group-hover:bg-indigo-50 transition-all">
                  <Edit size={16} strokeWidth={3} />
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[3.5rem] border-2 border-slate-100 shadow-2xl flex flex-col overflow-hidden mb-4">
        <div className="p-8 border-b-2 border-slate-100 bg-[#292667] text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-[#fbee21] rounded-2xl text-[#292667]">
                 <Settings2 size={28} strokeWidth={3} />
              </div>
              <div>
                 <h3 className="text-2xl font-black uppercase tracking-tight">{selectedSchool.name} Matrix</h3>
                 <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mt-1">Specific Permissions for {selectedSchool.location} Hub</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60">Auto-Saving Enabled</span>
              <button className="px-8 py-4 bg-white/10 hover:bg-[#ec2027] transition-all rounded-[1.5rem] text-xs font-black uppercase tracking-widest border-2 border-white/10">
                Reset Matrix
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-100 sticky top-0 z-20">
                <th className="px-10 py-8 text-left min-w-[320px] bg-slate-50">
                  <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Permission Category</span>
                </th>
                {roles.map(role => (
                  <th key={role} className="px-8 py-8 text-center min-w-[180px] bg-slate-50">
                     <div className={`inline-block px-6 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-sm ${
                       role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100' : 
                       role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-2 border-indigo-100' : 
                       'bg-red-50 text-red-600 border-2 border-red-100'
                     }`}>
                       {role}
                     </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {permissionCategories.map((cat) => {
                const CategoryIcon = cat.icon;
                return (
                  <React.Fragment key={cat.id}>
                    <tr className="bg-slate-50/50">
                       <td colSpan={roles.length + 1} className="px-10 py-5">
                          <div className="flex items-center gap-4">
                             <div className="p-2 rounded-xl" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                <CategoryIcon size={20} strokeWidth={3} />
                             </div>
                             <span className="text-xs font-black text-[#292667] uppercase tracking-[0.2em]">{cat.label}</span>
                          </div>
                       </td>
                    </tr>
                    {cat.actions.map((action) => (
                      <tr key={action.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-16 py-6">
                           <div className="flex flex-col">
                              <span className="text-base font-black text-[#292667] uppercase tracking-tight leading-none mb-1 group-hover:text-[#3b82f6] transition-colors">{action.label}</span>
                              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.15em]">{cat.id.toUpperCase()} MODULE</span>
                           </div>
                        </td>
                        {roles.map(role => {
                          // @ts-ignore
                          const isActive = rolePerms[role][cat.id][action.id];
                          return (
                            <td key={role} className="px-8 py-6 text-center">
                               <button 
                                 onClick={() => togglePerm(role, cat.id, action.id)}
                                 className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto transition-all shadow-lg ${
                                   isActive 
                                     ? 'bg-[#292667] text-[#fbee21] shadow-[#292667]/30 scale-105 rotate-0' 
                                     : 'bg-white border-4 border-slate-50 text-slate-100 rotate-90 scale-90 hover:border-slate-200 hover:text-slate-200'
                                 }`}
                               >
                                 {isActive ? <Check size={32} strokeWidth={4} /> : <X size={32} strokeWidth={4} />}
                               </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
