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
  exportConfig: () => string;
  importConfig: (jsonStr: string) => void;
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

  const exportConfig = (): string => {
    return JSON.stringify(config.value, null, 2);
  };

  const importConfig = (jsonStr: string): void => {
    const parsed = JSON.parse(jsonStr) as Config;
    if (!Array.isArray(parsed.generatePostConfig)
      || !Array.isArray(parsed.translateConfig)
      || !Array.isArray(parsed.guidelineCheckConfig)) {
      throw new Error('Invalid config format');
    }
    config.value = {
      generatePostConfig: parsed.generatePostConfig.map(item => ({
        id: uuidv4(),
        post: item.post,
      })),
      translateConfig: parsed.translateConfig.map(item => ({
        id: uuidv4(),
        rule: item.rule,
      })),
      guidelineCheckConfig: parsed.guidelineCheckConfig.map(item => ({
        id: uuidv4(),
        rule: item.rule,
      })),
    };
  };

  return {
    config,
    addGeneratePostConfig,
    removeGeneratePostConfig,
    addTranslateConfig,
    removeTranslateConfig,
    addGuidelineCheckConfig,
    removeGuidelineCheckConfig,
    exportConfig,
    importConfig,
  };
};
