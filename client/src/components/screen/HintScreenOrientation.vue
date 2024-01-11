<template>
    <div class="hint-screen-orientation">
        <h1 class="title">疯狂三国杀</h1>

        <p class="info">
            <span>欢迎使用我们的应用！</span>
            <span>当点击 "开始" 按钮后，应用将进入横屏和全屏模式，以提供更好的使用体验。</span>
            <br>
            <span>注意：</span>
            <span>1. 当退出横屏模式时，可能会遇到画面无法渲染的问题。</span>
            <span>如果出现此情况，尝试重新进入横屏模式以解决问题。</span>
            <span>2. 为了最佳体验，确保浏览器处于最新版本。</span>
            <br>
            <span>感谢理解和支持！</span>
        </p>

        <Btn block @click="handleStart">开始</Btn>
    </div>
</template>

<script setup lang="ts">
// Hooks
import { useFullscreen } from 'vue-hooks-plus';

defineComponent({ name: 'HintScreenOrientation' });

const [isFullscreen, { enterFullscreen }] = useFullscreen()

const handleStart = () => {
    if (!isFullscreen.value) {
        enterFullscreen();
    }
    // @ts-ignore
    window.screen.orientation.lock('landscape');
}
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.hint-screen-orientation {
    width: 100%;
    height: 100%;
    padding: 20px;

    .title {
        margin: 0 auto 20px auto;
        font-size: 54px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        letter-spacing: 4px;
        white-space: nowrap;
        text-shadow: 0px 0px 5px var(--c-primary),
            0px 0px 10px var(--c-primary),
            0px 0px 10px var(--c-primary),
            0px 0px 20px var(--c-primary),
            0px 0px 25px var(--c-primary);
    }

    .info {
        margin-bottom: 32px;
        @include flex($direction: column, $gap: 4px);

        span {
            font-size: 14px;
            color: #fff;
        }
    }

    .btn {
        --c-box-shadow: var(--c-primary);
    }
}
</style>