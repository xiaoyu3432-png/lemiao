import { ApiProperty } from '@nestjs/swagger';
import type { DemoCourse } from '@lemiao/contracts';

export class CourseDto implements DemoCourse {
  @ApiProperty({ example: 'demo-basketball' }) id!: string;
  @ApiProperty({ example: '篮球基础训练' }) name!: string;
  @ApiProperty({ example: '篮球' }) category!: string;
  @ApiProperty({ enum: ['group', 'private'] }) teachingMode!: 'group' | 'private';
  @ApiProperty({ example: 6 }) minAge!: number;
  @ApiProperty({ example: 12 }) maxAge!: number;
  @ApiProperty({ example: 60 }) durationMinutes!: number;
  @ApiProperty({ description: '整数分', example: 7900 }) priceCents!: number;
  @ApiProperty({ example: '开发演示课程' }) description!: string;
}
export class CourseListResponseDto {
  @ApiProperty({ type: [CourseDto] }) data!: CourseDto[];
}
export class CourseResponseDto {
  @ApiProperty({ type: CourseDto }) data!: CourseDto;
}
