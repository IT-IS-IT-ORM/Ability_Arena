<template>
    <button class="btn" :class="{ 'btn--block': props.block }">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from 'vue';

defineComponent({ name: 'Btn' });

const props = defineProps<{
    block: boolean
}>();
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.btn {
    // css vars
    --c-box-shadow: #000;

    color: #000;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;

    @include flex($justifyContent: center, $alignItems: center, $gap: 12px);

    padding: 12px 16px;
    border: none;
    outline: none;
    background: #fff;
    box-shadow: 1px 1px 1px 1px var(--c-box-shadow),
        2px 2px 0 0 var(--c-box-shadow), 3px 3px 0 0 var(--c-box-shadow),
        4px 4px 0 0 var(--c-box-shadow), 5px 5px 0 0 var(--c-box-shadow);
    box-sizing: border-box;

    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    transition: transform var(--transition), box-shadow var(--transition);

    &:active {
        box-shadow: 0 0 0 0;
        transform: translate(5px, 5px);
    }

    &--block {
        width: 100%;
    }
}
</style>