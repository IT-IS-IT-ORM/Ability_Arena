// 类型
import type { I_Room } from "@/def_types/game";

// React 路由
import { memo } from "react";
import { useHistory } from "react-router-dom";

// 全局状态
import { useRecoilValue } from "recoil";
import { A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";

// Hooks
import {
  useWebSocket,
  useRequest,
  useMount,
  useSafeState,
  useSetState,
  useMemoizedFn,
} from "ahooks";
// API
import { API_GetRooms } from "@/service/game.api";

// Antd 组件
import { message as AntdMessage, Empty } from "antd";
// 自定义组件
import { SearchBar } from "@/components/page-component/search-page";
import {
  RoomCard,
  CreateRoomModal,
} from "@/components/page-component/games-page";
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

export default memo(function GamesPage() {
  const game = useRecoilValue(A_Game);
  const history = useHistory();
  const { t } = useTranslation();

  // 房间列表
  const [roomList, setRoomList] = useSafeState<I_Room[]>([]);
  // 创建房间相关状态
  const [stateOfCreateRoom, setStateOfCreateRoom] = useSetState({
    modalIsOpen: false,
  });

  useRequest(API_GetRooms, {
    onSuccess({ data }) {
      setRoomList(data.sort((a, b) => a.member.length - b.member.length));
    },
    pollingInterval: 2000,
    pollingWhenHidden: false,
    pollingErrorRetryCount: 2,
  });

  const handleCreateRoom = useMemoizedFn((values: I_Room) => {
    console.log(values);
    setStateOfCreateRoom({
      modalIsOpen: false,
    });
  });

  const handleCardClick = (room: I_Room) => {
    history.push(`/room/${room.id}`);
  };

  return (
    <main className={classes.gamesPage}>
      <div className="head">
        <SearchBar />

        <Button onClick={() => setStateOfCreateRoom({ modalIsOpen: true })}>
          {t<string>("GamesPage__createRoom")}
        </Button>

        <CreateRoomModal
          open={stateOfCreateRoom.modalIsOpen}
          onCancel={() => setStateOfCreateRoom({ modalIsOpen: false })}
          onCreate={handleCreateRoom}
        />
      </div>

      {roomList.length !== 0 && (
        <div className="game-list">
          {roomList.map((room) => (
            <RoomCard key={room.id} room={room} onClick={handleCardClick} />
          ))}
        </div>
      )}
      {roomList.length === 0 && (
        <Empty
          className="rooom-is-empty"
          description={t("GamesPage__noRoom")}
        />
      )}
    </main>
  );
});
