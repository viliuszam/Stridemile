import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupVisibilityService {
  constructor(private prisma: PrismaService) {}

  async getVisibilityOptions() {
    return this.prisma.groupVisibility.findMany();
  }
}
