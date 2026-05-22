import { Module } from '@nestjs/common';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';
import { SupervisorController } from './supervisor.controller';

@Module({
  controllers: [SupervisorController],
  providers: [GetSupervisedBatchesService],
})
export class SupervisorModule {}
