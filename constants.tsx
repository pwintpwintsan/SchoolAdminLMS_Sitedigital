
import { Teacher, Student, ClassInfo, Course, School } from './types';

export const MOCK_SCHOOLS: School[] = [
  { 
    id: 'sch1', 
    name: 'Downtown Branch', 
    location: 'City Center', 
    region: 'Central',
    teacherQuota: 10, 
    currentTeacherCount: 4, 
    studentQuota: 200, 
    currentStudentCount: 145, 
    adminEmail: 'admin@downtown.ubook.com',
    lat: 37.7749, // San Francisco
    lng: -122.4194,
    type: 'HQ'
  },
  { 
    id: 'sch2', 
    name: 'Westside Academy', 
    location: 'Western District', 
    region: 'West',
    teacherQuota: 5, 
    currentTeacherCount: 5, 
    studentQuota: 100, 
    currentStudentCount: 88, 
    adminEmail: 'manager@westside.ubook.com',
    lat: 37.7599, // Mission District
    lng: -122.4148,
    type: 'Regional'
  },
  { 
    id: 'sch3', 
    name: 'Global Park Center', 
    location: 'Tech Park', 
    region: 'North',
    teacherQuota: 20, 
    currentTeacherCount: 12, 
    studentQuota: 500, 
    currentStudentCount: 320, 
    adminEmail: 'ops@globalpark.ubook.com',
    lat: 37.8044, // Fisherman's Wharf
    lng: -122.4081,
    type: 'Satellite'
  },
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'rs1', 
    name: 'Digital Kids Starter V2', 
    isPurchased: true, 
    thumbnail: 'https://picsum.photos/seed/dkv2/400/300',
    description: "Core curriculum for foundational learning in digital skills, logic, and creative thinking.",
    category: "Standard Curriculum",
    duration: "12 Hours",
    lastUpdated: "2024-03-10",
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Logic & Binary',
        lessons: [
          { id: 'l1', title: 'Task 1: What is Logic?', type: 'video', content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isPublished: true, isSample: true },
          { id: 'l2', title: 'Task 2: Binary Basics Quiz', type: 'quiz', quiz: [
            { id: 'q1', question: 'What is 1+1 in binary?', options: ['2', '10', '11', '01'], correctAnswer: 1 }
          ], isPublished: true, isSample: true },
          { 
            id: 'l3', 
            title: 'Task 3: Pattern Matching', 
            type: 'assignment', 
            assignmentInstructions: '', 
            autoPassOnUpload: true,
            characterLimit: 250,
            modelAnswer: 'The pattern follows a repetitive A-B-A sequence using basic geometric shapes.',
            isPublished: true,
            isSample: false
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Robotics Intro',
        lessons: [
          { 
            id: 'l4', 
            title: 'Task 4: Parts of a Robot', 
            type: 'text', 
            content: 'An overview of sensors, actuators, and controllers.',
            autoPassOnUpload: true,
            characterLimit: 1000,
            modelAnswer: 'A robot consists of a power source, sensors for input, a controller for logic, and actuators for movement.',
            isPublished: true,
            isSample: true
          },
          { id: 'l5', title: 'Task 5: Assembly Video', type: 'video', content: 'https://vimeo.com/76979871', isPublished: true, isSample: false },
          { id: 'l6', title: 'Task 6: Safety Procedures', type: 'quiz', quiz: [
            { id: 'q2', question: 'Should you touch moving gears?', options: ['Yes', 'No', 'Maybe', 'Only if wearing gloves'], correctAnswer: 1 }
          ], isPublished: true, isSample: false }
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
    duration: "18 Hours",
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
    passingRate: 80,
    attendance: 24, 
    studyTime: 450, 
    taskCompletion: 75,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-15',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '2', 
    username: '1000002', 
    firstName: 'Sarah', 
    lastName: 'Chen', 
    finalGrade: 92, 
    passingRate: 80,
    attendance: 28, 
    studyTime: 520, 
    taskCompletion: 95,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-10-01',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '3', 
    username: '1000003', 
    firstName: 'Marcus', 
    lastName: 'Johnson', 
    finalGrade: 74, 
    passingRate: 80,
    attendance: 20, 
    studyTime: 380, 
    taskCompletion: 60,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-20',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '4', 
    username: '1000004', 
    firstName: 'Elena', 
    lastName: 'Rodriguez', 
    finalGrade: 98, 
    passingRate: 80,
    attendance: 30, 
    studyTime: 600, 
    taskCompletion: 100,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-12',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '5', 
    username: '1000005', 
    firstName: 'Kevin', 
    lastName: 'Park', 
    finalGrade: 62, 
    passingRate: 80,
    attendance: 15, 
    studyTime: 210, 
    taskCompletion: 45,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-10-05',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '6', 
    username: '1000006', 
    firstName: 'Zoe', 
    lastName: 'Williams', 
    finalGrade: 88, 
    passingRate: 80,
    attendance: 26, 
    studyTime: 480, 
    taskCompletion: 85,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-28',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '7', 
    username: '1000007', 
    firstName: 'Leo', 
    lastName: 'Garcia', 
    finalGrade: 79, 
    passingRate: 80,
    attendance: 22, 
    studyTime: 400, 
    taskCompletion: 70,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-11-02',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '8', 
    username: '1000008', 
    firstName: 'Maya', 
    lastName: 'Patel', 
    finalGrade: 95, 
    passingRate: 80,
    attendance: 29, 
    studyTime: 580, 
    taskCompletion: 92,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-10',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '9', 
    username: '1000009', 
    firstName: 'Oscar', 
    lastName: 'Jones', 
    finalGrade: 45, 
    passingRate: 80,
    attendance: 10, 
    studyTime: 120, 
    taskCompletion: 30,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-10-15',
    registeredClasses: [{ id: 'c1', name: 'Explorers A' }]
  },
  { 
    id: '10', 
    username: '1000010', 
    firstName: 'Sienna', 
    lastName: 'Vazquez', 
    finalGrade: 81, 
    passingRate: 80,
    attendance: 25, 
    studyTime: 460, 
    taskCompletion: 78,
    level: 'Digital Kids Starter V2', 
    status: 'active',
    activationDate: '2023-09-30',
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
    name: 'Robo Squad B', 
    level: 'Level 1 Core Robotics', 
    students: MOCK_STUDENTS.slice(0, 5),
    teachers: [MOCK_TEACHER],
    courseId: 'rs2',
    schedule: 'Tue / Thu 02:00 PM',
    progress: 40,
    lastActivity: '1 day ago'
  }
];

export const LEVELS = ['Digital Kids Starter V2', 'Level 1 Core Robotics', 'Level 2 Advanced Robotics'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const LANGUAGES = ['English', 'Spanish', 'Portuguese', 'Chinese'];
export const MODULES = ['Module 1: Logic & Binary', 'Module 2: Robotics Basics', 'Module 3: AI Concepts', 'Module 4: Game Design'];
export const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Overseas'];
