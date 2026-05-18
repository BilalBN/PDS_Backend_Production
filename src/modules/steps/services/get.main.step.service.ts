import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { MainStepsSchemaClass } from '../entities/main.steps.entity';

@Injectable()
export class GetMainStepsService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number, productId: number) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const steps = await em
      .createQueryBuilder(MainStepsSchemaClass, 'm')
      .select(['m.id', 'm.name'])
      .where({ product: { id: productId } })
      .execute('all');

    if (steps.length == 0) {
      throw new NotFoundException({
        message: 'No Main steps found!',
        success: false,
      });
    }

    return {
      data: steps,
      message: 'Main steps returned successfully',
      success: true,
    };
  }
}
