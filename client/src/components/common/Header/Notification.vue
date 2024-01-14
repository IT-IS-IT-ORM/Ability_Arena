<template>
    <img :src="resource.header[0]" alt="消息" class="notification">
</template>

<script setup lang="ts">
// Constant
import resource from '@/constants/resource';
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.notification {
    width: 45px;
    height: 45px;
    cursor: pointer;
}
</style>