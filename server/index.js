// Import required modules
import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

// Import required routes
import indexRouter from './routes/index';
import userRouter from './routes/user';
import chatRoomRouter from './routes/chatRoom';
import deleteRouter from './routes/delete';

// Import required middleware
import { decode } from './middlewares/jwt';

// Init app
const app = express();
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/room', decode, chatRoomRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use('*', (req, res) => { res.status(404).json({ success: false, message: 'API endpoint doesnt exist' }); });

// Create HTTP server.
const server = http.createServer(app);
server.listen(port);
// Event listener for HTTP server 'listening' event.
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});

//import validate from './modules/components/validate';

// const validated = validate((types) => ({
//   payload: {
//     firstname: 2,
//   },
//   checks: {
//     firstname: { type: types.string },
//   },
// }));
