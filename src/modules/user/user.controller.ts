import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { CreateUserService } from './services/create.user.service';
import { GetUsersService } from './services/get.users.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUsersService: GetUsersService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUserService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getSupervisors(@Request() req) {
    return await this.getUsersService.get(req.user.id);
  }
}
