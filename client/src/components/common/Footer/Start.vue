<template>
    <Btn>开始游戏</Btn>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from 'vue';

defineComponent({ name: 'Strat' });
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.btn {
    --c-box-shadow: transparent;
    height: 100%;

    &:active {
        transform: none;
        color: #fff;
        background-color: #000;
    }
}
</style>