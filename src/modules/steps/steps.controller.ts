import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { GetMainStepsService } from './services/get.main.step.service';
import { GetSubStepsService } from './services/get.sub.steps.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('steps')
export class StepsController {
  constructor(
    private readonly getMainStepsService: GetMainStepsService,
    private readonly getSubStepsService: GetSubStepsService,
  ) {}

  @ApiParam({ name: 'productId', type: 'number' })
  @Get('main/:productId')
  async getMainSteps(
    @Param('productId', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return await this.getMainStepsService.get(req.user.id, id);
  }

  @ApiParam({ name: 'mainStepId', type: 'number' })
  @Get('sub/:mainStepId')
  async getSubSteps(
    @Param('mainStepId', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return await this.getSubStepsService.get(req.user.id, id);
  }
}
