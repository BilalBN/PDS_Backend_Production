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
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateBatchDto } from './dto/create.batch.dto';
import { CreateBatchesService } from './services/create.batch.service';
import { DeleteBatchService } from './services/delete.batch.service';
import { GetBatchProductsService } from './services/get.batch.products.service';
import { GetBatchesByStatusService } from './services/get.batches.by.status.service';
import { GetBatchesService } from './services/get.batches.service';
import { GetSupervisedBatchesService } from './services/get.supervised.batches.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('batch')
export class BatchesController {
  constructor(
    private readonly createBatchService: CreateBatchesService,
    private readonly deleteBatchService: DeleteBatchService,
    private readonly getBatchProductsService: GetBatchProductsService,
    private readonly getBatchesService: GetBatchesService,
    private readonly getBatchesByStatusService: GetBatchesByStatusService,
    private readonly getSupervisedBatchesService: GetSupervisedBatchesService,
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
  async get(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(20)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Request() req,
  ) {
    return await this.getBatchesService.get(req.user.id, limit, page);
  }

  @Get('products')
  async getProducts(@Request() req) {
    return await this.getBatchProductsService.get(req.user.id);
  }

  @ApiQuery({ name: 'limit', default: 20, type: 'number' })
  @ApiQuery({ name: 'page', default: 1, type: 'number' })
  @Get('supervised')
  async getSupervised(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(20)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Request() req,
  ) {
    return await this.getSupervisedBatchesService.get(req.user.id, limit, page);
  }

  @ApiQuery({ name: 'limit', default: 20, type: 'integer' })
  @ApiQuery({ name: 'page', default: 1, type: 'integer' })
  @Get(':status')
  async getBatchesByStatus(
    @Param('status') status: string,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(20)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Request() req,
  ) {
    return await this.getBatchesByStatusService.get(
      req.user.id,
      status,
      limit,
      page,
    );
  }
}
