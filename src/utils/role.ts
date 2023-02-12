// 角色
export type allowedRole = 'GUEST' | 'USER' | 'ADMIN';

// 角色对象
export const role: {
	GUEST: 'GUEST';
	USER: 'USER';
	ADMIN: 'ADMIN';

	// 所有角色
	all: () => ['GUEST', 'USER', 'ADMIN'];

	// 除 `roles` 以外的 所有角色
	exclude: (roles: allowedRole | allowedRole[]) => allowedRole[];
} = {
	GUEST: 'GUEST',
	USER: 'USER',
	ADMIN: 'ADMIN',

	// 所有角色
	all() {
		return ['GUEST', 'USER', 'ADMIN'];
	},

	// 除 `roles` 以外的 所有角色
	exclude(roles) {
		let allRole: allowedRole[] = ['GUEST', 'ADMIN'];

		if (Array.isArray(roles)) {
			for (let role of roles) {
				allRole = allRole.filter(r => r !== role);
			}

			return allRole;
		}

		return allRole.filter(role => role !== roles);
	},
};
