export type GeneratePostConfig = {
  post: string;
}

export type TranslateConfig = {
  rule: string;
}

export type GuidelineCheckConfig = {
  rule: string;
}

export type Config = {
  generatePostConfig: GeneratePostConfig[];
  translateConfig: TranslateConfig[];
  guidelineCheckConfig: GuidelineCheckConfig[];
}
