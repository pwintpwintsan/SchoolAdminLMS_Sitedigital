
export enum UserRole {
  MAIN_CENTER = 'main-center',
  SCHOOL_ADMIN = 'school-admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  EDITOR = 'editor'
}

export interface UserPermissions {
  courses: { view: boolean; edit: boolean; delete: boolean };
  certificates: { view: boolean; edit: boolean };
  accounts: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  resources: { view: boolean; upload: boolean; delete: boolean };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string;
  quiz?: QuizQuestion[];
  assignmentInstructions?: string;
  characterLimit?: number; // Max characters for student response
  modelAnswer?: string; // Reference text for non-quiz tasks
  autoPassOnUpload?: boolean; // If true, task is marked passed as soon as learner submits a file
  isPublished?: boolean; // Visibility status
  isSample?: boolean; // Whether this is a free sample task
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  name: string;
  isPurchased: boolean;
  thumbnail: string;
  description?: string;
  category?: string;
  level?: string;
  duration?: string;
  modules: Module[];
  lastUpdated?: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  region: string; // Added for regional filtering
  teacherQuota: number;
  currentTeacherCount: number;
  studentQuota: number;
  currentStudentCount: number;
  adminEmail: string;
  lat: number;
  lng: number;
  type: 'HQ' | 'Satellite' | 'Regional' | 'Franchise';
}

export interface Student {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  finalGrade: number;
  passingRate: number;
  attendance: number;
  studyTime: number;
  taskCompletion: number; // Percentage of tasks/assignments finished
  level: string;
  status: 'active' | 'inactive';
  activationDate?: string;
  registeredClasses?: { id: string; name: string }[];
}

export interface Teacher {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  teacherCode: string;
  role: string;
  assignedClassIds: string[];
  branchId?: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  level: string;
  students: Student[];
  teachers: Teacher[];
  courseId: string;
  schedule: string;
  progress: number;
  lastActivity: string;
}

export enum View {
  MY_CLASSES = 'my-classes',
  CENTER_DETAIL = 'center-detail',
  CLASS_DETAIL = 'class-detail',
  STUDENT_DETAIL = 'student-detail',
  STUDENT_DASHBOARD = 'student-dashboard',
  STUDENTS = 'students',
  GRADES = 'grades',
  REPORTS = 'reports',
  CERTIFICATES = 'certificates',
  TESTS = 'tests',
  RESOURCES = 'teaching-resources',
  COURSES_ADMIN = 'courses-admin',
  ROLES_PERMISSIONS = 'roles-permissions',
  EDIT_CERTIFICATES = 'edit-certificates',
  ACCOUNT_CREATION = 'account-creation',
  REGISTER_BRANCH = 'register-branch',
  COURSE_VIEWER = 'course-viewer'
}