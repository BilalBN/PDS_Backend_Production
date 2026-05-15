import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { CreateBatchDto } from '../dto/create.batch.dto';
import { CreateBatchesService } from '../services/create.batch.service';
import { DeleteBatchService } from '../services/delete.batch.service';
import { GetBatchesService } from '../services/get.batches.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('admin/batch')
export class AdminBatchController {
  constructor(
    private readonly createBatchService: CreateBatchesService,
    private readonly deleteBatchService: DeleteBatchService,
    private readonly getBatchesService: GetBatchesService,
  ) {}

  @Post()
  async create(@Body() body: CreateBatchDto, @Request() req) {
    return await this.createBatchService.create(req.user.id, body);
  }

  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteBatchService.delete(id);
  }

  @ApiQuery({ name: 'limit', default: 20, type: 'number' })
  @ApiQuery({ name: 'page', default: 1, type: 'number' })
  @Get()
  async getSupervisedBatches(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(20)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Request() req,
  ) {
    return await this.getBatchesService.getAll(req.user.id, limit, page);
  }
}
