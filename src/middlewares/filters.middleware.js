/** @format */

import qs from "qs";
import Joi from "joi";
import APIError from "../services/APIError.service.js";

/**
 * On crée une fonction qui retourne une fonction, c'est l'équivalent formatté de ce code:
 * const filtersMiddleware = (schema) => {
 * 	return (req,res,next) => {
 *  	next();
 * 	}
 * }
 * Cela permet d'ajouter un paramètre(schema) à notre middleware.
 *
 * Ce middleware permet de traiter les filtres, l'order, et la pagination d'une requête
 * exemple de requête: GET http://localhost:3000/users?country=france@gmail.com&sort=-createdAt,id&skip=10&take=10
 */

const filters = (schema) => (req, res, next) => {
	/**
	 * PARSING DE LA REQUETE
	 * On vient convertir la string de requête(ex: /v1/users?country=france&email[contains]=@gmail.com&sort=-createdAt,id&skip=10&take=10&include=tags,posts) en objet
	 * on parse req.query pour récupérer ses paramètres, puis les transformer en objet => le paquet "qs" s'en occupe pour nous
	 */

	const parsedQuery = qs.parse(req.query, {
		depth: 2, // pour la sécurité, la profondeur maximale des tableaux est de 2, cf doc de QS
		comma: true, // on convert les arguments séparés par des virgules en tableau ex sort=-createdAt,id => ['-createdAt',' id']
	});

	/**
	 *  SORT
	 * si "sort" est contenu dans le tableau parsedQuery
	 */

	if (parsedQuery.sort) {
		// notre paramètre "sort" arrive dans cette forme " sort: ['-createdAt', ' id'] " => traduction: je veux trier par date décroissante et par id.
		// On souhaite obtenir un objet de ce format: {createdAt:"desc", id:"asc"}
		let sort = {};

		// if (schema) {

		// si un schema Joi est passé en paramètre du middleware, on récupère les champs du schema sans les valider
		const schemaDescription = schema ? schema.describe() : undefined;

		if (typeof parsedQuery.sort === "string") {
			const itemName = parsedQuery.sort.replace("-", "").replaceAll(" ", "");

			if (schemaDescription === undefined || schemaDescription.keys[itemName]) {
				if (parsedQuery.sort.startsWith("-")) {
					// si l'élement commence par "-", celà signfie qu'on cherche un ordre descendant
					sort = { [itemName]: "desc" }; // on vient ajouter l'élément à l'objet, la notation [item] permet de ne pas récupérer la valeur de la variable mais son nom, puis on retire le "-"" de son nom
				} else {
					sort = { [itemName]: "asc" };
				}
				// si l'élément ne commence pas par "-", celà signifie qu'on cherche un ordre croissant
			} // {createdAt:"desc", id:"asc"} => pourra être utilisé dans notre requête prisma
		} else {
			throw new APIError({ code: 400, message: "INVALID_SORT_PARAMETER" });
		}

		req.sort = sort; // => req.sort = {createdAt:"desc", id:"asc"}, pourra être utilisé dans prisma
	}

	/**
	 * PAGINATION
	 * comprendre la pagination avec prisma, et l'intérêt du cursor: https://www.prisma.io/docs/concepts/components/prisma-client/pagination
	 */
	const { cursor } = req.query;
	const skip = Number(req.query.skip) || undefined;
	const take = Number(req.query.take) || undefined;

	// on assigne les éléments l'objet de requête qui sera passé au prochain middleware ou à la route
	req.pagination = {
		cursor,
		skip,
		take,
	};

	/**
	 * INCLUDE
	 * gère les relations à inclure dans la requête
	 * Par exemple: mon user peut avoir des tags, je cherche donc à récupérer ses tags
	 * => http://localhost:3000/animals?include=tags
	 */
	if (parsedQuery.include) {
		if (Array.isArray(parsedQuery.include)) {
			const includeList = [];
			parsedQuery.include.forEach((includedRelation) => {
				includeList.push(includedRelation.replaceAll(" ", "")); // on retire tous les espaces du parametre include
			});
			req.include = includeList;
		} else {
			const includeParams = parsedQuery.include.replaceAll(" ", ""); // on retire tous les espaces du parametre include
			req.include = [includeParams]; // on passe les relations à include dans la requête
		}
	}

	/**
	 * FILTRES
	 * on attribue l'intégralité des paramètres de notre query string à la variable filters
	 */
	const queryFilters = parsedQuery;

	// on supprime les éléments utilisés précédemment, et on considère que tous les éléments restants sont des filtres
	delete queryFilters.take;
	delete queryFilters.cursor;
	delete queryFilters.skip;
	delete queryFilters.sort;
	delete queryFilters.include;

	// on assigne les éléments l'objet de requête qui sera passé au prochain middleware ou à la route, et on valide les paramètres

	/**
	 * http://localhost:3000/user?taille=GRAND
	 */
	req.filters = schema
		? Joi.attempt(queryFilters, schema, {
				stripUnknown: true,
				convert: true, // id:"1" -> id:1 (number)
		  })
		: queryFilters;

	/**
	 * on passe au prochain middleware ou à la prochaine route
	 * notre objet req contiendra de nouveaux éléments: req.sort, req.pagination, req.filters et req.include
	 */
	next();
};

export default filters;
