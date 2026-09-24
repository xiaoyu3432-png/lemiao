<script setup lang="ts">
import type { DemoCourse } from '@lemiao/contracts';
import { get } from '../api';
import { useResource } from '../composables/useResource';
const { data, loading, error, reload } = useResource(() => get<DemoCourse[]>('/demo/courses'));
const price = (cents: number) => `¥${(cents / 100).toFixed(2)}`;
</script>

<template>
  <section>
    <div class="page-heading"><div><h1>课程示例</h1><p>与小程序首页共用数据，当前只支持查看。</p></div><ElButton :loading="loading" @click="reload">刷新列表</ElButton></div>
    <div class="table-panel" aria-live="polite">
      <div class="section-heading"><h2>全部课程 <span v-if="data" class="count">{{ data.length }}</span></h2><span class="demo-badge">演示数据</span></div>
      <ElSkeleton v-if="loading" :rows="6" animated />
      <div v-else-if="error" class="error-state" role="alert"><h3>课程加载失败</h3><p>{{ error }}</p><ElButton type="primary" @click="reload">重试</ElButton></div>
      <ElEmpty v-else-if="!data?.length" description="暂无演示课程，请稍后刷新列表。" />
      <template v-else>
        <ElTable :data="data" row-key="id" style="width: 100%">
          <ElTableColumn label="课程" min-width="230"><template #default="{ row }"><div class="course-name">{{ row.name }}</div><div class="course-id">{{ row.id }}</div></template></ElTableColumn>
          <ElTableColumn prop="category" label="分类" min-width="95" />
          <ElTableColumn label="授课方式" min-width="110"><template #default="{ row }"><span class="mode-tag">{{ row.teachingMode === 'group' ? '小班团课' : '一对一' }}</span></template></ElTableColumn>
          <ElTableColumn label="适龄" min-width="100"><template #default="{ row }">{{ row.minAge }}–{{ row.maxAge }} 岁</template></ElTableColumn>
          <ElTableColumn label="时长" min-width="100"><template #default="{ row }">{{ row.durationMinutes }} 分钟</template></ElTableColumn>
          <ElTableColumn label="示例价格" min-width="110" align="right"><template #default="{ row }"><span class="price">{{ price(row.priceCents) }}</span></template></ElTableColumn>
        </ElTable>
        <p class="table-caption">显示 {{ data.length }} 门演示课程。价格由整数分换算展示，不提供购买或编辑。</p>
      </template>
    </div>
  </section>
</template>
