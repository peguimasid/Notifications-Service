import { Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(): Promise<Notification[]> {
    return await this.prisma.notification.findMany();
  }

  @Post()
  async create(): Promise<Notification> {
    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'You are selected',
        category: 'promotion',
        recipientId: '7899-9293-2737',
      },
    });
  }
}
