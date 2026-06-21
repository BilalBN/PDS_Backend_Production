import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { CreateBatchDto } from '../dto/create.batch.dto';
import { CreateBatchesService } from '../services/create.batch.service';

describe('Create batch service test', () => {
  let createBatchesService: CreateBatchesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [CreateBatchesService],
    }).compile();

    createBatchesService = module.get(CreateBatchesService);
  });

  afterAll(async () => await module.close());

  it('Should create batch', async () => {
    const batch: CreateBatchDto = {
      name: 'test-batch',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      expiry_date: new Date().toISOString(),
      supervisor_id: 1,
      product_id: 1,
      size: 10,
    };
    const result = await createBatchesService.create(1, batch);
    expect(result).toEqual({
      message: 'Batch created successfully',
      success: true,
    });
  });
});
