// React & 周边库
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { A_Page } from '@/store';

// Hooks
import { useCreation } from 'ahooks';
// 工具函数
import { getAntdLocale } from '@/utils';

// 组件
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { LayoutTemplate } from '@/components/common';

export default function App() {
	// Antd 国际化资源
	const page = useRecoilValue(A_Page);
	const antdLocale = useCreation(
		() => getAntdLocale(page.locale),
		[page.locale],
	);

	return (
		// 路由管理
		<BrowserRouter>
			{/* Antd UI */}
			<AntdConfigProvider
				theme={{
					token: {
						colorPrimary: '#001fff',
					},
				}}
				locale={antdLocale}>
				{/* 布局模板 */}
				<LayoutTemplate />
			</AntdConfigProvider>
		</BrowserRouter>
	);
}
