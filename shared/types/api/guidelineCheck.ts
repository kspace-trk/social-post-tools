export type GuidelineCheckRequestBody = {
  text: string;
  rules: string[];
};

export type GuidelineCheckResponse = {
  guidelineCheckText: string;
  model: string;
  usedFallback: boolean;
};
