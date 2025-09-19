<script setup lang="ts">
import type { SideHeaderMenuItem } from '@kspace-trk/admin-ui-components/runtime';
import { KSSideHeader, KSTopHeader } from '@kspace-trk/admin-ui-components/runtime';
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

// 現在のパスに基づいてページタイトルを取得する関数
const getPageTitle = (): string => {
  const currentPath = route.path;

  // メインメニューから検索
  const mainMenuItem = menuItems.find(item => item.path === currentPath);
  if (mainMenuItem) {
    return mainMenuItem.label;
  }

  // ボトムメニューから検索
  if (bottomMenuItem.path === currentPath) {
    return bottomMenuItem.label;
  }

  // デフォルトタイトル
  return 'social-post-tools';
};

const pageTitle = computed(() => getPageTitle());
</script>

<template>
  <div id="default-layout">
    <KSSideHeader
      logo-text="social-post-tools"
      :menu-items="menuItems"
      :current-path="route.path"
      :bottom-menu-item="bottomMenuItem"
    />
    <div class="main-content">
      <KSTopHeader :title="pageTitle" />
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
