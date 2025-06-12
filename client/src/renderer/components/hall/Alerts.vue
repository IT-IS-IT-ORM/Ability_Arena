<template>
  <div class="alerts">
    <div v-if="!networkState.online" class="error">
      <IconWarning theme="outline" size="24" fill="#fff" />
      网络连接已断开, 请检查您的网络连接
    </div>
    <div v-if="isSlowNetwork" class="warning">
      <IconWarning theme="outline" size="24" fill="#fff" />
      您的网速过慢, 请检查您的网络连接
    </div>
    <div v-if="!playerStore.isAuthenticated" class="warning">
      <IconWarning theme="outline" size="24" fill="#fff" />
      您尚未登陆, 请先登录才能开始游戏
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from "vue";
// Store
import { usePlayerStore } from "@/store/player";
// Hooks
import { useNetwork } from "vue-hooks-plus";
// Icon
import { TipsOne as IconWarning } from "@icon-park/vue-next";

defineOptions({ name: "Warnings" });

const playerStore = usePlayerStore();

const networkState = useNetwork();

const isSlowNetwork = computed(() => {
  return (
    networkState.value.effectiveType === "slow-2g" ||
    networkState.value.effectiveType === "2g"
  );
});
</script>

<style scoped lang="scss">
.alerts {
  width: 100%;
  @include flex($direction: column);

  .warning,
  .error {
    width: 100%;
    padding: 8px 12px;
    margin-block-end: 16px;
    color: #fff;
    @include flex($alignItems: center, $gap: 8px);
  }

  .warning {
    background-color: var(--c-warning);
  }

  .error {
    background-color: var(--c-error);
  }
}
</style>
