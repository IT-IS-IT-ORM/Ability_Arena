<template>
    <div class="battery" :data-level="power" :style="{ '--color': levelColor }">
        <img :src="resource.header[2]" alt="电量">
    </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';
// Hooks
import { useBattery } from '@vueuse/core';
// Constant
import resource from '@/constants/resource';

const { level, isSupported } = useBattery();

const levelColor = computed(() => {
    if (!isSupported.value) return 'var(--c-error)';

    if (level.value >= 0.75) {
        return 'var(--c-success)';
    }
    else if (level.value >= 0.20) {
        return 'var(--c-primary)';
    }
    return 'var(--c-error)';
});

const power = computed(() => {
    if (!isSupported.value) return '?';
    return `${parseInt((level.value * 100).toString())}%`
})
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.battery {
    width: 45px;
    height: 45px;
    cursor: pointer;
    position: relative;

    img {
        width: 45px;
        height: 45px;
        transform: rotate(90deg);
    }

    &::after {
        font-size: 12px;
        line-height: 1;
        content: attr(data-level);
        color: var(--color);
        @include centerPositioned;
    }
}
</style>