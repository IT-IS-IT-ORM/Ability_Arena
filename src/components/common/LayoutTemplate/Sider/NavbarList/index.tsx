// React 路由
import { useHistory, useLocation } from 'react-router-dom';

// 全局状态
import { useRecoilValue } from 'recoil';
import { S_UserIsAuthenticated } from '@/store';

// Hooks
import { useCreation } from 'ahooks';

// i18n
import { useTranslation } from 'react-i18next';

// 图标库
import { BiHomeSmile } from 'react-icons/bi';
import { GrGamepad } from 'react-icons/gr';
import { AiOutlineSetting } from 'react-icons/ai';
// 自定义组件
import { Button } from '@/components/common';

// 样式组件
import { NavbarListStyled, NavbarItemStyled } from './style';

const navbarItems: Omit<I_NavbarItem, 'isActive'>[] = [
	{
		to: '/',
		icon: <BiHomeSmile />,
		text: 'Navigator__home',
	},
	{
		to: '/games',
		icon: <GrGamepad />,
		text: 'Navigator__games',
	},
	{
		to: '/settings',
		icon: <AiOutlineSetting />,
		text: 'Navigator__settings',
	},
];

export default function NavbarList() {
	// 路由变量
	const { push } = useHistory();
	const { pathname } = useLocation();
	// 是否授权
	const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);
	// 高亮元素
	const activeNavItemIdx = useCreation(
		() => navbarItems.findIndex(item => item.to === pathname),
		[pathname],
	);

	const handleNavItemClick = (to: string) => {
		// @TODO: 未登录 不能跳转到 收藏页
		if (to !== pathname) {
			push(to);
		}
	};

	return (
		<NavbarListStyled>
			{navbarItems.map((item, idx) => (
				<NavbarItem
					key={item.to}
					navbarItem={{ ...item, isActive: idx === activeNavItemIdx }}
					onClick={handleNavItemClick}
				/>
			))}
		</NavbarListStyled>
	);
}

interface I_NavbarItem {
	to: string;
	icon: JSX.Element;
	text: string;
	isActive: boolean;
}
interface NavbarItemProps {
	navbarItem: I_NavbarItem;
	onClick(to: string, idx?: number): void;
}
function NavbarItem({ navbarItem, onClick }: NavbarItemProps) {
	const { t } = useTranslation();

	return (
		<NavbarItemStyled isActive={navbarItem.isActive}>
			<Button onClick={() => onClick(navbarItem.to)}>
				<>
					{navbarItem.icon}
					{t(navbarItem.text)}
				</>
			</Button>
		</NavbarItemStyled>
	);
}
