import { Module } from '@nestjs/common';
import { AdminBatchController } from './controllers/admin.batch.controller';
import { AdminDashboardController } from './controllers/admin.dashboard.controller';
import { CreateBatchesService } from './services/batches/create.batch.service';
import { DeleteBatchService } from './services/batches/delete.batch.service';
import { GetBatchProductsService } from './services/batches/get.batch.products.service';
import { GetBatchSupervisorsService } from './services/batches/get.batch.supervisors.service';
import { GetBatchesService } from './services/batches/get.batches.service';
import { GetDashboardCountsService } from './services/dashboard/get.dashboard.counts.service';
import { BatchSubscriber } from './subscribers/batch.subscriber';

@Module({
  controllers: [AdminBatchController, AdminDashboardController],
  providers: [
    BatchSubscriber,
    CreateBatchesService,
    DeleteBatchService,
    GetBatchProductsService,
    GetBatchSupervisorsService,
    GetBatchesService,
    GetDashboardCountsService,
  ],
})
export class AdminModule {}
