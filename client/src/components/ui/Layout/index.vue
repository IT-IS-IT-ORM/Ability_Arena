<template>
  <div class="layout">
    <div class="box">
      <Transition name="should-show-sider">
        <Sider v-if="shouldShowSider" />
      </Transition>
      <PageContent />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from "vue";
// Store
import { usePlayerStore } from "@/store/player";
// Components
import Sider from "@/components/ui/Layout/Sider/index.vue";
import PageContent from "@/components/ui/Layout/PageContent.vue";

defineOptions({ name: "Layout" });

const playerStore = usePlayerStore();

const shouldShowSider = computed(() => {
  if (!playerStore.isAuthenticated) return true;
  return !(playerStore.me.inRoom || playerStore.me.inGame);
});
</script>

<style scoped lang="scss">
.layout {
  @include flexCenter();

  width: 100dvw;
  height: 100dvh;
  background: #000;

  @supports (padding: env(safe-area-inset-top)) {
    & {
      padding-top: env(safe-area-inset-top);
      padding-right: env(safe-area-inset-right);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
    }
  }

  @supports (padding: constant(safe-area-inset-top)) {
    & {
      padding-top: constant(safe-area-inset-top);
      padding-right: constant(safe-area-inset-right);
      padding-bottom: constant(safe-area-inset-bottom);
      padding-left: constant(safe-area-inset-left);
    }
  }

  .box {
    display: flex;
    position: relative;
    overflow: hidden;

    width: 85%;
    max-width: 1280px;
    height: 85%;
    max-height: 920px;

    border-radius: 12px;
    background: #0f0c29;
    background: linear-gradient(45deg, #24243e, #302b63, #0f0c29);
    box-shadow: rgba(52, 61, 233, 0.4) -2px 0 96px 24px;

    transition: var(--transition);

    @media screen and (max-width: 992px) {
      flex-direction: column;
    }

    @media screen and (max-width: 576px) {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

    .should-show-sider-enter-active,
    .should-show-sider-leave-active {
      @media screen and (min-width: 992px) {
        transform: translateX(0);
      }
      @media screen and (max-width: 992px) {
        transform: translateY(0);
      }
    }
    .should-show-sider-enter-from,
    .should-show-sider-leave-to {
      @media screen and (min-width: 992px) {
        transform: translateX(-100%);
      }
      @media screen and (max-width: 992px) {
        transform: translateY(-100%);
      }
    }
  }
}
</style>
