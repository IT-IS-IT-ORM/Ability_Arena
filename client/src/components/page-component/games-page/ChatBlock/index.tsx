// Recoil
import { useRecoilValue } from "recoil";
import { A_User, A_Game } from "@/store";

// Hooks
import { useCreation } from "ahooks";

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
  className?: string;
}

export default function ChatBlock({ className }: ChatBlockProps) {
  const user = useRecoilValue(A_User);
  const game = useRecoilValue(A_Game);

  const isMyRoom = useCreation(
    () => game.currentRoom?.homeowner === user.id,
    [game.currentRoom, user.id]
  );

  if (!game.currentRoom) {
    return <></>;
  }

  return (
    <section className={`${classes.chatBlock} ${className}`}>
      <div className="head">
        <Button>
          <BiArrowBack />
        </Button>
        <span className="room-name">{game.currentRoom.name}</span>
      </div>

      <div className="chat">
        {game.messageList.map((message) => (
          <ChatMessage
            key={message.messageId}
            isMyRoom={isMyRoom}
            message={message}
          />
        ))}
      </div>

      <div className="enter" data-helpText="按 Ctrl+Enter 发送消息">
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
