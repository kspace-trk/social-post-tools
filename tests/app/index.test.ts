import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';

describe('Index Page', () => {
  it('マウントされると、Hello Worldが表示される', async () => {
    const component = await mountSuspended(IndexPage);
    expect(component.html()).toContain('Hello World');
  });

  it('h1要素が存在する', async () => {
    const component = await mountSuspended(IndexPage);
    expect(component.find('h1').exists()).toBe(true);
  });
});
