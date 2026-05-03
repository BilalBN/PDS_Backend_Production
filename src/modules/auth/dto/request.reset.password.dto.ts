import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestResetPasswordDto {
  @ApiProperty({ default: 'username', type: 'string' })
  @IsNotEmpty()
  @IsString()
  username!: string;
}
