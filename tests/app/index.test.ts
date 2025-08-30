import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '../../app/pages/index.vue';

describe('Index Page', () => {
  it('要件入力フィールドが存在する', async () => {
    const component = await mountSuspended(IndexPage);
    expect(component.find('.textarea-input').exists()).toBe(true);
  });

  it('生成ボタンが存在する', async () => {
    const component = await mountSuspended(IndexPage);
    expect(component.find('.button-container').exists()).toBe(true);
  });

  it('生成結果フィールドが存在する', async () => {
    const component = await mountSuspended(IndexPage);
    expect(component.find('.textarea-result').exists()).toBe(true);
  });
});
