import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import uploadConfig from './config/upload.config';
import { globalTractiveErrors } from './errors/globalTractiveErrors';
import routes from './routes/index';
import './database';

class App {
   public app: express.Application;

   public constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
   }

   private middlewares(): void {
      this.app.use(express.json());
      this.app.use('/files', express.static(uploadConfig.directory));
      this.app.use(routes);
      this.app.use(globalTractiveErrors);
   }

   routes(): void {
      this.app.use(routes);
   }
}

export default new App().app;
