import styled from 'styled-components';

export const GameCardStyled = styled.div`
	position: relative;
	overflow: hidden;
	cursor: pointer;

	border: 1px solid ${({ theme }) => theme.palette.primary};
	box-shadow: ${({ theme }) => theme.palette.primary} 0 2px 8px 0;

	display: flex;
	flex-direction: column;

	.lt,
	.rt,
	.rb,
	.lb {
		position: absolute;
		width: 20px;
		height: 20px;
	}

	.lt {
		border-top: 4px solid ${({ theme }) => theme.palette.primary};
		border-left: 4px solid ${({ theme }) => theme.palette.primary};

		top: 0px;
		left: 0;
	}

	.rt {
		border-top: 4px solid ${({ theme }) => theme.palette.primary};
		border-right: 4px solid ${({ theme }) => theme.palette.primary};

		top: 0;
		right: 0;
	}

	.rb {
		border-bottom: 4px solid ${({ theme }) => theme.palette.primary};
		border-right: 4px solid ${({ theme }) => theme.palette.primary};

		bottom: 0;
		right: 0;
	}

	.lb {
		border-bottom: 4px solid ${({ theme }) => theme.palette.primary};
		border-left: 4px solid ${({ theme }) => theme.palette.primary};

		bottom: 0;
		left: 0;
	}

	.beta-banner {
		position: absolute;
		padding: 0 36px;
		transform: rotate(-45deg) translate(-30px, -12px);

		color: #fff;
		font-size: 14px;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1px;
		background: #368f6d;
	}

	.cover {
		width: 260px;
		height: 240px;
		padding: 20px;
		object-fit: cover;
	}

	.info {
		padding: 10px 20px;
		background: #fff;

		display: flex;
		flex-direction: column;
		gap: 8px;

		.name {
			font-weight: 700;
		}

		.status {
			display: flex;
			align-items: center;
			gap: 4px;

			width: max-content;
			padding: 4px 10px;
			border-radius: ${({ theme }) => theme.shape.borderRadius};
			background: #536976;
			background: linear-gradient(-45deg, #292e49, #536976);

			color: rgba(255, 255, 255, 0.88);
			font-weight: 700;
			font-size: 12px;

			svg {
				${({ theme }) =>
					theme.shape.iconAppearance.apply('rgba(255, 255, 255, 0.88)')};
			}
		}
	}
`;
