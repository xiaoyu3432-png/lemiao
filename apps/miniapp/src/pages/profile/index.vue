<script setup lang="ts">
import BrandHeader from '../../components/BrandHeader.vue';
function home() { uni.switchTab({ url: '/pages/index/index' }); }
const services = [
  { icon: 'people', title: '学员资料', description: '管理孩子的运动资料' },
  { icon: 'records', title: '我的课程', description: '查看课程与训练记录' },
  { icon: 'calendar', title: '我的活动', description: '查看参与的运动活动' }
];
</script>
<template>
  <view class="page profile-page">
    <BrandHeader label="我的运动空间" />
    <view class="profile-welcome">
      <view><text class="page-title">欢迎来到运动课程</text><text class="page-intro">从喜欢的运动开始。</text></view>
      <view class="profile-avatar"><image src="/static/brand/user-ink.png" mode="aspectFit" aria-hidden="true" /></view>
    </view>
    <view class="member-pass">
      <view class="pass-copy"><text class="pass-title">你的下一次进步，<br />从这一秒开始。</text><text class="pass-status">当前为访客浏览，无需登录</text></view>
      <image class="pass-mark" src="/static/brand/basketball-orange.png" mode="aspectFit" aria-hidden="true" />
    </view>
    <view class="services">
      <view v-for="service in services" :key="service.title" class="service-row">
        <image class="service-icon" :src="'/static/brand/' + service.icon + '-ink.png'" mode="aspectFit" aria-hidden="true" />
        <view class="service-body"><text class="service-title">{{ service.title }}</text><text class="service-caption">{{ service.description }}</text></view>
        <text class="service-unavailable">尚未接入</text>
      </view>
    </view>
    <view class="profile-start">
      <image class="equipment" src="/static/brand/equipment.jpg" mode="aspectFit" alt="运动课程装备插画" />
      <text class="start-title">先选一节适合的运动课</text>
      <text class="start-description">篮球、体适能、跳绳，找到孩子的兴趣。</text>
      <button class="primary-button" @click="home">浏览课程</button>
    </view>
    <text class="page-footnote">开发演示 · 账号与个人服务尚未开放</text>
  </view>
</template>
<style scoped lang="scss">
.profile-welcome { display:flex; align-items:center; justify-content:space-between; padding:20rpx 0 36rpx; }
.profile-welcome .page-title { font-size:42rpx; }
.profile-avatar { display:flex; align-items:center; justify-content:center; width:100rpx; height:100rpx; background:#e7ebe4; border-radius:50%; }
.profile-avatar image { width:51rpx; height:51rpx; }
.member-pass { display:flex; justify-content:space-between; align-items:center; padding:30rpx; background:#202e28; color:#fff; border-radius:16rpx; }
.pass-title { display:block; font-size:32rpx; font-weight:650; line-height:1.55; }
.pass-status { display:block; font-size:22rpx; color:#cdd8cf; margin-top:24rpx; }
.pass-mark { width:116rpx; height:116rpx; border-radius:12rpx; }
.services { background:white; margin-top:28rpx; border-radius:16rpx; padding:0 26rpx; }
.service-row { display:flex; gap:22rpx; align-items:center; min-height:136rpx; border-bottom:1px solid #e5e8e3; }
.service-row:last-child { border-bottom:0; }
.service-icon { width:42rpx; height:42rpx; }
.service-body { flex:1; }
.service-title { display:block; font-size:29rpx; font-weight:650; }
.service-caption { display:block; font-size:22rpx; color:#68716c; margin-top:6rpx; }
.service-unavailable { color:#68716c; font-size:22rpx; }
.profile-start { padding-top:34rpx; text-align:center; }
.equipment { width:340rpx; height:208rpx; display:block; margin:0 auto 20rpx; }
.start-title { display:block; font-size:31rpx; font-weight:700; }
.start-description { display:block; font-size:24rpx; color:#68716c; margin:13rpx 0 26rpx; }
.profile-start .primary-button { max-width:420rpx; margin:auto; }
</style>
