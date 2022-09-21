import styled from 'styled-components';

export const CardStyled = styled.div`
	width: 32px;
	height: 32px;

	color: #fff;
	font-size: 24px;
	font-weight: bolder;

	border: 2px solid #fff;	
	background: linear-gradient(to right, #cb3066, #16bffd);

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	transition: top 0.3s ease, left 0.3s ease;
`;
