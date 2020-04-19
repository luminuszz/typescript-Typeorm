/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import uploadConfig from './config/upload.config';
import { AppError } from './errors/appError';
import routes from './routes/index';

import './database';

const port = 3333;

const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(
   (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
         return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
         });
      }
      console.error(err);

      return response.status(500).json({
         status: 'error',
         message: 'Internal server error',
      });
   },
);

app.listen(port, () => {
   console.log(`Server runing on port ${port}`);
});
