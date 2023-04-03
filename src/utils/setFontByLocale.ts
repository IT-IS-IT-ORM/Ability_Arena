/**
 * Set Font by locale
 * Because some fonts do not support Chinese, and some do not support Kazakh
 */
import type { allowedLocale } from '@/i18n';

export default function setFontByLocale(locale: allowedLocale) {
	switch (locale) {
		case 'zhCN':
			document.body.style.cssText = `font-family: 'ZCOOL KuaiLe', sans-serif;`;
			break;
		case 'kkKZ':
		default:
			document.body.style.cssText = `font-family: 'Ubuntu Mono', monospace;`;
	}
}
