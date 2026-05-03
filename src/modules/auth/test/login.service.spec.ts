import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { jwtConfig } from '../../../configs/jwt.config';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '../services/login.service';

describe('Login service test', () => {
  let loginService: LoginService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig],
      providers: [LoginService],
    }).compile();

    loginService = module.get(LoginService);
  });

  afterAll(async () => await module.close());

  it('Should return login successful', async () => {
    const user: LoginDto = {
      password: 'password',
      username: 'user_name',
    };

    const result = await loginService.login(user);
    expect(result.message).toEqual('Login successful');
  });

  it('Should return invalid username or password', async () => {
    const user: LoginDto = {
      password: 'wrongPassword',
      username: 'user_name',
    };

    await expect(loginService.login(user)).rejects.toThrow(BadRequestException);
  });

  it('Should return user not found', async () => {
    const user: LoginDto = {
      password: 'password',
      username: 'unknown',
    };

    await expect(loginService.login(user)).rejects.toThrow(NotFoundException);
  });
});
