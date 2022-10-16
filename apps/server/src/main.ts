import * as express from 'express';
import * as bodyParser from 'body-parser';
import apiRouter from './app/api-router';
import { initStiggClient } from './app/stiggClient';
import { resolve } from 'path';

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  app.use('/api', apiRouter);

  // For simplicity of deployment of this project, we will serve
  // the client file from the same process of the backend
  const STATIC_DIR = process.env['STATIC_DIR'];
  if (STATIC_DIR) {
    app.use(express.static(STATIC_DIR));
    app.get('*', function (request, response) {
      response.sendFile(resolve(STATIC_DIR, 'index.html'));
    });
  }

  initStiggClient();

  const port = process.env['PORT'] || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

bootstrap();
