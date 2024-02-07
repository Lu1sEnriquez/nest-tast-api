export interface Task {
  id: number;
  User: number;
  title: string;
  description: string;
  complete: boolean;
  creationDate: Date;
  completionDate: Date;
}
