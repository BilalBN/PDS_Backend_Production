import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { GetBatchesByStatusService } from './services/get.batches.by.status.service';

@Module({
  controllers: [BatchesController],
  providers: [GetBatchesByStatusService],
})
export class BatchesModule {}
