import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UserSchema } from './src/modules/user/entities/user.entity';
import { envVars } from './src/shared/constants/env.vars';

export default defineConfig({
  clientUrl: envVars.DB_URL,
  driver: PostgreSqlDriver,
  driverOptions: {
    ssl: { rejectUnauthorized: false },
  },
  entities: [UserSchema],
  extensions: [Migrator],
  migrations: {
    path: './dist/migrations',
    pathTs: './migrations',
  },
});
