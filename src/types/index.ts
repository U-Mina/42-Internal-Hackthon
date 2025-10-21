export interface Step {
    id: string;
    title: string;
    estimatedDuration: number; // in hours
    completed: boolean;
    comment?: string;
}

export interface Project {
  id: number;
  name: string;
  progress: number; // A value from 0 to 100
  deadline?: Date;
  steps?: Step[];
}

export interface Student {
  id: number;
  name: string;
  projects: Project[];
}

export interface User {
    id: string;
    name: string;
    role: 'student' | 'bocal';
}

export interface Bocal {
    id: string;
    name:string;
    assignedStudents: User[];
}
