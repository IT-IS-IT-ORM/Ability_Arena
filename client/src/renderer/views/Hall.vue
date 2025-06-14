<template>
  <div class="hall-view">
    <Alerts />

    <div class="hall-view__header">
      <InputComp
        v-model="roomName"
        type="text"
        :placeholder="$t('HallPage__roomNamePlaceholder')"
        :errorMessage="roomNameError"
      />
      <ButtonComp :loading="loadingCreateRoom" @click="handleCreateRoom">
        {{ $t("HallPage__createRoom") }}
      </ButtonComp>
    </div>

    <div class="hall-view__statistics">
      <div>
        <IconPeoplesTwo theme="outline" size="16" fill="#fff" />
        {{ $t("HallPage__onlinePlayers") }}:
        <strong>{{ roomStatistics.onlinePlayers }}</strong>
      </div>
      <div>
        <IconArena theme="outline" size="16" fill="#fff" />
        {{ $t("HallPage__roomCount") }}:
        <strong>{{ roomStatistics.roomsCount }}</strong>
      </div>
    </div>

    <div class="hall-view__room-list">
      <RoomCard v-for="room in rooms" :key="room._id" :room="room" />
      <div v-if="rooms.length === 0" class="hall-view__room-list-empty">
        {{ $t("HallPage__empty") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { ref, onMounted, onBeforeUnmount } from "vue";
// Router
import { useRouter } from "vue-router";
// Store
import { usePlayerStore } from "@/store/player";
import { useRoomStore } from "@/store/room";
// i18n
import { useI18n } from "vue-i18n";
// Hooks
import { useRoom } from "@/hooks/useRoom";
// Components
import InputComp from "@/components/ui/InputComp.vue";
import ButtonComp from "@/components/ui/ButtonComp.vue";
import Alerts from "@/components/hall/Alerts.vue";
import RoomCard from "@/components/game/room/RoomCard.vue";
// Icons
import {
  PeoplesTwo as IconPeoplesTwo,
  Arena as IconArena,
} from "@icon-park/vue-next";

const router = useRouter();
const playerStore = usePlayerStore();
const roomStore = useRoomStore();
const { t } = useI18n();

const roomName = ref("");
const roomNameError = ref("");

onMounted(() => {
  roomStore.fetchRooms();
});

onBeforeUnmount(() => {
  roomStore.stopFetchRooms();
});

const { rooms, roomStatistics, loadingCreateRoom, createRoom } = useRoom({
  onSuccessCreateRoom: (room: I_Room) => {
    router.push({
      name: "room",
      params: { id: room._id },
    });
  },
});

function handleCreateRoom() {
  if (!playerStore.isAuthenticated) {
    roomNameError.value = t("Shared__needAuth");
    return;
  }

  const roomNameVal = roomName.value.trim();

  if (!roomNameVal) {
    roomNameError.value = t("HallPage__roomNameRequired");
    return;
  }

  if (roomNameVal.length > 12) {
    roomNameError.value = t("HallPage__roomNameMaxLength");
    return;
  }

  roomNameError.value = "";
  createRoom(roomNameVal);
}
</script>

<style scoped lang="scss">
.hall-view {
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
    }
  }

  &__room-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;

    &-empty {
      color: #fff;
    }
  }
}
</style>
