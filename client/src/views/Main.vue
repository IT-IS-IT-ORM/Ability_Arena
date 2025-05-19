<template>
  <div class="main-view">
    <MainScreen />
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";
// Components
import MainScreen from "@/components/screen/MainScreen.vue";

defineComponent({ name: "MainView" });
</script>

<style scoped lang="scss">
.main-view {
  @include viewTemplate;
}
</style>
