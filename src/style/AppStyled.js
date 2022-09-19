import styled from 'styled-components';

export const AppStyled = styled.div`
	width: 576px;
	max-width: 100%;
	height: ${({ height }) => (height ? `${height}px` : '100vh')};

	margin: auto;
	padding: 10px;
	border: 10px solid #fff;
	overflow: hidden auto;

	& > * {
		height: 100%;
	}

	@media screen and (max-width: 576px) {
		border-width: 5px;
	}
`;
