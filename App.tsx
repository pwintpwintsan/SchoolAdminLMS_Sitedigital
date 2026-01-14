
import React, { useState, useEffect, useCallback } from 'react';
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
import { StudentDashboardView } from './components/views/StudentDashboardView.tsx';
import { CoursesAdminView } from './components/views/CoursesAdminView.tsx';
import { RolesPermissionsView } from './components/views/RolesPermissionsView.tsx';
import { AccountCreationView } from './components/views/AccountCreationView.tsx';
import { EditCertificatesView } from './components/views/EditCertificatesView.tsx';
import { CenterDetailView } from './components/views/CenterDetailView.tsx';
import { BranchRegistrationView } from './components/views/BranchRegistrationView.tsx';
import { CourseViewerView } from './components/views/CourseViewerView.tsx';
import { View, Teacher, UserRole, UserPermissions } from './types.ts';
import { MOCK_TEACHER, MOCK_CLASSES } from './constants.tsx';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.MAIN_CENTER);
  const [currentView, setCurrentView] = useState<View>(View.COURSES_ADMIN);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [teacher] = useState<Teacher>(MOCK_TEACHER);

  // Central Permissions State
  const [rolePermissions, setRolePermissions] = useState<Record<string, UserPermissions>>({
    'Student': {
      courses: { view: true, edit: false, delete: false },
      certificates: { view: true, edit: false },
      accounts: { view: false, create: false, edit: false, delete: false },
      resources: { view: true, upload: false, delete: false },
    },
    'Teacher': {
      courses: { view: true, edit: false, delete: false }, // User requested this can be changed via UI
      certificates: { view: true, edit: true },
      accounts: { view: true, create: false, edit: false, delete: false },
      resources: { view: true, upload: true, delete: false },
    },
    'School Admin': {
      courses: { view: true, edit: true, delete: true },
      certificates: { view: true, edit: true },
      accounts: { view: true, create: true, edit: true, delete: true },
      resources: { view: true, upload: true, delete: true },
    }
  });

  const checkPermission = useCallback((category: keyof UserPermissions, action: string): boolean => {
    // Main Center always has all permissions
    if (activeRole === UserRole.MAIN_CENTER) return true;
    
    const roleKey = activeRole === UserRole.STUDENT ? 'Student' : 
                    activeRole === UserRole.TEACHER ? 'Teacher' : 'School Admin';
    
    const perms = rolePermissions[roleKey];
    if (!perms || !perms[category]) return false;
    
    // @ts-ignore
    return !!perms[category][action];
  }, [activeRole, rolePermissions]);

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

  const navigateToCourseViewer = (id: string) => {
    setSelectedCourseId(id);
    setCurrentView(View.COURSE_VIEWER);
  };

  const renderView = () => {
    switch (currentView) {
      case View.MY_CLASSES:
        return <MyClassesView 
          teacher={teacher} 
          classes={MOCK_CLASSES} 
          activeRole={activeRole} 
          onEnterClass={navigateToClass} 
          onEnterCenter={navigateToCenter}
          onEnterCourse={navigateToCourseViewer}
          onAddBranch={() => setCurrentView(View.REGISTER_BRANCH)}
        />;
      case View.CENTER_DETAIL:
        return <CenterDetailView 
          centerId={selectedCenterId!} 
          onBack={() => setCurrentView(View.MY_CLASSES)} 
          onManageCourse={navigateToCourseEdit} 
          onPreviewCourse={navigateToCourseViewer}
          checkPermission={checkPermission}
        />;
      case View.CLASS_DETAIL:
        return <ClassDetailView 
          classId={selectedClassId!} 
          onStudentClick={navigateToStudent} 
          onBack={() => setCurrentView(View.MY_CLASSES)} 
          onEnterCourse={navigateToCourseViewer}
          checkPermission={checkPermission}
        />;
      case View.STUDENT_DETAIL:
        return <StudentDetailView 
          studentId={selectedStudentId!} 
          onClassClick={navigateToClass} 
          onBack={() => setCurrentView(View.MY_CLASSES)} 
          onEnterCourse={navigateToCourseViewer}
        />;
      case View.STUDENT_DASHBOARD:
        return <StudentDashboardView onEnterCourse={navigateToCourseViewer} />;
      case View.STUDENTS:
        return <StudentsView onStudentClick={navigateToStudent} checkPermission={checkPermission} />;
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
        return <TeachingResourcesView checkPermission={checkPermission} />;
      case View.COURSES_ADMIN:
        return <CoursesAdminView 
          initialCourseId={selectedCourseId} 
          onExitEdit={() => setSelectedCourseId(null)} 
          onPreviewCourse={navigateToCourseViewer}
          checkPermission={checkPermission}
        />;
      case View.ROLES_PERMISSIONS:
        return <RolesPermissionsView 
          onRegisterBranch={() => setCurrentView(View.REGISTER_BRANCH)} 
          rolePerms={rolePermissions}
          setRolePerms={setRolePermissions}
        />;
      case View.ACCOUNT_CREATION:
        return <AccountCreationView checkPermission={checkPermission} />;
      case View.REGISTER_BRANCH:
        return <BranchRegistrationView onBack={() => setCurrentView(View.MY_CLASSES)} />;
      case View.COURSE_VIEWER:
        return <CourseViewerView courseId={selectedCourseId!} onBack={() => {
          if (activeRole === UserRole.STUDENT) setCurrentView(View.STUDENT_DASHBOARD);
          else setCurrentView(View.MY_CLASSES);
        }} />;
      default:
        return <CoursesAdminView 
          initialCourseId={selectedCourseId} 
          onExitEdit={() => setSelectedCourseId(null)} 
          onPreviewCourse={navigateToCourseViewer}
          checkPermission={checkPermission}
        />;
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
          else if (role === UserRole.STUDENT) setCurrentView(View.STUDENT_DASHBOARD);
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} activeRole={activeRole} checkPermission={checkPermission} />
        <main 
          className="flex-1 relative flex flex-col overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        >
          <div className="flex-1 overflow-hidden p-2 md:p-3">
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
