import type { I_Game } from '@/def_types/game';

import { atom } from 'recoil';

export interface gameStateProperties {
	gameList: I_Game[];
}

export const defaultGameState: gameStateProperties = {
	gameList: [
		{
			name: 'liarCard',
			status: 'Completed',
			hasBot: false,
		},
		{
			name: 'foolCard',
			status: 'Beta',
			hasBot: false,
		},
		{
			name: 'landlordsCard',
			status: 'InProgress',
			hasBot: false,
		},
		{
			name: 'crazyFight',
			status: 'Planning',
			hasBot: false,
		},
	],
};

export const A_Game = atom({
	key: 'A_Game',
	// default value, aka initial value
	default: defaultGameState,
});
