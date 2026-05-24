import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AddParameterValueService } from '../parameters/services/add.parameter.value.service';
import { AddParameterValueDto } from './dto/add.parameter.value.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('parameter')
export class ParameterController {
  constructor(
    private readonly addSubStepValueService: AddParameterValueService,
  ) {}

  @Post('value/add')
  async addSubStepValue(@Body() body: AddParameterValueDto, @Request() req) {
    return await this.addSubStepValueService.addValue(req.user.id, body);
  }
}
