// 类型
import type { MouseEventHandler } from "react";

// Scoped style
import classes from "./style.module.scss";

interface I_ButtonProps {
  children: JSX.Element | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  className,
  ...props
}: I_ButtonProps) {
  return (
    <button className={`${classes.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
