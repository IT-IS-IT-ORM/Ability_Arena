// Types
import type { I_User } from "@/def_types/user";
import type { I_WS_Message } from "@/def_types/game";

// Utils
import { getAvatar } from "@/utils";

// Scoped style
import classes from "./style.module.scss";

// Props
type T_MessageType = "chat.info" | "chat.message";

interface ChatMessageProps
  extends I_WS_Message<
    | I_User
    | {
        content: string;
        sender: I_User;
      }
  > {
  isMyRoom: boolean;
}

export default function ChatMessage({
  isMyRoom,
  messageId,
  messageType,
  messageTime,
  data,
}: ChatMessageProps) {
  console.log("chatMessage data: ", data);

  if (messageType === "chat.info") {
    return (
      <div className={classes.chatInfo}>
        <span className="time">{messageTime}</span>
        <span className="content">
          {isMyRoom && "(你)"}
          {/* {data} */}
          加入了房间
        </span>
      </div>
    );
  }

  return (
    <div className={classes.chatMessage}>
      <img
        // src={getAvatar((sender as I_User).avatarIndex)}
        className="avatar"
        alt="Avatar"
      />

      <div className="block">
        <div className="row">
          {/* <span className="name">{sender?.username}</span> */}
          <span className="time">{messageTime}</span>
        </div>

        {/* <span>{messageContent}</span> */}
      </div>
    </div>
  );
}
