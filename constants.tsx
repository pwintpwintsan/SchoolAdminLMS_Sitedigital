
import { Teacher, Student, ClassInfo, Course, School } from './types';

export const MOCK_SCHOOLS: School[] = [
  { id: 'sch1', name: 'Downtown Branch', location: 'City Center', teacherQuota: 10, currentTeacherCount: 4, studentQuota: 200, currentStudentCount: 145, adminEmail: 'admin@downtown.ubook.com' },
  { id: 'sch2', name: 'Westside Academy', location: 'Western District', teacherQuota: 5, currentTeacherCount: 5, studentQuota: 100, currentStudentCount: 88, adminEmail: 'manager@westside.ubook.com' },
  { id: 'sch3', name: 'Global Park Center', location: 'Tech Park', teacherQuota: 20, currentTeacherCount: 12, studentQuota: 500, currentStudentCount: 320, adminEmail: 'ops@globalpark.ubook.com' },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'rs1', 
    name: 'Digital Kids Starter V2', 
    isPurchased: true, 
    thumbnail: 'https://picsum.photos/seed/dkv2/400/300',
    description: "Core curriculum for foundational learning in digital skills, logic, and creative thinking.",
    category: "Standard Curriculum",
    lastUpdated: "2024-03-10",
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Logic & Binary',
        lessons: [
          { id: 'l1', title: 'Task 1: What is Logic?', type: 'video', content: 'Intro video URL' },
          { id: 'l2', title: 'Task 2: Binary Basics Quiz', type: 'quiz', quiz: [
            { id: 'q1', question: 'What is 1+1 in binary?', options: ['2', '10', '11', '01'], correctAnswer: 1 }
          ]},
          { id: 'l3', title: 'Task 3: Pattern Matching', type: 'assignment', assignmentInstructions: 'Match the patterns provided in the worksheet.' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Robotics Intro',
        lessons: [
          { id: 'l4', title: 'Task 1: Parts of a Robot', type: 'text', content: 'An overview of sensors, actuators, and controllers.' },
          { id: 'l5', title: 'Task 2: Assembly Video', type: 'video', content: 'Assembly tutorial' },
          { id: 'l6', title: 'Task 3: Safety Procedures', type: 'quiz', quiz: [
            { id: 'q2', question: 'Should you touch moving gears?', options: ['Yes', 'No', 'Maybe', 'Only if wearing gloves'], correctAnswer: 1 }
          ]}
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Visual Coding',
        lessons: [
          { id: 'l7', title: 'Task 1: Intro to Blocks', type: 'video', content: 'Block-based coding basics' },
          { id: 'l8', title: 'Task 2: Create a Loop', type: 'assignment', assignmentInstructions: 'Build a code block that repeats 5 times.' },
          { id: 'l9', title: 'Task 3: Logic Gates Doc', type: 'text', content: 'Detailed documentation on AND, OR, and NOT gates.' }
        ]
      }
    ]
  },
  { 
    id: 'rs2', 
    name: 'Level 1 Core Robotics', 
    isPurchased: false, 
    thumbnail: 'https://picsum.photos/seed/l1c/400/300',
    description: "Introductory robotics and hardware logic for students ready for physical builds.",
    category: "Robotics",
    lastUpdated: "2024-02-15",
    modules: []
  },
];

export const MOCK_TEACHER: Teacher = {
  id: 't1',
  username: "T1234567",
  firstName: "Jane",
  lastName: "Smith",
  schoolName: "Downtown Branch",
  teacherCode: "UB-4421",
  role: "Educator",
  assignedClassIds: ['c1', 'c2'],
  branchId: 'sch1'
};

export const MOCK_STUDENTS: Student[] = [
  { 
    id: '1', 
    username: '1000001', 
    firstName: 'Timmy', 
    lastName: 'Lee', 
    finalGrade: 85, 
    attendance: 24, 
    studyTime: 450, 
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-15',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '2', 
    username: '1000002', 
    firstName: 'Sara', 
    lastName: 'Wang', 
    finalGrade: 92, 
    attendance: 28, 
    studyTime: 520, 
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-16',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  }
];

export const MOCK_CLASSES: ClassInfo[] = [
  { 
    id: 'c1', 
    name: 'Explorers A', 
    level: 'Digital Kids Starter V2', 
    students: MOCK_STUDENTS,
    teachers: [MOCK_TEACHER],
    courseId: 'rs1',
    schedule: 'Mon / Wed 10:00 AM',
    progress: 65,
    lastActivity: '2 hours ago'
  },
  { 
    id: 'c2', 
    name: 'Creators B', 
    level: 'Level 1 Core', 
    students: MOCK_STUDENTS.slice(0, 1),
    teachers: [MOCK_TEACHER],
    courseId: 'rs2',
    schedule: 'Tue / Thu 02:00 PM',
    progress: 30,
    lastActivity: 'Yesterday'
  },
];

export const LEVELS = ['Digital Kids Starter V2', 'Level 1 Core', 'Level 2 Advanced'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'Chinese'];
export const MODULES = ['Module 1: Logic & Binary', 'Module 2: Robotics Basics', 'Module 3: AI Concepts', 'Module 4: Game Design'];
