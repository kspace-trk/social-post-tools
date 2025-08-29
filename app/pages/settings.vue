<script setup lang="ts">
import { InputField, MainButton, SectionTextWithLine, TextareaField, TextItem } from 'admin-ui-components';
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
          v-model="text"
          class="reference-post-input"
          label="投稿文枠組み参考ポスト"
        />
        <div class="button-container">
          <MainButton text="追加" />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            text="/
            📣 投稿文サンプル
            \

            こんにちは！
            a
            b
            "
            show-close-icon
            max-lines="6"
            class="reference-post-item"
          />
          <TextItem
            text="/
            📣 投稿文サンプル
            \

            こんにちは！
            a
            b
            "
            show-close-icon
            max-lines="6"
            class="reference-post-item"
          />
        </div>
      </div>
      <div class="translate-setting">
        <SectionTextWithLine
          text="翻訳設定"
          class="section-text"
        />
        <InputField
          v-model="text"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <MainButton text="追加" />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            text="URLのパスは、vuefes.jp/2025/en のように、/en を追加する"
            show-close-icon
            class="reference-post-item"
          />
          <TextItem
            text="文字数は、Bluesky に対応するように300文字以内"
            show-close-icon
            class="reference-post-item"
          />
        </div>
      </div>
      <div class="guideline-check-setting">
        <SectionTextWithLine
          text="文言チェック設定"
          class="section-text"
        />
        <InputField
          v-model="text"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <MainButton text="追加" />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <TextItem
            text="ハッシュタグに #vuefes を設定"
            show-close-icon
            class="reference-post-item"
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
