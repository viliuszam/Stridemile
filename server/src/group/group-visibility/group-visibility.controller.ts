import { Controller, Get } from '@nestjs/common';
import { GroupVisibilityService } from './group-visibility.service';

@Controller('visibility-options')
export class GroupVisibilityController {
  constructor(private readonly visibilityService: GroupVisibilityService) {}

  @Get()
  async getVisibilityOptions() {
    return this.visibilityService.getVisibilityOptions();
  }
}
