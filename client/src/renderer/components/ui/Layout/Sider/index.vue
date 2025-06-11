<template>
  <aside class="sider">
    <h1 class="brand">
      <span>
        {{ $i18n.locale !== "cn" ? "Ability" : "技能" }}
      </span>
      <span>{{ $i18n.locale !== "cn" ? "Arena" : "征召" }}</span>
    </h1>

    <Navbar />

    <div class="logo" href="https://itisit.netlify.app/" target="_blank">
      <span>Powered by</span>
      <strong>IT IS IT</strong>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Components
import Navbar from "@/components/ui/Layout/Sider/Navbar.vue";

defineOptions({ name: "Sider" });
</script>

<style scoped lang="scss">
.sider {
  flex: 0 0 250px;
  position: relative;
  transition: var(--transition);
  @include flex($direction: column);

  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  background: #f9f9f9;

  user-select: none;

  .brand {
    padding: 24px;

    span {
      font-size: 32px;

      &:first-child {
        color: var(--c-primary);
        margin-inline-end: 8px;
      }
    }
  }

  .logo {
    @include flex($direction: column);

    margin: auto 24px 24px 24px;

    color: #000;
    line-height: 1;
    text-decoration: none;

    span {
      font-size: 16px;
    }

    strong {
      font-size: 20px;
    }
  }
}
</style>
