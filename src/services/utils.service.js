const utilsService = {
	experienceToNumber: (level) => {
		switch (level) {
			case 'MEDIUM':
				return 1;
			case 'EXPERT':
				return 2;
			default:
				return 0;
		}
	},
};
export default utilsService;
