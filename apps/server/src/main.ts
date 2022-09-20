import * as express from 'express';
import * as bodyParser from 'body-parser';
import todosRouter from './app/todos/todos-router';
import usersRouter from './app/users/users-router';

const app = express();

app.use(bodyParser.json());

app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
