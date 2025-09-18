<script setup lang="ts">
const { data, pending, checkGuideline } = useGuidelineCheck();
const { config } = useConfig();

const text = ref('');
const result = ref('');

// ガイドラインチェックを実行する関数
const handleCheck = async (): Promise<void> => {
  if (!text.value.trim()) {
    return;
  }

  // useConfigからrulesを取得
  const rules = config.value.guidelineCheckConfig.map(item => item.rule);

  const response = await checkGuideline({
    text: text.value,
    rules,
  });

  if (response) {
    result.value = response.guidelineCheckText;
  }
};
</script>

<template>
  <div id="index">
    <div class="container">
      <TextareaField
        v-model="text"
        class="textarea-input"
        label="文言チェック"
      />
      <div class="button-container">
        <MainButton
          text="チェックする"
          :loading="pending"
          :disabled="!text.trim()"
          @click="handleCheck"
        />
      </div>

      <TextareaField
        v-model="result"
        class="textarea-result"
        label="結果"
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
