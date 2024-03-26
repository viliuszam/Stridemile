import { Module } from '@nestjs/common';
import { HealthTrackingService } from './health-tracking.service';
import { HealthTrackingController } from './health-tracking.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../group/strategy";
import { UserService } from 'src/user/user.service';

@Module({
  imports: [JwtModule.register({}), AuthModule],
  controllers: [HealthTrackingController],
  providers: [HealthTrackingService, PrismaService, JwtStrategy, UserService],
})
export class HealthTrackingModule {}
