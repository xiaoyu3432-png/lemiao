import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { ApiResponse, DemoCourse } from '@lemiao/contracts';
import { CoursesService } from './courses.service';
import { CourseListResponseDto, CourseResponseDto } from './course.dto';

@ApiTags('开发演示课程')
@Controller('demo/courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  @ApiOperation({ summary: '读取服务端演示课程，不查询业务数据库' })
  @ApiOkResponse({ type: CourseListResponseDto })
  list(): ApiResponse<DemoCourse[]> { return { data: this.courses.list() }; }

  @Get(':id')
  @ApiOkResponse({ type: CourseResponseDto })
  @ApiNotFoundResponse({ description: '课程不存在或已移除' })
  detail(@Param('id') id: string): ApiResponse<DemoCourse> { return { data: this.courses.find(id) }; }
}
