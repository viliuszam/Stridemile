import { Body, Controller, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
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
}