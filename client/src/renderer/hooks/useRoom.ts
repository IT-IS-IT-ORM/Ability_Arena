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

  const room = computed(() => roomStore.room);
  const rooms = computed(() => roomStore.rooms);
  const roomStatistics = computed(() => roomStore.roomStatistics);
  const roomActions = computed(() => roomStore.roomActions);

  const isMyRoom = computed(() => {
    if (roomStore.room) {
      return roomStore.room.creator === playerStore.me._id;
    }
    return false;
  });

  const { loading: loadingCreateRoom, run: createRoom } = useRequest(
    roomStore.createRoom,
    {
      manual: true,
      onSuccess(room: I_Room) {
        onSuccessCreateRoom?.(room);
      },
    }
  );

  const { loading: loadingJoinRoom, run: joinRoom } = useRequest(
    roomStore.joinRoom,
    {
      manual: true,
      onSuccess(room: I_Room) {
        onSuccessJoinRoom?.(room);
      },
    }
  );

  const { loading: loadingLeaveRoom, runAsync: leaveRoom } = useRequest(
    roomStore.leaveRoom,
    { manual: true }
  );

  const { loading: loadingSendMessage, runAsync: sendMessage } = useRequest(
    (content: string) => {
      return roomStore.sendMessageToRoom(content);
    },
    { manual: true }
  );

  const { loading: loadingSendNotification, runAsync: sendNotification } =
    useRequest(
      (content: string) => {
        return roomStore.sendNotificationToRoom(content);
      },
      { manual: true }
    );

  return {
    room,
    rooms,
    isMyRoom,
    roomStatistics,
    roomActions,
    loadingCreateRoom,
    createRoom,
    loadingJoinRoom,
    joinRoom,
    loadingLeaveRoom,
    leaveRoom,
    loadingSendMessage,
    sendMessage,
    loadingSendNotification,
    sendNotification,
  };
};
