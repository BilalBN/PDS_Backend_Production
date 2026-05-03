import { config } from 'dotenv';

config();

export const envVars = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
