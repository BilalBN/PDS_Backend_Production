import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
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
    const batch = args.entity;
    this.client.emit('batch/create', batch);
  }

  beforeDelete(args: EventArgs<BatchesSchemaClass>) {
    // Push the data to the supervisor
    const batch = args.entity;
    this.client.emit('batch/delete', { id: batch.id });
  }
}
