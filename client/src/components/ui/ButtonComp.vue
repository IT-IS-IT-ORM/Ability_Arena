<template>
  <button class="button-comp" :class="{ 'button-comp--block': block }">
    <slot></slot>
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
});

const { block } = toRefs(props);
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

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

  &--block {
    width: 100%;
  }
}
</style>
