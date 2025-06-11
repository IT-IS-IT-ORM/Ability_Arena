<template>
  <Layout />
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
