<template>
  <div class="room-view">
    <div class="room-view__header">
      <ButtonComp
        class="leave-btn"
        :loading="loadingLeaveRoom"
        @click="handleLeaveRoom"
      >
        <IconLogout theme="outline" size="24" fill="var(--c-text)" />
        离开房间
      </ButtonComp>

      <div class="room-view__header-name">
        {{ room ? room.name : "加载中..." }}
      </div>
    </div>

    <template v-if="room">
      <div class="room-view__content">
        <div ref="Ref_ChatBox" class="chat-box">
          <component
            v-for="action in roomActions"
            :key="action.type + action.timestamp"
            :is="getComponentByActionType(action.type)"
            :dataSource="action"
          />
        </div>

        <div class="group-members" :class="{ 'is-show': isShowGroupInfo }">
          <div class="group-members__title">
            Room members ({{ room.members.length }}/10)
          </div>

          <div class="group-members__list">
            <div
              v-for="member in room.members"
              :key="member._id"
              class="group-members__item"
            >
              <img
                class="avatar"
                :src="playerStore.avatarList[member.avatarIndex]"
              />

              <div class="username">
                <span v-if="member._id === room.creator"> [房主] </span>
                <span>{{ member.username }}</span>
              </div>

              <ButtonComp v-if="isMyRoom && !isMe(member)" class="kick-btn">
                <IconKungfu theme="outline" size="24" fill="var(--c-text)" />
                移除
              </ButtonComp>
            </div>
          </div>
        </div>
      </div>

      <div class="room-view__footer">
        <div class="input-box">
          <InputComp v-model="inputMessage" @keyup.enter="handleSendMessage" />
          <ButtonComp @click="handleSendMessage">
            <IconSend theme="outline" size="24" fill="var(--c-text)" />
          </ButtonComp>
        </div>

        <div class="actions">
          <ButtonComp
            block
            class="group-info-btn"
            @click="isShowGroupInfo = !isShowGroupInfo"
          >
            {{ isShowGroupInfo ? "Hide Room Members" : "Show Room Members" }}
          </ButtonComp>
          <ButtonComp
            block
            :loading="loadingSendNotification"
            @click="handleStartGame"
          >
            Start Game
          </ButtonComp>
        </div>
      </div>
    </template>
    <div v-else class="loading-box">Loading...</div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { ref, useTemplateRef, onMounted } from "vue";
// Router
import { useRouter } from "vue-router";
// Hooks
import { useRoom } from "@/hooks/useRoom";
// Store
import { usePlayerStore } from "@/store/player";
// Components
import InputComp from "@/components/ui/InputComp.vue";
import ButtonComp from "@/components/ui/ButtonComp.vue";
import Message from "@/components/game/room/Message.vue";
import Notification from "@/components/game/room/Notification.vue";
// Icons
import {
  Logout as IconLogout,
  Send as IconSend,
  Kungfu as IconKungfu,
} from "@icon-park/vue-next";

const router = useRouter();
const playerStore = usePlayerStore();

const isShowGroupInfo = ref(false);
const Ref_ChatBox = useTemplateRef("Ref_ChatBox");
const inputMessage = ref("");

const {
  room,
  isMyRoom,
  roomActions,
  loadingLeaveRoom,
  leaveRoom,
  loadingSendMessage,
  sendMessage,
  loadingSendNotification,
  sendNotification,
} = useRoom({
  onErrorGetRoomById(error: any) {
    if (error.error === "room_not_found") {
      alert("房间不存在");
      router.push("/hall");
    }
  },
});

function isMe(member: I_Room["members"][number]) {
  return member._id === playerStore.me._id;
}

function getComponentByActionType(actionType: string) {
  switch (actionType) {
    case "message":
      return Message;
    case "playerJoined":
    case "playerLeft":
      return Notification;
    default:
      return null;
  }
}

onMounted(() => {
  // 滚动到底部
  if (Ref_ChatBox.value) {
    Ref_ChatBox.value.scrollTo({
      top: Ref_ChatBox.value.scrollHeight,
      behavior: "smooth",
    });
  }
});

async function handleLeaveRoom() {
  if (room.value) {
    // 需要等待, 否则离开页面后 hook 会被销毁, 之后的异步代码不会被执行到
    await leaveRoom(room.value.id);
  }

  const canBack = window.history.length > 1;

  if (canBack) {
    router.back();
  } else {
    router.push("/hall");
  }
}

async function handleStartGame() {
  if (isMyRoom.value) {
    await sendNotification("游戏开始!");
  } else {
    const username = playerStore.me.username;
    await sendNotification(`${username} 希望开始游戏`);
  }
}

async function handleSendMessage() {
  if (loadingSendMessage.value) return;
  if (inputMessage.value.trim() === "") return;
  await sendMessage(inputMessage.value);
  inputMessage.value = "";
}
</script>

<style scoped lang="scss">
.room-view {
  --header-height: 76px;
  --footer-height: 96px;
  --group-members-width: 220px;
  --content-height: calc(
    100% - var(--header-height) - var(--footer-height) - 24px
  );
  padding: 24px;

  &__header {
    height: var(--header-height);
    padding-block-end: 24px;
    border-bottom: 1px solid #fff;
    @include flex($alignItems: center);

    .leave-btn {
      flex-shrink: 0;
      margin-inline-end: 16px;
      @include flex($alignItems: center, $gap: 4px);

      .i-icon {
        display: inline-block;
        transform: translateY(2px) rotate(-180deg);
      }
    }

    &-name {
      margin-inline: auto;

      color: #fff;
      font-size: 24px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__content {
    height: var(--content-height);
    margin-block: 24px;
    overflow: visible auto;
    @include useScroll;
    @include flex($gap: 16px);

    .chat-box {
      flex-grow: 1;
      height: 100%;
      padding-inline-end: 16px;
      overflow: hidden auto;
      @include useScroll;
      @include flex($direction: column, $gap: 32px);

      & > * {
        width: 100%;
      }
    }

    .group-members {
      flex-shrink: 0;
      width: var(--group-members-width);
      height: 100%;

      &__title {
        color: #fff;
        height: 16px;
        margin-block-end: 16px;
      }

      &__list {
        height: calc(100% - 32px);
        overflow: hidden auto;
        @include useScroll;
        @include flex($direction: column, $gap: 16px);
      }

      &__item {
        width: 100%;
        padding-inline-end: 8px;
        padding-block-end: 8px;
        @include flex($alignItems: center, $gap: 8px);

        .avatar {
          --size: 32px;
          flex-shrink: 0;
          width: var(--size);
          height: var(--size);
          object-fit: cover;
          border-radius: 50%;
        }

        .username {
          span {
            color: #fff;
            font-size: 14px;
          }
        }

        :deep(.kick-btn) {
          flex-shrink: 0;
          padding: 2px 8px;
          margin-inline-start: auto;

          .button-comp__content {
            @include flex($alignItems: center, $gap: 4px);

            .i-icon {
              display: inline-block;
              transform: translateY(2px);
            }
          }
        }
      }
    }
  }

  &__footer {
    height: var(--footer-height);
    border-top: 1px solid #fff;
    margin-block-start: 24px;
    padding-block: 24px;
    @include flex;
    @include positioned($position: relative, $zIndex: 10);

    & > * {
      width: 100%;
    }

    .input-box {
      flex-grow: 1;
      margin-inline-end: 16px;
      @include flex;

      :deep(.input-comp) {
        flex-grow: 1;
      }

      :deep(.button-comp) {
        width: 44px;
        height: 44px;
        padding: 0;

        .button-comp__content {
          height: 24px;
        }
      }
    }

    .actions {
      flex: 0 0 var(--group-members-width);

      .group-info-btn {
        display: none;
      }
    }
  }

  .loading-box {
    color: #fff;
    font-size: 40px;
    height: calc(100% - var(--header-height));
    @include flexCenter;
  }
}
</style>
