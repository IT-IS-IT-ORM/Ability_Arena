import type { I_Game } from '@/def_types/game';

import { atom } from 'recoil';

// 图片资源
import { cover } from '@/assets/image/game/liar-card';

export interface gameStateProperties {
	gameList: I_Game[];
}

export const defaultGameState: gameStateProperties = {
	gameList: [
		{
			name: 'liar-card',
			status: 'Beta',
			cover,
			hasBot: false,
		},
		{
			name: 'fool-card',
			status: 'Planning',
			cover,
			hasBot: false,
		},
		{
			name: 'landlords-card',
			status: 'Planning',
			cover,
			hasBot: false,
		},
		{
			name: 'crazy-fight',
			status: 'Planning',
			cover,
			hasBot: false,
		},
	],
};

export const A_Game = atom({
	key: 'A_Game',
	// default value, aka initial value
	default: defaultGameState,
});
