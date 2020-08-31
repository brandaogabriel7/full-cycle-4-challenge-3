import { Injectable, Inject } from '@nestjs/common';
import { Category } from './dto/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async create(category: Category) {
    return await this.categoryRepository.save(category);
  }
}
