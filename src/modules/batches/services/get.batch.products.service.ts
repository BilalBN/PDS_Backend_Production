import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsSchemaClass } from '../../products/entities/products.entity';
import { UserSchemaClass } from '../../user/entities/user.entity';

@Injectable()
export class GetBatchProductsService {
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

    const products = await em.findAll(ProductsSchemaClass);
    if (products.length == 0) {
      throw new NotFoundException({
        message: 'No products found!',
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
