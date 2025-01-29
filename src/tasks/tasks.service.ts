import { Injectable } from '@nestjs/common';
import { Task, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async updateTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
