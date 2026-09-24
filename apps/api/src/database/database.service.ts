import { Injectable, Logger, OnApplicationShutdown, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import type { HealthStatus } from '@lemiao/contracts';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private source?: DataSource;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    if (!this.config.get<boolean>('DATABASE_CONFIGURED')) return;
    this.source = new DataSource({
      type: 'mysql', host: this.config.getOrThrow<string>('MYSQL_HOST'),
      port: this.config.getOrThrow<number>('MYSQL_PORT'),
      username: this.config.getOrThrow<string>('MYSQL_USER'),
      password: this.config.get<string>('MYSQL_PASSWORD') ?? '',
      database: this.config.getOrThrow<string>('MYSQL_DATABASE'),
      entities: [], synchronize: false, migrationsRun: false, logging: false, connectTimeout: 5000,
      extra: { connectionLimit: 2 }, charset: 'utf8mb4'
    });
    try {
      await this.source.initialize();
    } catch {
      // Do not print a connection URL or password, and never silently fall back.
      throw new Error('MySQL connection failed. Check MYSQL_* configuration and database availability. No fallback was used.');
    }
  }

  async getStatus(): Promise<HealthStatus['database']> {
    if (!this.source) return 'not_configured';
    try {
      await this.source.query('SELECT 1');
      return 'connected';
    } catch {
      this.logger.error('MySQL health check failed');
      throw new ServiceUnavailableException('数据库连接不可用，请检查服务端配置');
    }
  }

  async onApplicationShutdown() {
    if (this.source?.isInitialized) await this.source.destroy();
  }
}
