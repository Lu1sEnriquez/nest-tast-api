import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma/prisma.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
