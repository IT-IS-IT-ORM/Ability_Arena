<template>
  <div class="login-view">
    <EnterScreen />
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from "vue";
// Components
import EnterScreen from "@/components/screen/EnterScreen.vue";

defineComponent({ name: "LoginView" });
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins.scss";

.login-view {
  @include viewTemplate;
}
</style>
