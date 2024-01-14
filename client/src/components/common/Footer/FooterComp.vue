<template>
    <footer class="footer">
        <TabItem v-for="(path, index) in resource.footer" :key="path">
            <template #icon>
                <img :src="path" alt="图标" class="icon">
            </template>
            {{ tabItemNames[index] }}
        </TabItem>

        <Start class="start-btn" />
    </footer>
</template>

<script setup lang="ts">
// Vue
import { defineComponent } from 'vue';
// Constant
import resource from '@/constants/resource';

defineComponent({ name: 'Footer' });

const tabItemNames = ['英雄', '物品', '百科'];
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.footer {
    width: 100%;
    height: 64px;
    flex: 0 0 64px;
    box-shadow: rgba(0, 0, 0, 0.6) 0 -1px 2px;
    background-image: linear-gradient(rgba(34, 47, 72, 0.88), rgba(35, 56, 96, 0.88));
    @include flex($alignItems: center);

    .tab-item {
        flex: 1 1 100%;

        .icon {
            width: 40px;
            height: 40px;
        }
    }

    .start-btn {
        flex: 1 1 100%;
    }
}
</style>