import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { AddChartValueDto } from '../dto/add.chart.value.dto';
import { ChartValues } from '../entities/chat.value.entity';

@Injectable()
export class AddChartValuesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('CHART_VALUE')
    private chartValueModel: Model<ChartValues>,
  ) {}

  async addValue(userId: number, valueDto: AddChartValueDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const { batch_id, entered_by, sub_step_id, values, image_url } = valueDto;
    await this.chartValueModel
      .findOneAndUpdate(
        { batchId: batch_id, subStepId: sub_step_id },
        {
          $set: { values: values, enteredBy: entered_by, imageUrl: image_url },
        },
        {
          returnDocument: 'after',
          runValidators: true,
          setDefaultsOnInsert: true,
          upsert: true,
        },
      )
      .exec();

    return {
      message: 'Value added successfully',
      success: true,
    };
  }
}
