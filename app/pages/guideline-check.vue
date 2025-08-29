<script setup lang="ts">
import { MainButton, TextareaField } from 'admin-ui-components';

const text = ref('');
const result = ref('');
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
        <MainButton text="チェックする" />
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
