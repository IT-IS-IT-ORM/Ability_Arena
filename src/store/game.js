import { atom } from 'recoil';

const defaultGameState = {};

export default gameAtom = atom({
	key: 'gameAtom',
	default: defaultGameState,
});
