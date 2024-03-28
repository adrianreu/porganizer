export enum Priority {
  Lower = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Higher = 4,
}

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  precondition: number | null;
  completed: boolean;
  completedAt: Date | null;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  color: string;
  tasks: Task[];
}
