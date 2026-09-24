<script setup lang="ts">
import { computed } from 'vue';
import type { DemoCourse } from '@lemiao/contracts';
const props = defineProps<{ course: DemoCourse }>();
const illustrations: Record<string,string> = { '篮球':'basketball-2d', '体适能':'fitness-2d', '跳绳':'rope-2d' };
const cover = computed(() => '/static/brand/' + (illustrations[props.course.category] || 'equipment') + '.jpg');
const price = computed(() => (props.course.priceCents / 100).toFixed(2).replace(/\.00$/, ''));
function open() { uni.navigateTo({ url: '/pages/course/detail?id=' + encodeURIComponent(props.course.id) }); }
</script>
<template>
  <button class="home-course-row" :aria-label="'查看' + course.name + '详情'" @click="open">
    <image class="row-cover" :src="cover" mode="aspectFill" :alt="course.category + '原创2D插画'" />
    <view class="row-content">
      <text class="row-title">{{ course.name }}</text>
      <view class="row-tags"><text>{{ course.category }}</text><text>{{ course.teachingMode === 'group' ? '小班团课' : '一对一' }}</text></view>
      <text class="row-meta">{{ course.minAge }}–{{ course.maxAge }}岁 · {{ course.durationMinutes }}分钟</text>
      <view class="row-bottom"><view class="row-price"><text class="currency">¥</text><text>{{ price }}</text><text class="price-label">示例价</text></view><text class="row-action">详情</text></view>
    </view>
  </button>
</template>
<style scoped lang="scss">
.home-course-row { display:flex; gap:10px; align-items:center; width:100%; background:transparent; padding:13px 0; border-radius:0; border-bottom:1px solid #e8ece7; line-height:1.5; text-align:left; }
.home-course-row:active { background:#f4f6f0; }
.row-cover { width:76px; height:100px; flex:none; border-radius:8px; background:#f3eddf; }
.row-content { min-width:0; flex:1; }
.row-title { display:block; font-size:14px; line-height:1.5; font-weight:750; color:#202624; }
.row-tags { display:flex; flex-wrap:wrap; gap:4px; margin:5px 0; }
.row-tags text { font-size:12px; line-height:1.5; padding:1px 4px; color:#3d624a; background:#edf3e9; border-radius:3px; }
.row-tags text+text { color:#6a513a; background:#f7f0e8; }
.row-meta { display:block; font-size:12px; color:#677168; }
.row-bottom { display:flex; gap:4px; align-items:center; justify-content:space-between; margin-top:7px; }
.row-price { color:#c8401d; font-size:21px; font-weight:750; white-space:nowrap; font-variant-numeric:tabular-nums; }
.currency { font-size:12px; margin-right:1px; }.price-label { font-size:12px; color:#6d766e; font-weight:400; margin-left:3px; }
.row-action { color:#fff; background:#c8401d; font-size:12px; padding:4px 7px; border-radius:5px; white-space:nowrap; }
@media(max-width:350px) { .home-course-row{gap:8px}.row-cover{width:65px;height:92px}.row-price{font-size:19px}.row-action{padding:4px 6px}.price-label{display:block;margin:0;font-size:12px}.row-bottom{margin-top:5px} }
</style>
