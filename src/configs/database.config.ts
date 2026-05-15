import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BatchesSchema } from '../modules/batches/entities/batches.entity';
import { ProductsSchema } from '../modules/products/entities/products.entity';
import { MainStepsSchema } from '../modules/steps/entities/main.steps.entity';
import { SubStepsSchema } from '../modules/steps/entities/sub.steps.entity';
import { UserSchema } from '../modules/user/entities/user.entity';

export const databaseConfig = MikroOrmModule.forRootAsync({
  driver: PostgreSqlDriver,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      clientUrl: configService.get<string>('DB_URL'),
      driver: PostgreSqlDriver,
      driverOptions: {
        ssl: { rejectUnauthorized: false },
      },
      entities: [
        UserSchema,
        ProductsSchema,
        MainStepsSchema,
        SubStepsSchema,
        BatchesSchema,
      ],
    };
  },
});
