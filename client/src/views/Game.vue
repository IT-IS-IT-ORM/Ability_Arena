<template>
  <div class="game-view">
    <div class="game-view__header">
      <InputComp
        v-model="roomName"
        type="text"
        placeholder="输入房间名称"
        :errorMessage="roomNameError"
      />
      <ButtonComp
        :loading="loadingCreateRoom"
        @click="handleCreateRoom"
      >
        创建房间
      </ButtonComp>
    </div>

    <div class="game-view__statistics">
      <div>
        <IconPeoplesTwo theme="outline" size="16" fill="#fff" />
        在线人数: <strong>{{ roomStatistics.onlinePlayers }}</strong>
      </div>
      <div>
        <IconArena theme="outline" size="16" fill="#fff" />
        房间数: <strong>{{ roomStatistics.roomsCount }}</strong>
      </div>
    </div>

    <div class="game-view__room-list">
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { ref } from "vue";
// Router
import { useRouter } from "vue-router";
// Store
import { useRoom } from "@/hooks/useRoom";
// Components
import InputComp from "@/components/ui/InputComp.vue";
import ButtonComp from "@/components/ui/ButtonComp.vue";
import RoomCard from "@/components/game/room/RoomCard.vue";
// Icons
import {
  PeoplesTwo as IconPeoplesTwo,
  Arena as IconArena,
} from "@icon-park/vue-next";

const router = useRouter();

const roomName = ref("");
const roomNameError = ref("");

const { rooms, roomStatistics, loadingCreateRoom, createRoom } = useRoom({
  onSuccessCreateRoom: (room: I_Room) => {
    router.push({
      name: "room",
      params: { id: room.id },
    });
  },
});

function handleCreateRoom() {
  const roomNameVal = roomName.value.trim();
  
  if (!roomNameVal) {
    roomNameError.value = "房间名称不能为空";
    return;
  }

  if (roomNameVal.length > 12) {
    roomNameError.value = "房间名称不能超过12个字符";
  }

  roomNameError.value = "";
  createRoom(roomNameVal);
}
</script>

<style scoped lang="scss">
.game-view {
  padding: 24px;

  &__header {
    margin-block-end: 24px;
    @include flex($gap: 8px);

    .input-comp {
      flex-grow: 1;
    }

    .button-comp {
      flex-shrink: 0;
    }
  }

  &__statistics {
    margin-block-end: 24px;
    @include flex($alignItems: center, $gap: 16px);

    div {
      color: #fff;
      @include flex($alignItems: center, $gap: 4px);
    }

    .i-icon {
      transform: translateY(2px);
    }

    strong {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }
  }

  &__room-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
}
</style>
