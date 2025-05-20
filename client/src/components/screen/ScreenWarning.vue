<template>
  <div class="screen-warning">
    <div class="screen-warning__icon">
      <IconScreenRotation theme="outline" size="40" fill="#fff" />
    </div>
    <div class="screen-warning__title">
      {{ $t("ScreenWarning__title") }}
    </div>
    <div class="screen-warning__description">
      {{ $t("ScreenWarning__description") }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Icons
import { ScreenRotation as IconScreenRotation } from "@icon-park/vue-next";

defineOptions({ name: "ScreenWarning" });
</script>

<style scoped lang="scss">
.screen-warning {
  @include flexCenter($direction: column);

  display: none;

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

  &__title {
    color: #fff;
    font-size: 40px;
    margin-block: 24px;
  }

  &__description {
    font-size: 24px;
    color: #fff;
  }
}

// 横屏 && 宽度小于768px && 触摸屏
@media (orientation: landscape) and (max-width: 768px) and (pointer: coarse) {
  .screen-warning {
    display: flex;
  }
}
</style>
