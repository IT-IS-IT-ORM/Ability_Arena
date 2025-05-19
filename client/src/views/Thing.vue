<template>
  <div class="thing-view">Thing View</div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";

defineComponent({ name: "ThingView" });
</script>

<style scoped lang="scss">
.thing-view {
  @include viewTemplate;
}
</style>
