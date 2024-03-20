import { Module } from "@nestjs/common";
import { RewardController } from "./reward.controller";
import { RewardService } from "./reward.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AchievementService } from "src/achievement/achievement.service";

@Module({
    imports: [PrismaModule],
    controllers: [RewardController],
    providers: [RewardService, AchievementService]
})
export class RewardModule{

}