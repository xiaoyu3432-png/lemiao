import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DemoModule } from '../src/demo/demo.module';
import { DatabaseModule } from '../src/database/database.module';
import { HealthController } from '../src/health/health.controller';
import { setupApp } from '../src/setup';
import { validateEnvironment } from '../src/config/environment';

describe('HTTP demo contract without database', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true, ignoreEnvVars: true, load: [() => ({ DATABASE_CONFIGURED: false })] }), DatabaseModule, DemoModule],
      controllers: [HealthController]
    }).compile();
    app = module.createNestApplication();
    setupApp(app);
    await app.init();
  });
  afterAll(async () => { await app.close(); });

  it('reports not configured without a database', async () => {
    const response = await request(app.getHttpServer()).get('/api/health').expect(200);
    expect(response.body.data).toEqual({ status: 'ok', service: 'lemiao-api', database: 'not_configured', dataSource: 'demo' });
  });
  it('serves a list whose detail uses exactly the same data and integer prices', async () => {
    const response = await request(app.getHttpServer()).get('/api/demo/courses').expect(200);
    expect(response.body.data).toHaveLength(3);
    for (const course of response.body.data) {
      expect(Number.isInteger(course.priceCents)).toBe(true);
      const detail = await request(app.getHttpServer()).get(`/api/demo/courses/${course.id}`).expect(200);
      expect(detail.body.data).toEqual(course);
    }
  });
  it('returns HTTP 404 for an unknown course', async () => {
    const response = await request(app.getHttpServer()).get('/api/demo/courses/missing').expect(404);
    expect(response.body.message).toBe('课程不存在或已移除');
  });
  it('publishes the three demo endpoints in OpenAPI', async () => {
    const response = await request(app.getHttpServer()).get('/api/docs-json').expect(200);
    expect(Object.keys(response.body.paths).sort()).toEqual(['/api/demo/courses', '/api/demo/courses/{id}', '/api/health']);
  });
});

describe('environment validation', () => {
  it('allows a completely unconfigured database', () => expect(validateEnvironment({}).DATABASE_CONFIGURED).toBe(false));
  it('rejects partial database configuration instead of falling back', () => {
    expect(() => validateEnvironment({ MYSQL_HOST: '127.0.0.1' })).toThrow('MYSQL_DATABASE');
  });
  it('validates port bounds', () => expect(() => validateEnvironment({ PORT: 'abc' })).toThrow('PORT'));
});
