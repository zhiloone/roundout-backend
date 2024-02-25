import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './domain/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { FirebaseAuthGuard } from './guards/firebase.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedRequest } from './types/authenticatedRequest.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() _dto: LoginDto, @Req() req: AuthenticatedRequest) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate() {}
}
