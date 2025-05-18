<template>
  <div class="wiki-view">Wiki View</div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";

defineComponent({ name: "WikiView" });
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.wiki-view {
  @include viewTemplate;
}
</style>
