<template>
  <a-config-provider v-bind="antdConfig">
    <a-app>
      <div class="app">
        <div v-if="!hintScreenSize && !hintScreenOrientation" class="box" :class="{ 'box--mobile': isMobile() }">
          <LoadResource />
        </div>

        <HintScreenOrientation v-else-if="hintScreenOrientation" />

        <div v-else-if="hintScreenSize" class="hint-screen-size"></div>
      </div>
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
// Hooks
import { useEventListener } from 'vue-hooks-plus';
// Constants
import antdConfig from '@/constants/antd';
// Utils
import { isMobile, isLandscape, isIdealScreen } from '@/utils';

defineComponent({ name: 'App' });

// 与屏幕相关的代码
const hintScreenSize = ref(!isMobile() && !isIdealScreen());
const hintScreenOrientation = ref(isMobile() && !isLandscape());

const initScreen = () => {
  hintScreenSize.value = !isMobile() && !isIdealScreen();
  hintScreenOrientation.value = isMobile() && !isLandscape();
}

useEventListener('resize', initScreen);
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.app {
  width: 100dvw;
  height: 100dvh;
  background: #000;
  @include flexCenter();

  .box {
    width: 780px;
    max-width: 100%;
    height: 353px;
    max-height: 100%;
    border-radius: 12px;
    background-image: url('@/assets/image/background.jpeg');
    background-repeat: no-repeat;
    background-size: auto auto;
    background-attachment: fixed;
    background-position: center;
    box-shadow: rgba(52, 61, 233, 0.4) -2px 0 96px 24px;

    &--mobile {
      width: 100%;
      height: 100%;
      border-radius: 0;
      background-size: 100% 100%;
    }
  }
}
</style>
