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
  exportConfig,
  importConfig,
} = useConfig();

// 入力フィールド用のリアクティブ変数
const generatePostInput = ref('');
const translateInput = ref('');
const guidelineCheckInput = ref('');

// 設定の共有
const isImportModalOpen = ref(false);
const importInput = ref('');
const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error'>('success');

const showToast = (message: string, type: 'success' | 'error'): void => {
  toastMessage.value = message;
  toastType.value = type;
  toastVisible.value = true;
};

const handleCopyConfig = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(exportConfig());
    showToast('設定をクリップボードにコピーしました', 'success');
  }
  catch {
    showToast('コピーに失敗しました', 'error');
  }
};

const handleOpenImportModal = (): void => {
  importInput.value = '';
  isImportModalOpen.value = true;
};

const handleImportConfig = (): void => {
  try {
    importConfig(importInput.value);
    isImportModalOpen.value = false;
    showToast('設定を反映しました', 'success');
  }
  catch {
    showToast('設定の形式が正しくありません', 'error');
  }
};

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
      <div class="share-setting">
        <KSSectionTextWithLine
          text="設定の共有"
          class="section-text"
        />
        <p class="share-description">
          設定をコピーして他の人と共有できます。共有された設定を貼り付けて反映することもできます。
        </p>
        <div class="share-buttons">
          <KSMainButton
            text="設定をコピー"
            @click="handleCopyConfig"
          />
          <KSMainButton
            text="設定を貼り付け"
            @click="handleOpenImportModal"
          />
        </div>
      </div>
      <div class="generate-post-setting">
        <KSSectionTextWithLine
          text="投稿文生成設定"
          class="section-text"
        />
        <KSTextareaField
          v-model="generatePostInput"
          class="reference-post-input"
          label="投稿文枠組み参考ポスト"
        />
        <div class="button-container">
          <KSMainButton
            text="追加"
            @click="handleAddGeneratePost"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <KSTextItem
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
        <KSSectionTextWithLine
          text="翻訳設定"
          class="section-text"
        />
        <KSTextareaField
          v-model="translateInput"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <KSMainButton
            text="追加"
            @click="handleAddTranslate"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <KSTextItem
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
        <KSSectionTextWithLine
          text="文言チェック設定"
          class="section-text"
        />
        <KSTextareaField
          v-model="guidelineCheckInput"
          class="reference-post-input"
          label="ルール"
        />
        <div class="button-container">
          <KSMainButton
            text="追加"
            @click="handleAddGuidelineCheck"
          />
        </div>
        <div class="reference-post-list">
          <p class="reference-post-list-title">
            登録済み
          </p>
          <KSTextItem
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

    <KSModal
      :open="isImportModalOpen"
      title="設定を貼り付け"
      width="560px"
      @close="isImportModalOpen = false"
    >
      <p class="import-modal-description">
        共有された設定のJSONを貼り付けてください。現在の設定は上書きされます。
      </p>
      <KSTextareaField
        v-model="importInput"
        label="設定JSON"
        :rows="10"
      />
      <template #footer>
        <div class="import-modal-footer">
          <KSMainButton
            text="キャンセル"
            type="cancel"
            @click="isImportModalOpen = false"
          />
          <KSMainButton
            text="反映する"
            :disabled="!importInput.trim()"
            @click="handleImportConfig"
          />
        </div>
      </template>
    </KSModal>

    <KSToast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      position="top-center"
      @close="toastVisible = false"
    />
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

.share-description {
  font-size: 0.85rem;
  color: #555;
  margin-top: 16px;
  line-height: 1.6;
}

.share-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 16px;
}

.import-modal-description {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 16px;
  line-height: 1.6;
}

.import-modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
