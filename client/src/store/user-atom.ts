import type { allowedRole } from '@/utils';

import { atom, selector } from 'recoil';
import { localStorage, role } from '@/utils';

export interface userStateProperties {
	username: string;
	avatarIdx: number;
	role: allowedRole;
	token: string;
}

export const defaultUserState: userStateProperties = {
	username: 'Gamer_1234',
	avatarIdx: 7,
	role: role.GUEST,
	token: '',
};

const state = localStorage.get('user', defaultUserState);

export const A_User = atom({
	key: 'A_User',
	// default value, aka initial value
	default: state,
});

export const S_UserIsAuthenticated = selector({
	key: 'S_UserIsAuthenticated',
	get({ get }) {
		const user = get(A_User);
		const hasToken = user.token !== defaultUserState.token;
		const notGuest = user.role !== role.GUEST;

		return hasToken && notGuest;
	},
});
