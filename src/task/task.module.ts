import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseModule } from 'src/database/database.module';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [DatabaseModule],
})
export class TaskModule {}
