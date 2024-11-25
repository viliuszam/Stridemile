import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Group, Invitation, User, Goal, Event, EventComment, Challenge, ChallengeParticipation } from '@prisma/client';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService,
    private userService: UserService
    ) {}

  async sendPersonalMessage(senderId: number, receiverId: number, message: string) {
    return this.prisma.chat.create({
      data: {
        senderId: senderId,
        receiverId: receiverId, 
        message: message
      },
    });
  }

  async getChatMessages(currUserId: number, receiverId: number) {
    const messages = await this.prisma.chat.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: currUserId },
              { receiverId: receiverId },
            ],
          },
          {
            AND: [
              { senderId: receiverId },
              { receiverId: currUserId },
            ],
          },
        ],
      },
    });
    return messages;
  }  

  async getAllChats(userId: number) {
    const conversations = await this.prisma.chat.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        createdAt: true,
        message: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    const latestMessages = new Map<number, any>();
  
    conversations.forEach((conversation) => {
      const otherUserId = conversation.senderId === userId ? conversation.receiverId : conversation.senderId;
      if (!latestMessages.has(otherUserId)) {
        latestMessages.set(otherUserId, conversation);
      }
    });
  
    return Array.from(latestMessages.values());
  }
  
}

