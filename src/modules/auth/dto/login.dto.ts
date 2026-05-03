import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'username', type: 'string' })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({ default: 'password', minLength: 8, type: 'string' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
