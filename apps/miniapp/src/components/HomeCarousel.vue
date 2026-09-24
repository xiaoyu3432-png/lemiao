<script setup lang="ts">
import { ref } from 'vue';
import { onShow, onHide } from '@dcloudio/uni-app';
import { campaigns } from '../content/campaigns';
const emit = defineEmits<{ (event: 'explore'): void }>();
const slides = [
  { id:'courses', image:'home-illustration', theme:'orange', line1:'把热爱，', line2:'练成闪光点。', subtitle:'从一节喜欢的运动课开始', alt:'少年运球的原创2D运动插画' },
  ...campaigns
];
const current = ref(0);
const paused = ref(false);
const visible = ref(true);
// #ifdef H5
paused.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// #endif
onShow(() => { visible.value = true; });
onHide(() => { visible.value = false; });
function changed(event: { detail: { current: number } }) { current.value = event.detail.current; }
function activate(id: string) {
  if (id === 'courses') emit('explore');
  else uni.switchTab({ url: '/pages/activities/index' });
}
</script>
<template>
  <view class="home-carousel" :class="'theme-' + slides[current].theme">
    <swiper class="hero-swiper" :current="current" :autoplay="!paused && visible" :interval="5500" :duration="350" circular @change="changed">
      <swiper-item v-for="slide in slides" :key="slide.id">
        <view class="hero-slide" :class="'theme-' + slide.theme">
          <image class="hero-art" :src="'/static/brand/' + slide.image + '.jpg'" mode="widthFix" :alt="slide.alt" />
          <view class="hero-copy">
            <view class="hero-title"><text>{{ slide.line1 }}</text><text>{{ slide.line2 }}</text></view>
            <text class="hero-description">{{ slide.subtitle }}</text>
            <button class="hero-action" @click="activate(slide.id)">{{ slide.id === 'courses' ? '找到我的课程' : '看看活动主题' }}<image src="/static/brand/arrow-ink.png" mode="aspectFit" aria-hidden="true" /></button>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="carousel-controls">
      <button class="slide-control" aria-label="上一张海报" @click="current = (current + slides.length - 1) % slides.length"><image src="/static/brand/arrow-ink.png" mode="aspectFit" class="previous" aria-hidden="true" /></button>
      <text class="slide-count">{{ current + 1 }} / {{ slides.length }}</text>
      <button class="slide-control" aria-label="下一张海报" @click="current = (current + 1) % slides.length"><image src="/static/brand/arrow-ink.png" mode="aspectFit" aria-hidden="true" /></button>
      <button class="play-control" :aria-label="paused ? '播放轮播' : '暂停轮播'" @click="paused = !paused"><view v-if="paused" class="play-shape" /><view v-else class="pause-shape" /></button>
    </view>
  </view>
</template>
<style scoped lang="scss">
.home-carousel { position:relative; height:232px; }
.hero-swiper,.hero-slide { height:232px; }
.theme-orange { background:#f45125; color:#fff7e8; }.theme-cream { background:#fff1d5; color:#234837; }.theme-green { background:#234837; color:#fff4da; }
.hero-slide { position:relative; overflow:hidden; }
.hero-art { position:absolute; width:100%; height:auto; right:0; top:0; }
.hero-copy { position:absolute; left:18px; top:23px; }
.hero-title { font-size:26px; font-weight:800; line-height:1.3; letter-spacing:-.4px; }
.hero-title text { display:block; }
.hero-description { display:block; font-size:12px; margin:10px 0 13px; color:#492c1f; }.theme-cream .hero-description { color:#39563c; }.theme-green .hero-description { color:#f4e8cc; }
.hero-action { display:flex; align-items:center; justify-content:center; gap:10px; width:max-content; min-height:44px; margin:0; padding:0 12px; border-radius:8px; background:#fff7e8; color:#233c2e; font-size:13px; font-weight:650; line-height:1.5; }.theme-cream .hero-action { background:#fffdf6; }
.hero-action image { width:19px; height:19px; }
.carousel-controls { position:absolute; left:12px; bottom:5px; display:flex; align-items:center; color:inherit; }
.slide-control,.play-control { width:44px; height:44px; min-height:44px; display:flex; align-items:center; justify-content:center; padding:0; margin:0; background:transparent; color:inherit; border-radius:6px; }
.slide-control image { width:17px; height:17px; }.previous { transform:rotate(180deg); }.theme-green .slide-control image { filter:brightness(0) invert(1); }
.slide-count { min-width:30px; text-align:center; font-size:11px; font-variant-numeric:tabular-nums; }.play-control { margin-left:4px; }
.pause-shape { width:8px; height:10px; border-left:2px solid currentColor; border-right:2px solid currentColor; box-sizing:border-box; }.play-shape { width:0; height:0; border-top:5px solid transparent; border-bottom:5px solid transparent; border-left:8px solid currentColor; }
@media(max-width:350px) { .hero-title { font-size:23px; }.hero-copy { left:14px; }.hero-description { font-size:11px; } }
</style>
