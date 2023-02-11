import styled from 'styled-components';
// Antd 组件库
import { Input } from 'antd';

const { Search } = Input;

export const SearchBarStyled = styled(Search)`
	--border-radius: 32px;

	.ant-input-group {
		.ant-input-affix-wrapper:not(:last-child) {
			padding-left: 16px;
			padding-right: 16px;
			border-start-start-radius: var(--border-radius);
			border-end-start-radius: var(--border-radius);

			.ant-input-suffix {
				svg {
					cursor: pointer;
					${({ theme }) =>
						theme.shape.iconAppearance.apply(theme.typography.color)};
				}
			}
		}

		.ant-input-group-addon:last-child .ant-input-search-button {
			width: 50px;
			border-start-end-radius: var(--border-radius);
			border-end-end-radius: var(--border-radius);
			background: ${({ theme }) => theme.palette.primary};

			.anticon-search {
				transform: none;

				svg {
					${({ theme }) => theme.shape.iconAppearance.apply('#fff')};
					font-size: 20px;
					transform: translateY(1px) scale(0.9);
				}
			}
		}
	}
`;
