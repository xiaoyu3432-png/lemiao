<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { useCoursesStore } from '../../stores/courses';
import HomeCourseRow from '../../components/HomeCourseRow.vue';
import FeedbackState from '../../components/FeedbackState.vue';
import HomeCarousel from '../../components/HomeCarousel.vue';

const store = useCoursesStore();
const query = ref('');
const entry = ref('courses');
const teachingMode = ref('all');
const category = ref('all');
const statusBarHeight = ref(0);
const capsuleSpace = ref(12);
const navigationHeight = ref(48);
const categories = [
  { id: 'all', label: '全部课程', value: '' },
  { id: 'fitness', label: '体能课', value: '体适能' },
  { id: 'basketball', label: '篮球课', value: '篮球' },
  { id: 'rope', label: '跳绳课', value: '跳绳' },
  { id: 'special', label: '专项课', value: '专项' },
  { id: 'school', label: '升学专区', value: '升学' },
  { id: 'system', label: '体系课', value: '体系' },
  { id: 'outdoor', label: '户外研学', value: '户外研学' }
];
const entries = [
  { id: 'nearby', label: '附近课', icon: 'pin' },
  { id: 'courses', label: '找课程', icon: 'trophy' },
  { id: 'coaches', label: '找教练', icon: 'people' }
];
const modes = [{ id: 'all', label: '全部' }, { id: 'group', label: '团课' }, { id: 'private', label: '私教' }];
const currentCategory = computed(() => categories.find(item => item.id === category.value) || categories[0]);
const visibleCourses = computed(() => {
  const keyword = query.value.trim().toLocaleLowerCase();
  return store.courses.filter(course =>
    (!currentCategory.value.value || course.category === currentCategory.value.value) &&
    (teachingMode.value === 'all' || course.teachingMode === teachingMode.value) &&
    (!keyword || `${course.name} ${course.category} ${course.description}`.toLocaleLowerCase().includes(keyword))
  );
});
function reset() { category.value = 'all'; teachingMode.value = 'all'; query.value = ''; entry.value = 'courses'; }
function searchInput() { category.value = 'all'; teachingMode.value = 'all'; entry.value = 'courses'; }
function scrollToCatalog() { uni.pageScrollTo({ selector: '#catalog-anchor', duration: 200 }); }
function explore() { reset(); scrollToCatalog(); }
function search() { searchInput(); scrollToCatalog(); }
function chooseEntry(value: string) { entry.value = value; }
function chooseCategory(value: string) { category.value = value; entry.value = 'courses'; }
function locationNotice() { uni.showToast({ title: '地点服务尚未接入，当前展示演示课程', icon: 'none', duration: 2500 }); }
function activities() { uni.switchTab({ url: '/pages/activities/index' }); }
onLoad(() => {
  // Native capsule is owned by WeChat; reserve its actual space instead of drawing a fake one.
  // #ifdef MP-WEIXIN
  const system = uni.getSystemInfoSync();
  statusBarHeight.value = system.statusBarHeight || 0;
  const capsule = uni.getMenuButtonBoundingClientRect();
  if (capsule.width > 0) {
    capsuleSpace.value = system.windowWidth - capsule.left + 8;
    navigationHeight.value = Math.max(44, (capsule.top - statusBarHeight.value) * 2 + capsule.height);
  }
  // #endif
  void store.load();
});
onPullDownRefresh(async () => { await store.load(); uni.stopPullDownRefresh(); });
</script>

<template>
  <view class="page home-page">
    <view class="home-masthead" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="home-nav" :style="{ height: navigationHeight + 'px', paddingRight: capsuleSpace + 'px' }">
        <view class="home-brand"><image src="/static/brand/basketball-orange.png" mode="aspectFit" aria-hidden="true" /><text>运动课程</text></view>
        <text class="home-demo">开发演示</text>
      </view>
      <view class="search-field">
        <input v-model="query" class="search-input" placeholder="搜课程、搜运动项目" placeholder-style="color:#69736c" confirm-type="search" :maxlength="50" aria-label="搜索课程或运动项目" @input="searchInput" @confirm="search" />
        <button v-if="query" class="search-clear" aria-label="清空搜索" @click="query = ''"><image src="/static/brand/close-ink.png" mode="aspectFit" /></button>
        <button class="search-submit" aria-label="搜索" @click="search"><image src="/static/brand/search-ink.png" mode="aspectFit" /></button>
      </view>
      <HomeCarousel @explore="explore" />
    </view>

    <view id="catalog-anchor" class="catalog-panel">
      <view class="entry-tabs">
        <button v-for="item in entries" :key="item.id" class="entry-tab" :class="{ selected: entry === item.id }" :aria-pressed="entry === item.id" @click="chooseEntry(item.id)">
          <image :src="'/static/brand/' + item.icon + '-ink.png'" mode="aspectFit" aria-hidden="true" /><text>{{ item.label }}</text>
        </button>
      </view>
      <view class="location-filter">
        <button class="location-button" @click="locationNotice"><image src="/static/brand/pin-ink.png" mode="aspectFit" aria-hidden="true" /><text>全部地区</text><view class="dropdown-caret" /></button>
        <view class="teaching-tabs">
          <button v-for="item in modes" :key="item.id" class="teaching-tab" :class="{ selected: teachingMode === item.id }" :aria-pressed="teachingMode === item.id" @click="teachingMode = item.id; entry = 'courses'"><text>{{ item.label }}</text></button>
        </view>
      </view>

      <view v-if="entry !== 'courses'" class="service-state">
        <FeedbackState :title="entry === 'nearby' ? '附近课程，即将见面' : '教练服务正在准备中'" :message="entry === 'nearby' ? '定位与附近课程尚未接入。你可以先浏览全部演示课程，了解不同运动项目。' : '教练资料与预约尚未接入。先从课程出发，找到孩子感兴趣的运动。'" action="浏览全部课程" @action="reset" />
      </view>
      <view v-else class="catalog-layout">
        <view class="category-rail">
          <button v-for="item in categories" :key="item.id" class="category-item" :class="{ selected: category === item.id }" :aria-pressed="category === item.id" @click="chooseCategory(item.id)">{{ item.label }}</button>
        </view>
        <view class="catalog-content">
          <button class="catalog-banner" @click="activities">
            <image class="catalog-banner-art" src="/static/brand/course-banner.jpg" mode="aspectFill" aria-hidden="true" />
            <view class="catalog-banner-copy"><text class="catalog-banner-title">每一秒，向前。</text><text class="catalog-banner-link">看看运动活动<image src="/static/brand/arrow-white.png" mode="aspectFit" aria-hidden="true" /></text></view>
          </button>
          <view class="result-heading"><text class="result-title">{{ query.trim() ? '搜索结果' : currentCategory.label }}</text><text class="result-count">{{ store.loading ? '加载中' : store.error ? '加载失败' : '共 ' + visibleCourses.length + ' 门' }}</text></view>
          <view v-if="store.loading" class="catalog-skeleton" aria-label="正在加载课程"><view v-for="n in 3" :key="n" class="skeleton-row"><view class="skeleton-thumb" /><view class="skeleton-content"><view /><view /><view /></view></view></view>
          <view v-else-if="store.error" class="compact-state"><image src="/static/brand/refresh-orange.png" mode="aspectFit" aria-hidden="true" /><text class="state-title">课程加载失败</text><text class="state-description">{{ store.error }}</text><button class="state-action" @click="store.load">重新加载</button></view>
          <view v-else-if="!visibleCourses.length" class="compact-state"><image class="state-art" src="/static/brand/equipment.jpg" mode="aspectFit" aria-hidden="true" /><text class="state-title">{{ query.trim() ? '还没找到这门课' : '这个分类正在准备中' }}</text><text class="state-description">{{ query.trim() ? '试试“篮球”“跳绳”，或查看全部课程。' : '当前筛选下暂无演示课程，可以先看看其他项目。' }}</text><button class="state-action" @click="reset">查看全部课程</button></view>
          <view v-else class="home-course-list"><HomeCourseRow v-for="course in visibleCourses" :key="course.id" :course="course" /></view>
          <text class="catalog-note">课程与价格为开发演示<br />预约、支付尚未开放</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.home-page { max-width:480px; padding:0 0 24px; background:#f5f6f8; min-height:100vh; }
.home-masthead { background:#f45125; }
.home-nav { display:flex; align-items:center; justify-content:space-between; padding-left:16px; gap:12px; }
.home-brand { display:flex; align-items:center; gap:8px; color:#fff; font-size:20px; font-weight:800; white-space:nowrap; }
.home-brand image { width:35px; height:29px; border-radius:4px; }
.home-demo { padding:3px 8px; background:#fff0d3; color:#653019; border-radius:5px; font-size:11px; white-space:nowrap; }
.search-field { display:flex; align-items:center; margin:8px 12px 0; min-height:46px; background:#fff; border-radius:12px; padding-left:14px; }
.search-input { flex:1; min-width:0; font-size:14px; height:44px; color:#202624; }
.search-submit,.search-clear { display:flex; align-items:center; justify-content:center; width:44px; height:46px; flex:none; padding:0; background:transparent; border-radius:10px; }
.search-submit image { width:24px; height:24px; }.search-clear image { width:18px; height:18px; }
.home-poster { position:relative; height:190px; overflow:hidden; }
.poster-art { position:absolute; top:0; right:0; width:100%; height:auto; }
.poster-words { position:absolute; left:18px; top:22px; }
.poster-heading { display:block; font-size:27px; font-weight:800; line-height:1.32; color:#fff; letter-spacing:-.5px; }
.poster-emphasis { color:#fff4d9; }
.poster-description { display:block; color:#482719; font-size:12px; margin:9px 0 12px; }
.poster-action { display:flex; align-items:center; gap:12px; padding:0 13px; min-height:44px; background:#fff7e8; color:#233c2e; font-size:13px; font-weight:700; line-height:1.5; border-radius:8px; width:max-content; }
.poster-action image { width:21px; height:21px; }
.catalog-panel { position:relative; margin-top:-10px; border-radius:18px 18px 0 0; background:#f5f6f8; overflow:hidden; }
.entry-tabs { display:flex; gap:5px; padding:8px 10px 0; background:#fff; }
.entry-tab { position:relative; flex:1; display:flex; align-items:center; justify-content:center; gap:7px; min-height:50px; padding:0; color:#5e6861; background:transparent; border-radius:0; font-size:16px; line-height:1.4; white-space:nowrap; }
.entry-tab image { width:25px; height:25px; }
.entry-tab.selected { color:#202624; font-weight:750; }
.entry-tab.selected::before { content:''; position:absolute; width:20px; height:3px; background:#e34c26; border-radius:3px; bottom:1px; left:calc(50% - 2px); }
.location-filter { display:flex; justify-content:space-between; align-items:center; gap:10px; padding:4px 12px 8px; background:#fff; border-bottom:1px solid #e8ebe7; }
.location-button { display:flex; align-items:center; gap:5px; padding:0; min-height:44px; color:#26372c; font-size:13px; background:transparent; line-height:1.5; }
.location-button image { width:19px; height:19px; }
.dropdown-caret { width:6px; height:6px; border-right:1.5px solid #5f6e63; border-bottom:1.5px solid #5f6e63; transform:rotate(45deg); margin:-3px 4px 0; }
.teaching-tabs { position:relative; display:flex; padding:0 3px; }
.teaching-tabs::before { content:''; position:absolute; inset:5px 0; background:#f0f2ef; border-radius:10px; }
.teaching-tab { position:relative; display:flex; align-items:center; justify-content:center; width:48px; height:44px; min-height:44px; margin:0; padding:0; line-height:1; border-radius:0; font-size:13px; color:#526056; background:transparent; }
.teaching-tab text { display:flex; align-items:center; justify-content:center; width:100%; height:28px; border-radius:7px; box-sizing:border-box; }
.teaching-tab.selected text { background:#fff; color:#b73b1b; font-weight:700; border:1px solid #e2e6df; }
.catalog-layout { display:flex; align-items:stretch; }
.category-rail { flex:none; width:78px; background:#f0f2f3; padding-top:10px; }
.category-item { position:relative; display:flex; align-items:center; justify-content:center; width:100%; min-height:58px; padding:12px 5px; background:transparent; color:#646d67; font-size:13px; line-height:1.5; border-radius:0; }
.category-item.selected { background:#fff; color:#202624; font-weight:750; }
.category-item.selected::before { content:''; position:absolute; left:0; top:calc(50% - 10px); width:3px; height:20px; border-radius:0 3px 3px 0; background:#e34c26; }
.catalog-content { min-width:0; flex:1; background:#fff; padding:12px 12px 24px; }
.catalog-banner { position:relative; display:block; width:100%; height:87px; overflow:hidden; border-radius:9px; background:#234837; color:#fff; padding:0; text-align:left; line-height:1.5; }
.catalog-banner-art { width:100%; height:100%; }
.catalog-banner-copy { position:absolute; top:16px; left:12px; }
.catalog-banner-title { display:block; font-size:18px; font-weight:750; }
.catalog-banner-link { display:flex; align-items:center; gap:5px; font-size:11px; color:#fff3d9; margin-top:7px; }
.catalog-banner-link image { width:15px; height:15px; }
.result-heading { display:flex; align-items:baseline; gap:8px; min-height:43px; padding:13px 0 9px; border-bottom:1px solid #edf0ec; }
.result-title { color:#24372b; font-weight:700; font-size:14px; }
.result-count { color:#68716c; font-size:12px; }
.catalog-note { display:block; text-align:center; color:#6b746d; font-size:11px; line-height:1.8; margin-top:20px; }
.skeleton-row { display:flex; gap:10px; padding:14px 0; border-bottom:1px solid #edf0ec; }.skeleton-thumb { width:76px; height:96px; background:#e9ede7; border-radius:8px; }.skeleton-content { flex:1; padding:5px 0; }.skeleton-content view { height:15px; width:90%; background:#e9ede7; margin-bottom:14px; border-radius:4px; }
.compact-state { padding:28px 2px; text-align:center; }.compact-state>image { width:42px; height:42px; margin-bottom:15px; }.compact-state>image.state-art { width:150px; height:98px; }.state-title { display:block; font-size:15px; font-weight:700; }.state-description { display:block; font-size:12px; line-height:1.8; color:#657168; margin:10px 0 18px; }.state-action { min-height:44px; background:#c8401d; color:white; font-size:13px; padding:11px 12px; line-height:1.5; border-radius:8px; }.service-state { background:#fff; padding:10px 10px 24px; }
@media(max-width:350px) { .home-brand {font-size:18px}.poster-heading{font-size:25px}.poster-words{left:14px}.category-rail{width:68px}.catalog-content{padding-left:9px;padding-right:9px}.entry-tab{font-size:14px;gap:5px}.entry-tab image{width:22px;height:22px}.teaching-tab{padding:0 7px}.catalog-banner-title{font-size:16px}.catalog-banner-copy{left:10px}.location-filter{gap:4px;padding-left:10px;padding-right:10px} }
</style>
