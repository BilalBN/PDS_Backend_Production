import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { RequestResetPasswordDto } from '../dto/request.reset.password.dto';

@Injectable()
export class RequestResetPasswordService {
  constructor(private readonly entityManager: EntityManager) {}

  async requestReset(requestResetPasswordDto: RequestResetPasswordDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, {
      username: requestResetPasswordDto.username,
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    return {
      data: {
        otp: 1234,
      },
      message: 'Password reset otp send success',
      success: true,
    };
  }
}
