import { Controller, Get } from '@nestjs/common';
import { StatusOptionsService } from './status-options.service';

@Controller('status-options')
export class StatusOptionsController {
  constructor(private readonly statusService: StatusOptionsService) {}

  @Get()
  async getGoalStatusOptions() {
    return this.statusService.getGoalStatusOptions();
  }

}
