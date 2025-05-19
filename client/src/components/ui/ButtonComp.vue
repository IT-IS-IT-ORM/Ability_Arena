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
// Vue
import { defineComponent, toRefs } from "vue";

defineComponent({ name: "ButtonComp" });

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { block, loading } = toRefs(props);
</script>

<style scoped lang="scss">
.button-comp {
  // css vars
  --c-box-shadow: var(--c-primary);

  color: #000;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;

  @include flex($justifyContent: center, $alignItems: center, $gap: 12px);

  padding: 8px 10px;
  border: 2px solid var(--c-border);
  outline: none;
  background: #fff;
  box-sizing: border-box;

  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  transition: var(--transition);

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
