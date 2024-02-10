import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], //exportamos DatabaseService porque lo necesitamos en el UserService y TaskService
})
export class DatabaseModule {}
