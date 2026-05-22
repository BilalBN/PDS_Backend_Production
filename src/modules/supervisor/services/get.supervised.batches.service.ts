import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';
import { UserSchemaClass } from '../../user/entities/user.entity';

@Injectable()
export class GetSupervisedBatchesService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number, limit = 20, page = 1) {
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
      { supervised_by: user },
      {
        fields: [
          'created_at',
          'end_date',
          'expiry_date',
          'id',
          'name',
          'size',
          'start_date',
          'product.created_at',
          'product.id',
          'product.name',
        ],
        offset,
        limit,
        orderBy: { id: 'DESC' },
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
