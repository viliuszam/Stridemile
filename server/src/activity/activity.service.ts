import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityEntry } from './dto/activitytrack.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async createActivityEntry(activityEntry: ActivityEntry, userId: number): Promise<ActivityEntry> {
    if (!userId) {
        // TODO: padaryt kad responsa mestu normalu tiesiog
        throw new Error('Invalid userId provided.');
      }
    return this.prisma.activityEntry.create({
      data: {
        user: { connect: { id: userId } },
        steps: activityEntry.steps,
        distance: activityEntry.distance,
        start_time: activityEntry.start_time,
        end_time: activityEntry.end_time,
      },
    });
  }

  async getUserActivitySummary(userId: number): Promise<{
    totalSteps: number;
    totalDistance: number;
    totalTimeSpent: number;
  }> {
    const activityEntries = await this.prisma.activityEntry.findMany({
      where: {
        user: { id: userId },
      },
    });
  
    const totalSteps = activityEntries.reduce((sum, entry) => sum + entry.steps, 0);
    const totalDistance = activityEntries.reduce((sum, entry) => sum + entry.distance, 0);
    const totalTimeSpentMs = activityEntries.reduce((sum, entry) => {
      const timeSpent = entry.end_time.getTime() - entry.start_time.getTime();
      return sum + timeSpent;
    }, 0);
  
    const totalTimeSpent = Math.floor(totalTimeSpentMs / 1000); // Convert to seconds
  
    return {
      totalSteps,
      totalDistance,
      totalTimeSpent,
    };
  }


}