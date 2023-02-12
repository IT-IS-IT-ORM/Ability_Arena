import styled from 'styled-components';

export const GamesPageStyled = styled.div`
	padding: 32px 24px;

	.game-list {
		margin-top: 24px;
		padding: 8px;
		max-height: calc(100% - 32px * 2 - 8px);
		overflow: hidden auto;

		display: flex;
		flex-flow: row wrap;
		gap: 26px;
	}
`;
