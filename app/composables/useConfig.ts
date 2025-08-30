import type { Config } from '~/utils/config';
import { useStorage } from '@vueuse/core';

const key = 'config';

export type UseConfigReturnType = {
  config: Ref<Config>;
  addGeneratePostConfig: (post: string) => void;
  removeGeneratePostConfig: (id: string) => void;
  addTranslateConfig: (rule: string) => void;
  removeTranslateConfig: (id: string) => void;
  addGuidelineCheckConfig: (rule: string) => void;
  removeGuidelineCheckConfig: (id: string) => void;
};

export const useConfig = (): UseConfigReturnType => {
  const config = useStorage<Config>(key, {
    generatePostConfig: [],
    translateConfig: [],
    guidelineCheckConfig: [],
  },
  localStorage,
  {
    mergeDefaults: true,
  });

  const addGeneratePostConfig = (post: string): void => {
    config.value.generatePostConfig.push({ id: useId(), post });
  };

  const removeGeneratePostConfig = (id: string): void => {
    const index = config.value.generatePostConfig.findIndex(item => item.id === id);
    if (index !== -1) {
      config.value.generatePostConfig.splice(index, 1);
    }
  };

  const addTranslateConfig = (rule: string): void => {
    config.value.translateConfig.push({ id: useId(), rule });
  };

  const removeTranslateConfig = (id: string): void => {
    const index = config.value.translateConfig.findIndex(item => item.id === id);
    if (index !== -1) {
      config.value.translateConfig.splice(index, 1);
    }
  };

  const addGuidelineCheckConfig = (rule: string): void => {
    config.value.guidelineCheckConfig.push({ id: useId(), rule });
  };

  const removeGuidelineCheckConfig = (id: string): void => {
    const index = config.value.guidelineCheckConfig.findIndex(item => item.id === id);
    if (index !== -1) {
      config.value.guidelineCheckConfig.splice(index, 1);
    }
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
