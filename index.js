/** @format */

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.listen(process.env.PORT, () => {
	console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});
