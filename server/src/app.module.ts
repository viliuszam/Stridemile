import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { GroupModule } from './group/group.module'; 
import { GroupVisibilityModule } from './group/group-visibility/group-visibility.module'; 
import { CategoryOptionsModule } from './group/category-options/category-options.module'; 
import { StatusOptionsModule } from './group/status-options/status-options.module'; 
import { AchievementModule } from './achievement/achievement.module';
import { RewardModule } from './reward/reward.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, PrismaModule, ActivityModule, GroupModule, GroupVisibilityModule, AchievementModule, CategoryOptionsModule, StatusOptionsModule, RewardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
