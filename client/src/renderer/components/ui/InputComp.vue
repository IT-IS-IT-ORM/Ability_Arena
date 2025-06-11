<template>
  <div class="input-comp">
    <input v-model="model" class="input" :placeholder="placeholder" />

    <span v-show="errorMessage" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, toRefs } from "vue";

defineComponent({ name: "InputComp" });

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const model = defineModel<string>();

const { placeholder } = toRefs(props);
</script>

<style scoped lang="scss">
.input-comp {
  width: 220px;
  @include flex($direction: column);

  .input {
    // css vars
    --btn-text: var(--c-text);
    --btn-border-color: var(--c-border);
    --btn-background: #fff;
    --btn-box-shadow: #000;

    font-weight: 400;
    font-size: 20px;
    letter-spacing: 2px;
    text-decoration: none;

    @include flex($justifyContent: center, $alignItems: center, $gap: 12px);

    width: 100%;
    padding: 12px 16px;
    border: none;
    outline: none;
    background: #fff;
    box-sizing: border-box;

    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    transition: var(--transition);

    &:active {
      transform: translate(5px, 5px);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .error-message {
    margin-top: 4px;
    font-size: 14px;
    color: var(--c-error);
  }
}
</style>
