<template>
  <RouterView />
</template>

<script setup lang="ts">
// Vue
import { defineComponent, ref } from "vue";
// Utilss
import { isLandscape } from "@/utils";

defineComponent({ name: "App" });

// 资源加载完毕 && 授权完成
const loadResourceIsDone = ref(false);
</script>
