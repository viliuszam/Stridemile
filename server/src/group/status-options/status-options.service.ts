import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StatusOptionsService {
  constructor(private prisma: PrismaService) {}

  async getGoalStatusOptions() {
    return this.prisma.goalStatus.findMany();
  }

}
