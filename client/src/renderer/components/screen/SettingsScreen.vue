<template>
  <div
    class="settings-screen"
    :class="{ 'settings-screen--show': isShowAvatarGrid }"
  >
    <div class="head">
      <div class="avatar-wrap">
        <img
          alt="avatar"
          :src="playerStore.avatarList[playerStore.me.avatarIndex]"
        />
      </div>
      <ButtonComp @click="isShowAvatarGrid = !isShowAvatarGrid">
        {{ $t("SettingsPage__changeAvatar") }}
      </ButtonComp>
    </div>

    <div class="avatar-grid" :class="{ 'avatar-grid--show': isShowAvatarGrid }">
      <img
        v-for="(avatarSrc, index) in playerStore.avatarList"
        alt="avatar"
        :key="index"
        :src="avatarSrc"
        @click="handleAvatarChange(index)"
      />
    </div>

    <div class="bottom" :class="{ 'bottom--hide': isShowAvatarGrid }">
      <div v-if="playerStore.isAuthenticated" class="group">
        <div class="mmr">{{ $t("MMR") }}: {{ playerStore.me.mmr }}</div>
      </div>

      <div class="group">
        <div class="label">
          <span>{{ $t("PlayerForm__username") }}: </span>
        </div>
        <InputComp v-model="username" :errorMessage="usernameError" />
      </div>

      <div class="group">
        <ButtonComp
          :loading="loadingLogin || loadingUpdate"
          @click="handleSubmit"
        >
          {{
            $t(
              playerStore.isAuthenticated ? "SettingsPage__save" : "Auth__login"
            )
          }}
        </ButtonComp>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
// Store
import { usePlayerStore } from "@/store/player";
import { useSocketStore } from "@/store/socket";
// Hooks
import { useSettingsService } from "@/service/SettingsService";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
import InputComp from "@/components/ui/InputComp.vue";

defineOptions({ name: "SettingsScreen" });

const playerStore = usePlayerStore();
const socketStore = useSocketStore();

const isShowAvatarGrid = ref(false);
const username = ref(playerStore.me.username);
const usernameError = ref("");

const handleAvatarChange = (i: number) => {
  playerStore.me.avatarIndex = i;
  isShowAvatarGrid.value = false;
};

const { loadingLogin, loadingUpdate, login, update } = useSettingsService({
  onSuccessLogin(response) {
    usernameError.value = "";
    playerStore.setMe(response.data);
    // 重新连接, 附带 auth 信息
    socketStore.disconnect();
    socketStore.connect();
  },
  onErrorLogin(error) {
    usernameError.value = error.message;
  },
  onSuccessUpdate(response) {
    usernameError.value = "";
    playerStore.setMe(response.data);
    // 重新连接, 更新 player 信息
    socketStore.disconnect();
    socketStore.connect();
  },
  onErrorUpdate(error) {
    usernameError.value = error.message;
  },
});

const handleSubmit = () => {
  if (playerStore.isAuthenticated) {
    update({
      playerId: playerStore.me._id,
      username: username.value,
      avatarIndex: playerStore.me.avatarIndex,
    });
  } else {
    login(username.value, playerStore.me.avatarIndex);
  }
};
</script>

<style scoped lang="scss">
.settings-screen {
  position: relative;
  height: 100%;
  padding: 32px 24px;

  .head {
    @include flex($alignItems: center, $gap: 32px);

    .avatar-wrap {
      flex-shrink: 0;

      width: 140px;
      height: 140px;

      border-radius: 50%;
      border: 1px solid #fff;

      background: #000;
      box-shadow: rgba(52, 61, 233, 0.4) 0 0 28px 6px;

      @include flexCenter;

      img {
        width: 100%;
        height: 100%;

        border-radius: inherit;
        object-fit: cover;
      }
    }
  }

  .avatar-grid {
    position: absolute;
    @include flex($wrap: wrap, $gap: 20px);
    @include useScroll;

    width: calc(100% - 24px * 2);
    max-height: calc(100% - 32px * 2 - 140px - 32px);
    overflow: hidden auto;
    margin-top: 32px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
    transition: var(--transition);

    &--show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);

      img {
        pointer-events: auto;
      }
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid transparent;
      background: #000;

      cursor: pointer;
      transition: var(--transition);

      &:hover {
        border-color: #fff;
        box-shadow: rgba(52, 61, 233, 0.4) 0 0 28px 6px;
      }
    }
  }

  .bottom {
    margin-top: 32px;
    @include flex($direction: column, $gap: 20px);

    pointer-events: auto;
    opacity: 1;
    transition: var(--transition);

    &--hide {
      pointer-events: none;
      opacity: 0;
    }

    .group {
      @include flex($direction: column, $gap: 8px);
      color: #eee;

      &:last-child {
        button {
          width: 220px;
          max-width: 100%;
        }
      }

      .label {
        color: #fff;

        span {
          color: currentColor;
        }
      }

      .field {
        width: 220px;
        height: 46px;

        &,
        .ant-select-selection-item {
          color: #1e1e1e;
          font: inherit;
        }

        .ant-select-selector {
          height: inherit;
          color: #1e1e1e;
          font: inherit;

          @include flex($alignItems: center);
        }

        // Antd select down arrow icon
        .anticon {
          svg {
            color: #000;
          }
        }
      }

      .mmr {
        color: #fff;
      }
    }
  }
}
</style>
