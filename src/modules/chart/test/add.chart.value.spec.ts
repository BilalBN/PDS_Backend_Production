import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import {
  databaseConfig,
  mongoDbConfig,
} from '../../../configs/database.config';
import { AddChartValueDto } from '../dto/add.chart.value.dto';
import { ChartValuesSchema } from '../entities/chat.value.entity';
import { AddChartValuesService } from '../services/add.chart.values.service';

describe('Add chart value service test', () => {
  let addChartValueService: AddChartValuesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        config,
        databaseConfig,
        mongoDbConfig,
        MongooseModule.forFeature([
          {
            schema: ChartValuesSchema,
            name: 'CHART_VALUE',
          },
        ]),
      ],
      providers: [AddChartValuesService],
    }).compile();
    addChartValueService = module.get(AddChartValuesService);
  });

  afterAll(async () => await module.close());

  it('Should return value added successfully', async () => {
    const chartValue: AddChartValueDto = {
      batch_id: 1,
      entered_by: 10,
      sub_step_id: 10,
      values: [
        { parameter_id: 1, value: '10' },
        { parameter_id: 2, value: '60' },
      ],
    };
    const result = await addChartValueService.addValue(1, chartValue);
    expect(result.message).toEqual('Value added successfully');
  });

  it('Should return user found!', async () => {
    const chartValue = {
      batch_id: 0,
      entered_by: 0,
      sub_step_id: 0,
      values: [],
    };
    await expect(
      addChartValueService.addValue(100, chartValue),
    ).rejects.toThrow(NotFoundException);
  });
});
