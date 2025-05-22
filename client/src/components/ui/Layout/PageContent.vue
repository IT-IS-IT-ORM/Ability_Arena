<template>
  <div class="page-content">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PageContent" });
</script>

<style scoped lang="scss">
.page-content {
  flex-grow: 1;
  overflow: hidden auto;
  transition: var(--transition);

  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;

  > * {
    height: 100%;
  }
}
</style>
