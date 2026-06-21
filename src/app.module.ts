import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './configs/config';
import { databaseConfig, mongoDbConfig } from './configs/database.config';
import { jwtConfig } from './configs/jwt.config';
import { microservicesConfig } from './configs/microservices.config';
import { AuthModule } from './modules/auth/auth.module';
import { BatchesModule } from './modules/batches/batches.module';
import { ChartModule } from './modules/chart/chart.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ParameterModule } from './modules/parameters/parameter.module';
import { ProductsModule } from './modules/products/products.module';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    BatchesModule,
    ChartModule,
    DashboardModule,
    ParameterModule,
    ProductsModule,
    StepsModule,
    SupervisorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
