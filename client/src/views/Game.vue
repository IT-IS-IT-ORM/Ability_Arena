<template>
  <div class="game-view">
    <div class="game-view__header">
      <InputComp v-model="roomName" type="text" placeholder="输入房间名称" />
      <ButtonComp :loading="loadingCreateRoom" @click="createRoom">
        创建房间
      </ButtonComp>
    </div>

    <div class="game-view__statistics">
      <div>
        <IconPeoplesTwo theme="outline" size="16" fill="#fff" />
        在线人数: <strong>{{ roomStatistics.onlinePlayers }}</strong>
      </div>
      <div>
        <IconTowerOfPisa theme="outline" size="16" fill="#fff" />
        房间数: <strong>{{ roomStatistics.roomsCount }}</strong>
      </div>
    </div>

    <div class="game-view__room-list">
      <Room v-for="room in rooms" :key="room.id" :room="room" />
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
import Room from "@/components/game/room/Room.vue";
// Icons
import {
  PeoplesTwo as IconPeoplesTwo,
  TowerOfPisa as IconTowerOfPisa,
} from "@icon-park/vue-next";

const router = useRouter();

const { rooms, roomStatistics, loadingCreateRoom, createRoom } = useRoom({
  onSuccessCreateRoom: (room: I_Room) => {
    router.push(`/game/${room.id}`);
  },
});
const roomName = ref("");
</script>

<style scoped lang="scss">
.game-view {
  padding: 24px;

  &__header {
    margin-block-end: 24px;
    @include flex($alignItems: center, $gap: 8px);

    .input-comp {
      flex-grow: 1;
    }

    .button-comp {
      flex-shrink: 0;
    }
  }

  &__statistics {
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
}
</style>
