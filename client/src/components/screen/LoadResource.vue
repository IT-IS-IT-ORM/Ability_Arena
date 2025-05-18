<template>
    <div class="load-resource">
        <h1 class="title">疯狂三国杀</h1>

        <div v-if="isLoading" class="loading">
            <span>加载中...</span>
            <div class="progress-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="240" height="11" viewBox="0 0 240 11">
                    <defs>
                        <pattern id="Pattern" x="0" y="0" width=".040" height="1">
                            <polygon fill="var(--c-primary)" fill-rule="evenodd" points="5 0 11 0 7 11 0 11" />
                        </pattern>
                        <mask id="roundedMask" fill="#fff">
                            <rect width="240" height="11" rx="0" />
                        </mask>
                    </defs>
                    <rect fill="var(--c-primary)" width="240" height="11" stroke="#000" stroke-opacity=".2"
                        fill-opacity=".75" rx="0" />
                    <rect class="bar" fill="url(#Pattern)" width="440" height="11" mask="url(#roundedMask)"></rect>
                </svg>
            </div>
        </div>

        <div v-else class="action">
            <Btn @click="onLogin">进入游戏</Btn>
        </div>

        <div class="version">版本号: 1.0.0</div>
    </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, ref, onMounted } from 'vue';
// Utils
import { loadResource } from '@/utils';
// Constant
import resource from '@/constants/resource';

defineComponent({ name: 'LoadResource' });
const emits = defineEmits(['done']);

const isLoading = ref(true);

onMounted(() => {
    const resourceList = [
        ...resource.header.map(path => loadResource('image', path)),
        ...resource.footer.map(path => loadResource('image', path))
    ];
    Promise.allSettled(resourceList).then(() => {
        // 模拟加载大量资源
        setTimeout(() => {
            isLoading.value = false;
        }, 1500);
    });
});

const onLogin = () => {
    emits('done');
}
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.load-resource {
    width: 100%;
    height: 100%;
    @include flex($direction: column, $alignItems: center, $gap: 4px);

    .title {
        margin: 40px auto 20px auto;
        font-size: 54px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        letter-spacing: 4px;
        text-shadow: 0px 0px 5px var(--c-primary),
            0px 0px 10px var(--c-primary),
            0px 0px 10px var(--c-primary),
            0px 0px 20px var(--c-primary),
            0px 0px 25px var(--c-primary);
    }

    .loading {
        margin-top: auto;

        span {
            display: block;
            font-size: 18px;
            color: #fff;
            text-align: center;
            text-shadow: 0 0 2px #000;
        }

        .progress-bar {
            svg .bar {
                animation: moveRight 8s linear infinite alternate;
            }

            @keyframes moveRight {
                from {
                    x: -140px;
                }

                to {
                    x: 0px;
                }
            }
        }
    }

    .action {
        margin-top: auto;
        @include flex($alignItems: center, $gap: 24px);

        .btn {
            width: 165px;
        }
    }

    .version {
        margin-top: 24px;
        margin-bottom: 8px;
        font-size: 14px;
        color: #fff;
        text-shadow: 0 0 2px #000;
    }
}
</style>