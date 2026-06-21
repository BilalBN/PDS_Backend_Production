import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../entities/user.entity';

@Injectable()
export class GetUsersService {
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

    const users = await em.find(UserSchemaClass, {
      $not: { role: 'admin' },
    });
    if (users.length == 0) {
      throw new NotFoundException({
        message: 'No users found!',
        success: false,
      });
    }

    return {
      data: users,
      message: 'Users returned successfully',
      success: true,
    };
  }
}
