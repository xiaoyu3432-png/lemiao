<script setup lang="ts">
import type { HealthStatus } from '@lemiao/contracts';
import { get } from '../api';
import { useResource } from '../composables/useResource';
const { data, loading, error, reload } = useResource(() => get<HealthStatus>('/health'));
</script>

<template>
  <section>
    <div class="page-heading"><div><h1>工作台</h1><p>从课程开始，连接小程序与服务端。</p></div><ElButton :loading="loading" @click="reload">刷新状态</ElButton></div>
    <section class="service-panel" aria-labelledby="service-title" aria-live="polite">
      <div class="section-heading"><h2 id="service-title">服务连接</h2><span class="subtle">本地开发环境</span></div>
      <ElSkeleton v-if="loading" :rows="3" animated />
      <div v-else-if="error" class="error-state" role="alert"><h3>暂时无法读取服务状态</h3><p>{{ error }}</p><ElButton type="primary" @click="reload">重新连接</ElButton></div>
      <template v-else-if="data">
        <div class="connection-summary"><span class="connection-icon">✓</span><div><h3>服务端连接正常</h3><p>小程序与后台通过同一服务读取课程演示数据。</p></div></div>
        <dl class="status-list"><div><dt>服务名称</dt><dd>{{ data.service }}</dd></div><div><dt>MySQL</dt><dd>{{ data.database === 'connected' ? '已连接' : '未配置' }}<small v-if="data.database === 'not_configured'">不影响当前演示</small></dd></div><div><dt>课程数据</dt><dd>服务端演示数据<small>非数据库业务记录</small></dd></div></dl>
      </template>
    </section>
    <section class="next-step"><div><span class="section-kicker">当前可用</span><h2>查看三端共用的课程</h2><p>课程名称、适龄、时长与价格均来自服务端。小程序首页展示相同内容。</p><RouterLink to="/courses" class="primary-link">打开课程示例 <span aria-hidden="true">→</span></RouterLink></div><div class="scope-note"><h3>本次交付范围</h3><ul><li>三端运行与构建配置</li><li>只读课程列表和详情</li><li>请求异常提示与重试</li></ul><p>账号、预约、支付与业务管理将在后续阶段接入。</p></div></section>
  </section>
</template>
