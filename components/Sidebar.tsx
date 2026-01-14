
import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  ClipboardCheck, 
  FileSearch,
  LayoutDashboard,
  Sparkles,
  BookOpen,
  ShieldCheck,
  UserPlus,
  Settings,
  Building2
} from 'lucide-react';
import { View, UserRole } from '../types.ts';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  activeRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, activeRole }) => {
  const isAdmin = activeRole === UserRole.MAIN_CENTER;

  const adminItems = [
    { id: View.MY_CLASSES, label: 'Centers', icon: Building2, color: '#ec2027' },
    { id: View.COURSES_ADMIN, label: 'Courses Content', icon: BookOpen, color: '#00a651' },
    { id: View.ROLES_PERMISSIONS, label: 'Roles & Permissions', icon: ShieldCheck, color: '#3b82f6' },
    { id: View.RESOURCES, label: 'Resources', icon: FileSearch, color: '#6366f1' },
    { id: View.EDIT_CERTIFICATES, label: 'Edit Certificates', icon: Award, color: '#a855f7' },
    { id: View.ACCOUNT_CREATION, label: 'Create Account', icon: UserPlus, color: '#f43f5e' },
  ];

  const teacherItems = [
    { id: View.MY_CLASSES, label: 'My classes', icon: LayoutDashboard, color: '#ec2027' },
    { id: View.STUDENTS, label: 'Students', icon: Users, color: '#00a651' },
    { id: View.GRADES, label: 'Grades', icon: GraduationCap, color: '#fbee21' },
    { id: View.CERTIFICATES, label: 'Certificates', icon: Award, color: '#a855f7' },
    { id: View.TESTS, label: 'Tests', icon: ClipboardCheck, color: '#f43f5e' },
    { id: View.RESOURCES, label: 'Teaching resources', icon: FileSearch, color: '#6366f1' },
  ];

  const menuItems = isAdmin ? adminItems : teacherItems;

  return (
    <div className="w-72 bg-[#292667] text-white flex flex-col hidden lg:flex h-full border-r-[12px] border-[#ec2027] shrink-0 overflow-hidden">
      <div className="p-6 flex-1 overflow-hidden flex flex-col justify-start">
        {/* Compact Portal Header */}
        <div className="bg-white/5 p-4 rounded-[1.5rem] border-2 border-dashed border-white/20 relative group cursor-pointer overflow-hidden shrink-0 mb-6">
          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-11 h-11 rounded-[1rem] flex items-center justify-center rotate-6 shadow-xl transition-transform group-hover:scale-110 ${isAdmin ? 'bg-[#ec2027]' : 'bg-[#fbee21]'}`}>
              {isAdmin ? <Settings className="text-white" size={26} strokeWidth={3} /> : <Sparkles className="text-[#292667]" size={26} strokeWidth={3} />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fbee21]">{isAdmin ? 'Main Center' : 'Educator'}</p>
              <h4 className="text-lg font-black leading-none">U Book Store</h4>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 flex-1 overflow-y-auto scrollbar-hide py-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full group flex items-center gap-4 px-4 py-3 rounded-[1.2rem] transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-[#292667] shadow-2xl' 
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div 
                  className="p-2 rounded-xl transition-all duration-200 group-hover:rotate-12 flex-shrink-0"
                  style={{ backgroundColor: isActive ? item.color : 'rgba(255,255,255,0.1)' }}
                >
                  <Icon 
                    size={26} 
                    strokeWidth={isActive ? 3.5 : 2} 
                    className={isActive && item.color === '#fbee21' ? 'text-[#292667]' : 'text-white'} 
                  />
                </div>
                <span className={`text-[14px] font-black uppercase tracking-tight text-left`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="p-6 shrink-0">
        <div className={`rounded-[1.5rem] p-4 flex items-center gap-4 border-4 shadow-2xl transition-transform hover:scale-105 cursor-pointer ${isAdmin ? 'bg-[#ec2027] border-[#fbee21]' : 'bg-[#292667] border-[#fbee21]'}`}>
          <div className="relative shrink-0">
            <img 
              src={`https://picsum.photos/seed/${isAdmin ? 'admin-ub' : 'u-profile'}/64`} 
              className="w-12 h-12 rounded-xl border-4 border-white shadow-lg object-cover" 
              alt="Profile" 
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-black text-white text-sm leading-tight truncate uppercase">{isAdmin ? 'Super Admin' : 'Teacher Jane'}</p>
            <p className={`${isAdmin ? 'text-white/80' : 'text-[#fbee21]'} text-[10px] font-black uppercase mt-1 tracking-widest`}>{isAdmin ? 'Master Hub' : 'Admin Access'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
