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
import { CreateBatchesService } from '../services/batches/create.batch.service';
import { DeleteBatchService } from '../services/batches/delete.batch.service';
import { GetBatchProductsService } from '../services/batches/get.batch.products.service';
import { GetBatchSupervisorsService } from '../services/batches/get.batch.supervisors.service';
import { GetBatchesService } from '../services/batches/get.batches.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('admin/batch')
export class AdminBatchController {
  constructor(
    private readonly createBatchService: CreateBatchesService,
    private readonly deleteBatchService: DeleteBatchService,
    private readonly getBatchProductsService: GetBatchProductsService,
    private readonly getBatchSupervisorsService: GetBatchSupervisorsService,
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

  @Get('products')
  async getProducts(@Request() req) {
    return await this.getBatchProductsService.get(req.user.id);
  }

  @Get('supervisors')
  async getSupervisors(@Request() req) {
    return await this.getBatchSupervisorsService.get(req.user.id);
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
