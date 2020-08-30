import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoriesModule } from './../../src/categories/categories.module';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const expectedCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
    { id: 6, name: 'Category 6' },
    { id: 7, name: 'Category 7' },
    { id: 8, name: 'Category 8' },
    { id: 9, name: 'Category 9' },
    { id: 10, name: 'Category 10' }
  ];

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .expect(expectedCategories);
  });
});
