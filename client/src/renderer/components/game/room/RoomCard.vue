<template>
  <div class="room-card">
    <div class="field">
      <IconArena theme="outline" size="16" fill="var(--c-text)" />
      <div>{{ room.name }}</div>
    </div>
    <div class="field">
      <IconPeoplesTwo theme="outline" size="16" fill="var(--c-text)" />
      <div>
        <span>玩家人数:</span>
        <span>{{ room.members.length }}</span>
      </div>
    </div>

    <div class="room__footer">
      <div class="status">
        <span>房间状态:</span>
        <span>{{ roomStatus }}</span>
      </div>

      <ButtonComp @click="handleActionBtn">
        {{ canJoinRoom ? "加入" : "观战" }}
      </ButtonComp>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { computed } from "vue";
// Router
import { useRouter } from "vue-router";
// Store
import { usePlayerStore } from "@/store/player";
// Hooks
import { useRoom } from "@/hooks/useRoom";
// Components
import ButtonComp from "@/components/ui/ButtonComp.vue";
// Icons
import {
  PeoplesTwo as IconPeoplesTwo,
  Arena as IconArena,
} from "@icon-park/vue-next";

defineOptions({ name: "RoomCard" });

const props = defineProps<{ room: I_Room }>();

const router = useRouter();
const playerStore = usePlayerStore();
const { joinRoom } = useRoom({
  onSuccessJoinRoom: (room: I_Room) => {
    router.push({
      name: "room",
      params: { id: room.id },
    });
  },
});

const roomStatus = computed(() => {
  if (props.room.status === "waiting") {
    return "等待中";
  }

  return "游戏中";
});

const canJoinRoom = computed(() => {
  const maxPlayers = 10;

  return (
    props.room.status === "waiting" && props.room.members.length < maxPlayers
  );
});

const handleActionBtn = () => {
  if (canJoinRoom.value) {
    joinRoom(props.room.id);
  } else {
    // 观战
    playerStore.me.inGame = true;
  }
};
</script>

<style scoped lang="scss">
.room-card {
  --box-shadow: #000;

  padding: 16px;
  background-color: #fff;
  box-shadow: 1px 1px 1px 1px var(--box-shadow), 2px 2px 0 0 var(--box-shadow),
    3px 3px 0 0 var(--box-shadow), 4px 4px 0 0 var(--box-shadow),
    5px 5px 0 0 var(--box-shadow);

  .field {
    margin-block-end: 8px;
    @include flex($alignItems: center, $gap: 8px);
  }

  .room__footer {
    @include flex($justifyContent: space-between, $alignItems: center);
  }
}
</style>
