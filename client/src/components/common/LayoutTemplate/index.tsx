// React & Router
import { useLocation } from "react-router-dom";

// Hooks
import {} from "ahooks";

// 内置组件
import Sider from "./Sider";
import PageContent from "./PageContent";

// Routes
import gameRoutes from "@/routes/game-routes";

// Scoped style
import classes from "./style.module.scss";

export default function LayoutTemplate() {
  const location = useLocation();

  // const inGame = useMemo(
  // 	() => gameRoutes.some(({ path }) => location.pathname === path),
  // 	[location],
  // );
  const inGame = false;

  return (
    <div className={classes.layout}>
      <div className="box">
        {!inGame && <Sider />}
        <PageContent />
      </div>
    </div>
  );
}
