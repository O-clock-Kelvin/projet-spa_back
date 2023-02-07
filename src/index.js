/** @format */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import v1Router from './routes/router.js';
// import errorHandler from './services/errorHandler.js';
import errorMiddleware from './middlewares/error.middleware.js';

// on charge les variables d'environnement
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

// on commence a écouter sur le port défini dans les variables d'env
app.listen(process.env.PORT, () => {
	console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});

app.use('/v1', v1Router);

app.use(errorMiddleware.notFound);
// Pour gérer les erreurs, express ajoute automatiquement un paramètre err dans le middleware
app.use(errorMiddleware.handleError);
