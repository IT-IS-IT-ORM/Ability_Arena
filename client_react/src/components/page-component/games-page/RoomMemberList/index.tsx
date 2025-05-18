// Recoil
import { useRecoilValue } from "recoil";
import { A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";
// Utils
import { getAvatar } from "@/utils";

// Icons
import { AiOutlineUserDelete } from "react-icons/ai";
import { GoHubot } from "react-icons/go";
// Custom Components
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

// Props
interface RoomMemberListProps {
  className?: string;
}

export default function RoomMemberList({ className }: RoomMemberListProps) {
  const { t } = useTranslation();
  const game = useRecoilValue(A_Game);

  if (!game.currentRoom) {
    return <></>;
  }

  return (
    <ul className={`${classes.roomMemberList} ${className}`}>
      <li className="title">
        <span>{t("GamesPage__numberInTheRoom")}:</span>
        <span>
          {game.currentRoom.memberList.length} /{" "}
          {game.currentRoom.maxMemberCount}
        </span>
      </li>

      {game.currentRoom.memberList.map(({ id, member }) => (
        <li key={id} className="member">
          <img
            className="avatar"
            src={getAvatar(member.avatarIndex)}
            alt="Avatar"
          />
          <span className="username">{member.username}</span>
          <AiOutlineUserDelete />
        </li>
      ))}
      <li className="add-bot">
        <Button block>
          {t("GamesPage__addAIBot")}
          <GoHubot />
        </Button>
      </li>
    </ul>
  );
}
