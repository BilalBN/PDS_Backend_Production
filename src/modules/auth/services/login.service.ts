import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSchemaClass } from '../../user/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const em = this.entityManager.fork();
    const user = await em.findOne(UserSchemaClass, {
      username: loginDto.username,
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        success: false,
      });
    }

    const isPasswordMatching = await user.verifyPassword(loginDto.password);
    if (!isPasswordMatching) {
      throw new BadRequestException({
        message: 'Invalid username or password!',
        success: false,
      });
    }

    const jwtPayload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          role: user.role,
          user_name: user.username,
        },
        access_token: accessToken,
      },
      message: 'Login successful',
      success: true,
    };
  }
}
