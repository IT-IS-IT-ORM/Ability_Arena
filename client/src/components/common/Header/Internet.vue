<template>
    <img :src="resource.header[1]" alt="网络" class="internet">
</template>

<script setup lang="ts">
// Constant
import resource from '@/constants/resource';
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.internet {
    width: 45px;
    height: 45px;
    cursor: pointer;
}
</style>