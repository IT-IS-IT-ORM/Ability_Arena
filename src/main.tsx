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
import { localStorage, getHtmlLang } from '@/utils';
import { defaultPageState } from '@/store';

// React App
import App from './App';

// Initialize language, get it from LocalStorage
const page = localStorage.get('page', defaultPageState);

// 初始化 i18n模块
i18next
	.use(initReactI18next)
	.use(intervalPlural)
	.init({
		resources: {
			zhCN: {
				translation: zhCN,
			},
			kkKZ: {
				translation: kkKZ,
			},
		},
		lng: page.locale,
		fallbackLng: 'zhCN',
		compatibilityJSON: 'v3',
	});

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root'),
	() => {
		document.documentElement.lang = getHtmlLang(page.locale);
	},
);
