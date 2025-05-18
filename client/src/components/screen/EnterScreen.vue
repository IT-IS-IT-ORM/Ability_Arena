<template>
  <div class="enter-screen">
    <h1 class="title">疯狂三国杀</h1>
    <InputComp
      v-model="state.username"
      class="username"
      placeholder="用户名"
      :errorMessage="state.errorMessage"
    />
    <ButtonComp block class="enter-btn" @click="handleEnter"> 进入 </ButtonComp>
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineComponent, reactive } from "vue";
// Components
import InputComp from "@/components/ui/InputComp.vue";
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Socket
import { io } from "socket.io-client";

defineComponent({ name: "EnterScreen" });

const state = reactive({
  username: "",
  errorMessage: "",
});

const validateUsername = () => {
  const username = state.username.trim();

  if (username === "") {
    state.errorMessage = "用户名不能为空";
    return false;
  }

  if (username.length > 8) {
    state.errorMessage = "用户名不能超过8个字符";
    return false;
  }

  return true;
};

const handleEnter = () => {
  if (!validateUsername()) return;

  const body = JSON.stringify({ username: state.username });
  fetch("http://127.0.0.1:8000/login", { method: "POST", body })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.isOk) {
        state.errorMessage = data.message;
        return;
      }
    })
    .catch((error) => {
      state.errorMessage = error.message ?? error;
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
@import "@/assets/style/mixins.scss";

.enter-screen {
  width: 300px;
  max-width: 100%;
  padding: 16px;
  background-color: #fff;
  @include flex($direction: column);

  .title {
    font-size: 20px;
    align-self: center;
    margin-bottom: 16px;
  }

  .username {
    margin-bottom: 16px;
  }

  .enter-btn {
  }
}
</style>
