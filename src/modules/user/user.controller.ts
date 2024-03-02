import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/guards/firebase.guard';
import { FirebaseAuthenticatedRequest } from '../auth/types/firebaseAuthenticatedRequest.type';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async me(@Req() req: FirebaseAuthenticatedRequest) {
    return await this.userService.getMe(req);
  }
}
