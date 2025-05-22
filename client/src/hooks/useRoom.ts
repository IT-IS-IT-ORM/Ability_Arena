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
  onSuccessCreateRoom?: (room: I_Room) => void;
  onSuccessJoinRoom?: (room: I_Room) => void;
}

export const useRoom = ({
  onSuccessCreateRoom,
  onSuccessJoinRoom,
}: UseRoomProps = {}) => {
  const roomStore = useRoomStore();
  const playerStore = usePlayerStore();

  const keepPollingRooms = computed(()=>{
    return !playerStore.me.inRoom && !playerStore.me.inGame
  });

  const { run: continueFetchRooms } = useRequest(roomStore.fetchRooms, {
    pollingInterval: 500,
    ready: keepPollingRooms.value,
  });

  const { loading: loadingCreateRoom, run: createRoom } = useRequest(
    roomStore.createRoom,
    {
      manual: true,
      onSuccess(room: I_Room | undefined) {
        if (room) {
          playerStore.me.inRoom = true;
          roomStore.room = room;
          onSuccessCreateRoom?.(room);
        }
      },
    }
  );

  const { loading: loadingGetRoomById, run: getRoomById } = useRequest(
    roomStore.getRoomById,
    { manual: true }
  );

  const { loading: loadingJoinRoom, run: joinRoom } = useRequest(
    roomStore.joinRoom,
    {
      manual: true,
      onSuccess(room: I_Room) {
        playerStore.me.inRoom = true;
        roomStore.room = room;
        onSuccessJoinRoom?.(room);
      },
    }
  );

  const { loading: loadingLeaveRoom, run: leaveRoom } = useRequest(
    roomStore.leaveRoom,
    {
      manual: true,
      onFinally() {
        roomStore.room = null;
        playerStore.me.inRoom = false;
        console.log("leaveRoom success: ", playerStore.me);
      },
    }
  );

  const room = computed(() => roomStore.room);
  const rooms = computed(() => roomStore.rooms);
  const roomStatistics = computed(() => roomStore.roomStatistics);

  return {
    room,
    rooms,
    roomStatistics,
    loadingCreateRoom,
    createRoom,
    loadingGetRoomById,
    getRoomById,
    loadingJoinRoom,
    joinRoom,
    loadingLeaveRoom,
    leaveRoom,
    continueFetchRooms,
    // joinRoom: roomStore.joinRoom,
    // leaveRoom: roomStore.leaveRoom,
  };
};
