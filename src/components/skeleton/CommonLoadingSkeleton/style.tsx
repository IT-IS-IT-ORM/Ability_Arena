import styled, { keyframes } from 'styled-components';

const Animation_Spin = keyframes`
100% {
    transform: rotate(360deg);
}
`;

export const CommonLoadingSkeletonStyled = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	.circle {
		width: 240px;
		height: 240px;
		border: 10px solid rgba(255, 255, 255, 0.4);
		border-radius: 50%;
		border-top-color: #fff;
		animation: ${Animation_Spin} 1s linear infinite;
	}
`;
