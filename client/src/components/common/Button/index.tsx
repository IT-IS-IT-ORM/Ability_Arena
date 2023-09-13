// 类型
import type { MouseEventHandler } from "react";

// Scoped style
import classes from "./style.module.scss";

interface I_ButtonProps {
  block?: boolean;
  children: any;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  block = false,
  children,
  className,
  ...props
}: I_ButtonProps) {
  return (
    <button
      className={`${classes.button} ${
        block && classes.buttonBlock
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
