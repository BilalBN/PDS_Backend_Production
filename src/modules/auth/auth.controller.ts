import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RequestResetPasswordDto } from './dto/request.reset.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { LoginService } from './services/login.service';
import { RequestResetPasswordService } from './services/request.reset.password.service';
import { ResetPasswordService } from './services/reset.password.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly requestResetPasswordService: RequestResetPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.loginService.login(body);
  }

  @Get('password/reset/request')
  async requestResetPassword(@Body() body: RequestResetPasswordDto) {
    return await this.requestResetPasswordService.requestReset(body);
  }

  @Patch('password/reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.resetPasswordService.reset(body);
  }
}
