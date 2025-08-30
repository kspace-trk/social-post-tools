import type { Config } from '~/utils/config';
import { useStorage } from '@vueuse/core';

const key = 'config';

export const useConfig = () => {
  const config = useStorage<Config>(key, {
    generatePostConfig: [],
    translateConfig: [],
    guidelineCheckConfig: [],
  },
  localStorage,
  {
    mergeDefaults: true,
  });

  const addGeneratePostConfig = (post: string) => {
    config.value.generatePostConfig.push({ post });
  };

  const removeGeneratePostConfig = (index: number) => {
    config.value.generatePostConfig.splice(index, 1);
  };

  const addTranslateConfig = (rule: string) => {
    config.value.translateConfig.push({ rule });
  };

  const removeTranslateConfig = (index: number) => {
    config.value.translateConfig.splice(index, 1);
  };

  const addGuidelineCheckConfig = (rule: string) => {
    config.value.guidelineCheckConfig.push({ rule });
  };

  const removeGuidelineCheckConfig = (index: number) => {
    config.value.guidelineCheckConfig.splice(index, 1);
  };

  return {
    config,
    addGeneratePostConfig,
    removeGeneratePostConfig,
    addTranslateConfig,
    removeTranslateConfig,
    addGuidelineCheckConfig,
    removeGuidelineCheckConfig,
  };
};
