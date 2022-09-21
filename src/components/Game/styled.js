import styled from 'styled-components';

export const GameStyled = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: 20px;
		color: #ffff;
	}
`;

export const CardContainer = styled.div`
	width: 100%;
	/* height: 340px; */
    flex-grow: 1;

	margin-top: 12px;
	margin-bottom: 8px;
	padding: 20px;
	border: 1px solid #fff;

	position: relative;
`;

export const DrawnCards = styled.div`
	width: 100%;
	height: 32px;
	border: 1px solid #fff;

	margin-top: auto;
	margin-bottom: 8px;
`;

export const SlotContainer = styled.div`
	width: 100%;
	height: 32px;

	border: 1px solid #fff;
	border-top: none;
    margin-bottom: 8px;

	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const Toolbar = styled.div`
	width: 100%;
	height: 44px;

	display: flex;
	justify-content: space-around;
	align-items: center;
`;
