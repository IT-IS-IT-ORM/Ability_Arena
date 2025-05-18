// React Router
import { Link } from "react-router-dom";

// i18n
import { useTranslation } from "react-i18next";

// Antd component
import { Form, Input } from "antd";
// Custom component
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

export default function RegisterForm() {
  // 翻译函数
  const { t } = useTranslation();

  return (
    <Form className={classes.registerForm} layout="vertical">
      <h3 className="title">{t("SettingsPage__register")}</h3>

      <Form.Item
        label={t("SettingsPage__username")}
        name="username"
        rules={[{ required: true, message: "API_User_usernameIsRequired" }]}
      >
        <Input className="field" />
      </Form.Item>

      <Form.Item
        label={t("SettingsPage__email")}
        name="email"
        rules={[{ required: true, message: "API_User_emailIsRequired" }]}
      >
        <Input className="field" />
      </Form.Item>

      <Form.Item
        label={t("SettingsPage__password")}
        name="password"
        rules={[{ required: true, message: "API_User_passwordIsRequired" }]}
      >
        <Input.Password className="field" />
      </Form.Item>

      <Form.Item>
        <Button block>{t("SettingsPage__register")}</Button>
      </Form.Item>
    </Form>
  );
}
