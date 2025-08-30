export type GeneratePostConfig = {
  id: string;
  post: string;
};

export type TranslateConfig = {
  id: string;
  rule: string;
};

export type GuidelineCheckConfig = {
  id: string;
  rule: string;
};

export type Config = {
  generatePostConfig: GeneratePostConfig[];
  translateConfig: TranslateConfig[];
  guidelineCheckConfig: GuidelineCheckConfig[];
};
