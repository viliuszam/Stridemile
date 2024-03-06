import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  // nezinau kiek cia ju pridet reikia tbh
  imports: [AuthModule], 
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
})
export class ActivityModule {}