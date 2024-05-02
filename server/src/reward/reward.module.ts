import { Module } from "@nestjs/common";
import { RewardController } from "./reward.controller";
import { RewardService } from "./reward.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AchievementService } from "src/achievement/achievement.service";
import { ActivityService } from "src/activity/activity.service";
import { GroupService } from "src/group/group.service";
import { MailService } from "src/group/mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Module({
    imports: [PrismaModule],
    controllers: [RewardController],
    providers: [RewardService, AchievementService, ActivityService, GroupService, MailService, JwtService, UserService]
})
export class RewardModule {

}