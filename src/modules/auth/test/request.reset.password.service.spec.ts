import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { jwtConfig } from '../../../configs/jwt.config';
import { RequestResetPasswordDto } from '../dto/request.reset.password.dto';
import { RequestResetPasswordService } from '../services/request.reset.password.service';

describe('Password reset request service test', () => {
  let requestResetPasswordService: RequestResetPasswordService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig],
      providers: [RequestResetPasswordService],
    }).compile();

    requestResetPasswordService = module.get(RequestResetPasswordService);
  });

  afterAll(async () => await module.close());

  it('Should return Password reset otp send success', async () => {
    const user: RequestResetPasswordDto = {
      username: 'user_name',
    };

    const result = await requestResetPasswordService.requestReset(user);
    expect(result.message).toEqual('Password reset otp send success');
  });

  it('Should return user not found', async () => {
    const user: RequestResetPasswordDto = {
      username: 'user',
    };

    await expect(
      requestResetPasswordService.requestReset(user),
    ).rejects.toThrow(NotFoundException);
  });
});
