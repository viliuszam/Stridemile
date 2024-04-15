import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from '.prisma/client';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    }

    async changeUsername(userId: number, newUsername: string): Promise<void> {
        const existingUser = await this.prisma.user.findUnique({
          where: { username: newUsername },
        });
    
        if (existingUser) {
          throw new Error('Username is already taken');
        }
    
        await this.prisma.user.update({
          where: { id: userId },
          data: { username: newUsername },
        });
    }

    async getTop10UsersByPoints() {
      const usersWithPoints = await this.prisma.user.findMany({
        select: {
          username: true,
          completedAchievements: {
            select: {
              achievement: {
                select: {
                  points: true,
                },
              },
              completedAt: true,
            },
          },
        },
      });
    
      const usersWithTotalPoints = usersWithPoints.map(user => {
        const totalPoints = user.completedAchievements.reduce((sum, achievement) => {
          return sum + achievement.achievement.points;
        }, 0);
        const lastAchievementDate = this.getLastAchievementDate(user.completedAchievements);
        return { username: user.username, points: totalPoints, lastAchievementDate };
      });
    
      usersWithTotalPoints.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
    
        return a.lastAchievementDate.getTime() - b.lastAchievementDate.getTime();
      });
    
      const topUsers = usersWithTotalPoints.slice(0, 10);
    
      return topUsers;
    }

    getLastAchievementDate(completedAchievements) {
      const completionDates = completedAchievements.map(achievement => new Date(achievement.completedAt));
      return new Date(Math.max(...completionDates));
    }
  
}

export { User };
