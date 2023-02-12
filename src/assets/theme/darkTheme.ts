import type { DefaultTheme } from 'styled-components';

import { css } from 'styled-components';

const theme: DefaultTheme = {
	palette: {
		mode: 'LIGHT',
		primary: '#001fff',
		secondary: 'rgba(150, 150, 150, 0.8)',
		error: '#ff4d4f',
		warning: '#faad14',
		success: '#52c41a',
		disabled: 'rgba(0, 0, 0, 0.25)',
	},

	shape: {
		borderRadius: '6px',
		boxShadow: 'rgba(0, 0, 0, 0.08) 0 4px 12px',

		iconAppearance: {
			stroke: '#fff',
			fill: '#fff',
			color: '#fff',
			fontSize: '22px',

			apply(color = '#fff') {
				return css`
					fill: ${color};
					color: ${color};
					font-size: 22px;

					path {
						stroke: ${color};
					}
				`;
			},
		},
	},

	typography: {
		color: 'rgba(0, 0, 0, 0.88)',
		button: {
			apply() {
				return css`
					cursor: pointer;
					user-select: none;
					touch-action: manipulation;

					font-family: 'Open Sans', sans-serif;
					font-size: 16px;
					font-weight: 700;
					letter-spacing: 2px;
					text-decoration: none;
					text-transform: uppercase;
					color: #000;

					padding: 8px 14px;
					border: none;
					outline: none;
					background: #fff;
					box-shadow: 1px 1px 0 0, 2px 2px 0 0, 3px 3px 0 0,
						4px 4px 0 0, 5px 5px 0 0;
					transition: transform 0.2s ease, box-shadow 0.2s ease;

					:active {
						box-shadow: 0 0 0 0;
						transform: translate(5px, 5px);
					}
				`;
			},
		},
	},
};

export default theme;
