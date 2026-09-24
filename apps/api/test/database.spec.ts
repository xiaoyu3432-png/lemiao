import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DatabaseService } from '../src/database/database.service';

describe('database failure behavior', () => {
  afterEach(() => jest.restoreAllMocks());

  it('does not create a connection when unconfigured', async () => {
    const initialize = jest.spyOn(DataSource.prototype, 'initialize');
    const service = new DatabaseService(new ConfigService({ DATABASE_CONFIGURED: false }));
    await service.onModuleInit();
    expect(initialize).not.toHaveBeenCalled();
    expect(await service.getStatus()).toBe('not_configured');
  });

  it('rejects failed connections without leaking credentials or falling back', async () => {
    jest.spyOn(DataSource.prototype, 'initialize').mockRejectedValue(new Error('driver message includes secret'));
    const service = new DatabaseService(new ConfigService({
      DATABASE_CONFIGURED: true, MYSQL_HOST: '127.0.0.1', MYSQL_PORT: 3306,
      MYSQL_DATABASE: 'test_only', MYSQL_USER: 'test_only', MYSQL_PASSWORD: 'never_log'
    }));
    await expect(service.onModuleInit()).rejects.toThrow('No fallback was used.');
  });
});
