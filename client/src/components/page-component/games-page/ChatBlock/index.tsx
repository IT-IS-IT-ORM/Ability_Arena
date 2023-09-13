// Types
import type { I_Room } from "@/def_types/game";

// React
import { useMemo } from "react";
// Recoil
import { useRecoilValue } from "recoil";
import { A_User } from "@/store";

// Icon
import { BiArrowBack } from "react-icons/bi";
// Antd Component
import { Input } from "antd";
// Custom Component
import { Button } from "@/components/common";
import { ChatMessage } from "@/components/page-component/games-page";

// Scoped style
import classes from "./style.module.scss";

// Props
interface ChatBlockProps {
  room: I_Room;
}

export default function ChatBlock({ room }: ChatBlockProps) {
  const messages = [
    {
      messageType: "chat.info",
      messageContent: "Gamer1234 加入了房间",
      messageTime: "2023-09-13 10:10:10",
    },
    {
      messageType: "chat.message",
      messageContent: "哇，终于可以玩游戏了，我先等一下其他玩家加入~",
      messageTime: "2023-09-13 10:10:16",
      sender: {
        id: 1,
        username: "Gamer1234",
        avatarIndex: 24,
      },
    },
    {
      messageType: "chat.info",
      messageContent: "GamerXxx 加入了房间",
      messageTime: "2023-09-13 10:10:23",
    },
    {
      messageType: "chat.message",
      messageContent: "Hi! 你是萌新吗?",
      messageTime: "2023-09-13 10:10:29",
      sender: {
        id: 1,
        username: "Gamer1234",
        avatarIndex: 24,
      },
    },
    {
      messageType: "chat.message",
      messageContent: "没错, 第一次玩疯狂三国杀",
      messageTime: "2023-09-13 10:10:48",
      sender: {
        id: 2,
        username: "GamerXxx",
        avatarIndex: 29,
      },
    },
  ];

  const user = useRecoilValue(A_User);

  const isMyRoom = useMemo(() => room.homeowner === user.id, [room, user]);

  return (
    <section className={classes.chatBlock}>
      <div className="head">
        <Button>
          <BiArrowBack />
        </Button>
        <span className="room-name">{room.name}</span>
      </div>

      <div className="chat">
        {messages.map((message) => (
          <ChatMessage isMyRoom={isMyRoom} {...message} />
        ))}
      </div>

      <div className="enter">
        <Input.TextArea
          showCount
          rows={3}
          maxLength={128}
          placeholder="输入你的消息..."
        />
        <Input placeholder="输入你的消息..." />
      </div>
    </section>
  );
}
