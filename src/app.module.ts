import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './configs/config';
import { databaseConfig, mongoDbConfig } from './configs/database.config';
import { jwtConfig } from './configs/jwt.config';
import { microservicesConfig } from './configs/microservices.config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BatchesModule } from './modules/batches/batches.module';
import { ParameterModule } from './modules/parameters/parameter.module';
import { StepsModule } from './modules/steps/steps.module';
import { SupervisorModule } from './modules/supervisor/supervisor.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    config,
    databaseConfig,
    jwtConfig,
    microservicesConfig,
    mongoDbConfig,
    AuthModule,
    UserModule,
    BatchesModule,
    AdminModule,
    StepsModule,
    SupervisorModule,
    ParameterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
