import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { BatchChart } from '../entities/chart.value.entity';

@Injectable()
export class GetChartValuesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('batch_chart')
    private batchChartModel: Model<BatchChart>,
  ) {}

  async get(userId: number, batchId: number, subStepId: number) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const result = await this.batchChartModel
      .findOne({ batchId: batchId, subStepId: subStepId })
      .select('chart -_id')
      .lean()
      .exec();

    if (!result) {
      throw new NotFoundException({
        message: 'No charts found!',
        success: false,
      });
    }

    return {
      data: result.chart,
      message: 'Charts returned successfully',
      success: true,
    };
  }
}
