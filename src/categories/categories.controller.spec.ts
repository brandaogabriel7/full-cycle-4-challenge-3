import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('AppController', () => {
  let categoriesController: CategoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService]
    }).compile();

    categoriesController = app.get(CategoriesController);
  });

  describe('root', () => {
    it('should return all categories', () => {
      expect(categoriesController.getCategories()).toBe([
        { name: 'This endpoint return all categories' }
      ]);
    });
  });
});
