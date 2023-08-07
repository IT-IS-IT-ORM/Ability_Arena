// 类型
import type { I_Room } from "@/def_types/game";
import type { ModalProps } from "antd";

// Hooks
import { useBoolean } from "ahooks";

// i18n
import { useTranslation } from "react-i18next";

// Antd 组件
import { Modal, Form, Input, InputNumber, Switch } from "antd";
// 自定义组件
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

// Props 类型
interface CreateRoomModalProps extends ModalProps {
  className?: string;
  onCreate: (values: I_Room) => void;
}

export default function CreateRoomModal({
  className,
  onCreate,
  ...props
}: CreateRoomModalProps) {
  const { t } = useTranslation();

  const [hasPwd, { set: changePwdEditState }] = useBoolean(false);

  return (
    <Modal
      className={`${classes.createRoomModal} ${className}`}
      title="Бөлме ашу"
      footer={null}
      {...props}
    >
      <Form
        layout="vertical"
        onFinish={onCreate}
        initialValues={{ maxMemberCount: 2 }}
      >
        <div className="row">
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            label="Бөлме атауы"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maxMemberCount"
            rules={[{ required: true }]}
            label="Қатысушы саны"
          >
            <InputNumber min={2} max={8} />
          </Form.Item>
        </div>

        <div className="row">
          <div className="with-pwd">
            <span>Парольмен</span>
            <Switch checked={hasPwd} onChange={changePwdEditState} />
          </div>

          <Form.Item
            name="password"
            rules={[
              { required: hasPwd },
              { max: 10, message: "密码最多不能超过10位字符" },
            ]}
            label="Құпия сөз"
          >
            <Input.Password disabled={!hasPwd} />
          </Form.Item>
        </div>

        <Button className="submit-btn">Ашу</Button>
      </Form>
    </Modal>
  );
}
