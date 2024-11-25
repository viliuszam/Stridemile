import { Controller, Get } from '@nestjs/common';
import { CategoryOptionsService } from './category-options.service';

@Controller('category-options')
export class CategoryOptionsController {
  constructor(private readonly categoryService: CategoryOptionsService) {}

  @Get("/event")
  async getEventVisibilityOptions() {
    return this.categoryService.getEventCategories();
  }

  @Get("/goal")
  async getGoalVisibilityOptions() {
    return this.categoryService.getGoalCategories();
  }
}
