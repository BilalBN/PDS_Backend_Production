import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import {
    databaseConfig,
    mongoDbConfig,
} from '../../../configs/database.config';
import { BatchChartSchema } from '../entities/chart.value.entity';
import { DeleteChartValueService } from '../services/delete.chart.value.service';

describe('Delete chart value service test', () => {
  let deleteChartValueService: DeleteChartValueService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        config,
        databaseConfig,
        mongoDbConfig,
        MongooseModule.forFeature([
          {
            schema: BatchChartSchema,
            name: 'batch_chart',
          },
        ]),
      ],
      providers: [DeleteChartValueService],
    }).compile();
    deleteChartValueService = module.get(DeleteChartValueService);
  });

  afterAll(async () => await module.close());

  it('Should return charts', async () => {
    const result = await deleteChartValueService.delete(1, 8, 11, 1);
    expect(result.message).toEqual('Chart removed successfully');
  });

  it('Should return user found!', async () => {
    await expect(deleteChartValueService.delete(100, 1, 1, 1)).rejects.toThrow(
      NotFoundException,
    );
  });
});
