import type { allowedLocale } from '@/i18n';

export default function getHtmlLang(locale: allowedLocale) {
	switch (locale) {
		case 'kkKZ':
			return 'kk';
		case 'zhCN':
		default:
			return 'zh-Hans';
	}
}
