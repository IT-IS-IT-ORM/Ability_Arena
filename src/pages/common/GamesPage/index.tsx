// 类型
import type { I_Game } from '@/def_types/game';

// React 路由
import { useHistory } from 'react-router-dom';

// 全局状态
import { useRecoilValue } from 'recoil';
import { A_Game } from '@/store';

// i18n
import { useTranslation } from 'react-i18next';

// Antd 组件
import { message as AntdMessage } from 'antd';
// 自定义组件
import { SearchBar } from '@/components/page-component/search-page';
import { GameCard } from '@/components/page-component/games-page';

// Scoped style
import classes from './style.module.scss';

export default function GamesPage() {
	const game = useRecoilValue(A_Game);
	const history = useHistory();
	const { t } = useTranslation();

	const handleCardClick = (game: I_Game) => {
		if (game.status !== 'Completed' && game.status !== 'Beta') {
			AntdMessage.info(t('GamesPage__notReady') as string);
			return;
		}

		history.push(`/games/${game.name}`);
	};

	return (
		<main className={classes.gamesPage}>
			<SearchBar />

			<div className="game-list">
				{game.gameList.map(game => (
					<GameCard key={game.name} game={game} onClick={handleCardClick} />
				))}
			</div>
		</main>
	);
}
