// Import required modules
import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

// Import required routes
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import chatRoomRouter from './routes/chatRoom.js';
import deleteRouter from './routes/delete.js';

// Import config modules
import dotenv from './config/dotenv.js';
import './config/mongodb.js';

// Import required middleware
import { decode } from './middlewares/jwt.js';

// Init app
const app = express();
const port = dotenv.port || '3000';
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
