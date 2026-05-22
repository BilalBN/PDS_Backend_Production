import {
  defineConfig,
  MariaDbDriver
} from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { BatchesSchema } from './src/modules/batches/entities/batches.entity';
import { ParametersSchema } from './src/modules/parameters/entities/parameters.entity';
import { ProductsSchema } from './src/modules/products/entities/products.entity';
import { MainStepsSchema } from './src/modules/steps/entities/main.steps.entity';
import { SubStepsSchema } from './src/modules/steps/entities/sub.steps.entity';
import { UserSchema } from './src/modules/user/entities/user.entity';
import { envVars } from './src/shared/constants/env.vars';

export default defineConfig({
  clientUrl: envVars.DB_URL,
  driver: MariaDbDriver,
  driverOptions: {
    ssl: { rejectUnauthorized: false },
  },
  entities: [
    UserSchema,
    ProductsSchema,
    MainStepsSchema,
    SubStepsSchema,
    BatchesSchema,
    ParametersSchema,
  ],
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/migrations_mdb',
    pathTs: './migrations_mdb',
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
