import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { FirebaseAuthenticatedRequest } from '../auth/types/firebaseAuthenticatedRequest.type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getMe(req: FirebaseAuthenticatedRequest) {
    const userId = req.user.uid;
    this.logger.debug(`Getting user #${userId} information...`);

    const user = await this.repo.findOne({ where: { id: userId } });
    delete user.password;
    return user;
  }
}
