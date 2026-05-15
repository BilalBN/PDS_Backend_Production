import { Module } from '@nestjs/common';
import { AdminBatchController } from './controllers/admin.batch.controller';
import { CreateBatchesService } from './services/create.batch.service';
import { DeleteBatchService } from './services/delete.batch.service';
import { GetBatchesService } from './services/get.batches.service';
import { BatchSubscriber } from './subscribers/batch.subscriber';

@Module({
  controllers: [AdminBatchController],
  providers: [
    BatchSubscriber,
    CreateBatchesService,
    DeleteBatchService,
    GetBatchesService,
  ],
})
export class AdminModule {}
