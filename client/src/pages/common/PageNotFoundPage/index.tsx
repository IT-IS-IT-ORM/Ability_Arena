// i18n
import { useTranslation } from 'react-i18next';

// Antd component
import { Result } from 'antd';

// Scoped style
import classes from './style.module.scss';

export default function PageNotFoundPage() {
	const { t } = useTranslation();

	return <Result className={classes.pageNotFound} status={404} title={t('PageNotFound__resourceNotFound')} />;
}
