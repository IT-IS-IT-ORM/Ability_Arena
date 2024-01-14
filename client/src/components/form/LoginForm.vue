<template>
    <a-form :model="formState" hideRequiredMark name="login" layout="vertical" autocomplete="off" @finish="onFinish">
        <a-form-item label="昵称" name="nickname" :rules="[{ required: true, message: '昵称不可为空' }]">
            <a-input v-model:value="formState.nickname" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不可为空' }]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item>
            <Btn block type="submit">登录</Btn>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, reactive } from 'vue';

defineComponent({ name: '' });

interface FormState {
    nickname: String;
    password: String;
}

const formState = reactive<FormState>({
    nickname: '',
    password: ''
});

const onFinish = (values: FormState) => {
    console.log('values: ', values);
}

</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.ant-form {
    ::v-deep(.ant-form-item) {
        margin-bottom: 16px;

        .ant-form-item-label {
            padding-bottom: 1px;

            label {
                font-size: 12px;
                color: #fff;
                text-shadow: 0 0 2px #000;
            }
        }

        .ant-form-item-explain-error {
            padding-top: 1px;
            font-size: 12px;
            color: var(--c-error);
            text-shadow: 0 0 2px #ffffff20;
        }

        .ant-input {
            padding: 4px 10px;
        }

        .ant-input-affix-wrapper {
            padding: 0;
            padding-right: 8px;
        }

        .btn {
            margin-top: 14px;
        }
    }
}
</style>
