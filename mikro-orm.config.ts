import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { ProductsSchema } from './src/modules/products/entities/products.entity';
import { MainStepsSchema } from './src/modules/steps/entities/main.steps.entity';
import { SubStepsSchema } from './src/modules/steps/entities/sub.steps.entity';
import { UserSchema } from './src/modules/user/entities/user.entity';
import { envVars } from './src/shared/constants/env.vars';

export default defineConfig({
  clientUrl: envVars.DB_URL,
  driver: PostgreSqlDriver,
  driverOptions: {
    ssl: { rejectUnauthorized: false },
  },
  entities: [UserSchema, ProductsSchema, MainStepsSchema, SubStepsSchema],
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/migrations',
    pathTs: './migrations',
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './seeders',
    defaultSeeder: 'ProductsSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
});
