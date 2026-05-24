import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mariadb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';

@Injectable()
export class BatchSubscriber implements EventSubscriber<BatchesSchemaClass> {
  constructor(
    em: EntityManager,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {
    em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities(): EntityName<BatchesSchemaClass>[] {
    return [BatchesSchemaClass];
  }

  afterCreate(args: EventArgs<BatchesSchemaClass>) {
    // Push the data to the supervisor
    const batchEntity = args.entity;
    const batch = {
      created_at: batchEntity.created_at,
      created_by: batchEntity.created_by,
      end_date: batchEntity.end_date,
      expiry_date: batchEntity.expiry_date,
      id: batchEntity.id,
      name: batchEntity.name,
      product: batchEntity.product,
      size: batchEntity.size,
      start_date: batchEntity.start_date,
      status: batchEntity.status,
      supervised_by: batchEntity.supervised_by,
      main_steps_count: batchEntity.product?.main_steps.length,
    };
    this.client.emit('batch/create', batch);
  }

  beforeDelete(args: EventArgs<BatchesSchemaClass>) {
    // Push the data to the supervisor
    const batch = args.entity;
    this.client.emit('batch/delete', { id: batch.id });
  }
}
