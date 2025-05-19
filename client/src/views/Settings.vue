<template>
  <div class="settings-view">
    <EnterScreen />
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";
// Components
import EnterScreen from "@/components/screen/EnterScreen.vue";

defineComponent({ name: "SettingsView" });
</script>

<style scoped lang="scss">
.settings-view {
  @include viewTemplate;
}
</style>
