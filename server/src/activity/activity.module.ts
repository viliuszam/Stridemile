import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GroupService } from 'src/group/group.service';
import { MailService } from 'src/group/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  // nezinau kiek cia ju pridet reikia tbh
  imports: [AuthModule], 
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService, GroupService, MailService, JwtService, UserService],
})
export class ActivityModule {}