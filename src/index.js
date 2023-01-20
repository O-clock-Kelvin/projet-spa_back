/** @format */

import dotenv from 'dotenv';
import express from 'express';
import v1Router from './routes/router.js';

// on charge les variables d'environnement
dotenv.config();
const app = express();

// on commence a écouter sur le port défini dans les variables d'env
app.listen(process.env.PORT, () => {
	console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});

app.use('/v1', v1Router);


