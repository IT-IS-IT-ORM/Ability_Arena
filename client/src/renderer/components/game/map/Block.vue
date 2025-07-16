<template>
  <div class="block"></div>
</template>

<script setup lang="ts">
defineOptions({ name: "Block" });
</script>

<style scoped lang="scss">
.block {
  --block-size: 100px;

  width: var(--block-size);
  height: var(--block-size);
  border-radius: 0;
  border: 1px solid #fff;
  background-color: transparent;
}
</style>
