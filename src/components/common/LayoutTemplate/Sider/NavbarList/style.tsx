import styled from 'styled-components';

export const NavbarListStyled = styled.ul`
	display: flex;
	flex-direction: column;
`;

interface NavbarItemStyledProps {
	isActive: boolean;
}
export const NavbarItemStyled = styled.li<NavbarItemStyledProps>`
	padding: 16px 24px;

	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		padding-bottom: 0;
	}

	@media screen and (max-width: 860px) {
		display: none;
	}

	button {
		width: 100%;
		max-width: calc(220px - 24px * 2);
		color: ${({ theme, isActive }) =>
			isActive ? theme.palette.primary : '#1e1e1e'};

		/* transition: color 300ms ease; */

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;

		svg {
			${({ theme, isActive }) =>
				theme.shape.iconAppearance.apply(
					isActive ? theme.palette.primary : theme.typography.color,
				)}

			transition: color 300ms ease;
		}
	}
`;
