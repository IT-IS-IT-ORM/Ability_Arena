<template>
    <div class="tab-item">
        <div class="icon">
            <slot name="icon"></slot>
        </div>
        <span class="label">
            <slot></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from 'vue';

defineComponent({ name: 'TabItem' });
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.tab-item {
    height: 100%;
    border-right: 1px solid var(--c-primary);
    cursor: pointer;
    @include flexCenter($gap: 16px);

    .label {
        color: #fff;
        text-shadow: 0 0 2px #000;
    }

    .icon {
        width: 40px;
        height: 40px;
    }
}
</style>