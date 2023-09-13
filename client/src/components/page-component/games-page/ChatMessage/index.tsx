// Types
import type { I_User } from "@/def_types/user";

// Utils
import { getAvatar } from "@/utils";

// Scoped style
import classes from "./style.module.scss";

// Props
type T_MessageType = "chat.info" | "chat.message";

interface ChatMessageProps {
  isMyRoom: boolean;
  messageType: T_MessageType;
  messageContent: string;
  messageTime: string;
  sender?: I_User;
}

export default function ChatMessage({
  isMyRoom,
  messageType,
  messageContent,
  messageTime,
  sender,
}: ChatMessageProps) {
  if (messageType === "chat.info") {
    return (
      <div className={classes.chatInfo}>
        <span className="time">{messageTime}</span>
        <span className="content">
          {isMyRoom && "(你)"}
          {messageContent}
        </span>
      </div>
    );
  }

  return (
    <div className={classes.chatMessage}>
      <img
        src={getAvatar((sender as I_User).avatarIndex)}
        className="avatar"
        alt="Avatar"
      />

      <div className="block">
        <div className="row">
          <span className="name">{sender?.username}</span>
          <span className="time">{messageTime}</span>
        </div>

        <span>{messageContent}</span>
      </div>
    </div>
  );
}
