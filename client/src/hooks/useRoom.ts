// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { computed } from "vue";
// Store
import { useRoomStore } from "@/store/room";
import { usePlayerStore } from "@/store/player";
// Hooks
import { useRequest } from "vue-hooks-plus";

interface UseRoomProps {
  onSuccessCreateRoom: (room: I_Room) => void;
}

export const useRoom = ({ onSuccessCreateRoom }: UseRoomProps) => {
  const roomStore = useRoomStore();
  const playerStore = usePlayerStore();

  useRequest(roomStore.fetchRooms, {
    pollingInterval: 500,
    ready: !playerStore.me.inRoom && !playerStore.me.inGame,
  });

  const { loading: loadingCreateRoom, run: createRoom } = useRequest(
    roomStore.createRoom,
    {
      manual: true,
      onSuccess(room: I_Room | undefined) {
        if (room) {
          playerStore.me.inRoom = true;
          onSuccessCreateRoom(room);
        }
      },
    }
  );

  const rooms = computed(() => roomStore.rooms);
  const roomStatistics = computed(() => roomStore.roomStatistics);

  return {
    rooms,
    roomStatistics,
    loadingCreateRoom,
    createRoom,
    // joinRoom: roomStore.joinRoom,
    // leaveRoom: roomStore.leaveRoom,
  };
};
