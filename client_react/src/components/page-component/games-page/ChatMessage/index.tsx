// Types
import type { I_User } from "@/def_types/user";
import type { I_WS_ChatMessage, I_PlaerMessage } from "@/def_types/game";

// i18n
import { useTranslation } from "react-i18next";
// Utils
import { getAvatar } from "@/utils";
// Hooks
import { useCreation } from "ahooks";

// Scoped style
import classes from "./style.module.scss";

// Props
interface ChatMessageProps {
  isMyRoom: boolean;
  message: I_WS_ChatMessage;
}

export default function ChatMessage({
  isMyRoom,
  message: { messageTime, messageType, data },
}: ChatMessageProps) {
  const { t } = useTranslation();

  // 格式化日期时间
  const formattedDate = useCreation(() => {
    const date = new Date(messageTime);
    const year = date.getFullYear();
    // 获取月份（需要加1，因为月份从0开始，然后使用padStart函数补0）
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }, [messageTime]);

  console.log("isMyRoom? ", isMyRoom, data);

  if (messageType[1] === "info") {
    return (
      <div className={classes.chatInfo}>
        <span className="time">{formattedDate}</span>
        <span className="content">
          {t("GamesPage__Chat__playerJoin", {
            player: isMyRoom ? "你" : (data as I_User).username,
          })}
        </span>
      </div>
    );
  }

  return (
    <div className={classes.chatMessage}>
      <img
        src={getAvatar((data as I_PlaerMessage).sender.avatarIndex)}
        className="avatar"
        alt="Avatar"
      />

      <div className="block">
        <div className="row">
          <span className="name">
            {(data as I_PlaerMessage).sender.username}
          </span>
          <span className="time">{formattedDate}</span>
        </div>

        <span className="content">{(data as I_PlaerMessage).content}</span>
      </div>
    </div>
  );
}
