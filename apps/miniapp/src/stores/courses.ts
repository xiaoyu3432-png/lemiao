import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DemoCourse } from '@lemiao/contracts';
import { get } from '../api/request';

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref<DemoCourse[]>([]);
  const loading = ref(false);
  const error = ref('');
  let requestId = 0;
  async function load() {
    const current = ++requestId;
    loading.value = true; error.value = ''; courses.value = [];
    try { const result = await get<DemoCourse[]>('/demo/courses'); if (current === requestId) courses.value = result; }
    catch (cause) { if (current === requestId) error.value = cause instanceof Error ? cause.message : '加载失败，请重试。'; }
    finally { if (current === requestId) loading.value = false; }
  }
  return { courses, loading, error, load };
});
