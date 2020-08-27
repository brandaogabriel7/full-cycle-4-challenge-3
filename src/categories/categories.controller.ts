import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './dto/category.interface';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get()
    getCategories(): Category[] {
        return this.categoriesService.getAllCategories();
    }
}