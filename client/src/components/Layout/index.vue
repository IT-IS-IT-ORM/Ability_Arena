<template>
  <div class="layout">
    <div class="box">
      <Sider v-if="!inGame" />
      <PageContent />
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from "vue";
// Router
import { useRoute } from "vue-router";
// Components
import Sider from "@/components/Layout/Sider/index.vue";
import PageContent from "@/components/Layout/PageContent.vue";

const route = useRoute();

const inGame = computed(
  // TODO: 判断是否在游戏中
  () => false
);

defineOptions({ name: "LayoutTemplate" });
</script>

<style scoped lang="scss">
.layout {
  @include flexCenter();

  width: 100dvw;
  height: 100dvh;
  background: #000;

  .box {
    display: flex;

    width: 85%;
    max-width: 1280px;
    height: 85%;
    max-height: 920px;
    border-radius: 12px;
    background: #0f0c29;
    background: linear-gradient(45deg, #24243e, #302b63, #0f0c29);
    box-shadow: rgba(52, 61, 233, 0.4) -2px 0 96px 24px;
    transition: width var(--transition), height var(--transition);

    @media screen and (max-width: 992px) {
      flex-direction: column;
    }

    @media screen and (max-width: 576px) {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
}
</style>
