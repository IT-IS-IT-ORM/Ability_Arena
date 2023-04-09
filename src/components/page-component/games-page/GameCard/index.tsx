// 类型
import type { I_Game } from '@/def_types/game';

// i18n
import { useTranslation } from 'react-i18next';

// 图标库
import {
	AiOutlineExperiment,
	AiOutlineHourglass,
	AiOutlineRocket,
} from 'react-icons/ai';
import { IoConstructOutline } from 'react-icons/io5';

// Scoped style
import classes from './style.module.scss';

// 获取游戏 Status 对应的 Icon
function getStatusIcon(status: I_Game['status']) {
	switch (status) {
		case 'Planning':
			return <AiOutlineHourglass />;
		case 'InProgress':
			return <IoConstructOutline />;
		case 'Beta':
			return <AiOutlineExperiment />;
		case 'Completed':
			return <AiOutlineRocket />;
	}
}

// Props 类型
interface GameCardProps {
	game: I_Game;
	onClick?: (game: I_Game) => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
	const { t } = useTranslation();

	return (
		<div className={classes.gameCard} onClick={() => onClick?.(game)}>
			<div className="lt"></div>
			<div className="rt"></div>
			<div className="rb"></div>
			<div className="lb"></div>

			{game.status === 'Beta' && <div className="beta-banner">Beta</div>}

			<img src={game.cover} alt={game.name} className="cover" />

			<div className="info">
				<span className="name">{t(`GamesPage__${game.name}`)}</span>
				<span className="status">
					{getStatusIcon(game.status)} {game.status}
				</span>
			</div>
		</div>
	);
}
