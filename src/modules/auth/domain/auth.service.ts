import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRepository } from '../../user/resources/user.repository';
import { AuthErrors } from '../auth.errors';
import { LoginDto } from '../dto/login.dto';
import { RecoverPasswordDto } from '../dto/recoverPassword.dto';
import { RegisterDto } from '../dto/register.dto';
import { comparePassword, hashPassword } from '../utils/hash.utils';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async login(dto: LoginDto) {
    this.logger.debug(`Trying to login user with email ${dto.email}...`);

    const user = await this.userRepo.findOne(dto.email);

    if (!user) {
      throw new NotFoundException(AuthErrors.USER_NOT_FOUND);
    }

    const isMatch = await comparePassword(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(AuthErrors.CREDENTIALS_MISMATCH);
    }

    const customToken = await this.firebaseService.createToken(user.id);

    delete user.password;
    return { user, customToken };
  }

  async register(dto: RegisterDto) {
    this.logger.debug(`Trying to register user with email ${dto.email}...`);

    const existingUser = await this.userRepo.findOne(dto.email);

    if (existingUser) {
      throw new BadRequestException(AuthErrors.ALREADY_REGISTERED);
    }

    const uuid = randomUUID();
    const customToken = await this.firebaseService.createToken(uuid, {
      email: dto.email,
    });
    const hashedPassword = await hashPassword(dto.password);

    const user = await this.userRepo.createUser({
      ...dto,
      id: uuid,
      password: hashedPassword,
    });
    delete user.password;

    return { user, customToken };
  }

  async resetPassword(dto: RecoverPasswordDto) {
    await this.firebaseService.resetPassword(dto.email);
  }
}
