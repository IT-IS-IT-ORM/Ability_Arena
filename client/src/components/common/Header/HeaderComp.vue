<template>
    <header class="header">
        <img :src="resource.avatar[me.avatarIndex]" alt="头像" class="avatar">
        <div class="info">
            <span class="nickname">{{ me.nickname }}</span>
            <span class="mmr">天梯分: {{ me.mmr }}</span>
        </div>

        <nav class="menu">
            <Notification />
            <Internet />
            <Battery />
        </nav>
    </header>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, onBeforeMount } from 'vue';
// Store
import { storeToRefs } from 'pinia';
import { playerStore } from '@/store/player';
// Utils
import { loadResource } from '@/utils';
// Constants
import resource from '@/constants/resource';

defineComponent({ name: 'Header' });

const { me } = storeToRefs(playerStore());

onBeforeMount(() => {
    loadResource('image', resource.avatar[me.value.avatarIndex]);
});

</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.header {
    width: 100%;
    height: 56px;
    flex: 0 0 60px;
    background-image: linear-gradient(rgba(67, 70, 85, 0.8), rgba(72, 91, 122, 0.8));
    clip-path: polygon(100% 0%, 100% 70%, 18% 70%, 13% 100%, 0% 100%, 0% 0%);
    @include flex($alignItems: center);

    .avatar {
        width: 48px;
        height: 48px;
        border: 1px solid var(--c-primary);
        margin: 0 8px;
        cursor: pointer;
    }

    .info {
        height: 100%;
        padding-top: 6px;
        @include flex($direction: column, $gap: 6px);

        span {
            font-size: 14px;
            line-height: 1;
            color: #fff;
            text-shadow: 0 0 2px #000;
        }

        .nickname {
            font-weight: 500;
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mmr {
            font-size: 10px;
        }
    }

    .menu {
        width: 100%;
        height: 75%;
        align-self: flex-start;
        margin-left: auto;
        padding-right: 20px;
        @include flex($justifyContent: flex-end, $alignItems: center, $gap: 16px);
    }
}
</style>