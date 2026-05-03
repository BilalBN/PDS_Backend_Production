import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create.user.service';
import { UserController } from './user.controller';
import { UserSubscriber } from './user.subscriber';

@Module({
  controllers: [UserController],
  providers: [CreateUserService, UserSubscriber],
})
export class UserModule {}
