import { MariaDbDriver } from '@mikro-orm/mariadb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchesSchema } from '../modules/batches/entities/batches.entity';
import { ParametersSchema } from '../modules/parameters/entities/parameters.entity';
import { ProductsSchema } from '../modules/products/entities/products.entity';
import { MainStepsSchema } from '../modules/steps/entities/main.steps.entity';
import { SubStepsSchema } from '../modules/steps/entities/sub.steps.entity';
import { UserSchema } from '../modules/user/entities/user.entity';

export const databaseConfig = MikroOrmModule.forRootAsync({
  driver: MariaDbDriver,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      clientUrl: configService.get<string>('DB_URL'),
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
    };
  },
});

export const mongoDbConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return { uri: configService.get<string>('MONGO_DB_URL') };
  },
});
