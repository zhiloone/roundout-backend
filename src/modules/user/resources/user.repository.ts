import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findOne(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDto) {
    return await this.repo.save(this.repo.create(dto));
  }
}
