import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { UserActive } from 'src/common/decorators/user-active.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Auth(Role.USER)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@UserActive() user: UserActiveInterface) {
    return this.taskService.findAll(user);
  }
  @Post()
  async create(@Body() data: Task, @UserActive() user: UserActiveInterface) {
    return this.taskService.create(data, user);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @UserActive() user: UserActiveInterface,
  ) {
    return this.taskService.getById(Number(id), user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Task,
    @UserActive() user: UserActiveInterface,
  ) {
    return this.taskService.update(Number(id), data, user);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserActive() user: UserActiveInterface,
  ) {
    return this.taskService.delete(Number(id), user);
  }
}
