<template>
  <div class="enter-screen">
    <h1 class="title">
      <span>Ability Arena</span>
      <span>技能征召</span>
    </h1>

    <InputComp
      v-model="formState.username"
      class="username"
      :placeholder="$t('PlayerForm__username')"
      :errorMessage="formState.errorMessage"
    />
    <ButtonComp
      block
      class="enter-btn"
      :loading="formState.isLoading"
      @click="handleEnter"
    >
      {{ $t("Auth__login") }}
    </ButtonComp>
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, reactive } from "vue";
// Router
import { useRouter } from "vue-router";
// Store
import { usePlayerStore } from "@/store/player";
// i18n
import { useI18n } from "vue-i18n";
// Components
import InputComp from "@/components/ui/InputComp.vue";
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Socket
import { io } from "socket.io-client";
// Utils
import { fetchInstance } from "@/utils/fetchInstance";

defineComponent({ name: "EnterScreen" });

const router = useRouter();
const playerStore = usePlayerStore();
const { t } = useI18n();

const formState = reactive({
  username: "",
  errorMessage: "",
  isLoading: false,
});

const validateUsername = () => {
  const username = formState.username.trim();

  if (username === "") {
    formState.errorMessage = t("PlayerForm__usernameCannotBeEmpty");
    return false;
  }

  if (username.length > 24) {
    formState.errorMessage = t("PlayerForm__usernameMaxLength");
    return false;
  }

  return true;
};

const handleEnter = () => {
  if (formState.isLoading) return;

  if (!validateUsername()) return;

  formState.isLoading = true;

  fetchInstance("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username: formState.username }),
  })
    .then(async (response) => {
      const responseData = await response.json();

      if (response.status !== 200) {
        return Promise.reject(responseData);
      }

      return responseData;
    })
    .then((response) => {
      playerStore.setMe(response.data);
      router.push("/");
    })
    .catch((error) => {
      formState.errorMessage = error.message ?? error;
      formState.isLoading = false;
    })
    .finally(() => {
      formState.isLoading = false;
    });

  // const socket = io(`http://127.0.0.1:8000`, { reconnection: false });

  // socket.on("connect", () => {
  //   console.log("连接了", socket);
  // });

  // socket.on("disconnect", () => {
  //   console.log("断开了");
  // });
};
</script>

<style scoped lang="scss">
.enter-screen {
  width: 300px;
  max-width: 100%;
  padding: 16px;
  background-color: #fff;
  @include flex($direction: column);

  .title {
    align-self: center;
    margin-bottom: 16px;
    @include flex($direction: column, $alignItems: center, $gap: 8px);

    span {
      font-size: 20px;
    }
  }

  .username {
    margin-bottom: 16px;
  }

  .enter-btn {
  }
}
</style>
