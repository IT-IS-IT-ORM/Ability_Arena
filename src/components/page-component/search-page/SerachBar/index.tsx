// i18n
import { useTranslation } from 'react-i18next';

// Antd 组件库
import { message as AntdMessage, Input } from 'antd';
// 图标库
import { IoOptionsOutline } from 'react-icons/io5';

// Scoped style
import classes from './style.module.scss';

const { Search } = Input;

export default function SerachBar() {
	const { t } = useTranslation();

	// 处理搜索
	const onSearch = (value: string) => {
		value = value.trim();

		if (value === '') {
			AntdMessage.warning(t('GamesPage__SearchBar__empty'));
			return;
		}

		console.log(`搜索内容: ${value}`);
		AntdMessage.info('Іздеу функциясына қазіргі уақытта қолдау көрсетілмейді');
	};

	// 处理过滤
	const openFilter = () => {
		AntdMessage.info('Сүзгі функциясына қазіргі уақытта қолдау көрсетілмейді');
	};

	return (
		<Search
			className={classes.searchBar}
			allowClear
			size="large"
			maxLength={120}
			placeholder={t('GamesPage__SearchBar__placeholder') as string}
			suffix={<IoOptionsOutline onClick={openFilter} />}
			onSearch={onSearch}
		/>
	);
}
