<script setup lang="ts">
withDefaults(defineProps<{ title: string; message: string; action?: string; kind?: 'empty' | 'error' }>(), { kind: 'empty' });
defineEmits<{ (event: 'action'): void }>();
</script>
<template>
  <view class="feedback-state">
    <image v-if="kind === 'empty'" class="feedback-art" src="/static/brand/equipment.jpg" mode="aspectFit" aria-hidden="true" />
    <view v-else class="error-mark"><image src="/static/brand/refresh-orange.png" mode="aspectFit" aria-hidden="true" /></view>
    <text class="feedback-title">{{ title }}</text>
    <text class="feedback-message">{{ message }}</text>
    <button v-if="action" class="primary-button" @click="$emit('action')">{{ action }}</button>
  </view>
</template>
<style scoped lang="scss">
.feedback-state { text-align:center; padding:36rpx 20rpx 48rpx; }
.feedback-art { display:block; width:360rpx; height:240rpx; margin:0 auto 26rpx; }
.error-mark { width:112rpx; height:112rpx; border-radius:50%; background:#f8e7df; margin:34rpx auto; display:flex; align-items:center; justify-content:center; }
.error-mark image { width:56rpx; height:56rpx; }
.feedback-title { display:block; font-size:33rpx; font-weight:700; }
.feedback-message { display:block; margin:16rpx auto 32rpx; max-width:560rpx; font-size:26rpx; line-height:1.9; color:#68716c; }
.primary-button { max-width:360rpx; margin:auto; }
</style>
