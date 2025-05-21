<template>
  <Layout />
  <ScreenWarning />
</template>

<script setup lang="ts">
// Vue
import { ref, onBeforeMount } from "vue";
// Store
import { useSocketStore } from "@/store/socket";
// i18n
import i18nInstance from "@/i18n/index";
// Utils
import { localStorage } from "@/utils/localStorage";
// Components
import Layout from "@/components/ui/Layout/index.vue";
import ScreenWarning from "@/components/screen/ScreenWarning.vue";

defineOptions({ name: "App" });

// 资源加载完毕 && 授权完成
const socketStore = useSocketStore();

const loadResourceIsDone = ref(false);

onBeforeMount(() => {
  const language = localStorage.get<"en" | "cn" | "kz", "en">("language", "en");
  i18nInstance.global.locale.value = language;
  socketStore.connect();
});
</script>

<style scoped lang="scss">
// 横屏 && 宽度小于768px && 触摸屏
@media (orientation: landscape) and (max-width: 768px) and (pointer: coarse) {
  .layout {
    display: none;
  }
}
</style>
