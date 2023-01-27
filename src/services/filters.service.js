/** @format */

const filtersService = {
	filterByAnimalTags: (tagsList) => {
		const whereTags = [];
		if (tagsList) {
			

			if (tagsList != null) {
				if (Array.isArray(tagsList)) {
					tagsList.forEach((tag) => {
						whereTags.push({
							tags: {
								some: {
									tag_id: tag,
								},
							},
						});
					});
					return {
						AND: [
							...whereTags,
							{
								NOT: {
									tags: {
										some: {
											tag_id: {
												notIn: tagsList,
											},
										},
									},
								},
							},
						],
					};
				}

				return {
					AND: [
						{
							tags: {
								some: {
									tag_id: 1,
								},
							},
						},
						{
							NOT: {
								tags: {
									some: {
										tag_id: {
											notIn: [1],
										},
									},
								},
							},
						},
					],
				};
			}
		}
		return undefined;
	},
};

export default filtersService;
