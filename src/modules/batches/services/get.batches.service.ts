import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { BatchesSchemaClass } from '../entities/batches.entity';

@Injectable()
export class GetBatchesService {
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
      {},
      {
        offset: offset,
        limit: limit,
        orderBy: { id: 'DESC' },
        populate: ['product.main_steps', 'supervised_by'],
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
        created_by: {
          id: batchEntity.created_by?.id,
          email: batchEntity.created_by?.email,
          phone: batchEntity.created_by?.phone,
          role: batchEntity.created_by?.role,
          status: batchEntity.created_by?.status,
          username: batchEntity.created_by?.username,
          created_at: batchEntity.created_by?.created_at,
          updated_at: batchEntity.created_by?.updated_at,
        },
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
        status: batchEntity.status,
        supervised_by: {
          id: batchEntity.supervised_by?.id,
          email: batchEntity.supervised_by?.email,
          phone: batchEntity.supervised_by?.phone,
          role: batchEntity.supervised_by?.role,
          status: batchEntity.supervised_by?.status,
          username: batchEntity.supervised_by?.username,
          created_at: batchEntity.supervised_by?.created_at,
          updated_at: batchEntity.supervised_by?.updated_at,
        },
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
