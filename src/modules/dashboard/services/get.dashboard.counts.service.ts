import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';
import { ProductsSchemaClass } from '../../products/entities/products.entity';
import { UserSchemaClass } from '../../user/entities/user.entity';

@Injectable()
export class GetDashboardCountsService {
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

    const [productsCount, usersCount, batchesCount] = await Promise.all([
      em.count(ProductsSchemaClass),
      em.count(UserSchemaClass, { $not: { role: 'admin' } }),
      em.count(BatchesSchemaClass),
    ]);

    return {
      data: {
        products: productsCount,
        users: usersCount,
        batches: batchesCount,
      },
      message: 'Counts returned successfully',
      success: true,
    };
  }
}
