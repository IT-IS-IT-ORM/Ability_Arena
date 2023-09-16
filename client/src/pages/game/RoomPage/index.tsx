// Types
import type { I_WS_Message, I_WS_ChatMessage } from "@/def_types/game";

// React
import { memo, useEffect, useState } from "react";
// Router
import { useParams, useHistory } from "react-router-dom";
// Recoil
import { useRecoilState } from "recoil";
import { A_User, A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";
// Hooks
import { useWebSocket, useMount, useRequest, useAsyncEffect } from "ahooks";
// Utils
import { convertKeysCase } from "@/utils";
// Service
import { API_GetRoom } from "@/service/game.api";
import { WS_GameURI } from "@/service/game.ws";

// Antd Component
import { message as AntdMessage, message } from "antd";
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

  const { connect, disconnect, latestMessage, sendMessage } = useWebSocket(
    WS_GameURI(parseInt(params.roomId), user.token),
    {
      manual: true,
      reconnectLimit: 0,
    }
  );

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

  return (
    <div className={classes.roomPage}>
      {!getRoomLoading && (
        <>
          <ChatBlock className="chat-block" />
          <RoomMemberList className="room-member-list" />
          <div className="room-setting">
            <Button block>房间设置</Button>
            <Button block>开始游戏</Button>
          </div>
        </>
      )}
    </div>
  );
});
