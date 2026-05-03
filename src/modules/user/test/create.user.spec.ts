import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { UserRole } from '../../../shared/enums/user.enums';
import { CreateUserDto } from '../dto/create.user.dto';
import { CreateUserService } from '../services/create.user.service';
import { UserSubscriber } from '../user.subscriber';

describe('Create user service test', () => {
  let createUserService: CreateUserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig],
      providers: [CreateUserService, UserSubscriber],
    }).compile();

    createUserService = module.get(CreateUserService);
  });

  afterAll(async () => await module.close());

  it('Should return user created successfully', async () => {
    const user: CreateUserDto = {
      email: 'user@example.com',
      password: 'password',
      username: 'user_name',
      role: UserRole.ADMIN,
    };

    const result = await createUserService.create(user);
    expect(result.message).toEqual('User created successfully');
  });

  it('Should return user already exist', async () => {
    const user: CreateUserDto = {
      email: 'user@example.com',
      password: 'password',
      username: 'user_name',
      role: UserRole.ADMIN,
    };

    await expect(createUserService.create(user)).rejects.toThrow(
      ConflictException,
    );
  });
});
