import type {
	FlattenInterpolation,
	ThemeProps,
	DefaultTheme,
} from 'styled-components';

import 'styled-components';

export type themeMode = 'LIGHT' | 'DARK';

declare module 'styled-components' {
	export interface DefaultTheme {
		// 调色板
		palette: {
			mode: themeMode;
			primary: string;
			secondary: string;
			error: string;
			warning: string;
			success: string;
			disabled: string;
		};
		// 形状
		shape: {
			borderRadius: string;
			boxShadow: string;
			iconAppearance: {
				stroke: string;
				fill: string;
				color: string;
				fontSize: string;

				apply: apply<string>;
			};
		};
		// 排版
		typography: {
			color: string;
			button: {
				apply: apply<string>;
			};
		};
	}
}

type apply<T> = (arg?: T) => FlattenInterpolation<ThemeProps<DefaultTheme>>;

// import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

export const getTheme = (theme: themeMode) =>
	// theme === 'DARK' ? darkTheme : lightTheme;
	darkTheme;
