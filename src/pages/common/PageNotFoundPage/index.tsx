// i18n
import { useTranslation } from 'react-i18next';

// 样式组件
import { PageNotFoundPageStyled } from './style';

export default function PageNotFoundPage() {
	const { t } = useTranslation();

	return <PageNotFoundPageStyled status={404} title={t('PageNotFound__resourceNotFound')} />;
}
