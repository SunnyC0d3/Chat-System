import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  db_connection: process.env.DB_Connection,
  secret_key: process.env.SECRET_KEY,
};