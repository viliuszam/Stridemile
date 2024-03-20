import { Controller, Get } from '@nestjs/common';
import { CategoryOptionsService } from './category-options.service';

@Controller('category-options')
export class CategoryOptionsController {
  constructor(private readonly categoryService: CategoryOptionsService) {}

  @Get()
  async getVisibilityOptions() {
    return this.categoryService.getCategories();
  }
}
