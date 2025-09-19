<script setup lang="ts">
const { data, pending, translateText } = useTranslate();
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

      <KSTextareaField
        v-model="result"
        class="textarea-result"
        label="翻訳結果"
        rows="10"
      />
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

.textarea-result {
  margin-top: 120px;
}
</style>
