import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { GetDashboardCountsService } from '../services/get.dashboard.counts.service';

describe('Get dashboard counts service test', () => {
  let getDashboardCountsService: GetDashboardCountsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [GetDashboardCountsService],
    }).compile();

    getDashboardCountsService = module.get(GetDashboardCountsService);
  });

  afterAll(async () => await module.close());

  it('Should return counts', async () => {
    const result = await getDashboardCountsService.get(1);
    expect(result).toEqual({
      data: {
        products: 6,
        users: 3,
        batches: 22,
      },
      message: 'Counts returned successfully',
      success: true,
    });
  });
});
