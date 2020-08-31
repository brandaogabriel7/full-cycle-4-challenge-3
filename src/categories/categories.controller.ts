import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './dto/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  createCategory(@Body() category: Category): Promise<any> {
    return this.categoriesService.create(category);
  }
}
