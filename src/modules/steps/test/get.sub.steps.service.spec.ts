import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { GetSubStepsService } from '../services/get.sub.steps.service';

describe('Get sub steps service test', () => {
  let getSubStepsService: GetSubStepsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [GetSubStepsService],
    }).compile();
    getSubStepsService = module.get(GetSubStepsService);
  });

  afterAll(async () => await module.close());

  it('Should return sub steps', async () => {
    const result = await getSubStepsService.get(1, 1);
    expect(result).toEqual({
      data: [
        {
          id: 1,
          name: 'Pre-Manufacturing Check',
          dynamic: false,
          parameters: [
            {
              id: 1,
              instructions: 'Ensure the area is cleaned as per SOP',
              name: 'Area control',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 2,
              instructions:
                'Check electrical, purified water, steam for functioning',
              name: 'Utilities',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 3,
              instructions: 'Ensure cleanliness and labeling of all equipment',
              name: 'Equipment and utensils',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 4,
              instructions: 'Materials must be QC-approved before transfer',
              name: 'Material transfer',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 5,
              instructions: 'Store in designated area with proper label',
              name: 'Storage of material',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 6,
              instructions: 'Use masks, gloves, head cap, etc.',
              name: 'Personal protective equipment',
              type: 'Checklist',
              unit: null,
            },
            {
              id: 7,
              instructions:
                'Avoid contamination, clean area post-activity, dispose waste per SOP',
              name: 'Special Instructions',
              type: 'Note',
              unit: null,
            },
          ],
        },
      ],
      message: 'Sub steps returned successfully',
      success: true,
    });
  });

  it('Should return no sub steps found!', async () => {
    await expect(getSubStepsService.get(1, 100)).rejects.toThrow(
      NotFoundException,
    );
  });
});
