import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  const config = new DocumentBuilder().setTitle('乐秒开发接口').setVersion('0.1.0')
    .setDescription('本阶段仅提供健康检查和只读课程演示，无账号、交易或管理写操作。').build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
}
