<template>
  <div
    ref="Ref_SelectComp"
    class="select-comp"
    :class="{ 'options-visible': isOptionsVisible }"
    @click="isOptionsVisible = !isOptionsVisible"
  >
    <div v-if="label" class="select-comp__label">
      {{ label }}
    </div>

    <div class="select-comp__selected">
      <slot name="selected" :selectedValue="selectedValue">
        {{ selectedValue ?? placeholder ?? "Select" }}
      </slot>
      <IconDown />
    </div>

    <div class="select-comp__options">
      <div
        v-for="option in options"
        :key="option[valueAttr || 'value']"
        class="select-comp__option"
        @click="selectedValue = option[valueAttr || 'value']"
      >
        {{ option[labelAttr || "label"] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, useTemplateRef } from "vue";
// Hooks
import { onClickOutside } from "@vueuse/core";
// Icon
import { Down as IconDown } from "@icon-park/vue-next";

interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

const props = defineProps<{
  labelAttr?: string;
  valueAttr?: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}>();

const selectedValue = defineModel<string | number>("value");
const isOptionsVisible = ref(false);

const Ref_SelectComp = useTemplateRef("Ref_SelectComp");

onClickOutside(Ref_SelectComp, () => {
  isOptionsVisible.value = false;
});
</script>

<style scoped lang="scss">
.select-comp {
  // css vars
  --btn-text: var(--c-text);
  --btn-border-color: var(--c-border);
  --btn-background: #fff;
  --btn-box-shadow: #000;

  position: relative;

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

  &__selected {
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    @include flex(
      $justifyContent: space-between,
      $alignItems: center,
      $gap: 8px
    );

    .i-icon {
      transform: translateY(3px);
      transition: var(--transition);
    }
  }

  &.options-visible {
    .select-comp__selected {
      .i-icon {
        transform: translateY(0) rotate(180deg);
      }
    }
  }

  &__options {
    width: 100%;
    border: none;
    outline: none;
    background: #fff;
    box-shadow: 1px 1px 1px 1px var(--btn-box-shadow),
      2px 2px 0 0 var(--btn-box-shadow), 3px 3px 0 0 var(--btn-box-shadow),
      4px 4px 0 0 var(--btn-box-shadow), 5px 5px 0 0 var(--btn-box-shadow);
    box-sizing: border-box;

    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);

    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    transition: var(--transition);

    @include flex($direction: column);
    @include positioned($top: calc(100% + 8px), $left: 0);
  }

  &.options-visible {
    .select-comp__options {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }

  &__option {
    width: 100%;
    padding: 8px 12px;
    transition: var(--transition);

    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
}
</style>
