<script setup>
import { DATA_TRANSFER_PAYLOAD } from '@/common/constants/index.js';

const emit = defineEmits(['drop']);
function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }

  const data = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (!data) {
    return;
  }
  emit('drop', JSON.parse(data));
}
</script>

<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
