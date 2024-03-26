import { Module } from '@nestjs/common';
import { StatusOptionsController } from './status-options.controller';
import { StatusOptionsService } from './status-options.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [StatusOptionsController],
  providers: [StatusOptionsService, PrismaService],
})
export class StatusOptionsModule {}
