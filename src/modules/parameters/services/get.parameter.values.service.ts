import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { ParameterValues } from '../entities/parameter.value.entity';

@Injectable()
export class GetParameterValuesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectModel('parameterValue')
    private parameterValueModel: Model<ParameterValues>,
  ) {}

  async get(userId: number, batchId: number) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const parameters = await this.parameterValueModel
      .find({ batchId: batchId })
      .select('-_id -__v')
      .lean()
      .exec();

    if (parameters.length == 0) {
      throw new NotFoundException({
        message: 'No parameters found!',
        success: false,
      });
    }

    return {
      data: parameters,
      message: 'Parameters returned successfully',
      success: true,
    };
  }
}
