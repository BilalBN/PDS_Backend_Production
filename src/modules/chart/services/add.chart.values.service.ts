import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { AddChartValueDto } from '../dto/add.chart.value.dto';
import { BatchChart } from '../entities/chart.value.entity';

@Injectable()
export class AddChartValuesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('batch_chart')
    private batchChartModel: Model<BatchChart>,
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
    const enteredUser = await em.findOne(UserSchemaClass, { id: entered_by });
    if (!enteredUser) {
      throw new NotFoundException({
        message: 'Operator not found!',
        success: false,
      });
    }
    await this.batchChartModel
      .findOneAndUpdate(
        { batchId: batch_id, 'chart.subStepId': sub_step_id },
        {
          $setOnInsert: {
            batchId: batch_id,
            'chart.subStepId': sub_step_id,
          },
          $set: {
            'chart.enteredBy': {
              id: enteredUser.id,
              name: enteredUser.username,
              image_url: null,
            },
            'chart.imageUrl': image_url ?? null,
          },
          $push: {
            'chart.values': { $each: values },
          },
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
