
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Statistics } from '@prisma/client';
import { CreateStatisticsDto } from './dto/create-statistics.dto';

@Injectable()
export class HealthTrackingService {
  constructor(private prisma: PrismaService) {}

  async createStatistics(data: CreateStatisticsDto): Promise<Statistics> {
    const { sleep, calories, macroelements, water, weight, userId } = data;
    return this.prisma.statistics.create({
      data: {
        sleep_duration: sleep,
        calories_intake: calories,
        macroelements_intake: macroelements,
        water_intake: water,
        weight: weight,
        fk_UserId: userId,
        date: new Date()
      },
    });
  }

  async getUserHealthTrackingInfo(userId: number): Promise<Statistics[] | null> {
    return this.prisma.statistics.findMany({
      where: {
        fk_UserId: userId,
      },
    });
  }

  async deleteStatistics(recordId: number): Promise<void> {
    await this.prisma.statistics.delete({
      where: {
        id: recordId,
      },
    });
  }
}