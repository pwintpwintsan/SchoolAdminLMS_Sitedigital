
import React, { useState } from 'react';
import { Menu, X, Bell, Star, ShieldAlert, GraduationCap, User, Repeat } from 'lucide-react';
import { UserRole } from '../types.ts';

interface HeaderProps {
  schoolName: string;
  teacherCode: string;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Logo = () => (
  <div className="flex flex-col items-center py-2 select-none group">
    <svg width="100" height="70" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform duration-300">
      <g transform="translate(10, 5)">
        <path d="M25 25c0-10 8-15 15-15s15 5 15 15-8 15-15 15-15-5-15-15z" fill="#FFE0BD" />
        <path d="M20 18c0-8 8-13 20-13s20 5 20 13c-4-3-10-4-20-4s-16 1-20 4z" fill="#444" />
        <circle cx="33" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <circle cx="47" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <path d="M38 25h4" stroke="#000" strokeWidth="1.5" />
        <path d="M25 45h30l6 18H19l6-18z" fill="#ec2027" />
        <path d="M30 45h20v18H30V45z" fill="#00a651" />
        <path d="M15 55l25 12 25-12v15l-25 12-25-12z" fill="#fbee21" stroke="#000" strokeWidth="1" />
        <circle cx="28" cy="65" r="3" fill="#292667" />
        <path d="M38 65l4 4l-4 4" stroke="#000" strokeWidth="1.5" fill="none" />
        <path d="M30 75c3 0 5-2 5-2" stroke="#000" strokeWidth="1" />
      </g>
      <g transform="translate(85, 10)">
        <path d="M15 20c0-10 8-15 15-15s15 5 15 15-8 15-15 15-15-5-15-15z" fill="#FFE0BD" />
        <path d="M10 15c0-8 8-13 20-13s20 5 20 13" fill="#444" />
        <circle cx="8" cy="35" r="4" fill="#ec2027" />
        <circle cx="52" cy="35" r="4" fill="#ec2027" />
        <path d="M8 35l-4 6" stroke="#000" strokeWidth="1" />
        <path d="M52 35l4 6" stroke="#000" strokeWidth="1" />
        <circle cx="23" cy="20" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <circle cx="37" cy="20" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <path d="M15 40h30l6 14H9l6-14z" fill="#00a651" />
        <path d="M20 40h20v14H20V40z" fill="#ec2027" />
        <path d="M12 48l18 4 18-4v10l-18 4-18-4z" fill="white" stroke="#000" strokeWidth="1" />
      </g>
      <text x="75" y="95" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#292667" fontWeight="900">B</text>
      <text x="92" y="95" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#ec2027" fontWeight="900">O</text>
      <text x="109" y="95" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#fbee21" fontWeight="900">O</text>
      <text x="126" y="95" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#292667" fontWeight="900">K</text>
    </svg>
    <div className="flex items-center mt-1">
      <span className="text-xl font-black text-[#ec2027] pr-1">U</span>
      <span className="text-lg font-black text-[#292667] tracking-tight">Book Store</span>
    </div>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ schoolName, teacherCode, activeRole, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roles = [
    { id: UserRole.MAIN_CENTER, label: 'Admin', icon: ShieldAlert, color: 'text-[#ec2027]', bg: 'bg-[#ec2027]/10' },
    { id: UserRole.TEACHER, label: 'Teacher', icon: GraduationCap, color: 'text-[#292667]', bg: 'bg-[#fbee21]/20' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-[#fbee21] flex items-center shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex items-center space-x-6">
          {/* Account Switcher Component */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => onRoleChange(role.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? `bg-white shadow-lg ${role.color} scale-105` 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                  <span className={`text-[12px] font-black uppercase tracking-tight ${isActive ? 'block' : 'hidden lg:block opacity-60'}`}>
                    {role.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 ml-6 pl-6 border-l-2 border-slate-100">
            <div className="hidden lg:block text-right">
              <p className="text-[12px] font-black text-[#ec2027] uppercase tracking-widest leading-none">{schoolName}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                 <Star size={14} className="fill-[#fbee21] text-[#fbee21]" />
                 <p className="text-base font-black text-[#292667] leading-none">
                    {activeRole === UserRole.STUDENT ? 'STUDENT-001' : teacherCode}
                 </p>
              </div>
            </div>
            <button className="p-3 bg-slate-50 text-[#292667] hover:bg-[#ec2027] hover:text-white rounded-xl transition-all shadow-sm relative group active:scale-90">
              <Bell size={24} strokeWidth={3} />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#00a651] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
           {/* Mobile Role Switcher (Simple Toggle) */}
           <button 
              onClick={() => {
                const rolesArr = [UserRole.MAIN_CENTER, UserRole.TEACHER];
                const currentIndex = rolesArr.indexOf(activeRole);
                // If current role isn't in switcher (e.g. Student), default to Admin
                const nextIdx = currentIndex === -1 ? 0 : (currentIndex + 1) % rolesArr.length;
                onRoleChange(rolesArr[nextIdx]);
              }}
              className="p-2.5 bg-slate-50 rounded-xl text-[#292667] border border-slate-200"
            >
              <Repeat size={20} strokeWidth={3} />
           </button>
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 rounded-xl text-[#292667] bg-slate-50 border border-slate-200">
            {isMenuOpen ? <X size={24} strokeWidth={4} /> : <Menu size={24} strokeWidth={4} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-24 z-50 bg-white p-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
          <div className="mb-6 pb-6 border-b-2 border-slate-100">
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Account Type</p>
             <div className="grid grid-cols-1 gap-2">
                {roles.map((role) => (
                  <button 
                    key={role.id}
                    onClick={() => { onRoleChange(role.id); setIsMenuOpen(false); }}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      activeRole === role.id ? `border-[#fbee21] bg-slate-50 ${role.color}` : 'border-slate-50'
                    }`}
                  >
                    <span className="font-black uppercase">{role.label}</span>
                    <role.icon size={20} strokeWidth={3} />
                  </button>
                ))}
             </div>
          </div>
          {['Home', 'Resources', 'Support'].map((item) => (
            <a key={item} href="#" className="block px-6 py-4 text-2xl font-black text-[#292667] bg-slate-50 rounded-xl border-l-4 border-[#ec2027]" onClick={() => setIsMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
