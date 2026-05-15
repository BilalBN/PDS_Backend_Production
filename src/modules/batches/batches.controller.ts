import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('batch')
export class BatchesController {
  constructor(
    private readonly getSupervisedBatchesService: GetSupervisedBatchesService,
  ) {}

  @ApiQuery({ name: 'limit', default: 20, type: 'integer' })
  @ApiQuery({ name: 'page', default: 1, type: 'integer' })
  @Get('/supervised')
  async getSupervisedBatches(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(20)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Request() req,
  ) {
    return await this.getSupervisedBatchesService.get(req.user.id, limit, page);
  }
}
