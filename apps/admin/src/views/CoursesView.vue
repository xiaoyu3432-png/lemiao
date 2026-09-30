<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DemoCourse } from '@lemiao/contracts';
import { get } from '../api';
import { useResource } from '../composables/useResource';
const { data, loading, error, reload } = useResource(() => get<DemoCourse[]>('/demo/courses'));
const price = (cents: number) => `¥${(cents / 100).toFixed(2)}`;
const query = ref('');
const category = ref('');
const mode = ref('');
const selectedId = ref('');
const dialogOpen = ref(false);
const categories = computed(() => [...new Set(data.value?.map(course => course.category) ?? [])]);
const filtered = computed(() => {
  const keyword = query.value.trim().toLocaleLowerCase();
  return (data.value ?? []).filter(course =>
    (!category.value || course.category === category.value) &&
    (!mode.value || course.teachingMode === mode.value) &&
    (!keyword || `${course.name} ${course.category} ${course.description}`.toLocaleLowerCase().includes(keyword))
  );
});
const selected = computed(() => data.value?.find(course => course.id === selectedId.value));
function resetFilters() { query.value = ''; category.value = ''; mode.value = ''; }
function viewCourse(course: DemoCourse) { selectedId.value = course.id; dialogOpen.value = true; }
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
        <div class="course-filters">
          <label>搜索课程<ElInput v-model="query" placeholder="课程名称、项目或介绍" clearable maxlength="80" aria-label="搜索课程" /></label>
          <label>运动项目<ElSelect v-model="category" placeholder="全部项目" clearable aria-label="运动项目"><ElOption v-for="item in categories" :key="item" :label="item" :value="item" /></ElSelect></label>
          <label>授课方式<ElSelect v-model="mode" placeholder="全部方式" clearable aria-label="授课方式"><ElOption label="小班团课" value="group" /><ElOption label="一对一" value="private" /></ElSelect></label>
          <ElButton @click="resetFilters">清空筛选</ElButton>
        </div>
        <p class="filter-summary" role="status">当前显示 {{ filtered.length }} / {{ data.length }} 门课程</p>
        <ElEmpty v-if="!filtered.length" description="没有符合筛选条件的课程"><ElButton @click="resetFilters">查看全部课程</ElButton></ElEmpty>
        <ElTable v-else :data="filtered" row-key="id" style="width: 100%">
          <ElTableColumn label="课程" min-width="230"><template #default="{ row }"><div class="course-name">{{ row.name }}</div><div class="course-id">{{ row.id }}</div></template></ElTableColumn>
          <ElTableColumn prop="category" label="分类" min-width="95" />
          <ElTableColumn label="授课方式" min-width="110"><template #default="{ row }"><span class="mode-tag">{{ row.teachingMode === 'group' ? '小班团课' : '一对一' }}</span></template></ElTableColumn>
          <ElTableColumn label="适龄" min-width="100"><template #default="{ row }">{{ row.minAge }}–{{ row.maxAge }} 岁</template></ElTableColumn>
          <ElTableColumn label="时长" min-width="100"><template #default="{ row }">{{ row.durationMinutes }} 分钟</template></ElTableColumn>
          <ElTableColumn label="示例价格" min-width="110" align="right"><template #default="{ row }"><span class="price">{{ price(row.priceCents) }}</span></template></ElTableColumn>
          <ElTableColumn label="详情" width="100"><template #default="{ row }"><ElButton link type="primary" :aria-label="'查看' + row.name" @click="viewCourse(row)">查看详情</ElButton></template></ElTableColumn>
        </ElTable>
        <p class="table-caption">显示 {{ data.length }} 门演示课程。价格由整数分换算展示，不提供购买或编辑。</p>
      </template>
    </div>
    <ElDialog v-model="dialogOpen" title="课程详情" width="min(620px, calc(100vw - 32px))" :close-on-click-modal="false">
      <template v-if="selected">
        <span class="demo-badge">与小程序共用的演示课程</span>
        <h2 class="course-detail-title">{{ selected.name }}</h2>
        <dl class="status-list">
          <div><dt>运动项目</dt><dd>{{ selected.category }}</dd></div>
          <div><dt>授课方式</dt><dd>{{ selected.teachingMode === 'group' ? '小班团课' : '一对一' }}</dd></div>
          <div><dt>适合年龄</dt><dd>{{ selected.minAge }}–{{ selected.maxAge }} 岁</dd></div>
          <div><dt>课程时长</dt><dd>{{ selected.durationMinutes }} 分钟</dd></div>
          <div><dt>示例价格</dt><dd class="price">{{ price(selected.priceCents) }} / 节</dd></div>
        </dl>
        <p class="course-description">{{ selected.description }}</p>
        <p class="table-caption">这是只读课程展示，预约、支付与课程编辑尚未接入。</p>
      </template>
      <p v-else>课程数据正在刷新或已不可用，请关闭后重新选择。</p>
      <template #footer><ElButton @click="dialogOpen = false">关闭详情</ElButton></template>
    </ElDialog>
  </section>
</template>
