import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      entities: [UserSchema],
    };
  },
});
