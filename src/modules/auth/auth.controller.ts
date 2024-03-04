import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './domain/auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recoverPassword.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: route for Swagger: log in with customToken -> get firebase token

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: RecoverPasswordDto) {
    return await this.authService.resetPassword(dto);
  }
}
