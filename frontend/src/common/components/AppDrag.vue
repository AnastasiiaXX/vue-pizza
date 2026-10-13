<script setup>
import { DATA_TRANSFER_PAYLOAD } from '@/common/constants/index.js';

const props = defineProps({
  canDrag: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
});

function onDrag({ dataTransfer }) {
  dataTransfer.setData(DATA_TRANSFER_PAYLOAD, JSON.stringify(props.item));
}
</script>

<template>
  <div :draggable="canDrag" @dragstart.self="onDrag">
    <slot />
  </div>
</template>
