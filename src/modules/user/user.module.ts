import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create.user.service';
import { GetUsersService } from './services/get.users.service';
import { UserController } from './user.controller';
import { UserSubscriber } from './user.subscriber';

@Module({
  controllers: [UserController],
  providers: [CreateUserService, GetUsersService, UserSubscriber],
})
export class UserModule {}
