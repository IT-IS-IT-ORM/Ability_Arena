<template>
  <button
    class="button-comp"
    :class="{
      'button-comp--block': block,
      'button-comp--loading': loading,
    }"
  >
    <div v-show="loading" class="button-comp__loading">加载中...</div>

    <div v-show="!loading" class="button-comp__content">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: "ButtonComp" });

defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.button-comp {
  // css vars
  --btn-text: var(--c-text);
  --btn-border-color: var(--c-border);
  --btn-background: #fff;
  --btn-box-shadow: #000;

  font-weight: 400;
  font-size: 20px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;

  @include flex($justifyContent: center, $alignItems: center, $gap: 12px);

  padding: 12px 16px;
  border: none;
  outline: none;
  background: #fff;
  box-shadow: 1px 1px 1px 1px var(--btn-box-shadow),
    2px 2px 0 0 var(--btn-box-shadow), 3px 3px 0 0 var(--btn-box-shadow),
    4px 4px 0 0 var(--btn-box-shadow), 5px 5px 0 0 var(--btn-box-shadow);
  box-sizing: border-box;

  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: var(--transition);

  &:active {
    box-shadow: 0 0 0 0;
    transform: translate(5px, 5px);
  }

  &__content {
    width: 100%;
    font: inherit;
  }

  &:active {
    transform: scale(0.95);
  }

  &--block {
    width: 100%;
  }

  &--loading {
    pointer-events: none;
  }
}
</style>
