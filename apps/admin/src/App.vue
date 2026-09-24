<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink to="/" class="brand" aria-label="乐秒工作台"><span class="brand-mark">乐</span><span>乐秒<span class="brand-caption">运动服务管理</span></span></RouterLink>
      <div class="nav-label">工作空间</div>
      <nav aria-label="主导航">
        <RouterLink to="/" class="nav-item" :class="{ selected: route.path === '/' }"><span class="nav-symbol">⌂</span>工作台</RouterLink>
        <RouterLink to="/courses" class="nav-item" :class="{ selected: route.path === '/courses' }"><span class="nav-symbol">▤</span>课程示例</RouterLink>
      </nav>
      <div class="sidebar-note"><span class="status-dot"></span>开发环境<p>三端骨架 · v0.1.0<br>只读演示，未接入业务操作</p></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><span>管理后台 <span class="breadcrumb-separator">/</span> {{ route.meta.title }}</span><span class="demo-badge">开发演示</span></header>
      <main><RouterView /></main>
      <footer>乐秒 · 让每一次运动都有安排<span>演示内容不用于实际经营</span></footer>
    </div>
  </div>
</template>
