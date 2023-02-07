// React & 周边库
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { A_User, A_Page } from '@/store';

// Hooks
import { useEventListener, useCreation } from 'ahooks';
// 工具函数
import { localStorage, getAntdLocale } from '@/utils';
import { getTheme } from '@/assets/theme';

// 组件
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseLine, LayoutTemplate } from '@/components/common';

export default function App() {
	// global state
	const user = useRecoilValue(A_User);
	const page = useRecoilValue(A_Page);

	// Refresh the page and save the global state to the local for restoring the next time the page is opened
	useEventListener('beforeunload', () => {
		localStorage.set('user', user);
		localStorage.set('page', page);
	});

	// Antd 国际化资源
	const antdLocale = useCreation(
		() => getAntdLocale(page.locale),
		[page.locale],
	);

	// 动态主题
	const theme = useCreation(() => getTheme(page.viewMode), [page.viewMode]);

	return (
		// 路由管理
		<BrowserRouter>
			{/* 《CSS in JS》 & 《Theme in CSS》 */}
			<StyledThemeProvider theme={theme}>
				{/* Antd UI */}
				<AntdConfigProvider
					theme={{
						token: {
							colorPrimary: '#001fff',
						},
					}}
					locale={antdLocale}>
					{/* Reset CSS */}
					<CssBaseLine />
					{/* 布局模板 */}
					<LayoutTemplate />
				</AntdConfigProvider>
			</StyledThemeProvider>
		</BrowserRouter>
	);
}
