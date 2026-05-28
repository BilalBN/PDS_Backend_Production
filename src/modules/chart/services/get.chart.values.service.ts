import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { ChartValues } from '../entities/chat.value.entity';

@Injectable()
export class GetChartValuesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('CHART_VALUE')
    private chartValueModel: Model<ChartValues>,
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

    const charts = await this.chartValueModel
      .find({
        batchId: batchId,
        subStepId: subStepId,
      })
      .select('-_id -__v')
      .lean()
      .exec();

    if (charts.length == 0) {
      throw new NotFoundException({
        message: 'No charts found!',
        success: false,
      });
    }

    return {
      data: charts,
      message: 'Charts returned successfully',
      success: true,
    };
  }
}
