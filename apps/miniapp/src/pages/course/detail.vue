<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import type { DemoCourse } from '@lemiao/contracts';
import { ApiError, get } from '../../api/request';
import { courseVisual } from '../../utils/visuals';
import FeedbackState from '../../components/FeedbackState.vue';
const course = ref<DemoCourse>();
const loading = ref(true);
const error = ref('');
const notFound = ref(false);
let id = '';
async function load() {
  loading.value = true; error.value = ''; notFound.value = false;
  try {
    if (!id) throw new ApiError('没有找到这门课程，请返回首页重新选择。', 404);
    course.value = await get<DemoCourse>(`/demo/courses/${encodeURIComponent(id)}`);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '加载失败，请重试。';
    notFound.value = cause instanceof ApiError && cause.status === 404;
  } finally { loading.value = false; }
}
onLoad(options => { id = options?.id || ''; void load(); });
function home() { uni.switchTab({ url: '/pages/index/index' }); }
</script>
<template>
  <view class="page detail-page">
    <view v-if="loading" class="detail-loading"><view class="cover-skeleton" /><text>正在加载课程详情…</text></view>
    <FeedbackState v-else-if="error" :kind="notFound ? 'empty' : 'error'" :title="notFound ? '这门课程暂未收录' : '课程加载失败'" :message="error" :action="notFound ? '返回首页' : '重新加载'" @action="notFound ? home() : load()" />
    <template v-else-if="course">
      <view class="detail-cover">
        <image class="cover-photo brand-photo" :src="courseVisual(course.category).image" mode="aspectFill" :alt="course.category + '训练情境配图'" />
        <text class="cover-note">品牌情境配图</text>
        <view class="cover-label"><image :src="'/static/brand/' + courseVisual(course.category).icon + '-white.png'" mode="aspectFit" aria-hidden="true" /><text>{{ course.category }}</text></view>
      </view>
      <view class="detail-summary">
        <view class="section-title-row"><text class="detail-title">{{ course.name }}</text><text class="demo-label">课程演示</text></view>
        <view class="summary-price"><text class="detail-price"><text class="currency">¥</text>{{ (course.priceCents / 100).toFixed(2) }}</text><text class="section-description">示例价格 / 节</text></view>
        <view class="facts">
          <view><image src="/static/brand/user-muted.png" mode="aspectFit" aria-hidden="true" /><text class="fact-value">{{ course.minAge }}–{{ course.maxAge }}岁</text><text class="fact-label">适合年龄</text></view>
          <view><image src="/static/brand/clock-muted.png" mode="aspectFit" aria-hidden="true" /><text class="fact-value">{{ course.durationMinutes }}分钟</text><text class="fact-label">单节时长</text></view>
          <view><image src="/static/brand/people-muted.png" mode="aspectFit" aria-hidden="true" /><text class="fact-value">{{ course.teachingMode === 'group' ? '小班团课' : '一对一' }}</text><text class="fact-label">授课方式</text></view>
        </view>
      </view>
      <view class="detail-section"><text class="section-title">关于这节课</text><text class="detail-description">{{ course.description }}</text></view>
      <view class="availability"><image class="icon" src="/static/brand/info-ink.png" mode="aspectFit" aria-hidden="true" /><view><text class="availability-title">先了解，再出发</text><text>当前提供课程浏览。教练、排期、预约与支付尚未接入。</text></view></view>
      <button class="primary-button" @click="home">继续发现课程</button>
      <view class="brand-footer"><image src="/static/brand/basketball-orange.png" mode="aspectFit" aria-hidden="true" /><text>运动课程 · 每一秒向前</text></view>
    </template>
  </view>
</template>
<style scoped lang="scss">
.detail-page { background:#fff; }
.detail-cover { position:relative; border-radius:16rpx; overflow:hidden; height:580rpx; background:#dce4de; }
.cover-photo { width:100%; height:100%; }
.cover-note { position:absolute; top:20rpx; right:20rpx; font-size:20rpx; color:white; padding:4rpx 10rpx; background:rgba(24,42,33,.8); border-radius:4rpx; }
.cover-label { position:absolute; bottom:24rpx; left:24rpx; background:#243b30; color:white; display:flex; align-items:center; gap:12rpx; padding:10rpx 20rpx; border-radius:6rpx; font-size:25rpx; }
.cover-label image { width:34rpx; height:34rpx; }
.detail-summary { padding-top:32rpx; }
.detail-title { font-size:41rpx; font-weight:750; line-height:1.35; }
.summary-price { display:flex; align-items:baseline; gap:20rpx; margin:18rpx 0 28rpx; }
.detail-price { font-size:52rpx; font-weight:750; font-variant-numeric:tabular-nums; color:#c8401d; }
.currency { font-size:29rpx; margin-right:6rpx; }
.facts { display:flex; padding:28rpx 0; background:#f5f5f1; border-radius:12rpx; }
.facts>view { flex:1; text-align:center; border-right:1px solid #dde2db; }
.facts>view:last-child { border-right:0; }
.facts image { width:34rpx; height:34rpx; display:block; margin:0 auto 12rpx; }
.fact-value { display:block; font-size:28rpx; font-weight:700; }
.fact-label { display:block; font-size:22rpx; color:#68716c; margin-top:6rpx; }
.detail-section { padding:38rpx 0 32rpx; }
.detail-description { display:block; font-size:28rpx; line-height:1.95; color:#53615a; margin-top:18rpx; }
.availability { display:flex; gap:18rpx; padding:26rpx; background:#f0f3ed; border-radius:12rpx; color:#59655b; font-size:25rpx; line-height:1.8; margin:8rpx 0 30rpx; }
.availability .icon { width:34rpx; height:34rpx; margin-top:6rpx; }
.availability-title { display:block; color:#202624; font-size:28rpx; font-weight:650; margin-bottom:8rpx; }
.detail-loading { text-align:center; color:#68716c; }
.cover-skeleton { height:580rpx; background:#e8ece7; border-radius:16rpx; margin-bottom:34rpx; }
</style>
