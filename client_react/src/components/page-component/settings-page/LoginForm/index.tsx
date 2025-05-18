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

export default function LoginForm() {
  // 翻译函数
  const { t } = useTranslation();

  return (
    <Form className={classes.loginForm} layout="vertical">
      <h3 className="title">{t("SettingsPage__login")}</h3>

      <Form.Item
        label={t("SettingsPage__usernameOrEmail")}
        name="login"
        rules={[{ required: true, message: "API_common_isRequired" }]}
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
        <Link className="forget-password" to="/auth/forget-password">
          Forget password?
        </Link>
        <Button block>{t("SettingsPage__login")}</Button>
      </Form.Item>
    </Form>
  );
}
