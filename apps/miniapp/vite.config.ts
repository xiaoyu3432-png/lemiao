import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// Official dcloudio/uni-preset-vue vite-ts compiler setup; keep compiler versions aligned.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return { plugins: [uni()], server: { port: 5174, strictPort: true, proxy: {
    '/api': { target: env.API_PROXY_TARGET || 'http://127.0.0.1:3000', changeOrigin: true }
  } } };
});
