import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';
import type { ApiResponse, HealthStatus } from '@lemiao/contracts';
import { DatabaseService } from '../database/database.service';

class HealthDto implements HealthStatus {
  @ApiProperty({ enum: ['ok'] }) status!: 'ok';
  @ApiProperty({ example: 'lemiao-api' }) service!: 'lemiao-api';
  @ApiProperty({ enum: ['not_configured', 'connected'] }) database!: HealthStatus['database'];
  @ApiProperty({ enum: ['demo'], description: '演示课程始终是显式演示数据，与数据库状态无关' }) dataSource!: 'demo';
}
class HealthResponseDto {
  @ApiProperty({ type: HealthDto }) data!: HealthDto;
}

@ApiTags('服务状态')
@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}
  @Get()
  @ApiOkResponse({ type: HealthResponseDto })
  @ApiServiceUnavailableResponse({ description: '已配置数据库但连接不可用' })
  async health(): Promise<ApiResponse<HealthStatus>> {
    return { data: { status: 'ok', service: 'lemiao-api', database: await this.database.getStatus(), dataSource: 'demo' } };
  }
}
