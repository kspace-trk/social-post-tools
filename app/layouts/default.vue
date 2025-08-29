<script setup lang="ts">
import { SideHeader, TopHeader, type SideHeaderMenuItem } from 'admin-ui-components';
import { useRoute } from '#app';

const menuItems: SideHeaderMenuItem[] = [
  {
    path: '/',
    label: '投稿文生成',
    icon: 'majesticons:text-line',
  },
  {
    path: '/translate',
    label: '翻訳',
    icon: 'fluent:translate-auto-16-regular',
  },
  {
    path: '/guideline-check',
    label: '文言チェック',
    icon: 'carbon:rule-filled',
  },
];

const bottomMenuItem: SideHeaderMenuItem = {
  path: '/settings',
  label: '設定',
  icon: 'carbon:settings',
};

const route = useRoute();
</script>

<template>
  <div id="default-layout">
    <SideHeader
      logo-text="social-post-tools"
      :menu-items="menuItems"
      :current-path="route.path"
      :bottom-menu-item="bottomMenuItem"
    />
    <div class="main-content">
      <TopHeader title="ヘッダー名" />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#default-layout {
  display: flex;

  .main-content {
    margin-left: 260px; // SideHeaderの幅分だけ右にずらす
    padding-top: 73px; // TopHeaderの高さ分だけ下にずらす
    width: calc(100% - 260px); // SideHeaderの幅を除いた幅
    display: flex;
    flex-direction: column;
    min-height: 100vh; // 最小の高さを画面の高さに設定
    transition: margin-left 0.3s ease, width 0.3s ease; // スムーズなアニメーション
  }
}

// モバイル対応：768px以下の場合
@media (max-width: 768px) {
  #default-layout {
    .main-content {
      margin-left: 0; // SideHeaderが隠れている時は左マージンなし
      width: 100%; // 全幅で表示
    }
  }
}
</style>
