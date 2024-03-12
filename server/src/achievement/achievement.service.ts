import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class AchievementService {

    constructor(private prisma: PrismaService) {

    }
    

    async getAllAchievements(userId: number) {
      const activityEntries = await this.prisma.activityEntry.findMany({
        where: {
          user: { id: userId },
        },
      });

      const totalSteps = activityEntries.reduce((sum, entry) => sum + entry.steps, 0);
      const achievements = await this.prisma.achievement.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            steps_required: true,
            time_required_s: true,
        },
      });

      const achievementsWithProgress = await Promise.all(achievements.map(async achievement => {
        let progress = 0;
        let completed = await this.checkIfCompleted(userId, achievement.id);
        let date = null;
        if (achievement.time_required_s === null) {
            progress = totalSteps / achievement.steps_required * 100;
            if (progress >= 100) {
                progress = 100;
            }
        }
        if (achievement.time_required_s !== null){
          let steps = await this.findFastestTimeSteps(userId, achievement.time_required_s);
          progress = steps / achievement.steps_required * 100;
          if (progress >= 100) {
            progress = 100;
          }
        }
        if (completed) {
            date = await this.getAchievementCompletionDate(userId, achievement.id);
        }
        return { ...achievement, progress, completed, date };
      }));

      achievementsWithProgress.sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? -1 : 1;
        }
        if (a.date && b.date) {
            return b.date.localeCompare(a.date);
        } else if (!a.date && !b.date) {
            return 0;
        } else {
            return a.date ? 1 : -1;
        }
    });

      return achievementsWithProgress;

    }

    async checkIfCompleted(userId: number, achievementId: number): Promise<boolean> {
      const entry = await this.prisma.achievementsOnUsers.findUnique({
          where: {
              userId_achievementId: {
                  userId,
                  achievementId
              }
          }
      });
      return !!entry;
    }

    async getAchievementCompletionDate(userId: number, achievementId: number): Promise<string | null> {
      const entry = await this.prisma.achievementsOnUsers.findUnique({
          where: {
              userId_achievementId: {
                  userId,
                  achievementId
              }
          }
      });

      if (entry && entry.completedAt) {
          const completionDate = entry.completedAt.toISOString().split('T')[0];
          return completionDate;
      } else {
          return null;
      }
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

      const achievementsWithDate = await Promise.all(completedAchievements.map(async achievement => {
        let date = await this.getAchievementCompletionDate(userId, achievement.id);
        return { ...achievement, date };
    }));

      return achievementsWithDate;
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
        if (achievement.time_required_s !== null){
          if(achievement.steps_required <= await this.findFastestTimeSteps(userId, achievement.time_required_s)){
            isCompleted = true;
          }
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

    async findFastestTimeSteps(userId: number, timeRequiredSec: number){
      const activityEntries = await this.prisma.activityEntry.findMany({
        where: {
          user: { id: userId },
        },
        orderBy: {
          start_time: 'asc',
        },
      });

      var mostSteps = 0;

      const timeIntervalCount = timeRequiredSec / 10;
      if(activityEntries.length <= timeIntervalCount){
        let accumulatedSteps = 0;
        for(let i = 0; i < activityEntries.length; i++){
          accumulatedSteps += activityEntries[i].steps;
        }
        return accumulatedSteps;
      }
      for(let i = 0; i < activityEntries.length - timeIntervalCount; i++){
        let accumulatedSteps = 0;
        for(let j = 0; j < timeIntervalCount; j++){
          let index = i + j;
          accumulatedSteps += activityEntries[index].steps;
        }
        if(accumulatedSteps > mostSteps){
          mostSteps = accumulatedSteps;
        }
        accumulatedSteps = 0;
      }
      //console.log(mostSteps);

      return mostSteps;

    }

    /*
    async findFastestTime(userId: number, stepCount: number){
      const activityEntries = await this.prisma.activityEntry.findMany({
        where: {
          user: { id: userId },
        },
        orderBy: {
          start_time: 'asc',
        },
      });

      var fastestTime = Infinity;

      for(let i = 0; i < activityEntries.length; i++){
        let accumulatedSteps = 0;
        let timePassed = 0;
        for(let j = i; j < activityEntries.length; j++){
          accumulatedSteps += activityEntries[j].steps;
          timePassed += activityEntries[j].end_time.getTime() - activityEntries[j].start_time.getTime();
          if(timePassed < fastestTime && accumulatedSteps >= stepCount){
            fastestTime = timePassed;
            accumulatedSteps = 0;
            timePassed = 0;
          }

          if(timePassed >= fastestTime){
            accumulatedSteps = 0;
            timePassed = 0;
          }
        }
      }
      return fastestTime === Infinity ? 0 : fastestTime;

    }
    */

}
