import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { CreateUserService } from './services/create.user.service';

@Controller('user')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUserService.create(body);
  }
}
