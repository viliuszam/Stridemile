import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityEntry } from './dto/activitytrack.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async createActivityEntry(activityEntry: ActivityEntry, userId: number): Promise<ActivityEntry> {
    if (!userId) {
        // TODO: padaryt kad responsa mestu normalu tiesiog
        throw new Error('Invalid userId provided.');
      }
    return this.prisma.activityEntry.create({
      data: {
        user: { connect: { id: userId } },
        steps: activityEntry.steps,
        distance: activityEntry.distance,
        start_time: activityEntry.start_time,
        end_time: activityEntry.end_time,
      },
    });
  }
}