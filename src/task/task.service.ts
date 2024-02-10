import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  findAll(user: UserActiveInterface): Promise<Task[]> {
    return this.db.task.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  getById(id: number, user: UserActiveInterface): Promise<Task> {
    return this.db.task.findUnique({
      where: {
        id: id,
        userId: user.id,
      },
    });
  }

  create(data: Task, user: UserActiveInterface): Promise<Task> {
    return this.db.task.create({
      data: { ...data, userId: user.id },
    });
  }

  update(id: number, data: Task, user: UserActiveInterface): Promise<Task> {
    return this.db.task.update({
      where: {
        id: id,
        userId: user.id,
      },
      data,
    });
  }

  delete(id: number, user: UserActiveInterface): Promise<Task> {
    return this.db.task.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
  }
}
