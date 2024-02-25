import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ default: 'email@domain.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'Pa$sw0rd' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
