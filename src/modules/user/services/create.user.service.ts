import { EntityManager } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserSchemaClass } from '../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(userDto: CreateUserDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, {
      $or: [
        { email: userDto.email },
        { phone: userDto.phone },
        { username: userDto.username },
      ],
    });

    if (user) {
      throw new ConflictException({
        message: 'User already exist!',
        success: false,
      });
    }

    const userData = em.create(UserSchemaClass, {
      email: userDto.email,
      password: userDto.password,
      phone: userDto.phone,
      role: userDto.role,
      username: userDto.username,
      created_at: new Date(),
    });

    await em.persist(userData).flush();

    return {
      message: 'User created successfully',
      success: true,
    };
  }
}
