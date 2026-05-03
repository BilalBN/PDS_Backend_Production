import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { RequestResetPasswordService } from './services/request.reset.password.service';
import { ResetPasswordService } from './services/reset.password.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, RequestResetPasswordService, ResetPasswordService],
})
export class AuthModule {}
