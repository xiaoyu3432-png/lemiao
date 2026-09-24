import type { ApiResponse } from '@lemiao/contracts';

const base = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export async function get<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${base}${path}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`服务暂不可用（HTTP ${response.status}），请确认服务端正在运行。`);
    const body = await response.json() as ApiResponse<T>;
    if (!body || typeof body !== 'object' || !('data' in body)) throw new Error('服务返回的数据格式不正确，请检查接口地址。');
    return body.data;
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error('服务返回的数据格式不正确，请检查接口地址。');
    if (error instanceof Error && error.name === 'AbortError') throw new Error('请求超时，请检查服务端后重试。');
    if (error instanceof TypeError) throw new Error('无法连接服务端，请检查网络连接后重试。');
    throw error;
  } finally { clearTimeout(timer); }
}
