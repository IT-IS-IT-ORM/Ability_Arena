// React 路由
import { useHistory } from "react-router-dom";

// 全局状态
import { useRecoilValue } from "recoil";
import { S_UserIsAuthenticated } from "@/store";

// i18n
import { useTranslation } from "react-i18next";
// Hooks
import { useCreation } from "ahooks";

// 图标库
import { BiHomeSmile } from "react-icons/bi";
import { GrGamepad, GrBook } from "react-icons/gr";
import { AiOutlineSetting, AiOutlineLogin } from "react-icons/ai";
// 自定义组件
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

export default function NavbarList() {
  // i18n
  const { t } = useTranslation();
  // 路由变量
  const { push } = useHistory();
  // 是否已授权
  const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);

  // 按钮点击事件
  const handleNavItemClick = (targetPath: string) => {
    push(targetPath);
  };

  const navbarItems = useCreation(
    () => [
      {
        to: "/",
        icon: <BiHomeSmile />,
        text: "Navigator__home",
      },
      {
        to: "/games",
        icon: <GrGamepad />,
        text: "Navigator__games",
      },
      {
        to: "/docs",
        icon: <GrBook />,
        text: "Navigator__docs",
      },
      {
        to: "/settings",
        icon: isAuthenticated ? <AiOutlineSetting /> : <AiOutlineLogin />,
        text: isAuthenticated ? "Navigator__settings" : "Navigator__login",
      },
    ],
    [isAuthenticated]
  );

  return (
    <ul className={classes.navbarList}>
      {navbarItems.map((item) => (
        <li key={item.to} className={classes.navbarItem}>
          <Button onClick={() => handleNavItemClick(item.to)}>
            <>
              {item.icon}
              {t(item.text) as string}
            </>
          </Button>
        </li>
      ))}
    </ul>
  );
}
