import styled from 'styled-components';

export const ButtonStyled = styled.button`
	${({ theme }) => theme.typography.button.apply()};
`;
