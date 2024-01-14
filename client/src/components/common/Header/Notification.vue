<template>
    <Mail theme="outline" :size="26" :strokeWidth="3" fill="var(--c-primary)" />
</template>

<script setup lang="ts">
// Icons
import { Mail } from '@icon-park/vue-next';
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.i-icon-mail {
    cursor: pointer;
    @include positioned($position: relative, $top: 3px);
}
</style>