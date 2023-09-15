// 类型
import type { I_Room } from "@/def_types/game";

// React
import { memo } from "react";

// Scoped style
import classes from "./style.module.scss";

// 资源
import { IMG_RoomCover } from "@/assets/image/game/room";

// Props 类型
interface RoomCardProps {
  room: I_Room;
  onClick?: (room: I_Room) => void;
}

export default memo(function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <div className={classes.roomCard} onClick={() => onClick?.(room)}>
      <div className="lt"></div>
      <div className="rt"></div>
      <div className="rb"></div>
      <div className="lb"></div>

      {/* BETA 标记 */}
      <div className="beta-banner">BETA</div>

      <img src={IMG_RoomCover} alt="room" className="cover" />

      <div className="info">
        <span className="name">{room.name}</span>
        <span className="status number-of-gamer">
          {room.memberList.length} / {room.maxMemberCount}
        </span>
      </div>
    </div>
  );
});
