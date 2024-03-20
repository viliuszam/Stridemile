import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class RewardService {

    constructor(private prisma: PrismaService) {

    }
    
    async UpdateRewards(userId: number, userPoints: number){
      const colourRewards = await this.prisma.colourReward.findMany();
      let changed = false;
      for(const reward of colourRewards){
        if(userPoints >= reward.pointsRequired && !this.UserHasReward(userId, reward.id)){
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
            console.error(`Error updating reward ${reward.id} for user ${userId}:`, error);
          }
        }
      }
      return changed;
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
      

  
}
