import styled from 'styled-components';

export const SiderStyled = styled.aside`
	flex: 0 0 220px;

	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;
	background: #f9f9f9;

	display: flex;
	flex-direction: column;

	user-select: none;

	@media screen and (max-width: 860px) {
		flex: 0 0 64px;
		flex-direction: row;
		gap: 8px;
		align-items: center;

		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
	}

	.brand {
		color: #1e1e1e;
		font-size: 24px;
		font-weight: 900;

		margin: 32px 0 36px 24px;

		span {
			color: ${({ theme }) => theme.palette.primary};
		}

		@media screen and (max-width: 860px) {
			margin: 0 0 0 24px;
		}
	}

	.navigator-btn {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		margin-left: auto;

		display: none;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		transition: background 300ms ease;

		&:hover {
			background: rgba(232, 234, 237, 0.88);
		}

		svg {
			${({ theme }) => theme.shape.iconAppearance.apply(theme.palette.primary)}
		}

		@media screen and (max-width: 860px) {
			display: flex;
		}

		.ant-dropdown-menu-item {
			padding: 8px 6px;
			background: transparent;

			button {
				width: 100%;
				color: #1e1e1e;

				display: flex;
				justify-content: center;
				align-items: center;
				gap: 12px;
			}
		}
	}

	.logo {
		margin: auto 24px 24px 24px;
		display: flex;
		flex-direction: column;

		color: #000;
		line-height: 1;

		span {
			font-size: 12px;
			font-weight: 500;
		}

		strong {
			font-size: 18px;
			font-weight: 700;
		}

		@media screen and (max-width: 860px) {
			margin: 0 24px 0 0;

			strong {
				font-size: 16px;
			}
		}
	}
`;
