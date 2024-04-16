import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityEntry } from './dto/activitytrack.dto';
import { startOfMonth, endOfMonth } from 'date-fns';
import { GroupService } from '../group/group.service';

@Injectable()
export class ActivityService {
  constructor(
    private prisma: PrismaService,
    private groupService: GroupService,
  ) {}

  async createActivityEntry(
    activityEntry: ActivityEntry,
    userId: number,
  ): Promise<ActivityEntry> {
    if (!userId) {
      // TODO: padaryt kad responsa mestu normalu tiesiog
      throw new Error('Invalid userId provided.');
    }

    const createdActivityEntry = await this.prisma.activityEntry.create({
      data: {
        user: { connect: { id: userId } },
        steps: activityEntry.steps,
        distance: activityEntry.distance,
        start_time: activityEntry.start_time,
        end_time: activityEntry.end_time,
      },
    });

    await this.updateGoalProgress(userId, activityEntry.steps);
    await this.updateChallengeProgress(userId, activityEntry.steps);

    return createdActivityEntry;
  }

  async updateChallengeProgress(
    userId: number,
    steps: number,
  ): Promise<void> {
    const userGroups = await this.prisma.groupMember.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
      },
    });
  
    for (const group of userGroups) {
      const activeChallenges = await this.prisma.challenge.findMany({
        where: {
          fk_Groupid: group.id,
          start_date: {
            lte: new Date(),
          },
          end_date: {
            gte: new Date(),
          },
        },
      });
  
      // lavoninis kodas visiskai lol
      for (const challenge of activeChallenges) {
        await this.groupService.markChallengeParticipation(userId, challenge.id, steps);
      }
    }
  }

  async updateGoalProgress(userId: number, steps: number): Promise<void> {
    // hardcodint mentoriu, nes kazkodel nepriklauso prie group memberiu
    const userGroups = await this.prisma.groupMember.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
      },
    });
  
    for (const groupMember of userGroups) {
      const activeGoals = await this.prisma.goal.findMany({
        where: {
          fk_Groupid: groupMember.group.id,
          start_date: {
            lte: new Date(),
          },
          end_date: {
            gte: new Date(),
          },
        },
      });
  
      for (const goal of activeGoals) {
        // Update the current_value based on the activity entry
        await this.prisma.goal.update({
          where: {
            id: goal.id,
          },
          data: {
            current_value: {
              increment: steps,
            },
          },
        });
      }
    }
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

  async getMonthlyUserSteps(userId: number) {
    const currentDate = new Date();
    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);

    const activityEntries = await this.prisma.activityEntry.findMany({
      where: {
        AND: [
          { user: { id: userId } },
          {
            start_time: {
              gte: startOfMonthDate,
              lte: endOfMonthDate,
            },
          },
        ],
      },
    });

    const monthlySteps = activityEntries.reduce((sum, entry) => sum + entry.steps, 0);
    return monthlySteps;
  }
}