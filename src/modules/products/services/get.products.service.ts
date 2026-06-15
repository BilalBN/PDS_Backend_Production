import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { ProductsSchemaClass } from '../entities/products.entity';

@Injectable()
export class GetProductsService {
  constructor(private readonly entityManager: EntityManager) {}

  async get(userId: number) {
    const em = this.entityManager.fork();
    const batch = await em.findOne(UserSchemaClass, { id: userId });
    if (!batch) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const [products, count] = await em
      .createQueryBuilder(ProductsSchemaClass)
      .orderBy({ id: 'ASC' })
      .getResultAndCount();

    if (count == 0) {
      throw new NotFoundException({
        message: 'Products not found!',
        success: false,
      });
    }

    return {
      data: products,
      message: 'Products returned successfully',
      success: true,
    };
  }
}
