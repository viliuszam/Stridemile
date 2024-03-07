import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class AchievementService {

    constructor(private prisma: PrismaService) {

    }
    

    async getAllAchievements() {
        return this.prisma.achievement.findMany({
          select: {
            id: true,
            title: true,
            description: true,
            steps_required: true,
            time_required_s: true,
          },
        });
      }

    async getPoints(userId: number){
      const allAchievements = await this.prisma.achievement.findMany({
        select: {
          points: true
        }
      });

      const totalPoints = allAchievements.reduce((sum, entry) => sum + entry.points, 0);

      const completedAchievements = await this.prisma.achievement.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });

      const userPoints = completedAchievements.reduce((sum, entry) => sum + entry.points, 0);

      return {
        totalPoints,
        userPoints
      }
    }

    async checkForUserAchievements(userId: number){
      await this.updateCompletedAchievements(userId);

      const completedAchievements = await this.prisma.achievement.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });
      return completedAchievements;
    }

    async updateCompletedAchievements(userId) {
      const activityEntries = await this.prisma.activityEntry.findMany({
        where: {
          user: { id: userId },
        },
      });

      const missingAchievements = await this.prisma.achievement.findMany({
        where: {
          NOT: {
            users: {
              some: {
                userId: userId,
              },
            },
          },
        },
        select:{
          id:true,
          steps_required: true,
          time_required_s: true,
        }
      });

      const totalSteps = activityEntries.reduce((sum, entry) => sum + entry.steps, 0);

      for (const achievement of missingAchievements) {
        let isCompleted = false;
        if (achievement.time_required_s === null && totalSteps > achievement.steps_required) {
          isCompleted = true;
        }
        if (isCompleted) {
          try {
            if (isCompleted) {
              await this.prisma.achievementsOnUsers.create({
                data: {
                  userId: userId,
                  achievementId: achievement.id,
                }
              });
          }
         } catch (error) {
            console.error(`Error updating achievement ${achievement.id} for user ${userId}:`, error);
          }
        }
      }

    }
}
