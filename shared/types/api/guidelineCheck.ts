export type GuidelineCheckRequestBody = {
  text: string;
  rules: string[];
};

export type GuidelineCheckResponse = {
  guidelineCheckText: string;
};
