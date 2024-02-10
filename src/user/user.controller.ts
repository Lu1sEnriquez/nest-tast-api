import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUser() {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() data: User) {
    return this.userService.create(data);
  }
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmailWithPassword(email);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findOneById(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    return this.userService.update(Number(id), data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
