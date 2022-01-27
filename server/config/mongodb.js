// Setting up mongoose to allow connection with MongoDB

import dotenv from './dotenv.js';
import mongoose from 'mongoose';

const CONNECTION_URL = dotenv.db_connection;

export default CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully');
});
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected');
});
mongoose.connection.on('error', (error) => {
  console.log('Mongo connection has an error', error);
  mongoose.disconnect();
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected');
});
