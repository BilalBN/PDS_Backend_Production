import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

config();

export function createTestToken(payload: any) {
  return sign(payload, process.env.JWT_SECRET!, { algorithm: 'HS512' });
}
