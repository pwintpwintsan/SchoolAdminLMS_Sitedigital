
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { MyClassesView } from './components/views/MyClassesView.tsx';
import { StudentsView } from './components/views/StudentsView.tsx';
import { GradesView } from './components/views/GradesView.tsx';
import { ReportsView } from './components/views/ReportsView.tsx';
import { CertificatesView } from './components/views/CertificatesView.tsx';
import { TestsView } from './components/views/TestsView.tsx';
import { TeachingResourcesView } from './components/views/TeachingResourcesView.tsx';
import { ClassDetailView } from './components/views/ClassDetailView.tsx';
import { StudentDetailView } from './components/views/StudentDetailView.tsx';
import { CoursesAdminView } from './components/views/CoursesAdminView.tsx';
import { RolesPermissionsView } from './components/views/RolesPermissionsView.tsx';
import { AccountCreationView } from './components/views/AccountCreationView.tsx';
import { EditCertificatesView } from './components/views/EditCertificatesView.tsx';
import { CenterDetailView } from './components/views/CenterDetailView.tsx';
import { View, Teacher, UserRole } from './types.ts';
import { MOCK_TEACHER, MOCK_CLASSES } from './constants.tsx';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.MAIN_CENTER);
  const [currentView, setCurrentView] = useState<View>(View.COURSES_ADMIN);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [teacher] = useState<Teacher>(MOCK_TEACHER);

  const navigateToClass = (id: string) => {
    setSelectedClassId(id);
    setCurrentView(View.CLASS_DETAIL);
  };

  const navigateToStudent = (id: string) => {
    setSelectedStudentId(id);
    setCurrentView(View.STUDENT_DETAIL);
  };

  const navigateToCenter = (id: string) => {
    setSelectedCenterId(id);
    setCurrentView(View.CENTER_DETAIL);
  };

  const navigateToCourseEdit = (id: string) => {
    setSelectedCourseId(id);
    setCurrentView(View.COURSES_ADMIN);
  };

  const renderView = () => {
    switch (currentView) {
      case View.MY_CLASSES:
        return <MyClassesView teacher={teacher} classes={MOCK_CLASSES} activeRole={activeRole} onEnterClass={navigateToClass} onEnterCenter={navigateToCenter} />;
      case View.CENTER_DETAIL:
        return <CenterDetailView centerId={selectedCenterId!} onBack={() => setCurrentView(View.MY_CLASSES)} onManageCourse={navigateToCourseEdit} />;
      case View.CLASS_DETAIL:
        return <ClassDetailView classId={selectedClassId!} onStudentClick={navigateToStudent} onBack={() => setCurrentView(View.MY_CLASSES)} />;
      case View.STUDENT_DETAIL:
        return <StudentDetailView studentId={selectedStudentId!} onClassClick={navigateToClass} onBack={() => setCurrentView(View.MY_CLASSES)} />;
      case View.STUDENTS:
        return <StudentsView onStudentClick={navigateToStudent} />;
      case View.GRADES:
        return <GradesView />;
      case View.REPORTS:
        return <ReportsView />;
      case View.CERTIFICATES:
        return <CertificatesView />;
      case View.EDIT_CERTIFICATES:
        return <EditCertificatesView />;
      case View.TESTS:
        return <TestsView />;
      case View.RESOURCES:
        return <TeachingResourcesView />;
      case View.COURSES_ADMIN:
        return <CoursesAdminView initialCourseId={selectedCourseId} onExitEdit={() => setSelectedCourseId(null)} />;
      case View.ROLES_PERMISSIONS:
        return <RolesPermissionsView />;
      case View.ACCOUNT_CREATION:
        return <AccountCreationView />;
      default:
        return <CoursesAdminView initialCourseId={selectedCourseId} onExitEdit={() => setSelectedCourseId(null)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 selection:bg-[#fbee21] selection:text-[#292667]">
      <Header 
        schoolName={teacher.schoolName} 
        teacherCode={teacher.teacherCode} 
        activeRole={activeRole}
        onRoleChange={(role) => {
          setActiveRole(role);
          if (role === UserRole.MAIN_CENTER) setCurrentView(View.COURSES_ADMIN);
          else if (role === UserRole.TEACHER) setCurrentView(View.MY_CLASSES);
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} activeRole={activeRole} />
        <main 
          className="flex-1 relative flex flex-col overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        >
          <div className="flex-1 overflow-hidden p-3 md:p-5 lg:p-6">
            <div className="max-w-[1600px] mx-auto h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
              {renderView()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
