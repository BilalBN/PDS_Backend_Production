import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { GetMainStepsService } from '../services/get.main.step.service';

describe('Get main steps service test', () => {
  let getMainStepsService: GetMainStepsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [GetMainStepsService],
    }).compile();
    getMainStepsService = module.get(GetMainStepsService);
  });

  afterAll(async () => await module.close());

  it('Should return main steps', async () => {
    const result = await getMainStepsService.get(1, 1);
    expect(result).toEqual({
      data: [
        { id: 1, name: 'Pre-Manufacturing Check' },
        { id: 2, name: 'Raw Material Dispensing' },
        { id: 3, name: 'Pulverizing' },
        { id: 4, name: 'Extraction' },
        { id: 5, name: 'Evaporattor' },
        { id: 6, name: 'Reactor' },
        { id: 7, name: 'Drying' },
        { id: 8, name: 'Pulverizing' },
        { id: 9, name: 'Final Reconciliation' },
        { id: 10, name: 'QA' },
      ],
      message: 'Main steps returned successfully',
      success: true,
    });
  });

  it('Should return no main steps found!', async () => {
    await expect(getMainStepsService.get(1, 10)).rejects.toThrow(
      NotFoundException,
    );
  });
});
