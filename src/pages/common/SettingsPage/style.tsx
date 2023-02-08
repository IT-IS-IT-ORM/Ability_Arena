import styled from 'styled-components';

export const SettingsPageStyled = styled.div<{
	showAvatarGrid: boolean;
}>`
	padding: 32px 24px;
	position: relative;

	.head {
		display: flex;
		align-items: center;
		gap: 32px;

		.avatar-wrap {
			width: 140px;
			height: 140px;
			border-radius: 50%;
			border: 1px solid #fff;
			background: #000;
			box-shadow: rgba(52, 61, 233, 0.4) 0 0 28px 6px;

			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 100%;
				height: 100%;
				border-radius: inherit;
				object-fit: cover;
			}
		}
	}

	.avatar-grid {
		position: absolute;

		display: flex;
		flex-flow: row wrap;
		gap: 20px;

		width: calc(100% - 24px * 2);
		max-height: calc(100% - 32px * 2 - 140px - 32px);
		overflow: hidden auto;
		margin-top: 32px;
		padding: 20px;
		border-radius: 12px;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

		transition: opacity 300ms ease;
		${({ showAvatarGrid }) => {
			if (showAvatarGrid) {
				return `
			pointer-events: auto;
			opacity: 1;
			`;
			}

			return `
			pointer-events: none;
			opacity: 0;
			`;
		}};

		img {
			width: 100px;
			height: 100px;
			object-fit: cover;
			border-radius: 50%;
			border: 1px solid transparent;
			background: #000;

			cursor: pointer;
			transition: border-color 300ms ease, box-shadow 300ms ease;

			&:hover {
				border-color: #fff;
				box-shadow: rgba(52, 61, 233, 0.4) 0 0 28px 6px;
			}
		}
	}

	.bottom {
		margin-top: 32px;

		display: flex;
		flex-direction: column;
		gap: 20px;

		transition: opacity 300ms ease;
		${({ showAvatarGrid }) => {
			if (showAvatarGrid) {
				return `
			pointer-events: none;
			opacity: 0;
			`;
			}

			return `
			pointer-events: auto;
			opacity: 1;
			`;
		}};

		.group {
			display: flex;
			align-items: center;
			gap: 8px;

			.label {
				width: 110px;
				display: flex;
				align-items: center;
				gap: 8px;

				svg {
					${({ theme }) => theme.shape.iconAppearance.apply('#eee')};
				}

				span {
					color: #eee;
					font-size: 16px;
					font-weight: 700;
				}
			}

			.field {
				flex: 0 1 220px;

				&,
				.ant-select-selection-item {
					color: #1e1e1e;
					font-size: 16px;
					font-weight: 700;
				}

				.anticon {
					svg {
						color: #000;
					}
				}
			}

			@media screen and (max-width: 428px) {
				.label {
					width: 120px;
				}

				.field {
					flex-basis: 180px;
				}
			}
		}
	}
`;
