// 全局状态
import { useRecoilState } from 'recoil';
import { A_User, A_Page } from '@/store';

// i18n
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

// Hooks
import { useBoolean, useMemoizedFn } from 'ahooks';

// 工具库
// import { getHtmlLang } from '@/utils';

// 图标库
import { BiUser } from 'react-icons/bi';
import { IoLanguage } from 'react-icons/io5';
// Antd 组件库
import { Input, Select } from 'antd';
// 自定义组件
import { Button } from '@/components/common';

// Scoped style
import classes from './style.module.scss';

// 静态资源
import {
	Avatar_1,
	Avatar_2,
	Avatar_3,
	Avatar_4,
	Avatar_5,
	Avatar_6,
	Avatar_7,
	Avatar_8,
	Avatar_9,
} from '@/assets/image/user';

const avatarList = [
	Avatar_1,
	Avatar_2,
	Avatar_3,
	Avatar_4,
	Avatar_5,
	Avatar_6,
	Avatar_7,
	Avatar_8,
	Avatar_9,
];

const availableLanguages = [
	{
		label: '中文',
		value: 'zhCN',
	},
	{
		label: 'Қазақша',
		value: 'kkKZ',
	},
];

const { Option } = Select;

export default function SettingsPage() {
	// 用户信息
	const [user, setUser] = useRecoilState(A_User);
	// 页面信息
	const [page, setPage] = useRecoilState(A_Page);
	// 翻译函数
	const { t } = useTranslation();

	// 头像列表
	const [
		showAvatarGrid,
		{ setFalse: closeAvatarGrid, toggle: toggleAvatarGrid },
	] = useBoolean(false);

	// 处理切换头像
	const handleAvatarChange = (index: number) => {
		if (index !== user.avatarIdx) {
			setUser(prevState => ({ ...prevState, avatarIdx: index }));
		}

		closeAvatarGrid();
	};

	const handleUsernameChange = useMemoizedFn(({ target: { value } }) => {
		setUser(prevUser => ({ ...prevUser, username: value }));
	});

	const handleLanguageChange = useMemoizedFn(value => {
		// document.documentElement.lang = getHtmlLang(value);
		i18next.changeLanguage(value);
		setPage(prevPage => ({
			...prevPage,
			locale: value,
		}));
	});

	return (
		<main
			className={`${classes.settingsPage} ${
				showAvatarGrid ? `${classes.settingsPage}--show` : ''
			}`}>
			<div className="head">
				<div className="avatar-wrap">
					<img src={avatarList[user.avatarIdx]} alt="avatar" />
				</div>
				<Button onClick={toggleAvatarGrid}>
					{t('SettingsPage__changeAvatar') as string}
				</Button>
			</div>

			<div className={`avatar-grid ${showAvatarGrid && 'avatar-grid--show'}`}>
				{avatarList.map((avatar, idx) => (
					<img
						key={idx}
						src={avatar}
						alt="avatar"
						onClick={() => handleAvatarChange(idx)}
					/>
				))}
			</div>

			<div className={`bottom ${showAvatarGrid && 'bottom--hide'}`}>
				<div className="group">
					<div className="label">
						<BiUser />
						<span>{t('SettingsPage__username')}: </span>
					</div>
					<Input
						className="field"
						value={user.username}
						onChange={handleUsernameChange}
					/>
				</div>

				<div className="group">
					<div className="label">
						<IoLanguage />
						<span>{t('SettingsPage__language')}: </span>
					</div>
					<Select
						className="field"
						value={page.locale}
						onChange={handleLanguageChange}>
						{availableLanguages.map(language => (
							<Option key={language.value} value={language.value}>
								{language.label}
							</Option>
						))}
					</Select>
				</div>
			</div>
		</main>
	);
}
