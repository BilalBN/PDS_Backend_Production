import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BatchesSchemaClass } from '../../../batches/entities/batches.entity';

@Injectable()
export class DeleteBatchService {
  constructor(private readonly entityManager: EntityManager) {}

  async delete(batchId: number) {
    const em = this.entityManager.fork();
    const batch = await em.findOne(BatchesSchemaClass, { id: batchId });
    if (!batch) {
      throw new NotFoundException({
        message: 'Batch not found!',
        success: false,
      });
    }

    await em.remove(batch).flush();

    return {
      message: 'Batch deleted successfully',
      success: true,
    };
  }
}
