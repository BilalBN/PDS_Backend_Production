import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';

@Module({
  controllers: [BatchesController],
  providers: [GetSupervisedBatchesService],
})
export class BatchesModule {}
