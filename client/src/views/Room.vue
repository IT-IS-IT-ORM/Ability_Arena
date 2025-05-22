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
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

// Router
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
// Hooks
import { useRoom } from "@/hooks/useRoom";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Icons
import { Logout as IconLogout } from "@icon-park/vue-next";

const route = useRoute();
const router = useRouter();

const {
  room,
  loadingGetRoomById,
  getRoomById,
  loadingLeaveRoom,
  leaveRoom,
  continueFetchRooms,
} = useRoom();

onBeforeRouteLeave(() => {
  console.log("onBeforeRouteLeave!!");
  continueFetchRooms();
});

function handleLeaveRoom() {
  if (room.value) {
    leaveRoom(room.value.id);
  }

  const canBack = window.history.length > 1;

  if (canBack) {
    router.back();
  } else {
    router.push("/game");
  }
}
</script>

<style scoped lang="scss">
.room-view {
  padding: 24px;

  &__header {
    @include flex($alignItems: center);

    .leave-btn {
      flex-shrink: 0;
      margin-inline-end: 8px;
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
      font-weight: 700;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
