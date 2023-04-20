// React
import React from 'react';
import ReactDOM from 'react-dom';

// 全局状态
import { RecoilRoot } from 'recoil';

// 国际化
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { kkKZ, zhCN } from '@/i18n';

// 工具函数
import { localStorage } from '@/utils';
import { defaultPageState } from '@/store';

// React App
import App from '@/components/App';

// Global CSS Files
import '@/assets/style/variable.css';
import '@/assets/style/reset.css';
import '@/assets/style/antd.css';

// Initialize language, get it from LocalStorage
const page = localStorage.get('page', defaultPageState);

// 初始化 i18n模块
i18next
	.use(initReactI18next)
	.use(intervalPlural)
	.init({
		resources: {
			kkKZ: {
				translation: kkKZ,
			},
			zhCN: {
				translation: zhCN,
			},
		},
		lng: page.locale,
		fallbackLng: 'kkKZ',
		compatibilityJSON: 'v3',
	});

// Render v-dom to read-dom
ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	// container
	document.getElementById('root'),
);
