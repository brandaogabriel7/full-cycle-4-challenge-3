import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CategoriesModule } from '../../src/categories/categories.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../src/categories/dto/category.entity';

describe('Categories', () => {
  let app: INestApplication;
  let categoriesRepository: Repository<Category>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test_db',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true
        })
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    categoriesRepository = await moduleRef.get(getRepositoryToken(Category));
  });

  it(`/GET categories`, async () => {
    const result = [{ id: 1, name: 'Category 1' }];
    await categoriesRepository.save(result);

    request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .expect(result);
  });

  it('POST categories', async done => {
    request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category 1' })
      .expect('Content-type', /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  afterEach(async () => {
    await categoriesRepository.query('DELETE from category');
  });
  afterAll(async () => {
    await app.close();
  });
});
