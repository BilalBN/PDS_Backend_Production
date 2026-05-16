import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { GetBatchesByStatusService } from './services/get.batches.by.status.service';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';

@Module({
  controllers: [BatchesController],
  providers: [GetBatchesByStatusService, GetSupervisedBatchesService],
})
export class BatchesModule {}
