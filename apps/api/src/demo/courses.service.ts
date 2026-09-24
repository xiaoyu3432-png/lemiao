import { Injectable, NotFoundException } from '@nestjs/common';
import type { DemoCourse } from '@lemiao/contracts';

@Injectable()
export class CoursesService {
  private readonly courses: DemoCourse[] = [
    {
      id: 'demo-basketball', name: '篮球基础训练', category: '篮球', teachingMode: 'group',
      minAge: 6, maxAge: 12, durationMinutes: 60, priceCents: 7900,
      description: '从运球、传球到基础投篮，通过小组练习认识篮球。此内容为开发演示，不代表可购买课程。'
    },
    {
      id: 'demo-fitness', name: '儿童体适能', category: '体适能', teachingMode: 'group',
      minAge: 4, maxAge: 8, durationMinutes: 60, priceCents: 4990,
      description: '通过跑跳、平衡和协调练习，体验运动的乐趣。此内容为开发演示，不提供报名或支付。'
    },
    {
      id: 'demo-rope', name: '跳绳一对一', category: '跳绳', teachingMode: 'private',
      minAge: 6, maxAge: 14, durationMinutes: 45, priceCents: 12800,
      description: '认识基础跳绳节奏与动作，循序渐进练习协调性。此内容为开发演示，尚未接入真实教练与排期。'
    }
  ];

  list(): DemoCourse[] { return this.courses; }
  find(id: string): DemoCourse {
    const course = this.courses.find(item => item.id === id);
    if (!course) throw new NotFoundException('课程不存在或已移除');
    return course;
  }
}
