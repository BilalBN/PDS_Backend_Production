import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartController } from './chart.controller';
import { ChartValuesSchema } from './entities/chat.value.entity';
import { AddChartValuesService } from './services/add.chart.values.service';
import { GetChartValuesService } from './services/get.chart.values.service';
import { UploadChartImageService } from './services/upload.chart.image.service';

@Module({
  controllers: [ChartController],
  imports: [
    MongooseModule.forFeature([
      { name: 'CHART_VALUE', schema: ChartValuesSchema },
    ]),
  ],
  providers: [
    AddChartValuesService,
    GetChartValuesService,
    UploadChartImageService,
  ],
})
export class ChartModule {}
