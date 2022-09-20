import { css } from 'styled-components';

export default {
	palette: {
		primary: '#646cff',
	},

	typography: {
		button: {
			apply: css`
				cursor: pointer;
				user-select: none;
				touch-action: manipulation;

				font-family: 'Open Sans', sans-serif;
				font-size: 16px;
				font-weight: bolder;
				letter-spacing: 2px;
				text-decoration: none;
				text-transform: uppercase;
				color: #000;

				padding: 8px 14px;
				border: none;
				outline: none;
				background: #fff;
				box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px,
					4px 4px 0px 0px, 5px 5px 0px 0px;
				transition: transform 0.2s ease, box-shadow 0.2s ease;

				:active {
					box-shadow: 0 0 0 0;
					transform: translate(5px, 5px);
				}
			`,
		},
	},
};
