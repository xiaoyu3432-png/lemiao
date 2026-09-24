import type { ApiResponse } from '@lemiao/contracts';

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

let base = import.meta.env.VITE_API_BASE_URL || '/api';
// #ifdef MP-WEIXIN
base = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api';
// #endif
base = base.replace(/\/$/, '');

export function get<T>(path: string): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${base}${path}`, method: 'GET', timeout: 8000,
      success(response) {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          const body = response.data as unknown;
          const apiNotFound = response.statusCode === 404 && typeof body === 'object' && body !== null && 'statusCode' in body && body.statusCode === 404;
          reject(new ApiError(apiNotFound ? '这门课程不存在或已移除。' : '服务接口暂不可用，请检查服务端后重试。', apiNotFound ? 404 : response.statusCode === 404 ? 502 : response.statusCode));
          return;
        }
        const body = response.data as unknown as ApiResponse<T>;
        if (!body || typeof body !== 'object' || !('data' in body)) { reject(new ApiError('课程数据暂时不可用，请重试。', 0)); return; }
        resolve(body.data);
      },
      fail() { reject(new ApiError('连接失败，请检查网络或确认服务端已启动。', 0)); }
    });
  });
}
