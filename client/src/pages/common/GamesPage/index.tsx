// 类型
import type { I_Room } from "@/def_types/game";

// React 路由
import { useHistory } from "react-router-dom";

// 全局状态
import { useRecoilValue } from "recoil";
import { A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";

// Antd 组件
import { message as AntdMessage } from "antd";
// 自定义组件
import { SearchBar } from "@/components/page-component/search-page";
import { RoomCard } from "@/components/page-component/games-page";
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

export default function GamesPage() {
  const game = useRecoilValue(A_Game);
  const history = useHistory();
  const { t } = useTranslation();

  const handleCardClick = (room: I_Room) => {
    history.push(`/room/${room.id}`);
  };

  return (
    <main className={classes.gamesPage}>
      <div className="head">
        <SearchBar />
        <Button>创建房间</Button>
      </div>

      <div className="game-list">
        {game.roomList.map((room) => (
          <RoomCard key={room.id} room={room} onClick={handleCardClick} />
        ))}
      </div>
    </main>
  );
}
