// 类型
import type { MenuProps } from "antd";

// React
import { useRef } from "react";
// React 路由
import { useHistory } from "react-router-dom";
// 全局状态
import { useRecoilValue } from "recoil";
import { S_UserIsAuthenticated } from "@/store";

// i18n
import { useTranslation } from "react-i18next";
// Hooks
import { useCreation } from "ahooks";

// Antd 组件库
import { Dropdown } from "antd";
// 图标库
import { BiHomeSmile } from "react-icons/bi";
import { GrGamepad, GrBook } from "react-icons/gr";
import { AiOutlineSetting, AiOutlineLogin } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
// 自定义组件
import { Button } from "@/components/common";
// 内置组件
import NavbarList from "./NavbarList";

// Scoped style
import classes from "./style.module.scss";

export default function Sider() {
  const { t } = useTranslation();
  const { push } = useHistory();
  const navigatorBtnRef = useRef<HTMLDivElement>(null);
  // 是否已授权
  const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);

  const items: MenuProps["items"] = useCreation(
    () => [
      {
        key: "/",
        label: (
          <Button onClick={() => push("/")}>
            <>
              <BiHomeSmile />
              <p>{t("Navigator__home")}</p>
            </>
          </Button>
        ),
      },
      {
        key: "/games",
        label: (
          <Button onClick={() => push("/games")}>
            <>
              <GrGamepad />
              <p>{t("Navigator__games")}</p>
            </>
          </Button>
        ),
      },
      {
        key: "/docs",
        label: (
          <Button onClick={() => push("/docs")}>
            <>
              <GrBook />
              <p>{t("Navigator__docs")}</p>
            </>
          </Button>
        ),
      },
      {
        key: "/settings",
        label: (
          <Button onClick={() => push("/settings")}>
            <>
              {isAuthenticated ? <AiOutlineSetting /> : <AiOutlineLogin />}
              <p>
                {t(
                  isAuthenticated ? "Navigator__settings" : "Navigator__login"
                )}
              </p>
            </>
          </Button>
        ),
      },
    ],
    [isAuthenticated]
  );

  return (
    <aside className={classes.sider}>
      <div className="brand">
        <span>Play</span>
        <span>ground</span>
      </div>

      <Dropdown
        menu={{ items }}
        placement="bottom"
        getPopupContainer={() => navigatorBtnRef.current as HTMLDivElement}
      >
        <div className="navigator-btn" ref={navigatorBtnRef}>
          <CgMenuGridO />
        </div>
      </Dropdown>

      <NavbarList />

      <div className="logo">
        <span>Powered by</span>
        <strong>IT IS IT</strong>
      </div>
    </aside>
  );
}
