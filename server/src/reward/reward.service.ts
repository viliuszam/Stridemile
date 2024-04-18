import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class RewardService {

    constructor(private prisma: PrismaService) {

    }
    
    async UpdateRewards(userId: number, userPoints: number){
      const colourRewards = await this.prisma.colourReward.findMany();
      const emojiRewards = await this.prisma.emojiReward.findMany();
      let changed = false;
      for(const reward of colourRewards){
        let hasReward = await this.UserHasReward(userId, reward.id)
        if(userPoints >= reward.pointsRequired && !hasReward){
          try {
            await this.prisma.colourRewardsOnUsers.create({
              data: {
                userId: userId,
                colourRewardId: reward.id,
              }
            });
            changed = true
          }
          catch (error) {
            if (error.code === 'P2002') {

            } else {
              throw error;
            }
          }
        }
      }
      for(const reward of emojiRewards){
        let hasReward = await this.UserHasEmojiReward(userId, reward.id)
        if(userPoints >= reward.pointsRequired && !hasReward){
          try {
            await this.prisma.emojiRewardsOnUsers.create({
              data: {
                userId: userId,
                emojiRewardId: reward.id,
              }
            });
            changed = true
          }
          catch (error) {
            if (error.code === 'P2002') {

            } else {
              throw error;
            }
          }
        }
      }
      return changed;
    }

    async ApplyCustomisation(userId: number, hexColour: string, emoji: string){
      try {
        const updatedUser = await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            colourHex: hexColour,
            emoji: emoji
          },
        });
        return updatedUser;
      } catch (error) {
        throw new Error('Failed to update user hex colour.');
      }

    }

    async UserHasReward(userId: number, rewardId: number){
      const reward = await this.prisma.colourRewardsOnUsers.findUnique({
        where: {
            userId_colourRewardId: {
                userId: userId,
                colourRewardId: rewardId
            }
        }
      });

      return reward !== null;
    }

    async UserHasEmojiReward(userId: number, rewardId: number){
      const reward = await this.prisma.emojiRewardsOnUsers.findUnique({
        where: {
            userId_emojiRewardId: {
                userId: userId,
                emojiRewardId: rewardId
            }
        }
      });

      return reward !== null;
    }

    async UserColours(userId: number){
      const colours = await this.prisma.colourRewardsOnUsers.findMany({
        where: {
          userId: userId,
        },
        include: {
          colourReward: true,
        },
      });
  
      return colours.map((cr) => ({
        hex: cr.colourReward.colourHex,
        name: cr.colourReward.colourName
      }));
    }

    async UserEmojies(userId: number){
      const emojies = await this.prisma.emojiRewardsOnUsers.findMany({
        where: {
          userId: userId,
        },
        include: {
          emojiReward: true,
        },
      });
  
      return emojies.map((cr) => ({
        emoji: cr.emojiReward.emoji
      }));
    }
      

  
}
