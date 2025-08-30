export type TranslateRequestBody = {
  text: string;
  rules: string[];
};

export type TranslateResponse = {
  translatedText: string;
};
