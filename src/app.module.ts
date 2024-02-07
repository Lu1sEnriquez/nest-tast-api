import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TaskModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
