<script setup lang="ts">
import BrandHeader from '../../components/BrandHeader.vue';
import { campaigns } from '../../content/campaigns';
function home() { uni.switchTab({ url: '/pages/index/index' }); }
</script>
<template>
  <view class="page activities-page">
    <BrandHeader label="活动专区" />
    <view class="section-title-row"><text class="page-title">让热爱，一起发生。</text></view>
    <text class="page-intro">从一场运动，认识新的伙伴。</text>
    <view class="campaign-list">
      <view v-for="campaign in campaigns" :key="campaign.id" class="campaign">
        <view class="campaign-art" :class="'theme-' + campaign.theme">
          <image :src="'/static/brand/' + campaign.image + '.jpg'" mode="widthFix" :alt="campaign.alt" />
          <view class="campaign-copy"><text>{{ campaign.line1 }}</text><text>{{ campaign.line2 }}</text></view>
        </view>
        <view class="campaign-heading"><text class="campaign-name">{{ campaign.title }}</text><text class="campaign-status">筹备中</text></view>
        <text class="campaign-description">{{ campaign.description }}</text>
      </view>
    </view>
    <view class="activity-status">
      <image class="icon" src="/static/brand/calendar-ink.png" mode="aspectFit" aria-hidden="true" />
      <view><text class="status-title">活动正在筹备中</text><text class="status-copy">活动报名尚未接入，开放后将在这里展示。<br />现在，先找到一项喜欢的运动。</text></view>
    </view>
    <button class="primary-button" @click="home">去发现课程</button>
    <text class="page-footnote">开发演示 · 海报为品牌主题设计，非活动招募</text>
  </view>
</template>
<style scoped lang="scss">
.activities-page { background:#f5f5f1; }
.page-title { font-size:43rpx; }
.campaign-list { margin-top:26px; }
.campaign { margin-bottom:28px; }
.campaign-art { position:relative; height:180px; overflow:hidden; border-radius:12px; }
.theme-cream { background:#fff1d5; color:#234837; }.theme-green { background:#234837; color:#fff4da; }.theme-orange { background:#f45125; color:#fff7e8; }
.campaign-art>image { width:100%; height:auto; }
.campaign-copy { position:absolute; top:25px; left:16px; font-size:24px; font-weight:750; line-height:1.4; }.campaign-copy text { display:block; }
.campaign-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:14px; }.campaign-name { font-size:17px; font-weight:700; }.campaign-status { font-size:12px; color:#68716c; }
.campaign-description { display:block; color:#68716c; font-size:13px; line-height:1.8; margin-top:6px; }
@media(max-width:350px) { .campaign-art { height:155px; }.campaign-copy { font-size:21px; left:12px; } }
.activity-status { display:flex; align-items:flex-start; gap:20rpx; padding:34rpx 0; }
.activity-status .icon { margin-top:4rpx; }
.status-title { display:block; font-size:30rpx; font-weight:700; }
.status-copy { display:block; color:#68716c; font-size:25rpx; line-height:1.85; margin-top:10rpx; }
</style>
