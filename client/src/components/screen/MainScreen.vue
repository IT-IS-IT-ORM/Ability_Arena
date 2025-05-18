<template>
  <div class="main-screen">
    <h1 class="title">疯狂三国杀</h1>

    <ul class="tabs">
      <li class="tab">英雄</li>
      <li class="tab">物品</li>
      <li class="tab">百科</li>
      <li class="tab">设置</li>
    </ul>

    <ButtonComp block> 开始匹配 </ButtonComp>
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";

defineComponent({ name: "MainScreen" });
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.main-screen {
  width: 300px;
  max-width: 100%;

  .title {
    font-size: 20px;
    color: #fff;
    text-align: center;
    margin-bottom: 24px;
  }

  .tabs {
    display: grid;
    grid-template-rows: repeat(2, 60px);
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 24px;

    .tab {
      --border-style: 2px solid var(--c-border);

      padding: 8px;
      background-color: #fff;
      @include flexCenter;

      list-style: none;
      cursor: pointer;

      &:nth-child(1) {
        border-right: var(--border-style);
        border-bottom: var(--border-style);
      }
      &:nth-child(2) {
        border-bottom: var(--border-style);
      }
      &:nth-child(3) {
        border-right: var(--border-style);
      }
    }
  }
}
</style>
