import { EntityManager, FilterQuery } from '@mikro-orm/mariadb';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserSchemaClass } from '../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(userDto: CreateUserDto) {
    const em = this.entityManager.fork();
    const filterQuery: FilterQuery<UserSchemaClass> = [];

    if (userDto.email) filterQuery.push({ email: userDto.email });
    if (userDto.phone) filterQuery.push({ email: userDto.phone });
    if (userDto.username) filterQuery.push({ email: userDto.username });

    const user = await em.findOne(UserSchemaClass, {
      $or: filterQuery,
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
