<script setup lang="ts">
const { data, pending, fallbackLogs, translateText } = useTranslate();
const { config } = useConfig();

const text = ref('');
const result = ref('');

// 翻訳を実行する関数
const handleTranslate = async (): Promise<void> => {
  if (!text.value.trim()) {
    return;
  }

  // useConfigからrulesを取得
  const rules = config.value.translateConfig.map(item => item.rule);

  const response = await translateText({
    text: text.value,
    rules,
  });

  if (response) {
    result.value = response.translatedText;
  }
};

const modelInfo = computed(() => data.value?.model || '');
const usedFallback = computed(() => data.value?.usedFallback || false);
</script>

<template>
  <div id="index">
    <div class="container">
      <KSTextareaField
        v-model="text"
        class="textarea-input"
        label="何を翻訳する？"
      />
      <div class="button-container">
        <KSMainButton
          text="翻訳する"
          :loading="pending"
          :disabled="!text.trim()"
          @click="handleTranslate"
        />
      </div>

      <div v-if="fallbackLogs.length > 0" class="fallback-logs">
        <p v-for="(log, i) in fallbackLogs" :key="i" class="fallback-log">
          {{ log.from }} が混雑中... {{ log.to }} にフォールバック
        </p>
      </div>

      <KSTextareaField
        v-model="result"
        class="textarea-result"
        label="翻訳結果"
        :rows="10"
      />

      <div v-if="modelInfo" class="model-info">
        <p v-if="usedFallback" class="fallback-notice">
          モデルが混雑していたため、別のモデルにフォールバックしました
        </p>
        <p class="model-name">
          model: {{ modelInfo }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#index {
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
}

.textarea-input {
  margin-top: 80px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.fallback-logs {
  margin-top: 16px;
  padding: 8px 12px;
  background: #fff8f0;
  border: 1px solid #f0d0a0;
  border-radius: 6px;
}

.fallback-log {
  font-size: 12px;
  color: #e67e22;
  margin: 4px 0;
}

.textarea-result {
  margin-top: 120px;
}

.model-info {
  margin-top: 8px;
  text-align: right;
}

.fallback-notice {
  font-size: 12px;
  color: #e67e22;
  margin: 0;
}

.model-name {
  font-size: 11px;
  color: #999;
  margin: 2px 0 0;
}
</style>
