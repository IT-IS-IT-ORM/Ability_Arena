// React
import { memo, useEffect, useState } from "react";
// Router
import { useParams, useHistory } from "react-router-dom";
// Recoil
import { useRecoilState } from "recoil";
import { A_User } from "@/store";

// Hooks
import { useWebSocket, useMount } from "ahooks";
// API
import { WS_GameURI } from "@/service/game.ws";
// Custom Component
import { ChatBlock } from "@/components/page-component/games-page";

// Scoped style
import classes from "./style.module.scss";

export default memo(function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const history = useHistory();
  const [user, setUser] = useRecoilState(A_User);

  // 校验 roomId
  useMount(() => {
    const roomId = Number.parseInt(params.roomId);

    if (Number.isNaN(roomId) || roomId <= 0) {
      history.replace("/404");
    }
  });

  const { latestMessage, sendMessage } = useWebSocket(
    WS_GameURI(parseInt(params.roomId), user.token),
    {
      reconnectLimit: 0,
    }
  );

  console.log("latestMessage: ", latestMessage);

  return (
    <div className={classes.roomPage}>
      <ChatBlock room={{ name: "abcdefgh" }} />
    </div>
  );
});
