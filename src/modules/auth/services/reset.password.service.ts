import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { ResetPasswordDto } from '../dto/reset.password.dto';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly entityManager: EntityManager) {}

  async reset(resetPasswordDto: ResetPasswordDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, {
      username: resetPasswordDto.username,
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    user.password = resetPasswordDto.password;
    await em.flush();

    return {
      message: 'Password reset success',
      success: true,
    };
  }
}
