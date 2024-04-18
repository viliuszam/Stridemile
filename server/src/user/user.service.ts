import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from '.prisma/client';
import { ActivityService } from 'src/activity/activity.service';


@Injectable()
export class UserService {
//private activityService: ActivityService,
    constructor(private prisma: PrismaService) {
    }

    // TODO: fix dep injection and add step count
    async getUserPopupInfo(userId: number, requestingUserId: number): Promise<any> {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          completedAchievements: {
            include: { achievement: true },
          },
          groupMembers: true, // Include all group memberships
        },
      });
    
      const requestingUserGroups = await this.prisma.groupMember.findMany({
        where: { userId: requestingUserId },
        select: { groupId: true }, // Select only the groupId
      });
    
      const commonGroupIds = user.groupMembers
        .filter(member => requestingUserGroups.some(reqMember => reqMember.groupId === member.groupId))
        .map(member => member.groupId);
    
      const commonGroups = await this.prisma.group.findMany({
        where: { id: { in: commonGroupIds } },
        select: { name: true }, // Select only the group name
      });
    
      const accountAge = this.calculateAccountAge(user.registration_date);
      //const { totalSteps } = await this.activityService.getUserActivitySummary(userId);
    
      return {
        username: user.username,
        accountAge,
        groupsInCommon: commonGroups.map(group => group.name),
        profilePicture: user.profile_picture,
        completedAchievements: user.completedAchievements.map(entry => entry.achievement.title),
        //totalSteps,
      };
    }

    private calculateAccountAge(registrationDate: Date): string {
      const now = new Date();
      const diffMilliseconds = now.getTime() - registrationDate.getTime();
      const diffSeconds = Math.floor(diffMilliseconds / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);
    
      if (diffDays === 0) {
        return "Account was made today";
      } else if (diffDays < 30) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} old`;
      } else if (diffMonths < 12) {
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} old`;
      } else {
        const remainingMonths = diffMonths % 12;
        return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'} old`;
      }
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
