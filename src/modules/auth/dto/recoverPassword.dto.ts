import { PickType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class RecoverPasswordDto extends PickType(RegisterDto, ['email']) {}
