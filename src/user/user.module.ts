import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersService], // este es el provedor que tiene este modulo
  controllers: [UserController],
  imports: [DatabaseModule], // importamos  DatabaseModule porque necesitamos Injectar en UserService dataBaseService
  exports: [UsersService], //exportamos UsersService porque lo necesitamos en el authService
})
export class UserModule {}
