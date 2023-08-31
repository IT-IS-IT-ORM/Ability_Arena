// 全局状态
import { useRecoilState, useRecoilValue } from "recoil";
import { A_User, A_Page, S_UserIsAuthenticated } from "@/store";

// i18n
import i18next from "i18next";
import { useTranslation } from "react-i18next";

// Hooks
import { useBoolean, useMemoizedFn, useRequest } from "ahooks";
// API
import { API_Register, API_UpdateProfile } from "@/service/user.api";

// 工具库
import { localStorage } from "@/utils";

// 图标库
import { BiUser } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
// Antd 组件库
import { Input, Select, message as AntdMessage } from "antd";
// 自定义组件
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

// 静态资源
import {
  Avatar_1,
  Avatar_2,
  Avatar_3,
  Avatar_4,
  Avatar_5,
  Avatar_6,
  Avatar_7,
  Avatar_8,
  Avatar_9,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_14,
  Avatar_15,
  Avatar_16,
  Avatar_17,
  Avatar_18,
} from "@/assets/image/user";

const avatarList = [
  Avatar_1,
  Avatar_2,
  Avatar_3,
  Avatar_4,
  Avatar_5,
  Avatar_6,
  Avatar_7,
  Avatar_8,
  Avatar_9,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_14,
  Avatar_15,
  Avatar_16,
  Avatar_17,
  Avatar_18,
];

const availableLanguages = [
  {
    label: "中文",
    value: "zhCN",
  },
  {
    label: "Қазақша",
    value: "kkKZ",
  },
];

const { Option } = Select;

export default function SettingsPage() {
  // 用户信息
  const [user, setUser] = useRecoilState(A_User);
  const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);
  // 页面信息
  const [page, setPage] = useRecoilState(A_Page);
  // 翻译函数
  const { t } = useTranslation();

  // 头像列表
  const [
    showAvatarGrid,
    { setFalse: closeAvatarGrid, toggle: toggleAvatarGrid },
  ] = useBoolean(false);

  // 处理切换头像
  const handleAvatarChange = (index: number) => {
    if (index !== user.avatarIndex) {
      setUser((prevState) => ({ ...prevState, avatarIndex: index }));
    }

    closeAvatarGrid();
  };

  const handleUsernameChange = useMemoizedFn(({ target: { value } }) => {
    setUser((prevUser) => ({ ...prevUser, username: value }));
  });

  const handleLanguageChange = useMemoizedFn((value) => {
    i18next.changeLanguage(value);

    let newPageState;
    setPage((prevPage) => {
      newPageState = {
        ...prevPage,
        locale: value,
      };

      return newPageState;
    });

    localStorage.set("page", newPageState);
  });

  // 注册 API
  const { runAsync: register } = useRequest(API_Register, { manual: true });
  // 保存 API
  const { runAsync: save } = useRequest(API_UpdateProfile, { manual: true });

  // 未登录时候 = 注册
  // 登录后 = 保存
  const handleSubmit = async () => {
    const data = { username: user.username, avatarIndex: user.avatarIndex };

    if (isAuthenticated) {
      await save(user.id, data).catch((err) => {
        AntdMessage.error(t(err.message));
      });
      AntdMessage.success(t("API_User_saveSuccess"));
      localStorage.set("user", user);
    } else {
      const response = await register(data).catch((err) => {
        AntdMessage.error(t(err.message));
      });

      if (response?.isOk) {
        AntdMessage.success(t("API_User_registerSuccess"));

        const newUser = response!.data;
        localStorage.set("user", newUser);
        setUser(newUser);
      }
    }
  };

  return (
    <main
      className={`${classes.settingsPage} ${
        showAvatarGrid ? `${classes.settingsPage}--show` : ""
      }`}
    >
      <div className="head">
        <div className="avatar-wrap">
          <img src={avatarList[user.avatarIndex]} alt="avatar" />
        </div>
        <Button onClick={toggleAvatarGrid}>
          {t("SettingsPage__changeAvatar") as string}
        </Button>
      </div>

      <div className={`avatar-grid ${showAvatarGrid && "avatar-grid--show"}`}>
        {avatarList.map((avatar, idx) => (
          <img
            key={idx}
            src={avatar}
            alt="avatar"
            onClick={() => handleAvatarChange(idx)}
          />
        ))}
      </div>

      <div className={`bottom ${showAvatarGrid && "bottom--hide"}`}>
        <div className="group">
          <div className="label">
            <BiUser />
            <span>{t("SettingsPage__username")}: </span>
          </div>
          <Input
            className="field"
            value={user.username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="group">
          <div className="label">
            <IoLanguage />
            <span>{t("SettingsPage__language")}: </span>
          </div>
          <Select
            className="field"
            value={page.locale}
            onChange={handleLanguageChange}
          >
            {availableLanguages.map((language) => (
              <Option key={language.value} value={language.value}>
                {language.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="group">
          <Button onClick={handleSubmit}>
            {isAuthenticated
              ? t("SettingsPage__save")!
              : t("SettingsPage__register")!}
          </Button>
        </div>
      </div>
    </main>
  );
}
