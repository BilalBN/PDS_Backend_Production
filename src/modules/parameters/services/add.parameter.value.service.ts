import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { AddParameterValueDto } from '../dto/add.parameter.value.dto';
import { ParameterValues } from '../entities/parameter.value.entity';

@Injectable()
export class AddParameterValueService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('parameterValue')
    private parameterValueModel: Model<ParameterValues>,
  ) {}

  async addValue(userId: number, valueDto: AddParameterValueDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const { batch_id, entered_by, parameter_id, value } = valueDto;
    const enteredUser = await em.findOne(UserSchemaClass, { id: entered_by });
    if (!enteredUser) {
      throw new NotFoundException({
        message: 'Operator not found!',
        success: false,
      });
    }
    await this.parameterValueModel
      .findOneAndUpdate(
        { batchId: batch_id, parameterId: parameter_id },
        {
          $set: {
            value: value,
            enteredBy: { id: enteredUser.id, name: enteredUser.username },
            parameterId: parameter_id,
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
      data: {
        parameter_id: parameter_id,
        value: value,
      },
      message: 'Value added successfully',
      success: true,
    };
  }
}
