import { Module } from '@nestjs/common';
import { GroupVisibilityController } from './group-visibility.controller';
import { GroupVisibilityService } from './group-visibility.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [GroupVisibilityController],
  providers: [GroupVisibilityService, PrismaService],
})
export class GroupVisibilityModule {}
