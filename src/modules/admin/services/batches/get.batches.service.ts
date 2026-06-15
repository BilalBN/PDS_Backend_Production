import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchesSchemaClass } from '../../../batches/entities/batches.entity';
import { UserSchemaClass } from '../../../user/entities/user.entity';

@Injectable()
export class GetBatchesService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(userId: number, limit = 20, page = 1) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const offset = (page - 1) * limit;
    const [batches, count] = await em
      .createQueryBuilder(BatchesSchemaClass, 'b')
      .select([
        'b.created_at',
        'b.end_date',
        'b.expiry_date',
        'b.id',
        'b.name',
        'b.size',
        'b.start_date',
      ])
      .where({ 'b.created_by': user })
      .offset(offset)
      .limit(limit)
      .orderBy({ id: 'DESC' })
      .getResultAndCount();

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
