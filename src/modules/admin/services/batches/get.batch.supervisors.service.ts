import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../../user/entities/user.entity';

@Injectable()
export class GetBatchSupervisorsService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const supervisors = await em.find(UserSchemaClass, {
      $not: { role: 'admin' },
    });
    if (supervisors.length == 0) {
      throw new NotFoundException({
        message: 'No supervisors found!',
        success: false,
      });
    }

    return {
      data: supervisors,
      message: 'Supervisors returned successfully',
      success: true,
    };
  }
}
