import { Module } from "@nestjs/common";
import { AchievementController } from "./achievement.controller";
import { AchievementService } from "./achievement.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ActivityService } from "src/activity/activity.service";
import { GroupService } from "src/group/group.service";
import { MailService } from "src/group/mail/mail.service";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";

@Module({
    imports: [PrismaModule],
    controllers: [AchievementController],
    providers: [AchievementService, ActivityService, GroupService, MailService, JwtService, UserService]
})
export class AchievementModule {

}