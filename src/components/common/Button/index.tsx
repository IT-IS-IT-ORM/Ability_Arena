// 类型
import type { MouseEventHandler } from 'react';

// 样式组件
import { ButtonStyled } from './style';

interface I_ButtonProps {
	children: JSX.Element | string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, ...props }: I_ButtonProps) {
	return <ButtonStyled {...props}>{children}</ButtonStyled>;
}
