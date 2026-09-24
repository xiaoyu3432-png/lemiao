import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

export function useResource<T>(loader: () => Promise<T>) {
  const data = shallowRef<T>();
  const loading = ref(false);
  const error = ref('');
  let revision = 0;
  async function reload() {
    const current = ++revision;
    loading.value = true;
    error.value = '';
    data.value = undefined;
    try { const value = await loader(); if (current === revision) data.value = value; }
    catch (cause) { if (current === revision) error.value = cause instanceof Error ? cause.message : '加载失败，请重试。'; }
    finally { if (current === revision) loading.value = false; }
  }
  onMounted(reload);
  onBeforeUnmount(() => { revision++; });
  return { data, loading, error, reload };
}
