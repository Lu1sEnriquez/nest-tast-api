import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  getAllTask(): Promise<Task[]> {
    return this.db.task.findMany();
  }

  getTaskById(id: number): Promise<Task> {
    return this.db.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  createTask(data: Task): Promise<Task> {
    return this.db.task.create({
      data,
    });
  }

  updateTask(id: number, data: Task): Promise<Task> {
    return this.db.task.update({
      where: {
        id: id,
      },
      data,
    });
  }

  deleteTask(id: number): Promise<Task> {
    return this.db.task.delete({
      where: {
        id: id,
      },
    });
  }
}
