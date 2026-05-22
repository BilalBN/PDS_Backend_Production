import { EntityManager, wrap } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { SubStepsSchemaClass } from '../entities/sub.steps.entity';

@Injectable()
export class GetSubStepsService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number, mainStepId: number) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const steps = await em.find(
      SubStepsSchemaClass,
      { main_step: { id: mainStepId } },
      {
        fields: [
          'dynamic',
          'id',
          'name',
          'parameters.id',
          'parameters.instructions',
          'parameters.name',
          'parameters.type',
          'parameters.unit',
        ],
        orderBy: { id: 'ASC' },
        populate: ['parameters'],
      },
    );

    if (steps.length == 0) {
      throw new NotFoundException({
        message: 'No Sub steps found!',
        success: false,
      });
    }

    const serializedData = steps.map((step) => wrap(step).toObject());
    return {
      data: serializedData,
      message: 'Sub steps returned successfully',
      success: true,
    };
  }
}
