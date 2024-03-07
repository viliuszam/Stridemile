import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Group } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const { name, description, mentorId, visibilityId } = createGroupDto;
    return this.prisma.group.create({
      data: {
        name,
        description,
        mentorId,
        visibilityId,
      },
    });
  }

  async findGroupById(groupId: number): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
  }
}
