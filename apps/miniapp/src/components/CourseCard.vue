<script setup lang="ts">
import type { DemoCourse } from '@lemiao/contracts';
import { courseVisual } from '../utils/visuals';
defineProps<{ course: DemoCourse }>();
function open(id: string) { uni.navigateTo({ url: `/pages/course/detail?id=${encodeURIComponent(id)}` }); }
const price = (value: number) => (value / 100).toFixed(2).replace(/\.00$/, '');
</script>
<template>
  <button class="course-card" @click="open(course.id)">
    <image class="course-picture brand-photo" :src="courseVisual(course.category).image" mode="aspectFill" :alt="course.category + '训练情境配图'" />
    <view class="course-info">
      <text class="course-category">{{ course.category }}<text class="category-divider"> / </text>{{ course.teachingMode === 'group' ? '小班团课' : '一对一' }}</text>
      <text class="course-title">{{ course.name }}</text>
      <text class="course-meta">{{ course.minAge }}–{{ course.maxAge }}岁 · {{ course.durationMinutes }}分钟 / 节</text>
      <view class="course-bottom">
        <text class="course-price"><text class="currency">¥</text>{{ price(course.priceCents) }}<text class="price-note"> 示例价</text></text>
        <image class="course-arrow" src="/static/brand/arrow-ink.png" mode="aspectFit" aria-hidden="true" />
      </view>
    </view>
  </button>
</template>
<style scoped lang="scss">
.course-card { display:flex; align-items:center; gap:26rpx; padding:28rpx 0; width:100%; text-align:left; line-height:1.5; background:transparent; border-radius:0; border-bottom:1px solid #e5e8e3; }
.course-card:active { background:#edf0eb; }
.course-picture { width:202rpx; height:216rpx; border-radius:12rpx; flex:none; background:#dce4de; }
.course-info { flex:1; min-width:0; }
.course-category { display:block; color:#53615a; font-size:max(22rpx,12px); }
.category-divider { color:#a3aba5; margin:0 5rpx; }
.course-title { display:block; font-size:max(31rpx,14px); font-weight:750; color:#202624; margin:9rpx 0; }
.course-meta { display:block; font-size:max(23rpx,12px); color:#68716c; }
.course-bottom { display:flex; align-items:center; justify-content:space-between; gap:8rpx; margin-top:22rpx; }
.course-price { color:#c8401d; font-size:38rpx; font-weight:750; font-variant-numeric:tabular-nums; }
.currency { font-size:24rpx; margin-right:4rpx; }
.price-note { color:#68716c; font-size:max(20rpx,12px); font-weight:400; }
.course-arrow { width:36rpx; height:36rpx; }
</style>
