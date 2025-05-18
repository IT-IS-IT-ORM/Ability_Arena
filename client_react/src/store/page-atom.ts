// 类型
import type { allowedLocale } from '@/i18n';

// 业务库
import { atom } from 'recoil';

// 工具函数
import { localStorage } from '@/utils';

export interface pageStateProperties {
	locale: allowedLocale;
}

export const defaultPageState: pageStateProperties = {
	// interface language, default is Қазақша
	locale: 'kkKZ',
};

const state = localStorage.get('page', defaultPageState);

export const A_Page = atom({
	key: 'A_Page',
	// default value, aka initial value
	default: state,
});
