import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResourceModule } from './resources/user.resource';

@Module({
  imports: [UserResourceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
