import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException({
        message: 'Unauthorized!',
        success: false,
      });
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (_) {
      throw new InternalServerErrorException({
        message: 'Unable to verify authority!',
        success: false,
      });
    }

    return true;
  }

  private extractToken(request: Request) {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }
}
