// Types
import type { I_WS_Message, I_WS_ChatMessage } from "@/def_types/game";

// React
import { memo } from "react";
// Router
import { useParams, useHistory } from "react-router-dom";
// Recoil
import { useRecoilState } from "recoil";
import { A_User, A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";
// Hooks
import {
  useWebSocket,
  useMount,
  useRequest,
  useAsyncEffect,
  useUpdateEffect,
  useUnmount
} from "ahooks";
// Utils
import { convertKeysCase } from "@/utils";
// Service
import { API_GetRoom } from "@/service/game.api";
import { WS_GameURI } from "@/service/game.ws";

// Antd Component
import { message as AntdMessage } from "antd";
// Custom Component
import { Button } from "@/components/common";
import {
  ChatBlock,
  RoomMemberList,
} from "@/components/page-component/games-page";

// Scoped style
import classes from "./style.module.scss";

export default memo(function RoomPage() {
  const { t } = useTranslation();
  const params = useParams<{ roomId: string }>();
  const history = useHistory();
  const [user, setUser] = useRecoilState(A_User);
  const [game, setGame] = useRecoilState(A_Game);

  const { runAsync: getRoom, loading: getRoomLoading } = useRequest(
    API_GetRoom,
    { manual: true }
  );

  const { connect, disconnect, latestMessage, sendMessage, readyState } =
    useWebSocket(WS_GameURI(parseInt(params.roomId), user.token), {
      manual: true,
      reconnectLimit: 0,
    });

  // 校验 roomId
  useMount(async () => {
    const roomId = Number.parseInt(params.roomId);

    if (Number.isNaN(roomId) || roomId <= 0) {
      history.replace("/404");
      return;
    }

    const response = await getRoom(roomId).catch((err) => {
      AntdMessage.error(t(err.message));
    });

    if (response && response.isOk) {
      setGame((prevGame) => ({ ...prevGame, currentRoom: response.data }));
      connect?.();
      return;
    }

    history.replace("/404");
    return;
  });

  // 处理 WS 消息
  useAsyncEffect(async () => {
    if (latestMessage) {
      // 解析消息
      const message = convertKeysCase(
        JSON.parse(latestMessage.data),
        "camel"
      ) as I_WS_Message<unknown>;
      message.messageType = (message.messageType as any as string)
        .split(".")
        .map((type) => convertKeysCase(type, "camel"));

      // 分配消息
      const messageTypeMapping = {
        action: handleActionMessage,
        chat: handleChatMessage,
        game: handleGameMessage,
      };

      messageTypeMapping[
        message.messageType[0] as keyof typeof messageTypeMapping
      ](message as any);
    }
  }, [latestMessage]);

  // 断开 WS 链接的 cleanup
  useUpdateEffect(() => {
    // 2 - Closing; 3 - Closed;
    if (readyState >= 2) {
      setGame((prevGame) => ({
        currentRoom: null,
        roomList: prevGame.roomList,
        messageList: [],
      }));
    }
  }, [readyState]);
  
  useUnmount(()=> {
    setGame((prevGame) => ({
      currentRoom: null,
      roomList: prevGame.roomList,
      messageList: [],
    }));
  })

  // 处理 Action 消息
  const handleActionMessage = (message: any) => {
    console.log("处理 Action 事件: ", message);
  };

  // 处理 Chat 消息
  const handleChatMessage = (message: I_WS_ChatMessage) => {
    console.log("处理 Chat 事件: ", message);
    setGame((prevGame) => ({
      ...prevGame,
      messageList: [...prevGame.messageList, message],
    }));
  };

  // 处理 Game 消息
  const handleGameMessage = (message: any) => {
    console.log("处理 Game 事件: ", message);
  };

  const formattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    // 获取月份（需要加1，因为月份从0开始，然后使用padStart函数补0）
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSendMessage = (message: string) => {
    sendMessage?.(
      JSON.stringify({
        messageType: "chat.message.send",
        messageTime: formattedDate(),
        data: message,
      })
    );
  };

  return (
    <div className={classes.roomPage}>
      {!getRoomLoading && (
        <>
          <ChatBlock className="chat-block" onSendMessage={handleSendMessage} />
          <RoomMemberList className="room-member-list" />
          <div className="room-setting">
            <Button block>{t("GamesPage__roomSetting")}</Button>
            <Button block>{t("GamesPage__startGame")}</Button>
          </div>
        </>
      )}
    </div>
  );
});
