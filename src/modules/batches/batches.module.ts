import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { CreateBatchesService } from './services/create.batch.service';
import { DeleteBatchService } from './services/delete.batch.service';
import { GetBatchProductsService } from './services/get.batch.products.service';
import { GetBatchesByStatusService } from './services/get.batches.by.status.service';
import { GetBatchesService } from './services/get.batches.service';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';
import { BatchSubscriber } from './subscribers/batch.subscriber';

@Module({
  controllers: [BatchesController],
  providers: [
    BatchSubscriber,
    CreateBatchesService,
    DeleteBatchService,
    GetBatchProductsService,
    GetBatchesByStatusService,
    GetBatchesService,
    GetSupervisedBatchesService,
  ],
})
export class BatchesModule {}
