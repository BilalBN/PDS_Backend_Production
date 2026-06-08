import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AddChartValueDto } from './dto/add.chart.value.dto';
import { ImageUploadDto } from './dto/image.upload.dto';
import { AddChartValuesService } from './services/add.chart.values.service';
import { DeleteChartValueService } from './services/delete.chart.value.service';
import { GetChartValuesService } from './services/get.chart.values.service';
import { UploadChartImageService } from './services/upload.chart.image.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('chart')
export class ChartController {
  constructor(
    private readonly addChartValuesService: AddChartValuesService,
    private readonly deleteChartValueService: DeleteChartValueService,
    private readonly getChartValuesService: GetChartValuesService,
    private readonly uploadChartImageService: UploadChartImageService,
  ) {}

  @Post('values')
  async addValues(@Body() body: AddChartValueDto, @Request() req) {
    return await this.addChartValuesService.addValue(req.user.id, body);
  }

  @ApiParam({ name: 'batchId', type: 'number' })
  @ApiParam({ name: 'subStepId', type: 'number' })
  @ApiParam({ name: 'chartValueIndex', type: 'number' })
  @Delete('values/:batchId/:subStepId/:chartValueIndex')
  async deleteValue(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Param('subStepId', ParseIntPipe) subStepId: number,
    @Param('chartValueIndex', ParseIntPipe) chartValueIndex: number,
    @Request() req,
  ) {
    return await this.deleteChartValueService.delete(
      req.user.id,
      batchId,
      subStepId,
      chartValueIndex,
    );
  }

  @ApiParam({ name: 'batchId', type: 'number' })
  @ApiParam({ name: 'subStepId', type: 'number' })
  @Get('values/:batchId/:subStepId')
  async getValues(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Param('subStepId', ParseIntPipe) subStepId: number,
    @Request() req,
  ) {
    return await this.getChartValuesService.get(
      req.user.id,
      batchId,
      subStepId,
    );
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ImageUploadDto })
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadChartImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.uploadChartImageService.upload(req.user.id, file);
  }
}
