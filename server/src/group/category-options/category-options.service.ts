import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryOptionsService {
  constructor(private prisma: PrismaService) {}

  async getEventCategories() {
    return this.prisma.eventCategory.findMany();
  }

  async getGoalCategories() {
    return this.prisma.goalCategory.findMany();
  }

}
