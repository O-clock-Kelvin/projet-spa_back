/** @format */

import prismaClient from '../prisma.js';

const usersController = {
	getAllUsers: async () => {
		const users = await prismaClient.user.findMany({});
		return users;
	},

	getUser: async (id) => {
		const user = await prismaClient.user.findUnique({
			where: {
				id: Number(id), // on converti l'id en number car il arrive depuis req.params en string
			},
		});
		return user;
	},
};

export default usersController;
