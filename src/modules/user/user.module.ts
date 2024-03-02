import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserResourceModule } from './resources/user.resource';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserResourceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
