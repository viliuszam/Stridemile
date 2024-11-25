import { Module } from '@nestjs/common';
import { CategoryOptionsController } from './category-options.controller';
import { CategoryOptionsService } from './category-options.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CategoryOptionsController],
  providers: [CategoryOptionsService, PrismaService],
})
export class CategoryOptionsModule {}
