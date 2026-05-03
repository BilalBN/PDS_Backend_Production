import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import { databaseConfig } from '../../../configs/database.config';
import { jwtConfig } from '../../../configs/jwt.config';
import { UserSubscriber } from '../../user/user.subscriber';
import { ResetPasswordDto } from '../dto/reset.password.dto';
import { ResetPasswordService } from '../services/reset.password.service';

describe('Reset request service test', () => {
  let resetPasswordService: ResetPasswordService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig],
      providers: [ResetPasswordService, UserSubscriber],
    }).compile();

    resetPasswordService = module.get(ResetPasswordService);
  });

  afterAll(async () => await module.close());

  it('Should return Password reset success', async () => {
    const user: ResetPasswordDto = {
      username: 'user_name',
      password: 'password',
    };

    const result = await resetPasswordService.reset(user);
    expect(result.message).toEqual('Password reset success');
  });

  it('Should return user not found', async () => {
    const user: ResetPasswordDto = {
      username: 'user',
      password: '',
    };

    await expect(resetPasswordService.reset(user)).rejects.toThrow(
      NotFoundException,
    );
  });
});
