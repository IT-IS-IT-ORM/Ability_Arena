<template>
  <aside class="sider">
    <h1 class="brand">
      <span>Play</span>
      <span>ground</span>
    </h1>

    <div
      class="navigator-btn"
      role="button"
      @click="isOpenNavbar = !isOpenNavbar"
    >
      <IconApplicationMenu theme="outline" size="24" fill="var(--c-text)" />
    </div>

    <Navbar :isOpen="isOpenNavbar" />

    <div class="logo">
      <span>Powered by</span>
      <strong>IT IS IT</strong>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
// Components
import Navbar from "@/components/Layout/Sider/Navbar.vue";
// Icons
import { ApplicationMenu as IconApplicationMenu } from "@icon-park/vue-next";

defineOptions({ name: "Sider" });

const isOpenNavbar = ref(false);
</script>

<style scoped lang="scss">
.sider {
  flex: 0 0 250px;
  position: relative;
  @include flex($direction: column);

  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  background: #f9f9f9;

  user-select: none;

  @media screen and (max-width: 992px) {
    flex: 0 0 64px;
    @include flex($direction: row, $alignItems: center, $gap: 8px);

    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  @media screen and (max-width: 576px) {
    gap: 0;
  }

  .brand {
    margin: 32px 0 36px 24px;

    span {
      font-size: 24px;
      font-weight: 700;
    }

    span:first-child {
      color: var(--c-primary);
    }

    @media screen and (max-width: 992px) {
      margin: 0 0 0 24px;
    }
  }

  .navigator-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-left: auto;

    display: none;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: background-color var(--transition);

    &:hover {
      background: rgba(232, 234, 237, 0.88);
    }

    svg {
      @include svgStyle();
    }

    @media screen and (max-width: 992px) {
      display: flex;
    }

    @media screen and (max-width: 576px) {
      margin: 0 8px 0 auto;
    }
  }

  .logo {
    @include flex($direction: column);

    margin: auto 24px 24px 24px;

    color: #000;
    line-height: 1;

    span {
      font-size: 16px;
    }

    strong {
      font-weight: 700;
      font-size: 20px;
    }

    @media screen and (max-width: 992px) {
      margin: 0 24px 0 0;
    }

    @media screen and (max-width: 576px) {
      margin-right: 16px;

      span {
        font-size: 12px;
      }

      strong {
        font-weight: 700;
        font-size: 16px;
      }
    }
  }
}
</style>
