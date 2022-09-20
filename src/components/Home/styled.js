import styled from 'styled-components';

export const HomeStyled = styled.main`
	display: flex;
	flex-direction: column;

	.title {
		color: #fff;
		text-align: center;
	}

	.start-btn {
		${({ theme }) => theme.typography.button.apply};
		margin: auto;
	}
`;
