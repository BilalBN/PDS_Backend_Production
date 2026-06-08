import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartController } from './chart.controller';
import { BatchChartSchema } from './entities/chart.value.entity';
import { AddChartValuesService } from './services/add.chart.values.service';
import { DeleteChartValueService } from './services/delete.chart.value.service';
import { GetChartValuesService } from './services/get.chart.values.service';
import { UploadChartImageService } from './services/upload.chart.image.service';

@Module({
  controllers: [ChartController],
  imports: [
    MongooseModule.forFeature([
      { name: 'batch_chart', schema: BatchChartSchema },
    ]),
  ],
  providers: [
    AddChartValuesService,
    DeleteChartValueService,
    GetChartValuesService,
    UploadChartImageService,
  ],
})
export class ChartModule {}
