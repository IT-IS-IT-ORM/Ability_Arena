<template>
  <div class="settings-view">
    <SettingsScreen />
  </div>
</template>

<script setup lang="ts">
// Components
import SettingsScreen from "@/components/screen/SettingsScreen.vue";

defineOptions({ name: "SettingsView" });
</script>

<style scoped lang="scss">
.settings-view {
}
</style>
