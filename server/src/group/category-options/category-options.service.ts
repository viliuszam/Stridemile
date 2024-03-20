import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryOptionsService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.eventCategory.findMany();
  }
}
