<script setup lang="ts">
const requirements = ref('');
const { data, pending, error, fallbackLogs, generatePost } = useGeneratePost();
const { config } = useConfig();

const handleGenerate = async (): Promise<void> => {
  if (!requirements.value.trim()) {
    return;
  }

  // useConfigから保存済みの参考投稿を取得
  const configReferencePostsArray = config.value.generatePostConfig.map(item => item.post);

  await generatePost({
    requirements: requirements.value,
    referencePosts: configReferencePostsArray,
  });
};

// 生成結果を表示用に計算
const displayResult = computed(() => {
  if (error.value) {
    return `エラー: ${error.value}`;
  }
  return data.value?.post || '';
});

const modelInfo = computed(() => data.value?.model || '');
const usedFallback = computed(() => data.value?.usedFallback || false);
</script>

<template>
  <div id="index">
    <div class="container">
      <KSTextareaField
        v-model="requirements"
        class="textarea-input"
        label="どんな要件？"
        placeholder=""
      />

      <div class="button-container">
        <KSMainButton
          text="生成する"
          :disabled="!requirements.trim() || pending"
          :loading="pending"
          @click="handleGenerate"
        />
      </div>

      <div v-if="fallbackLogs.length > 0" class="fallback-logs">
        <p v-for="(log, i) in fallbackLogs" :key="i" class="fallback-log">
          {{ log.from }} が混雑中... {{ log.to }} にフォールバック
        </p>
      </div>

      <KSTextareaField
        :model-value="displayResult"
        class="textarea-result"
        label="生成結果"
        :rows="10"
        readonly
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
  margin-top: 40px;
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
