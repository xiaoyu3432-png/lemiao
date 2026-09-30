import { createApp, h } from 'vue';
import { ElButton, ElConfigProvider, ElEmpty, ElSkeleton, ElTable, ElTableColumn } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/empty/style/css';
import 'element-plus/es/components/skeleton/style/css';
import 'element-plus/es/components/table/style/css';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp({ render: () => h(ElConfigProvider, { locale: zhCn }, () => h(App)) });
app.use(router).use(ElButton).use(ElEmpty).use(ElSkeleton).use(ElTable).use(ElTableColumn).mount('#app');
