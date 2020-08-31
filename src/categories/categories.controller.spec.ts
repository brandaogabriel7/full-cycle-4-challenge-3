import { Test } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './dto/category.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CatsController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository
        }
      ]
    }).compile();

    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
    categoriesController = moduleRef.get<CategoriesController>(
      CategoriesController
    );
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [{ id: 1, name: 'test' }];
      jest
        .spyOn(categoriesService, 'findAll')
        .mockImplementation(async () => result);

      expect(await categoriesController.getCategories()).toBe(result);
    });
  });
});
