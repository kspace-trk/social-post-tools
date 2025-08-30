import type { Config } from '~/utils/config';
import { useStorage } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

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
    config.value.generatePostConfig.push({ id: uuidv4(), post });
  };

  const removeGeneratePostConfig = (id: string): void => {
    config.value.generatePostConfig = config.value.generatePostConfig.filter(item => item.id !== id);
  };

  const addTranslateConfig = (rule: string): void => {
    config.value.translateConfig.push({ id: uuidv4(), rule });
  };

  const removeTranslateConfig = (id: string): void => {
    config.value.translateConfig = config.value.translateConfig.filter(item => item.id !== id);
  };

  const addGuidelineCheckConfig = (rule: string): void => {
    config.value.guidelineCheckConfig.push({ id: uuidv4(), rule });
  };

  const removeGuidelineCheckConfig = (id: string): void => {
    config.value.guidelineCheckConfig = config.value.guidelineCheckConfig.filter(item => item.id !== id);
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
