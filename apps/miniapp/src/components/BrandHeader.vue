<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="brand-header">
    <view class="brand-lockup">
      <image class="brand-mark" src="/static/brand/basketball-orange.png" mode="aspectFit" aria-hidden="true" />
      <view class="brand-wordmark"><text class="brand-name">运动课程</text><text class="brand-latin">YOUTH SPORTS</text></view>
    </view>
    <text class="brand-descriptor">{{ label || '青少年运动 · 每一秒向前' }}</text>
  </view>
</template>
<style scoped lang="scss">
.brand-header { display:flex; align-items:center; justify-content:space-between; gap:20rpx; padding:4rpx 0 28rpx; }
.brand-lockup { display:flex; align-items:center; gap:10rpx; }
.brand-mark { width:84rpx; height:74rpx; }
.brand-wordmark { display:flex; flex-direction:column; }
.brand-name { font-size:37rpx; font-weight:800; line-height:1.15; letter-spacing:3rpx; }
.brand-latin { font-size:15rpx; font-weight:750; letter-spacing:2rpx; margin-top:6rpx; }
.brand-descriptor { color:#56615b; font-size:22rpx; }
</style>
