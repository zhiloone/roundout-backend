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
import { RegisterDto } from '../dto/register.dto';
import { AuthenticatedUser } from '../types/authenticatedUser.type';
import { comparePassword, hashPassword } from '../utils/hash.utils';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async login(dto: LoginDto): Promise<AuthenticatedUser> {
    this.logger.debug(`Trying to login user with email ${dto.email}...`);

    const user = await this.userRepo.findOne(dto.email);

    if (!user) {
      throw new NotFoundException(AuthErrors.USER_NOT_FOUND);
    }

    const isMatch = await comparePassword(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(AuthErrors.CREDENTIALS_MISMATCH);
    }

    delete user.password;
    return user;
  }

  async register(dto: RegisterDto) {
    this.logger.debug(`Trying to register user with email ${dto.email}...`);

    const user = await this.userRepo.findOne(dto.email);

    if (user) {
      throw new BadRequestException(AuthErrors.ALREADY_REGISTERED);
    }

    const uuid = randomUUID();
    const jwt = await this.firebaseService.createToken(uuid);
    const hashedPassword = await hashPassword(dto.password);

    await this.userRepo.createUser({
      ...dto,
      id: uuid,
      password: hashedPassword,
    });

    return { jwt };
  }
}
