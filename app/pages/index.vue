<script setup lang="ts">
import { MainButton, TextareaField } from 'admin-ui-components';

const requirements = ref('');
const { data, pending, error, generatePost } = useGeneratePost();
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
</script>

<template>
  <div id="index">
    <div class="container">
      <TextareaField
        v-model="requirements"
        class="textarea-input"
        label="どんな要件？"
        placeholder=""
      />

      <div class="button-container">
        <MainButton
          text="生成する"
          :disabled="!requirements.trim() || pending"
          :loading="pending"
          @click="handleGenerate"
        />
      </div>

      <TextareaField
        :model-value="displayResult"
        class="textarea-result"
        label="生成結果"
        rows="10"
        readonly
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
  margin-top: 40px;
}
</style>
