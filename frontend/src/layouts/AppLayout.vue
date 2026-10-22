<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import DefaultLayout from "./DefaultLayout.vue";
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const layout = shallowRef(DefaultLayout);

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const component = await import(`./${meta.layout}.vue`);
        layout.value = component?.default || DefaultLayout;
      } else {
        layout.value = DefaultLayout;
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      layout.value = DefaultLayout;
    }
  },
  { immediate: true },
);
</script>
