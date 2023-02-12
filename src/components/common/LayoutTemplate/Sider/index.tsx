// 类型
import type { MenuProps } from 'antd';

// React
import { useRef } from 'react';
// React 路由
import { useHistory } from 'react-router-dom';

// i18n
import { useTranslation } from 'react-i18next';

// Antd 组件库
import { Dropdown } from 'antd';
// 图标库
import { CgMenuGridO } from 'react-icons/cg';
import { BiHomeSmile } from 'react-icons/bi';
import { GrGamepad } from 'react-icons/gr';
import { AiOutlineSetting } from 'react-icons/ai';
// 自定义组件
import { Button } from '@/components/common';
// 内置组件
import NavbarList from './NavbarList';
// 样式组件
import { SiderStyled } from './style';

export default function Sider() {
	const { t } = useTranslation();
	const { push } = useHistory();
	const navigatorBtnRef = useRef<HTMLDivElement>(null);

	const items: MenuProps['items'] = [
		{
			key: '/',
			label: (
				<Button onClick={() => push('/')}>
					<>
						<BiHomeSmile />
						<p>{t('Navigator__home')}</p>
					</>
				</Button>
			),
		},
		{
			key: '/games',
			label: (
				<Button onClick={() => push('/games')}>
					<>
						<GrGamepad />
						<p>{t('Navigator__games')}</p>
					</>
				</Button>
			),
		},
		{
			key: '/settings',
			label: (
				<Button onClick={() => push('/settings')}>
					<>
						<AiOutlineSetting />
						<p>{t('Navigator__settings')}</p>
					</>
				</Button>
			),
		},
	];

	return (
		<SiderStyled>
			<div className="brand">
				<span>Play</span>
				<strong>ground</strong>
			</div>

			<Dropdown
				menu={{ items }}
				placement="bottom"
				getPopupContainer={() => navigatorBtnRef.current as HTMLDivElement}>
				<div className="navigator-btn" ref={navigatorBtnRef}>
					<CgMenuGridO />
				</div>
			</Dropdown>

			<NavbarList />

			<div className="logo">
				<span>Powered by</span>
				<strong>IT IS IT</strong>
			</div>
		</SiderStyled>
	);
}
