import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { nestjsxCrudIdParam } from 'src/common/nestjsxCrudBaseParams';
import { UserEntity } from 'src/entities/user.entity';
import { FirebaseAuthGuard } from '../auth/guards/firebase.guard';
import { FirebaseAuthenticatedRequest } from '../auth/types/firebaseAuthenticatedRequest.type';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    ...nestjsxCrudIdParam,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    exclude: ['password'],
  },
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async me(@Req() req: FirebaseAuthenticatedRequest) {
    return await this.service.getMe(req);
  }

  @Override('getManyBase')
  @Get()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return await this.service.getMany(req);
  }

  @Override('getOneBase')
  @Get(':id')
  async getOne(@ParsedRequest() req: CrudRequest) {
    return await this.service.getOne(req);
  }
}
