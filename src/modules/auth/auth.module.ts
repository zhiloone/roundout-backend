import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserResourceModule } from '../user/resources/user.resource';
import { AuthController } from './auth.controller';
import { AuthService } from './domain/auth.service';
import { FirebaseService } from './domain/firebase.service';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule, UserResourceModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, LocalStrategy, FirebaseStrategy],
})
export class AuthModule {}
