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
import { defineComponent, defineModel, toRefs } from "vue";

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
@import "@/assets/style/mixins.scss";

.input-comp {
  width: 100%;
  @include flex($direction: column);

  .input {
    width: 100%;
    padding: 8px 10px;
    outline: none;
    border: 2px solid var(--c-border);
    background-color: #fff;
  }

  .error-message {
    margin-top: 4px;
    font-size: 14px;
    color: var(--c-error);
  }
}
</style>
