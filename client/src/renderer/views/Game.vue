<template>
  <div class="game-view">
    <Map></Map>
  </div>
</template>

<script setup lang="ts">
// Components
import Map from "@/components/game/map/Index.vue";

defineOptions({ name: "GameView" });
</script>

<style scoped lang="scss">
.game-view {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-shadow: inset rgba(52, 61, 233, 0.4) -2px 0 96px 24px;
}
</style>
