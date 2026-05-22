import { EventArgs, EventSubscriber } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserSchemaClass } from './entities/user.entity';

@Injectable()
export class UserSubscriber implements EventSubscriber<UserSchemaClass> {
  constructor(em: EntityManager) {
    em.getEventManager().registerSubscriber(this);
  }

  getSubscribedEntities() {
    return [UserSchemaClass];
  }

  async beforeCreate(args: EventArgs<UserSchemaClass>) {
    const passwordHash = await this.hashPassword(args.entity.password);
    args.entity.password = passwordHash;
  }

  async beforeUpdate(args: EventArgs<UserSchemaClass>) {
    const passwordHash = await this.hashPassword(args.entity.password);
    args.entity.password = passwordHash;
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }
}
