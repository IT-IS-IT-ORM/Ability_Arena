<template>
  <div
    ref="Ref_Map"
    class="map"
    :style="{
      '--map-size': MAP_SIZE,
    }"
  >
    <Block v-for="i in MAP_SIZE * MAP_SIZE" :key="i" />
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from "vue";
// Components
import Block from "@/components/game/map/Block.vue";
// Constants
import { MAP_SIZE } from "@/components/game/map/constants";

defineOptions({ name: "Map" });

const Ref_Map = useTemplateRef<HTMLDivElement>("Ref_Map");
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  overflow: auto;
  @include useScroll($type: none);

  display: grid;
  grid-template-rows: repeat(var(--map-size), 1fr);
  grid-template-columns: repeat(var(--map-size), 1fr);
}
</style>
