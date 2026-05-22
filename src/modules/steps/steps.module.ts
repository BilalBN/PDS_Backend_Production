import { Module } from '@nestjs/common';
import { GetMainStepsService } from './services/get.main.step.service';
import { GetSubStepsService } from './services/get.sub.steps.service';
import { StepsController } from './steps.controller';

@Module({
  controllers: [StepsController],
  providers: [GetMainStepsService, GetSubStepsService],
})
export class StepsModule {}
