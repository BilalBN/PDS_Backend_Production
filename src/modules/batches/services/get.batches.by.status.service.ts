import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { BatchesSchemaClass } from '../entities/batches.entity';

@Injectable()
export class GetBatchesByStatusService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number, status: string, limit = 20, page = 1) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const offset = (page - 1) * limit;
    const [batches, count] = await em.findAndCount(
      BatchesSchemaClass,
      {
        status: status,
        supervised_by: user,
      },
      {
        limit,
        orderBy: { id: 'ASC' },
        offset,
        populate: ['created_by', 'product', 'supervised_by'],
      },
    );

    if (count === 0) {
      throw new NotFoundException({
        message: 'No batches found!',
        success: false,
      });
    }

    return {
      data: {
        page,
        limit,
        total_count: count,
        batches,
      },
      message: 'Batches returned successfully',
      success: true,
    };
  }
}
