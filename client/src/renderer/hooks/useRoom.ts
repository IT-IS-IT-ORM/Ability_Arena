// Type-Def
import type { I_Room } from "@/type-def/Room";

// Vue
import { computed, watch } from "vue";
// Router
import { useRoute } from "vue-router";
// Store
import { useRoomStore } from "@/store/room";
import { usePlayerStore } from "@/store/player";
// Hooks
import { useRequest } from "vue-hooks-plus";

interface UseRoomProps {
  onSuccessCreateRoom?: (room: I_Room) => void;
  onSuccessJoinRoom?: (room: I_Room) => void;
  onErrorGetRoomById?: (error: any) => void;
}

export const useRoom = ({
  onSuccessCreateRoom,
  onSuccessJoinRoom,
  onErrorGetRoomById,
}: UseRoomProps = {}) => {
  const roomStore = useRoomStore();
  const playerStore = usePlayerStore();
  const route = useRoute();

  const roomId = computed(() => {
    // 在房间内
    if (route.name === "room") {
      return route.params.id as string;
    }
    return null;
  });

  const isMyRoom = computed(() => {
    if (roomStore.room) {
      return roomStore.room.creator === playerStore.me._id;
    }
    return false;
  });

  const fetchRoomsOptions = computed(() => {
    // 不在房间内且不在游戏中
    const keepPollingRooms = !playerStore.me.inRoom && !playerStore.me.inGame;

    return {
      pollingInterval: 500,
      ready: keepPollingRooms,
    };
  });

  useRequest(roomStore.fetchRooms, fetchRoomsOptions.value);

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

  const fetchRoomInfoOptions = computed(() => {
    return {
      // 轮询房间信息，如果玩家在游戏中，则轮询间隔为2秒，否则为500毫秒
      pollingInterval: playerStore.me.inGame ? 2000 : 500,
      ready: !!roomId.value,
      onSuccess(room: I_Room | undefined) {
        if (room) {
          playerStore.me.inRoom = true;
          roomStore.room = room;
        }
      },
      onError(error: any) {
        onErrorGetRoomById?.(error);
      },
    };
  });

  const { loading: loadingGetRoomById, run: getRoomById } = useRequest(
    () => roomStore.getRoomById(roomId.value as string),
    fetchRoomInfoOptions.value
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

  const { loading: loadingLeaveRoom, runAsync: leaveRoom } = useRequest(
    roomStore.leaveRoom,
    {
      manual: true,
      onFinally() {
        roomStore.room = null;
        playerStore.me.inRoom = false;
      },
    }
  );

  // 发送消息
  const { loading: loadingSendMessage, runAsync: sendMessage } = useRequest(
    (content: string) => {
      if (!roomId.value) return Promise.reject("No room ID");
      return roomStore.sendRoomMessage(roomId.value, content);
    },
    {
      manual: true,
    }
  );

  // 发送通知
  const { loading: loadingSendNotification, runAsync: sendNotification } =
    useRequest(
      (content: string) => {
        if (!roomId.value) return Promise.reject("No room ID");
        return roomStore.sendRoomNotification(roomId.value, content);
      },
      {
        manual: true,
      }
    );

  const room = computed(() => roomStore.room);
  const rooms = computed(() => roomStore.rooms);
  const roomStatistics = computed(() => roomStore.roomStatistics);
  const roomActions = computed(() => roomStore.roomActions);

  watch(
    room,
    () => {
      if (room.value) {
        roomStore.fetchRoomMessages();
      } else {
        roomStore.cancelFetchRoomMessages();
      }
    },
    { immediate: true }
  );

  return {
    room,
    rooms,
    isMyRoom,
    roomStatistics,
    roomActions,
    loadingCreateRoom,
    createRoom,
    loadingGetRoomById,
    getRoomById,
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
