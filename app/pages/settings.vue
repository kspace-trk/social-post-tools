<script setup lang="ts">
import { useConfig } from '~/composables/useConfig';

const {
  config,
  addGeneratePostConfig,
  removeGeneratePostConfig,
  addTranslateConfig,
  removeTranslateConfig,
  addGuidelineCheckConfig,
  removeGuidelineCheckConfig,
} = useConfig();

// 入力フィールド用のリアクティブ変数
const generatePostInput = ref('');
const translateInput = ref('');
const guidelineCheckInput = ref('');

// 投稿文生成設定の追加
const handleAddGeneratePost = (): void => {
  if (generatePostInput.value.trim()) {
    addGeneratePostConfig(generatePostInput.value.trim());
    generatePostInput.value = '';
  }
};

// 翻訳設定の追加
const handleAddTranslate = (): void => {
  if (translateInput.value.trim()) {
    addTranslateConfig(translateInput.value.trim());
    translateInput.value = '';
  }
};

// 文言チェック設定の追加
const handleAddGuidelineCheck = (): void => {
  if (guidelineCheckInput.value.trim()) {
    addGuidelineCheckConfig(guidelineCheckInput.value.trim());
    guidelineCheckInput.value = '';
  }
};
</script>

<template>
  <div id="settings">
    <div class="container">
      <div class="generate-post-setting">
        <SectionTextWithLine
          text="投稿文生成設定"
          class="section-text"
        />
        <TextareaField
          v-model="generatePostInput"
          class="reference-post-input"
          label="投稿文枠組み参考ポスト"
        />
        <div class="button-container">
          <MainButton
            text="追加"
            @click="handleAddGeneratePost"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            v-for="item in config.generatePostConfig"
            :key="item.id"
            :text="item.post"
            show-close-icon
            :max-lines="6"
            class="reference-post-item"
            @close="removeGeneratePostConfig(item.id)"
          />
        </div>
      </div>
      <div class="translate-setting">
        <SectionTextWithLine
          text="翻訳設定"
          class="section-text"
        />
        <InputField
          v-model="translateInput"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <MainButton
            text="追加"
            @click="handleAddTranslate"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            v-for="item in config.translateConfig"
            :key="item.id"
            :text="item.rule"
            show-close-icon
            class="reference-post-item"
            @close="removeTranslateConfig(item.id)"
          />
        </div>
      </div>
      <div class="guideline-check-setting">
        <SectionTextWithLine
          text="文言チェック設定"
          class="section-text"
        />
        <InputField
          v-model="guidelineCheckInput"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <MainButton
            text="追加"
            @click="handleAddGuidelineCheck"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            v-for="item in config.guidelineCheckConfig"
            :key="item.id"
            :text="item.rule"
            show-close-icon
            class="reference-post-item"
            @close="removeGuidelineCheckConfig(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#settings {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 680px;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 160px;
}

.generate-post-setting {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.section-text {
  margin-top: 80px;
}

.reference-post-input {
  margin-top: 28px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.reference-post-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.reference-post-list-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #363139;
  margin-top: 16px;
}

.reference-post-item {
  margin-top: 8px;
}
</style>
