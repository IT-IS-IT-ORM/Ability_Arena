<template>
  <div class="hero-view">Hero View</div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";

defineComponent({ name: "HeroView" });
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.hero-view {
  @include viewTemplate;
}
</style>
