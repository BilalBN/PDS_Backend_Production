import { EntityManager } from '@mikro-orm/mariadb';
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
      { status: status, supervised_by: user },
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
          'product.main_steps',
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

    const batchesSerialized = batches.map((batchEntity) => {
      return {
        created_at: batchEntity.created_at,
        end_date: batchEntity.end_date,
        expiry_date: batchEntity.expiry_date,
        id: batchEntity.id,
        name: batchEntity.name,
        product: {
          id: batchEntity.product?.id,
          created_at: batchEntity.product?.created_at,
          name: batchEntity.product?.name,
        },
        size: batchEntity.size,
        start_date: batchEntity.start_date,
        main_steps_count: batchEntity.product?.main_steps.length,
      };
    });

    return {
      data: {
        page,
        limit,
        total_count: count,
        batches: batchesSerialized,
      },
      message: 'Batches returned successfully',
      success: true,
    };
  }
}
