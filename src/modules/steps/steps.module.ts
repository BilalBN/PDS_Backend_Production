import { Module } from '@nestjs/common';
import { GetMainStepsService } from './services/get.main.step.service';
import { StepsController } from './steps.controller';

@Module({
  controllers: [StepsController],
  providers: [GetMainStepsService],
})
export class StepsModule {}
