<script setup lang="ts">
import type { SideHeaderMenuItem } from '@kspace-trk/admin-ui-components/runtime';
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

const sideHeaderProps = computed(() => ({
  logoText: 'social-post-tools',
  menuItems: menuItems,
  currentPath: route.path,
  bottomMenuItem: bottomMenuItem,
}));

const topHeaderProps = computed(() => ({
  title: pageTitle.value,
}));
</script>

<template>
  <div id="default-layout">
    <KSDashboardContainer
      :side-header-props="sideHeaderProps"
      :top-header-props="topHeaderProps"
    >
      <slot />
    </KSDashboardContainer>
  </div>
</template>

<style lang="scss" scoped>
</style>
