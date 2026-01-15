
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { Student } from '../../types.ts';
import { Search, Filter, Edit, MoreVertical, Trash2, LayoutGrid, Users, Sparkles } from 'lucide-react';

interface StudentsViewProps {
  onStudentClick: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onStudentClick, checkPermission }) => {
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const canEdit = checkPermission?.('accounts', 'edit') ?? true;
  const canDelete = checkPermission?.('accounts', 'delete') ?? true;

  const filteredStudents = students.filter(s => {
    const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.username.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Header Bar... */}
      <div className="w-full bg-[#292667] rounded-[3rem] p-8 text-white shadow-2xl border-b-[12px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-8 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-[#00a651] rounded-[2rem] text-white shadow-xl rotate-3">
             <Users size={42} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-4xl font-black leading-none tracking-tight uppercase">Learner <span className="text-[#fbee21]">Directory</span></h2>
             <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black uppercase tracking-[0.1em] text-white">CENTRAL DATABASE</span>
                <span className="text-[12px] font-black text-[#fbee21] uppercase tracking-[0.15em]">U Book Store Community</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-12 px-10 md:border-l-4 border-white/10 relative z-10">
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#fbee21]">{students.length}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Total Learners</p>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="text-center group cursor-default">
              <p className="text-5xl font-black text-[#ec2027]">{filteredStudents.length}</p>
              <p className="text-[11px] font-black uppercase text-white/60 tracking-[0.2em] mt-2">Showing Result</p>
           </div>
        </div>
      </div>

      {/* Row 2: Search... */}
      <div className="w-full bg-white p-4 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 w-full group focus-within:border-[#ec2027] transition-all">
          <Search size={24} className="text-slate-400" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by name or ID code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-lg font-black text-[#292667] outline-none w-full placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-[1.5rem] border-2 border-slate-100 flex-1 sm:flex-none sm:min-w-[220px]">
            <LayoutGrid size={20} className="text-[#ec2027]" strokeWidth={3} />
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-sm font-black text-[#292667] outline-none w-full cursor-pointer uppercase"
            >
              <option value="all">All Classes</option>
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[3rem] border-2 border-slate-100 overflow-hidden shadow-xl">
        <div className="h-full overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#292667] text-white uppercase text-[11px] font-black tracking-[0.2em] z-20">
              <tr>
                <th className="px-8 py-6">ID Code</th>
                <th className="px-8 py-6">Full Name</th>
                <th className="px-8 py-6">Registered Course</th>
                <th className="px-8 py-6">Final Grade</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-mono text-base font-black text-[#ec2027]">
                    <button onClick={() => onStudentClick(student.id)} className="hover:underline">
                      {student.username}
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <button onClick={() => onStudentClick(student.id)} className="flex items-center gap-4 text-left group-hover:scale-105 transition-transform">
                      <img src={`https://picsum.photos/seed/${student.id}/64`} className="w-12 h-12 rounded-2xl border-4 border-white shadow-md object-cover" alt="" />
                      <span className="font-black text-[#292667] text-lg uppercase tracking-tight">{student.firstName} {student.lastName}</span>
                    </button>
                  </td>
                  <td className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">{student.level}</td>
                  <td className="px-8 py-5">
                    <div className={`w-20 h-10 rounded-xl flex items-center justify-center text-lg font-black ${
                      student.finalGrade >= 90 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'
                    } shadow-md`}>
                      {student.finalGrade}%
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border-2 ${
                      student.status === 'active' ? 'bg-green-50 text-[#00a651] border-[#00a651]' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canEdit && (
                        <button className="p-3 bg-slate-50 text-slate-400 hover:bg-[#292667] hover:text-white rounded-xl transition-all shadow-sm">
                          <Edit size={20} strokeWidth={3} />
                        </button>
                      )}
                      {canDelete && (
                        <button className="p-3 bg-slate-50 text-slate-400 hover:bg-[#ec2027] hover:text-white rounded-xl transition-all shadow-sm">
                          <Trash2 size={20} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
