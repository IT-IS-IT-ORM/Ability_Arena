// React
import { memo } from 'react';
// 业务库
import { createGlobalStyle } from 'styled-components';

/**
 * 配置 CSS 基本样式
 * 基于 theme 对象
 * @returns {FC} 自定义全局样式
 */
export default memo(createGlobalStyle`
	/* 从 0 布局 */
	* {
		margin: 0;
		padding: 0;

		box-sizing: border-box;
	}

	// 全局滚动条样式
	* {
		// 丝滑滚动
		scroll-behavior: smooth;

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;

			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 0;
			background-color: transparent;
		}

		&:hover::-webkit-scrollbar-thumb {
			background-color: ${({ theme }) => theme.palette.primary};
		}

		&::-webkit-scrollbar-track {
			border-radius: 0;
		}

		&:hover::-webkit-scrollbar-track {
			background-color: #000;
		}
	}

	html,
	body {
		// 移动端 click事件触发的背景色变更
		-webkit-tap-highlight-color: transparent;
		background: #242424;
	}

	// 全局字体
	body {
		overflow: hidden;

		font-family: Roboto, -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI',
			Arial, sans-serif;
		font-size: 14px;
		font-stretch: normal;
		font-variant: normal;
		font-weight: normal;
		line-height: normal;
	}

	// 去除列表项 默认样式
	li {
		list-style: none;
	}

	// 某些资源标签 不可选择
	img,
	video,
	svg,
	iframe,
	canvas,
	figure {
		user-select: none;
	}	
`);
