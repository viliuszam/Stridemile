import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, PrismaModule, ActivityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
