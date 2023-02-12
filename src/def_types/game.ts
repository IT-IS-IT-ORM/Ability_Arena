export type gameStatus = 'Planning' | 'InProgress' | 'Beta' | 'Completed';

export interface I_Game {
	name: string;
	cover?: string;
	status: gameStatus;
	hasBot: boolean;
}
