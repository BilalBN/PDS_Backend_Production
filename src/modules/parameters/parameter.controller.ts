import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AddParameterValueService } from '../parameters/services/add.parameter.value.service';
import { AddParameterValueDto } from './dto/add.parameter.value.dto';
import { GetParameterValuesService } from './services/get.parameter.values.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('parameter')
export class ParameterController {
  constructor(
    private readonly addSubStepValueService: AddParameterValueService,
    private readonly getParameterValuesService: GetParameterValuesService,
  ) {}

  @Post('value/add')
  async addSubStepValue(@Body() body: AddParameterValueDto, @Request() req) {
    return await this.addSubStepValueService.addValue(req.user.id, body);
  }

  @ApiParam({ name: 'batchId', type: 'number' })
  @Get('values/:batchId')
  async getValues(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Request() req,
  ) {
    return await this.getParameterValuesService.get(req.user.id, batchId);
  }
}
