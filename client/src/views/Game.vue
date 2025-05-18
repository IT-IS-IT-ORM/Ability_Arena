<template>
  <div class="game-view">Game View</div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";

defineComponent({ name: "GameView" });
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.game-view {
  @include viewTemplate;
}
</style>
