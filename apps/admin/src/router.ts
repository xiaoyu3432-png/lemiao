import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from './views/DashboardView.vue';
import CoursesView from './views/CoursesView.vue';

export default createRouter({ history: createWebHistory(), routes: [
  { path: '/', component: DashboardView, meta: { title: '工作台' } },
  { path: '/courses', component: CoursesView, meta: { title: '课程示例' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
] });
