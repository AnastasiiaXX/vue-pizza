<script setup>
import sauces from "@/common/data/sauces.js";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in items"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauces[sauce.id]"
        :checked="sauces[sauce.id] === modelValue"
        @change="emit('update:modelValue', sauces[sauce.id])"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
