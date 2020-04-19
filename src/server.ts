/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import uploadConfig from './config/upload.config';
import { globalTractiveErrors } from './errors/globalTractiveErrors';
import routes from './routes/index';
import './database';

const port = 3333;

const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(globalTractiveErrors);

app.listen(port, () => {
   console.log(`Server runing on port ${port}`);
});
