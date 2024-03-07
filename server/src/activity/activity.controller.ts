import { Body, Controller, Post, Get, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivityEntry } from './dto/activitytrack.dto';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('track')
  async trackActivity(@Body() activityEntry: ActivityEntry, @Request() req): Promise<ActivityEntry> {
    const userId = req.user.id;
    console.log(activityEntry);
    return this.activityService.createActivityEntry(activityEntry, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('summary')
  async getUserActivitySummary(@Request() req): Promise<{
    totalSteps: number;
    totalDistance: number;
    totalTimeSpent: number;
  }> {
    const userId = req.user.id;
    return this.activityService.getUserActivitySummary(userId);
  }
  
}