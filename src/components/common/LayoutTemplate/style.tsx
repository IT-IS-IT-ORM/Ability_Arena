import styled from 'styled-components';

export const LayoutTemplateStyled = styled.div`
	width: 100vw;
	height: 100vh;
	background: #000;

	display: flex;
	justify-content: center;
	align-items: center;

	.box {
		display: flex;
		width: 85%;
		max-width: 1120px;
		height: 85%;
		border-radius: calc(${({ theme }) => theme.shape.borderRadius} * 2);
		box-shadow: rgba(52, 61, 233, 0.4) -2px 0 96px 24px;
		transition: width 300ms ease, height 300ms ease;

		@media screen and (max-width: 860px) {
			flex-direction: column;
		}

		@media screen and (max-width: 576px) {
			width: 100%;
			height: 100%;
			border-radius: 0;
		}
	}
`;
