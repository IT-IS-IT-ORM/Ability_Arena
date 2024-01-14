<template>
    <Wifi theme="filled" :size="26" :strokeWidth="3" fill="var(--c-primary)" />
</template>

<script setup lang="ts">
// Icons
import { Wifi } from '@icon-park/vue-next';
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.i-icon-wifi {
    cursor: pointer;
    @include positioned($position: relative, $top: 2px);
}
</style>