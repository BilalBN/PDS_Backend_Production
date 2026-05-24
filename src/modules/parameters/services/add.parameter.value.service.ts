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

    const { batchId, enteredBy, parameterId, value } = valueDto;
    await this.parameterValueModel
      .findOneAndUpdate(
        { batchId: batchId, enteredBy: enteredBy, parameterId: parameterId },
        { $set: { value: value } },
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
