import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() taskData: { title: string; description: string; status?: string },
  ): Promise<TaskModel> {
    return this.tasksService.createTask(taskData);
  }

  @Get()
  getAllTasks(): Promise<TaskModel[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.getTaskById(String(id));
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body()
    updateData: { title?: string; description?: string; status?: string },
  ): Promise<TaskModel> {
    return this.tasksService.updateTask(String(id), updateData);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.deleteTask(String(id));
  }
}
