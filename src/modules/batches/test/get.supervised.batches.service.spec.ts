import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { GetSupervisedBatchesService } from '../services/get.supervised.batches.service';

describe('Get supervised batches service test', () => {
  let getSupervisedBatchesService: GetSupervisedBatchesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [GetSupervisedBatchesService],
    }).compile();

    getSupervisedBatchesService = module.get(GetSupervisedBatchesService);
  });

  afterAll(async () => await module.close());

  it('Should return all batches', async () => {
    const result = await getSupervisedBatchesService.get(1);
    expect(result.message).toEqual('Batches returned successfully');
  });

  it('Should throw not found exception', async () => {
    await expect(getSupervisedBatchesService.get(1, 50, 10)).rejects.toThrow(
      NotFoundException,
    );
  });
});
