<template>
    <div class="battery">
        <Lightning v-show="charging" theme="filled" :size="16" :strokeWidth="1" fill="var(--c-primary)" />
        <div v-show="!isSupported || level <= 0.1" class="error"></div>
        <div v-show="isSupported" class="level" :style="{ '--level': `${level * 100}%` }"></div>
    </div>
</template>

<script setup lang="ts">
// Hooks
import { useBattery } from '@vueuse/core';
// Icons
import { Lightning } from '@icon-park/vue-next';

const { charging, level, isSupported } = useBattery();
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.battery {
    width: 30px;
    height: 18px;
    border: 2px solid var(--c-primary);
    position: relative;
    cursor: pointer;

    &::after {
        content: "";
        width: 5px;
        height: 10px;
        background-color: var(--c-primary);
        transform: translateY(-50%);
        @include positioned($top: 50%, $left: calc(100%));
    }

    .i-icon-lightning {
        filter: drop-shadow(0 0 1px #fff);
        @include centerPositioned($top: calc(52% + 2px));
    }

    .error {
        width: 4px;
        height: 10px;
        background-color: var(--c-error);
        @include centerPositioned($top: 25%);

        &::after {
            content: "";
            width: 4px;
            height: 4px;
            background-color: inherit;
            @include positioned($top: calc(100% + 2px), $left: 0);
        }
    }

    .level {
        width: var(--level);
        height: 100%;
        background-color: rgb(16, 132, 96);
    }
}
</style>