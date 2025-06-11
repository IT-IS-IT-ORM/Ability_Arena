<template>
  <div class="screen-warning">
    <div>Screen size not supported</div>
    <div>Please use a screen with a width of 1024px or more.</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ScreenWarning" });
</script>

<style scoped lang="scss">
.screen-warning {
  width: 100%;
  height: 100%;
  padding: 64px;
  @include flexCenter($direction: column, $gap: 32px);
  display: none;

  div {
    color: #fff;
    font-size: 32px;
  }

  @media screen and (max-width: 992px) {
    display: flex;
  }
  @media screen and (max-height: 700px) {
    display: flex;
  }
}
</style>
