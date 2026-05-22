import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';
import { ProductsSchemaClass } from '../../products/entities/products.entity';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { CreateBatchDto } from '../dto/create.batch.dto';

@Injectable()
export class CreateBatchesService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(userId: number, batchDto: CreateBatchDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, { id: userId });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const supervisor = await em.findOne(UserSchemaClass, {
      id: batchDto.supervisor_id,
    });
    const product = await em.findOne(ProductsSchemaClass, {
      id: batchDto.product_id,
    });
    const batch = em.create(BatchesSchemaClass, {
      created_by: user,
      name: batchDto.name,
      start_date: batchDto.start_date,
      end_date: batchDto.end_date,
      size: batchDto.size,
      expiry_date: batchDto.expiry_date,
      created_at: new Date(),
      supervised_by: supervisor,
      product: product,
    });

    await em.persist(batch).flush();

    return {
      message: 'Batch created successfully',
      success: true,
    };
  }
}
