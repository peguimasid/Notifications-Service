import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(): Promise<Notification[]> {
    return await this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody): Promise<Notification> {
    const { category, recipientId, content } = body;

    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
