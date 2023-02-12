// React
import { memo } from 'react';
// 业务库
import { createGlobalStyle, css } from 'styled-components';

// message 组件样式
const messageStyle = css`
	.ant-message-notice-content {
		/* 就酱按需重写任意组件的样式 */
	}
`;

/**
 * 配置 CSS 基本样式
 * 基于 theme 对象
 * @returns {FC} 自定义全局样式
 */
export default memo(createGlobalStyle`

* {
	/* 丝滑滚动 */
	scroll-behavior: smooth;
	/* 移除间距 */
	margin: 0;
	padding: 0;
	/* 重置排版 */
	font: inherit;
	/* 盒模型 */
	box-sizing: border-box;
}

/* 全局滚动条样式 */
*::-webkit-scrollbar {
	width: 4px;
	height: 4px;
	background: transparent;
}
/* 全局滚动条样式 */
*::-webkit-scrollbar-thumb {
	border-radius: 0;
	background: transparent;
}
/* 全局滚动条样式 */
*:hover::-webkit-scrollbar-thumb {
	background: ${({ theme }) => theme.palette.primary};
}
/* 全局滚动条样式 */
*::-webkit-scrollbar-track {
	border-radius: 0;
}
/* 全局滚动条样式 */
*:hover::-webkit-scrollbar-track {
	background: #000;
}

html,
body {
	/* 移动端 click 事件 触发的 :active 背景色 变更 */
	-webkit-tap-highlight-color: transparent;
	/* 全局字体 */
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	font-size: 16px;
	color: ${({ theme }) => theme.typography.color};
}

/* 移除 列表项 默认样式 */
li {
	list-style: none;
}

/* 资源标签 不可选择 */
img,
video,
svg,
iframe,
canvas,
figure {
	user-select: none;
}

:root {
	/* 色彩模式 */
	color-scheme: ${({ theme }) => theme.palette.mode};
}

/* 重写 antd 组件样式 */
${messageStyle}
`);
